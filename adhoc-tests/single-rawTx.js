/*
it will send transactions in a circle to each account
import aion account to node:
./aion.sh -a import private-key-hex
*/

var Web3 = require('../packages/web3');
let client = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

/*
⚠️fill in these values
because it uses `unlockAccount` rpc call it needs the password
*/
let accounts = [
  {
    address: '0xa0202797a7aff86fec1a5d8b7cacea276de5bcfc2e8b14878c9ba48d7d5330a0',
    password: 'account1',
    privateKey: '0x6df86a106f599c78ab9b2ad593b2983038edf706a52b24bfa895b49066a7f2a03ddfb8596435b9530b5e635736c801c1403578b85e582d98dd7a322ddfb1e4c1'
  },
  {
    address: '0xa09d19c066f341220d914414c42e5e796e7e4daf83a9abf4581b1670403bbd15',
    password: 'account2',
    privateKey: '0x29379825937c50f0e13453673c5083bcf9853ef69ebb129f2db106db4966cf5efe6820305cf2cd29719d7c924fc495542100d5f499d4b758205bee05dd33896b'
  },
  {
    address: '0xa06f640ced8bd31eb9e191887adde74888e9ca31fd8545dae3ae896773ccbc4f',
    password: 'account3',
    privateKey: '0xe6edbf765e724684cacc2c7cc0c8bbac98c1c672b8701108c6e2c2cf25523dec085aa353d4ebd256c4601838714cac4dfd96feee86bc03777247a085b7220ee1'
  }
]

let privateKey = accounts[0].privateKey;
let account = client.eth.accounts.privateKeyToAccount(privateKey);
let { address } = account;

  // get the next one or the first
//  let friend = accounts[index + 1] || accounts[0];
let friend = accounts[1];

console.log("address", address);

client.eth.getBalance(address, (err, res) => {
  if (err !== null && err !== undefined) {
    console.error("error getting balance", address, err);
    return;
  }
  console.log("balance", address, res);
});

let tx = {
  to: friend.address,
  value: 13 * 1000000000000000000,
  gas: 54321
};

account.signTransaction(tx, (err, res) => {
  if (err !== null && err !== undefined) {
    return console.error("error signing transaction", tx, res, err);
  }

  console.log("messageHash", res.messageHash);
  console.log("rawTransaction", res.rawTransaction);
  console.log("signature", res.signature);

  // decode the transaction if you wish to
  // let rlp = require('aion-rlp')
  // let decoded = rlp.decode(res.rawTransaction)
  // console.log('decoded', decoded)

  client.eth.sendSignedTransaction(res.rawTransaction, (err, res) => {
    if (err !== null && err !== undefined) {
      return console.error("error sending transaction", err);
    }

    console.log("transaction hash from server", res);
  });
});
