import { useEffect, useState } from "react";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Square({ value, onClick }) {
  return (
    <button
      className="w-24 h-24 border border-gray-400 text-3xl font-bold flex items-center justify-center hover:bg-gray-100"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [robotSymbol, setRobotSymbol] = useState(null);
  const [winningSymbol, setWinningSymbol] = useState(null);
  const [round, setRound] = useState(0);

  const cornerIndices = [0, 2, 6, 8];

  // Check for winner after every move
  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinningSymbol(result);
    }
  }, [squares]);

  // Trigger AI move after player
  useEffect(() => {
    if (!playerSymbol || !robotSymbol || winningSymbol) return;

    const playerMoves = squares.filter((s) => s === playerSymbol).length;
    const robotMoves = squares.filter((s) => s === robotSymbol).length;

    if (playerMoves > robotMoves) {
      const timer = setTimeout(() => {
        // check again just before making the move
        if (!winningSymbol) aiMove();
      }, 300);

      return () => clearTimeout(timer); // clean up if effect runs again
    }
  }, [squares, winningSymbol]);

  function handleClick(i) {
    if (!playerSymbol || squares[i] || winningSymbol) return;
    const next = [...squares];
    next[i] = playerSymbol;
    setSquares(next);
  }

  function findWinningMove(squares, symbol) {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      let count = 0;
      let emptyIndex = null;

      [a, b, c].forEach((index) => {
        if (squares[index] === symbol) count++;
        if (squares[index] === null) emptyIndex = index;
      });

      if (count === 2 && emptyIndex !== null) return emptyIndex;
    }
    return null;
  }

  function aiMove() {
    const emptyIndices = squares
      .map((s, i) => (s === null ? i : null))
      .filter((i) => i !== null);

    if (emptyIndices.length === 0 || winningSymbol) return;

    // Take a corner in first round if available
    if (round < 1) {
      const availableCorners = cornerIndices.filter((i) =>
        emptyIndices.includes(i)
      );
      if (availableCorners.length > 0) {
        const randomCorner =
          availableCorners[Math.floor(Math.random() * availableCorners.length)];
        const newSquares = [...squares];
        newSquares[randomCorner] = robotSymbol;
        setSquares(newSquares);
        setRound((r) => r + 1);
        return;
      }
    }

    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;

      const emptySquares = [];
      let playerCount = 0;
      let robotCount = 0;

      [a, b, c].forEach((index) => {
        if (squares[index] === playerSymbol) playerCount++;
        if (squares[index] === robotSymbol) robotCount++;
        if (squares[index] === null) emptySquares.push(index);
      });

      // Can the robot win? Take the winning move Else block the player
      const winIndex = findWinningMove(squares, robotSymbol);
      if (winIndex !== null) {
        const newSquares = [...squares];
        newSquares[winIndex] = robotSymbol;
        setSquares(newSquares);
        setRound((r) => r + 1);
        return;
      }

      // Block player
      const blockIndex = findWinningMove(squares, playerSymbol);
      if (blockIndex !== null) {
        const newSquares = [...squares];
        newSquares[blockIndex] = robotSymbol;
        setSquares(newSquares);
        setRound((r) => r + 1);
        return;
      }
    }

    // if no one is about to win or is any danger of just pick a random index
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newSquares = [...squares];
    newSquares[randomIndex] = robotSymbol;
    setSquares(newSquares);
    setRound((r) => r + 1);
  }

  function restartGame() {
    window.location.reload();
  }

  function startGame() {
    const random = Math.random() < 0.5;
    setPlayerSymbol(random ? "X" : "O");
    setRobotSymbol(random ? "O" : "X");
  }

  const status = !playerSymbol
    ? "Choose your symbol to start"
    : winningSymbol
    ? `Winner: ${winningSymbol}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Playing as: ${playerSymbol}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Tic Tac Toe</h1>

      {!playerSymbol && (
        <button
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={startGame}
        >
          Start The Game
        </button>
      )}

      <Board squares={squares} onClick={handleClick} />
      <p className="mt-4 text-lg font-medium">{status}</p>
      <button
        onClick={restartGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Restart
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  for (let combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
