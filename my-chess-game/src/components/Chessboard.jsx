import React, { useState } from "react";
import Square from "./Square";
import Piece from "./Piece";

const initialBoard = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
];

const Chessboard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selectedPiece) {
      const newBoard = board.map((r) => [...r]);
      newBoard[selectedPiece.row][selectedPiece.col] = null;
      newBoard[row][col] = selectedPiece.type;
      setBoard(newBoard);
      setSelectedPiece(null);
    } else if (board[row][col]) {
      setSelectedPiece({ row, col, type: board[row][col] });
    }
  };

  return (
    <div className="grid grid-cols-8 w-64 h-64 border">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            isDark={(rowIndex + colIndex) % 2 === 1}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && (
              <Piece
                type={piece}
                color={rowIndex < 2 ? "black" : "white"}
              />
            )}
          </Square>
        ))
      )}
    </div>
  );
};

export default Chessboard;