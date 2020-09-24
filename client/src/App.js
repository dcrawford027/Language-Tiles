import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './views/Home';
import Games from './views/Games';
import Board from './views/Board';

function App() {
  return (
    <div className="container">
      <Router>
        <Home path="/"/>
        <Games path="/games"/>
        <Board path="/games/:roomName"/>
      </Router>
    </div>
  );
}

export default App;
