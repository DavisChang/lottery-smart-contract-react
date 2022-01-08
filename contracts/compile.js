const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractFile = 'Lottery.sol'

const contractPath = path.resolve(__dirname, contractFile);
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    contractFile: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts.contractFile.Lottery;

module.exports = output


