// App.js

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Home page where the user enters the code
import GamePage from './components/GamePage'; // The game page where questions are shown

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:code" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
