import React from 'react';

function Square({ value, onSquareClick, isWinning = false }) {
  return (
    <button
      className={`square ${isWinning ? 'square--winner' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
