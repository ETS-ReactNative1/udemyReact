import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharacterObject from './CharacterObject/CharacterObject';


class App extends Component{
  state = {
    text: ""
  }

 TextChangedHandler = (event) => {
    this.setState({text : event.target.value})

  }

  DeleteCharHandler =  (event,index) => {
    const input = [...this.state.text]
    input.splice(index,1);

    this.setState({text: input.join('')});
  }

  render() {

    let charObjects = null;
    if(this.state.text.length > 0)
    {
      console.log(this.state.text)
      charObjects = this.state.text.split('').map( (inputChar,index) => {
        return <CharacterObject char={inputChar} click={(e) => this.DeleteCharHandler(e,index)}/>
      }) 
      console.log(charObjects)

    }    


    return (
    <div className='App'>
      <input onChange = {e =>this.TextChangedHandler(e)} value={this.state.text}/>
      <ValidationComponent text = {this.state.text}/>
      {charObjects}
    </div>);
  }
}

export default App;
