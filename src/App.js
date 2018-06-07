import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './pages/header';
import TeamTable from './pages/teamtable';
class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Header/>
       <TeamTable/>
      </div>
    );
  }
}

export default App;
