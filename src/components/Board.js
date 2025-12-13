import React, { useState, useEffect, useCallback } from 'react';
import Square from './Square';
import { calculateWinner } from './helpers';

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState('Prochain tour : X');
  const [startingPlayer, setStartingPlayer] = useState('X');
  const [gameResult, setGameResult] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scoreboard, setScoreboard] = useState({ X: 0, O: 0, draws: 0 });

  const reStart = useCallback(() => {
    const nextStartingPlayer = startingPlayer === 'X' ? 'O' : 'X';
    setSquares(Array(9).fill(null));
    setXIsNext(nextStartingPlayer === 'X');
    setStartingPlayer(nextStartingPlayer);
    setGameResult(null);
    setWinningLine([]);
    setStatus('Prochain tour : ' + nextStartingPlayer);
  }, [startingPlayer]);

  useEffect(() => {
    const winner = calculateWinner(squares);
    const boardIsFull = squares.every((square) => square !== null);

    if (winner) {
      setWinningLine(winner.line);
      setStatus(winner.player + ' a gagné !');
      if (gameResult !== winner.player) {
        setGameResult(winner.player);
        setScoreboard((prev) => ({ ...prev, [winner.player]: prev[winner.player] + 1 }));
      }
    } else if (boardIsFull) {
      setWinningLine([]);
      setStatus('Égalité ! Une nouvelle partie va recommencer.');
      if (gameResult !== 'draw') {
        setGameResult('draw');
        setScoreboard((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }
      setTimeout(() => {
        reStart();
      }, 1800);
    } else {
      if (gameResult) {
        setGameResult(null);
      }
      setWinningLine([]);
      setStatus('Prochain tour : ' + (xIsNext ? 'X' : 'O'));
    }
  }, [gameResult, reStart, squares, xIsNext]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || gameResult) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className='board'>
      <div className='scoreboard'>
        <div>
          <span className='score-label'>Score X</span>
          <span className='score-value'>{scoreboard.X}</span>
        </div>
        <div>
          <span className='score-label'>Score O</span>
          <span className='score-value'>{scoreboard.O}</span>
        </div>
        <div>
          <span className='score-label'>Égalités</span>
          <span className='score-value'>{scoreboard.draws}</span>
        </div>
      </div>
      <div>
        <button className='restart' onClick={reStart}>
          Nouvelle partie
        </button>
      </div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} isWinning={winningLine.includes(0)} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} isWinning={winningLine.includes(1)} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} isWinning={winningLine.includes(2)} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} isWinning={winningLine.includes(3)} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} isWinning={winningLine.includes(4)} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} isWinning={winningLine.includes(5)} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} isWinning={winningLine.includes(6)} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} isWinning={winningLine.includes(7)} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} isWinning={winningLine.includes(8)} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default Board;
