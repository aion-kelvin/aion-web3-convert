var Web3 = require('../packages/web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

web3.eth.personal.unlockAccount("0xa0450c4333e72ed26552d7462c0b3669924eec816a219b3960d5b3f0b33f7444", "password", 600)

/*var abi = [{"constant":false,
      "inputs":[],
      "name":"sayHello",
      "outputs":[{"name":"","type":"string"}],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"}];*/
var abi = [{"constant":false,"inputs":[],"name":"sayHello","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}];


// solidity output for the program in adhoc-tests/helloworld.sol
var contractData = '0x605060405234156100105760006000fd5b610015565b610142806100246000396000f30060506040526000356c01000000000000000000000000900463ffffffff168063ef5fb05b146100335761002d565b60006000fd5b341561003f5760006000fd5b6100476100c3565b6040518080601001828103825283818151815260100191508051906010019080838360005b838110156100885780820151818401525b60108101905061006c565b50505050905090810190600f1680156100b55780820380516001836010036101000a031916815260100191505b509250505060405180910390f35b6100cb6100ff565b602060405190810160405280600b81526010016f68656c6c6f20776f726c64000000000081526010015090506100fc565b90565b6010604051908101604052806000815260100150905600a165627a7a7230582050abee1fcc1a4e95d2c1d8f52590d462aec52cc5190a48104c6eeb1012345e500029';
let address = '0xa0450c4333e72ed26552d7462c0b3669924eec816a219b3960d5b3f0b33f7444';
let opts = {
    from: address,
    gas: 4000000,
    gasPrice: 10000000000,
    data: contractData
};

let contract = new web3.eth.Contract(abi, opts);
let ctorArgs = [];

contract.deploy({data: contractData, arguments: ctorArgs})//it says required in docs but probably optional
    .send()
    .on('error', err => { console.log('send error event' , err) })
    .on('transactionHash', transactionHash => { console.log('transactionHash', transactionHash) })
    .on('receipt', receipt => { console.log('receipt', receipt) })
    .on('confirmation', (confirmationNumber, receipt) => { console.log(confirmationNumber, receipt) })
    .then(newContractInstance => {
            console.log(newContractInstance.options.address) // instance with the new contract address
    })
.catch(err => { console.log('send error catch', err) })
