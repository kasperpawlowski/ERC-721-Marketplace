import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ethers} from 'ethers';
import axios from 'axios';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Marketplace from './components/Marketplace';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const BACKEND_API_URL = endpoint => `http://127.0.0.1:3001/${endpoint}`;
  const LOCALHOST_NODE_URL = 'http://127.0.0.1:8545';
  const provider = new ethers.providers.StaticJsonRpcProvider({url: LOCALHOST_NODE_URL});
  const [address, setAddress] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios.get(BACKEND_API_URL('getcontract')).then(result => {
      if(!result.data.success) {
        alert('Contract address undefined');
        return;
      }

      setAddress(result.data.address);
    }).catch(_ => console.log('Backend server unavailable: getcontract'));

    axios.get(BACKEND_API_URL('metadatacount')).then(async result => {
      setCounter(result.data.count);
    }).catch(_ => console.log('Backend server unavailable: metadatacount'));
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes >
        <Route path='/' element={<Home provider={provider} address={address} counter={counter} />} exact />
        <Route path='/marketplace' element={<Marketplace provider={provider} address={address} counter={counter} />} />
        <Route render={function () {
          return <p>Not found</p>
        }} />
      </Routes>
    </div>
  );
}

export default App;
