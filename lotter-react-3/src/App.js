import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';



class App extends Component{

  // constructor(props){
  //   super(props);

  //   this.state ={
  //     manager: null
  //   };
  // }
  // // Refactoring of contructor  to below 
  state={
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  };  

 // Here component did mount is a default method for react. 
  async componentDidMount(){
   const manager = await lottery.methods.manager().call();
   const players = await lottery.methods.getPlayers().call();
  // const balance = await lottery.methods.getBalance2().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
  console.log(balance);
   console.log('manager:',manager);
   this.setState({manager, players,balance});
  }


mySubmitFunction = async (event) =>{
  event.preventDefault();

  const accounts = await web3.eth.getAccounts();

  this.setState({message:'Waiting on transaction success...'});
try{
  await lottery.methods.entry().send({
    from:accounts[0],
    value: web3.utils.toWei(this.state.value, 'ether')
  });
  this.setState({message: 'You have been entered!'});
}
catch(err){
  const message = 'Transaction failed : ' + err.message;
  console.log(err);
  this.setState({message});
}
}
myOnClick = async (event) =>{
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();
  this.setState({
    message:'Picking a winner'
  });
  try{
    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });
    
  this.setState({message: 'A winner is picked !'});
  }
  catch(err){
    const message = "Transaction failed : " + err.message;
    this.setState({message});
  }
}
// // Major => Calling functions without 
// async check(){ 

//   const acc = await web3.eth.getAccounts();
//   console.log(acc);
//   const check2 =  await lottery.methods.pickWinner().send({
//    from: acc[0]
//  });

// }

  render(){
   // this.check();
    // console.log(web3.version);
  return (
    <div className="App">
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by :-{this.state.manager}</p>
        <hr></hr>
      <h4>Currently, there are total {this.state.players.length} players competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</h4>
      <hr></hr>
      <h3>Want to try your luck??</h3>
      <form onSubmit = {event =>this.mySubmitFunction(event)}>
        <div>
          <label>
            Amount of ether to enter :-
          </label>
          <input value={this.state.value}
          onChange = {event=> this.setState({value: event.target.value})}/>
          <button>Enter</button>
        </div>

      </form>
      <hr/>
      <h1>{this.state.message}</h1>
      </div>
      <br/><br/>
      <hr/>
      <h4 text-align='left'>Ready to pick a winner?</h4>
      <button text-align='left' onClick={event => this.myOnClick(event)}>Pick Winner </button>
      <hr/>
    </div>
  );
  }
}

export default App;
