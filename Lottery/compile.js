const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname,'contracts','lottery.sol');
console.log(lotteryPath);
const source = fs.readFileSync(lotteryPath, 'utf8');

console.log(solc.compile(source).contracts);
module.exports = solc.compile(source).contracts[':Lottery'];


// var solcInput = {
//     language: "Solidity",
//     sources: { 
//         contract: {
//             content: source
//         }
//      },
//     settings: {
//         optimizer: {
//             enabled: true
//         },
//         evmVersion: "byzantium",
//         outputSelection: {
//             "*": {
//               "": [
//                 "legacyAST",
//                 "ast"
//               ],
//               "*": [
//                 "abi",
//                 "evm.bytecode.object",
//                 "evm.bytecode.sourceMap",
//                 "evm.deployedBytecode.object",
//                 "evm.deployedBytecode.sourceMap",
//                 "evm.gasEstimates"
//               ]
//             },
//         }
//     }
// };

// solcInput = JSON.stringify(solcInput);
// var contractObject = solc.compile(solcInput);
// contractObject = JSON.parse(contractObject);
// console.log(contractObject);

 