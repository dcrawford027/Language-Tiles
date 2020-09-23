import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './views/Home';
import Games from './views/Games';
import Board from './views/Board';
import Chat from './components/Chat/Chat';

function App() {
  return (
    // <div className="container">
    //   <Router>
    //     <Home path="/"/>
    //     <Games path="/games"/>
    //     <Board path="/games/:id"/>
    //   </Router>
    // </div>
    <div className="App">
    <Chat />
  </div>
  );
}

export default App;
