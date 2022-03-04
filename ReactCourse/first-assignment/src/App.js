import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
  state = {
    userName: "Default UserName"
  }

  nameChangeHandler = (event) => {
    console.log(event.target.value);
    

    this.setState({
      userName: event.target.value
    });
  }

  render() {
    const style ={
      backgroundColor: 'white',
      font: 'inherit',
      border: '5px solid green',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
    <div className="App">
      <UserInput style={style} textChange={this.nameChangeHandler} default={this.state.userName}/>
      <UserOutput Name={this.state.userName} Hobby="Turkey"/>
      <UserOutput Name={this.state.userName} Hobby="Doing a business"/>
    </div>
    );
  }
}

export default App;
