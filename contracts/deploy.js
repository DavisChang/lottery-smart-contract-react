const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
  'carpet atom flag hub shine unlock resist misery short plastic goat rose',
  'https://rinkeby.infura.io/v3/9428e1df1bdd468e9c748fdf057ebbf9'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('deploy account[0]:', accounts[0])

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] })


  console.log('Contract deployed to:', result.options.address)
  provider.engine.stop()
}

deploy()