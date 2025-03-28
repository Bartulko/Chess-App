import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function App() { // komenatrz pozdro
  const [game, setGame] = useState(new Chess());
  const [squareStyles, setSquareStyles] = useState({});
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [winner, setWinner] = useState(null); // Przechowuje zwycięzcę gry

  // Pobranie możliwych ruchów dla danej figury
  const getPossibleMoves = (square) => {
    return game.moves({ square, verbose: true }).map((move) => move.to);
  };

  // Obsługa kliknięcia na pole szachownicy (podświetlenie możliwych ruchów)
  const onSquareClick = (square) => {
    if (selectedSquare) {
      makeMove({ from: selectedSquare, to: square, promotion: "q" });
      setSelectedSquare(null);
      setSquareStyles({});
    } else {
      const possibleMoves = getPossibleMoves(square);
      if (possibleMoves.length > 0) {
        const newStyles = {};
        possibleMoves.forEach((move) => {
          newStyles[move] = {
            background: "radial-gradient(circle, rgba(0,255,0,0.6) 20%, transparent 80%)",
            borderRadius: "50%",
          };
        });
        setSquareStyles(newStyles);
        setSelectedSquare(square);
      }
    }
  };

  // Obsługa ruchu figury (przeciąganie i kliknięcie)
  const makeMove = (move) => {
    const newGame = new Chess(game.fen()); 
    const result = newGame.move(move);

    if (result) {
      setGame(newGame);
      setSquareStyles({});
      setSelectedSquare(null);

      // Sprawdzenie, czy ktoś dał mata
      if (newGame.isCheckmate()) {
        setWinner(newGame.turn() === "w" ? "Czarne" : "Białe");
      }
    }
  };

  // Restart gry
  const restartGame = () => {
    setGame(new Chess());
    setWinner(null);
    setSquareStyles({});
    setSelectedSquare(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 relative">
      <h1 className="text-2xl font-bold mb-4">Szachy w React</h1>
      <div className="w-80 h-80 bg-white shadow-lg rounded-lg flex items-center justify-center relative">
        <Chessboard
          position={game.fen()}
          onPieceDrop={(sourceSquare, targetSquare) =>
            makeMove({ from: sourceSquare, to: targetSquare, promotion: "q" })
          }
          onSquareClick={onSquareClick}
          customSquareStyles={squareStyles}
        />
      </div>

      {/* Panel końcowy */}
      {winner && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-60 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{winner} wygrywa!</h2>
          <button
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg"
            onClick={restartGame}
          >
            Restart gry
          </button>
        </div>
      )}
    </div>
  );
}
