import React from "react";

const Square = ({ isDark, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-16 h-16 flex items-center justify-center cursor-pointer ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      {children}
    </div>
  );
};

export default Square;