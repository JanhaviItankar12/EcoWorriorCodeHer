import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TreePlantingGame = () => {
  const [trees, setTrees] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  const handlePlant = () => {
    if (!gameActive) return;
    
    const newTree = {
      id: Date.now(),
      stage: "seed",
    };
    setTrees([...trees, newTree]);
    setScore(prev => prev + 2); // Add 2 points per plant

    // Simulate growth
    setTimeout(() => updateTreeStage(newTree.id, "sprout"), 1000);
    setTimeout(() => updateTreeStage(newTree.id, "tree"), 2000);
  };

  const updateTreeStage = (id, newStage) => {
    setTrees(prev =>
      prev.map(tree => (tree.id === id ? { ...tree, stage: newStage } : tree))
    );
  };

  const resetGame = () => {
    setTrees([]);
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  return (
    <div className="bg-green-50 min-h-screen p-6 flex flex-col items-center">
      <button 
        onClick={() => navigate(-1)}
        className="self-start mb-4 bg-red-300 hover:bg-gray-300 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-green-800 mb-2">🌱 Tree Planting Sprint</h1>
      
      <div className="flex gap-8 mb-6">
        <div className="text-xl font-semibold">
          ⏳ Time: <span className="text-blue-600">{timeLeft}s</span>
        </div>
        <div className="text-xl font-semibold">
          🌳 Score: <span className="text-green-600">{score}</span>
        </div>
      </div>

      <button
        onClick={handlePlant}
        disabled={!gameActive}
        className={`mb-8 px-6 py-3 rounded-full text-lg transition
          ${gameActive 
            ? "bg-green-600 hover:bg-green-700 text-white" 
            : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
      >
        {gameActive ? "Plant a Tree" : "Time's Up!"}
      </button>

      {score >= 100 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-8 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg"
        >
          🎉 Congratulations! You scored {score} points!
        </motion.div>
      )}

      {!gameActive && (
        <button
          onClick={resetGame}
          className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Play Again
        </button>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {trees.map(tree => (
          <motion.div
            key={tree.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-24 h-24 bg-white border-4 border-green-200 rounded-xl flex items-center justify-center shadow-md"
          >
            {tree.stage === "seed" && "🌰"}
            {tree.stage === "sprout" && "🌿"}
            {tree.stage === "tree" && "🌳"}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TreePlantingGame;