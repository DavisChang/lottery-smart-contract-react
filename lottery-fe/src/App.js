import { useEffect, useState } from 'react'
import './App.css';
import web3 from './utils/web3'
import lottery from './utils/lottery'

function App() {
  console.log('version:', web3.version)
  web3.eth.getAccounts().then(console.log)
  
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')

  const [value, setValue] = useState('')
  const [processing, setProcessing] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    (async () => {
      const manager = await lottery.methods.manager().call()
      const players = await lottery.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(lottery.options.address)
      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    })()
  }, [])

  console.log('manager:', manager)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setMsg('Waiting on transaction success...')
    setProcessing(true)
    try {
      const ether = web3.utils.toWei(value, 'ether')
      const accounts = await web3.eth.getAccounts();
      const result = await lottery.methods.enter().send({
        from: accounts[0],
        value: ether
      })
      console.log('onSubmitHandler:', result)
      setMsg('You have been entered!')
    } catch (err) {
      console.log(err)
      setMsg('Enter gets some error!')
    } finally {
      setProcessing(false)
    }
  }

  const pickWinner = async() => {
    setMsg('Waiting on transaction success...')
    setProcessing(true)
    try {
      const accounts = await web3.eth.getAccounts();
      const result = await lottery.methods.pickWinner().send({
        from: accounts[0],
      })
      console.log('pickWinner:', result)
      setMsg('A winner has been picked!')
    } catch (err) {
      console.log(err)
      setMsg('pickWinner gets some error!')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This Contract is managed by {manager}</p>
      <p>There are current {players.length} people entered, competing to win {web3.utils.fromWei(balance, 'ether')} ether!</p>
      <hr/>
      <form onSubmit={onSubmitHandler}>
        <h2>Want to try your luck?</h2>
        <div>
          <label>Amount of ether to enter</label>
          <input type="text" value={value} onChange={e => setValue(e.target.value)} />
          {
            processing ?
            <button disabled>Processing</button> :
            <button>Enter</button>
          }
        </div>
      </form>
      <hr/>
      <h2>Ready to pick winner?</h2>
        <div>
          {
            processing ?
              <button disabled>Processing</button> :
              <button onClick={pickWinner}>Pick a winner!</button>
          }
        </div>
      <hr/>
      <p>Message: {msg}</p>
    </div>
  );
}

export default App;
