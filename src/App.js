import React, { Component } from 'react';
import './App.css';
import Userlist from './components/userlist.js';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Userlist></Userlist>
      </div>
    );
  }
}

export default App;
