import React, { useState, useEffect } from 'react';
import Square from './Square';
import { calculateWinner } from './helpers';

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState('Prochain tour : X');

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(winner + ' a gagné !');
    } else if (squares.every((square) => square !== null)) {
      setStatus('Égalité ! Le jeu va recommencer...');
      setTimeout(() => {
        reStart();
      }, 2000);
    } else {
      setStatus('Prochain tour : ' + (xIsNext ? 'X' : 'O'));
    }
  }, [squares, xIsNext]);

  function reStart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('Prochain tour : X');
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className='board'>
      <div>
        <button className='restart' onClick={reStart}>
          Nouvelle partie
        </button>
      </div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default Board;
