var Web3 = require('../packages/web3');
let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

web3.eth.personal.unlockAccount("0xa0450c4333e72ed26552d7462c0b3669924eec816a219b3960d5b3f0b33f7444", "password", 600)

var abi = [{"constant":false,
      "inputs":[],
      "name":"sayHello",
      "outputs":[{"name":"","type":"string"}],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"}];
var contractData = '0x608060405234801561001057600080fd5b5061013f806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063ef5fb05b14610046575b600080fd5b34801561005257600080fd5b5061005b6100d6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009b578082015181840152602081019050610080565b50505050905090810190601f1680156100c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040805190810160405280600b81526020017f68656c6c6f20776f726c640000000000000000000000000000000000000000008152509050905600a165627a7a723058207e60ff2e7e55eb93611b7a3ec2eda4e37a907d160c4b8133f1ac2cbf7e749c730029';
let address = '0xa0450c4333e72ed26552d7462c0b3669924eec816a219b3960d5b3f0b33f7444';
let opts = {
    from: address,
    gasPrice: 12345,
    gas: 12345,
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
