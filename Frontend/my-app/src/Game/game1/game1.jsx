import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Game1 = () => {
  const navigate = useNavigate();
  const {userId} =useParams();

  return (
    <div className="w-full h-screen bg-gradient-to-b from-green-900 to-green-800 flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-4">♻ Recycling Game</h1>
      <p className="text-white text-lg mb-8">
        Drag and drop trash items into the correct recycling bins!
      </p>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate(`/recycling-game/${userId}`)}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-green-600"
        >
          Start Game
        </button>
        <button
          onClick={() => navigate(`/allGame/${userId}`)}
          className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-gray-700"
        >
          Back
        </button>
      </div>
      <div className="mt-8 bg-green-900 p-4 rounded-lg text-left">
        <h2 className="text-xl font-bold text-white mb-2">How to Play:</h2>
        <ul className="text-white list-none space-y-2 text-lg">
          <li className="flex items-center"><span className="mr-2">•</span>Drag trash to the correct recycling bin</li>
          <li className="flex items-center"><span className="mr-2">•</span>+10 points for correct bin</li>
          <li className="flex items-center"><span className="mr-2">•</span>-5 points for wrong bin or missed trash</li>
          <li className="flex items-center"><span className="mr-2">•</span>Complete as many sorts as possible in 60 seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default Game1;
