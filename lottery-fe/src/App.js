import { useEffect, useState } from 'react'
import './App.css';
import web3 from './utils/web3'
import lottery from './utils/lottery'

function App() {
  console.log('version:', web3.version)
  web3.eth.getAccounts().then(console.log)
  
  const [manager, setManager] = useState('')

  useEffect(() => {
    (async () => {
      const manager = await lottery.methods.manager().call()
      setManager(manager)
    })()
  }, [])

  console.log('manager:', manager)
  return (
    <div className="App">
        <h2>Lottery Contract</h2>
        <p>This Contract is managed by {manager}</p>
    </div>
  );
}

export default App;
