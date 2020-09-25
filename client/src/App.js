import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './views/Home';
import Games from './views/Games';
import Board from './views/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


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
