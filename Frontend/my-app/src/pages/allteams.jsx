import React, { useState } from 'react';

const PlayersDetailsPage = () => {
  // Sample player data - in a real app, this would come from an API
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/api/placeholder/100/100",
      level: 42,
      gamesPlayed: 187,
      winRate: 68,
      favoriteGames: ["Forest Defender", "Climate Heroes"],
      lastActive: "2 hours ago",
      badges: ["Eco Champion", "Top 100", "Beta Tester"]
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      avatar: "/api/placeholder/100/100",
      level: 37,
      gamesPlayed: 143,
      winRate: 72,
      favoriteGames: ["Ocean Cleanup", "Zero Waste"],
      lastActive: "4 hours ago",
      badges: ["Tournament Winner", "Community Leader"]
    },
    {
      id: 3,
      name: "Sam Wilson",
      avatar: "/api/placeholder/100/100",
      level: 25,
      gamesPlayed: 92,
      winRate: 55,
      favoriteGames: ["Wildlife Rescue", "Renewable Quest"],
      lastActive: "1 day ago",
      badges: ["Rising Star"]
    },
    {
      id: 4,
      name: "Priya Sharma",
      avatar: "/api/placeholder/100/100",
      level: 51,
      gamesPlayed: 230,
      winRate: 75,
      favoriteGames: ["Climate Heroes", "Ocean Cleanup", "Forest Defender"],
      lastActive: "Just now",
      badges: ["Grand Master", "Eco Champion", "1 Year Member"]
    },
    {
      id: 5,
      name: "Jordan Lee",
      avatar: "/api/placeholder/100/100",
      level: 19,
      gamesPlayed: 67,
      winRate: 48,
      favoriteGames: ["Zero Waste"],
      lastActive: "3 days ago",
      badges: ["Newcomer"]
    }
  ]);
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('level');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Handle sort change
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  // Filter and sort players
  const filteredPlayers = players
    .filter(player => 
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.favoriteGames.some(game => game.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'level') {
        comparison = a.level - b.level;
      } else if (sortBy === 'gamesPlayed') {
        comparison = a.gamesPlayed - b.gamesPlayed;
      } else if (sortBy === 'winRate') {
        comparison = a.winRate - b.winRate;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h1 className="text-3xl font-bold">EcoWarrior</h1>
          </div>
          
          {/* Profile button */}
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              <span className="hidden md:block text-lg font-medium">Admin Panel</span>
              <div className="h-12 w-12 rounded-full bg-white p-1 overflow-hidden ring-2 ring-white">
                <img 
                  src="/api/placeholder/100/100" 
                  alt="Admin avatar" 
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Registered Players</h2>
          
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative">
              <input
                type="text"
                className="w-full md:w-64 pl-10 pr-4 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Search players or games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-lg text-gray-600">
              <span>Total Players: {players.length}</span>
              <span className="mx-2">|</span>
              <span>Active Today: {players.filter(p => p.lastActive.includes('hour') || p.lastActive === 'Just now').length}</span>
            </div>
          </div>
          
          {/* Players table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden text-lg">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Player</th>
                  <th 
                    className="py-4 px-6 text-left cursor-pointer hover:bg-gray-200 font-semibold"
                    onClick={() => handleSort('level')}
                  >
                    <div className="flex items-center">
                      Level
                      {sortBy === 'level' && (
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-4 px-6 text-left cursor-pointer hover:bg-gray-200 font-semibold"
                    onClick={() => handleSort('gamesPlayed')}
                  >
                    <div className="flex items-center">
                      Games
                      {sortBy === 'gamesPlayed' && (
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="py-4 px-6 text-left cursor-pointer hover:bg-gray-200 font-semibold"
                    onClick={() => handleSort('winRate')}
                  >
                    <div className="flex items-center">
                      Win Rate
                      {sortBy === 'winRate' && (
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'asc' ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Favorite Games</th>
                  <th className="py-4 px-6 text-left font-semibold">Badges</th>
                  <th className="py-4 px-6 text-left font-semibold">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPlayers.map(player => (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img src={player.avatar} alt={player.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-lg">{player.name}</p>
                          <p className="text-sm text-gray-500">ID: {player.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="bg-green-100 text-green-800 text-base font-medium px-3 py-1 rounded-full">
                          Lvl {player.level}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{player.gamesPlayed}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`text-base font-medium px-3 py-1 rounded-full ${
                          player.winRate >= 70 ? 'bg-green-100 text-green-800' : 
                          player.winRate >= 50 ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {player.winRate}%
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {player.favoriteGames.map((game, index) => (
                          <span key={index} className="inline-block bg-gray-100 text-gray-800 text-base px-3 py-1 rounded">
                            {game}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {player.badges.map((badge, index) => (
                          <span key={index} className="inline-block bg-teal-100 text-teal-800 text-base px-3 py-1 rounded">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full mr-2 ${
                          player.lastActive === 'Just now' || player.lastActive.includes('hour') 
                            ? 'bg-green-500' 
                            : player.lastActive.includes('day') && !player.lastActive.includes('days') 
                              ? 'bg-yellow-500' 
                              : 'bg-gray-400'
                        }`}></div>
                        {player.lastActive}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPlayers.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-xl">
              No players match your search criteria
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-green-100 py-4">
        <div className="container mx-auto px-4 text-center text-lg">
          <p>&copy; 2025 EcoWarrior Games. Admin Dashboard.</p>
        </div>
      </footer>
    </div>
  );
};

export default PlayersDetailsPage;