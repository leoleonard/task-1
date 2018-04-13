import React, { Component } from 'react';
import './App.css';
import Userslist from './components/userlist/userlist';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Userslist></Userslist>
     </div>
    );
  }
}

export default App;
