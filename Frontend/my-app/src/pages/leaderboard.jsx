import { useState } from "react";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const EcoWarriorsGamePreview = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameFilter, setGameFilter] = useState("All Games"); // Updated to game filtering

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/profile/leaderboard");
        console.log(response);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique games
  const allGames = ["All Games", ...new Set(users.map((user) => user.game))];

  // Filter users based on game
  const filteredUsers =
    gameFilter === "All Games" ? users : users.filter((user) => user.game === gameFilter);

  // **Sort users by score (Descending order)**
  const sortedUsers = filteredUsers.sort((a, b) => b.score - a.score);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-green-500 animate-spin" />
          <p className="mt-4 text-gray-400">Loading EcoWarriors data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-xl border border-red-500 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 font-sans">
      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 shadow-2xl rounded-xl overflow-hidden border border-green-500">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-900 to-blue-900 pt-8 pb-6 px-8">
              <h1 className="text-3xl font-bold text-green-300">🏆 Top EcoWarriors Scorers</h1>
              <p className="text-green-400 mt-2">Best performers in different eco-friendly games</p>

              {/* Game Filter */}
              <div className="mt-4">
                <label className="text-green-400 block mb-1">Filter by Game:</label>
                <select
                  className="w-full bg-gray-700 border border-green-400 text-green-300 px-4 py-2 rounded-lg"
                  value={gameFilter}
                  onChange={(e) => setGameFilter(e.target.value)}
                >
                  {allGames.map((game, index) => (
                    <option key={index} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="p-6">
              {sortedUsers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No players found for the selected game</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-6 text-left font-semibold text-sm text-green-400">Player</th>
                        <th className="py-3 px-6 text-left font-semibold text-sm text-green-400">Game</th>
                        <th className="py-3 px-6 text-right font-semibold text-sm text-green-400">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedUsers.map((user, index) => (
                        <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                          {/* Player Name */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 flex items-center justify-center bg-gray-900 text-white font-medium rounded-full border border-green-400">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-medium text-gray-200">{user.name}</span>
                              </div>
                            </div>
                          </td>

                          {/* Game */}
                          <td className="py-4 px-6">
                            <span className="text-green-300 text-sm">{user.game}</span>
                          </td>

                          {/* Score */}
                          <td className="py-4 px-6 text-right">
                            <span className="font-bold text-yellow-400">{user.score}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EcoWarriorsGamePreview;
