import React from "react";

const Piece = ({ type, color }) => {
  const symbols = {
    pawn: "♙",
    rook: "♖",
    knight: "♘",
    bishop: "♗",
    queen: "♕",
    king: "♔",
  };

  return (
    <span className={`text-3xl ${color === "black" ? "text-black" : "text-white"}`}>
      {symbols[type]}
    </span>
  );
};

export default Piece;