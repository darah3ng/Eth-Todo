import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  const [yourAccount, setYourAccount] = useState();

  useEffect(() => {
    loadBlockchainData();
  }, [])

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")

    // if getAccounts() returns null, you need to call requestAccounts() first to initiate permission.
    const accounts = await web3.eth.getAccounts();
    setYourAccount(accounts[0]);

    // getNetworkType() is used to identify if you're working with main or private
    // main => from MetaMask that connects to the main Ethereum network
    // private => from your localhost e.g. Ganache
    // const network = await web3.eth.net.getNetworkType();
  }

  return (
    <div className="App">
      <h1>Hello Web3</h1>
      Your account is {yourAccount}
    </div>
  );
}

export default App;
