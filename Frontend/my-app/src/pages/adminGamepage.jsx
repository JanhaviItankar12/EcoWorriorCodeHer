import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GamePage = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState([
    { id: 1, title: 'Clean City', description: 'Sort trash correctly' },
    { id: 2, title: 'Recycle Run', description: 'Collect recyclables' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  const handleAddGame = (e) => {
    e.preventDefault();
    if (newGame.title.trim() && newGame.description.trim()) {
      const newGameEntry = {
        id: Date.now(),
        title: newGame.title,
        description: newGame.description,
      };
      setGames([...games, newGameEntry]);
      setNewGame({ title: '', description: '' });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    const filteredGames = games.filter((game) => game.id !== id);
    setGames(filteredGames);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Games</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            🔙 Back
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Close Form' : '+ Add Game'}
          </button>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {games.map((game) => (
          <div key={game.id} className="bg-white p-4 rounded shadow hover:shadow-lg relative">
            <h2 className="text-xl font-semibold text-blue-700">{game.title}</h2>
            <p className="text-gray-600 mt-2">{game.description}</p>
            <button
              onClick={() => handleDelete(game.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Add Game Form */}
      {showForm && (
        <form
          onSubmit={handleAddGame}
          className="bg-white p-6 rounded shadow max-w-xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Add New Game</h2>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Game Title</label>
            <input
              type="text"
              name="title"
              value={newGame.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter game title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Game Description</label>
            <textarea
              name="description"
              value={newGame.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter game description"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default GamePage;

