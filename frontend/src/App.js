import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

function App() {
  const [yourAccount, setYourAccount] = useState('');
  const [todoListState, setTodoListState] = useState();
  const [taskCountState, setTaskCountState] = useState();
  const [taskState, setTaskState] = useState([]);

  useEffect(() => {
    loadBlockchainData();
  }, [])

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")

    // getNetworkType() is used to identify if you're working with main or private
    // main => from MetaMask that connects to the main Ethereum network
    // private => from your localhost e.g. Ganache
    // const network = await web3.eth.net.getNetworkType();

    // if getAccounts() returns null, you need to call requestAccounts() first to initiate permission.
    const accounts = await web3.eth.getAccounts();
    setYourAccount(accounts[0]);

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    setTodoListState(todoList);

    const taskCount = await todoList.methods.taskCount().call();
    setTaskCountState(taskCount);

    for (let i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call();
      setTaskState(prevState => [...prevState, task]);
    }
  }

  return (
    <div className='App'>
      <h1>Hello Web3</h1>
      <p>Your address: {yourAccount}</p>
      <p>Task count: {taskCountState}</p>

      {(taskState || []).map((task, key) => {
        return (
          <div key={key}>
            <label>
              <input type={'checkbox'} />
              <span>{task.content}</span>
            </label>
          </div>
        )
      })}
    </div>
  );
}

export default App;
