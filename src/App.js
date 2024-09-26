// App.js
import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Intro from './components/Intro';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  function handleIntroEnd() {
    setShowIntro(false);
  }

  return (
    <div className="App">
      {showIntro ? <Intro onIntroEnd={handleIntroEnd} /> : <Board />}
    </div>
  );
}

export default App;
