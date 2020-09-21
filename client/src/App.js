import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Home from './views/Home';

function App() {
  return (
    <div className="container">
      <Router>
        <Home path="/"/>
      </Router>
    </div>
  );
}

export default App;
