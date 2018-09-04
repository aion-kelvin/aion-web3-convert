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
    address: '0xa0450c4333e72ed26552d7462c0b3669924eec816a219b3960d5b3f0b33f7444',
    password: 'password',
    privateKey: '0xc0a97b1d6d68f3aed19e1d460287efcfd9e93cd294dd86963e08ab24622e4fc6b7dfe3a9fd46fbd034687a6c2a3ddfd61896b8e7521402369383d6a52a591a5b'
  },
  {
    address: '0xa0b88269779d225510ca880ed742e445db0c70efb1ee3159b6d56479ae3501f9',
    password: 'whatever',
    privateKey: '0xwhatever'
  },
]

let privateKey = accounts[0].privateKey;
let account = client.eth.accounts.privateKeyToAccount(privateKey);
client.eth.accounts.wallet.add(privateKey);
let { address } = account;

  // get the next one or the first
//  let friend = accounts[index + 1] || accounts[0];
let friend = accounts[1];

let friendAddress = '0xa0b88269779d225510ca880ed742e445db0c70efb1ee3159b6d56479ae3501f9';
client.eth.defaultAccount = accounts[0].address;
client.eth.getBalance(address, (err, res) => {
  if (err !== null && err !== undefined) {
    console.error("error getting balance", address, err);
    return;
  }
  console.log("balance", address, res);
});

let tx = {
  //from: address,
  to: friendAddress,
  value: 1.2 * 1000000000000000000,
  gas: 54323,
};

client.eth.sendTransaction(tx, (err, res) => {
  if (err !== null && err !== undefined) {
    return console.error("error", tx, res, err);
  }

  console.log("res = ", res);
});
