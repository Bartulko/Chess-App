import React from "react";
import Chessboard from "./components/Chessboard";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-green-500">
      <Chessboard />
    </div>
  );
};

export default App;