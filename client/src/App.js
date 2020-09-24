import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Home from './views/Home';
import Games from './views/Games';
import Board from './views/Board';

function App() {
  return (
    <div className="container">
      <Router>
        <Home path="/"/>
        <Games path="/games"/>
        <Board path="/games/:id"/>
      </Router>
    </div>
  );
}

export default App;
