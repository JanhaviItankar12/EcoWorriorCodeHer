import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialMap = [
  ["_", "_", "A", "_", "X"],
  ["_", "X", "_", "_", "_"],
  ["P", "_", "X", "_", "S"],
  ["_", "_", "_", "A", "_"],
  ["_", "X", "_", "_", "_"],
];

const WildlifeRescue = () => {
  const [map, setMap] = useState(initialMap);
  const [playerPos, setPlayerPos] = useState({ row: 2, col: 0 });
  const [rescued, setRescued] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      let { row, col } = playerPos;
      let newRow = row;
      let newCol = col;

      if (["ArrowUp", "w", "W"].includes(e.key)) newRow--;
      else if (["ArrowDown", "s", "S"].includes(e.key)) newRow++;
      else if (["ArrowLeft", "a", "A"].includes(e.key)) newCol--;
      else if (["ArrowRight", "d", "D"].includes(e.key)) newCol++;

      if (
        newRow >= 0 &&
        newRow < map.length &&
        newCol >= 0 &&
        newCol < map[0].length &&
        map[newRow][newCol] !== "X"
      ) {
        const newMap = map.map((r) => [...r]);

        if (map[newRow][newCol] === "A") {
          setRescued((r) => r + 1);
          alert("🦜 Animal Rescued!");
        }

        if (map[newRow][newCol] === "S") {
          setRescued((r) => r + 1);
        }

        newMap[row][col] = "_";
        newMap[newRow][newCol] = "P";

        setMap(newMap);
        setPlayerPos({ row: newRow, col: newCol });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos, map]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <button 
        onClick={() => navigate(-1)}
        className="self-start mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-lg"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-4 text-green-800">🦜 Wildlife Rescue Mission</h1>
      <p className="text-2xl text-gray-700 mb-8">Animals Rescued: <span className="font-bold text-green-600">{rescued}</span></p>

      <div className="grid grid-cols-5 gap-2 mb-8">
        {map.flat().map((cell, index) => {
          const styles = {
            P: "bg-blue-500 text-white",
            A: "bg-yellow-300 animate-pulse",
            S: "bg-green-300",
            X: "bg-red-600 text-white",
            _: "bg-white",
          };

          const icons = {
            P: "🐾",
            A: "🦜",
            S: "🏡",
            X: "🔥",
            _: "",
          };

          const iconSize = {
            P: "text-4xl",
            A: "text-4xl",
            S: "text-4xl",
            X: "text-3xl",
            _: "",
          };

          return (
            <div
              key={index}
              className={`w-20 h-20 flex items-center justify-center border-2 border-gray-300 font-bold rounded-lg ${styles[cell]} ${iconSize[cell]}`}
            >
              {icons[cell]}
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-700">How to Play</h2>
        <ul className="space-y-2 text-lg">
          <li className="flex items-center">
            <span className="mr-2">🐾</span> You (move with WASD/Arrows)
          </li>
          <li className="flex items-center">
            <span className="mr-2">🦜</span> Rescue animals (1 point)
          </li>
          <li className="flex items-center">
            <span className="mr-2">🏡</span> Shelter (1 point)
          </li>
          <li className="flex items-center">
            <span className="mr-2">🔥</span> Avoid fires (X)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WildlifeRescue;