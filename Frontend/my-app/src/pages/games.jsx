import React from 'react';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";



const GamesPage = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  // Sample eco-themed game data
  const games = [
    { id: 1, name: "Recycling", imageUrl: "/api/placeholder/300/200", eco: "Recycle the waste" },
    { id: 2, name: "Ocean Cleanup", imageUrl: "/api/placeholder/300/200", eco: "Protect marine life" },
    { id: 3, name: "Climate Heroes", imageUrl: "/api/placeholder/300/200", eco: "Fight climate change" },
    { id: 4, name: "Wildlife Rescue", imageUrl: "/api/placeholder/300/200", eco: "Save endangered species" },
    { id: 5, name: "Renewable Quest", imageUrl: "/api/placeholder/300/200", eco: "Build clean energy" },
    { id: 6, name: "Zero Waste", imageUrl: "/api/placeholder/300/200", eco: "Reduce plastic pollution" }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header with profile avatar */}
      <header className="bg-gradient-to-r from-green-600 to-teal-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h1 className="text-2xl font-bold">EcoWarrior</h1>
          </div>

          {/* Profile button */}
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none" >
              <span className="hidden md:block text-sm font-medium">My Profile</span>
              <div className="h-10 w-10 rounded-full bg-white p-1 overflow-hidden ring-2 ring-white">
                <img
                  src="/api/placeholder/100/100"
                  alt="User avatar"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-green-100 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
              <a href={`/userProfile/${userId}`} className="block px-4 py-2 text-green-800 hover:bg-green-50 text-sm">View Profile</a>

             
              <a href="/" onClick={(e) => {
                e.preventDefault(); // Stop default navigation
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                
                if(!localStorage.removeItem("token")){
                navigate("/"); // Proper redirection
                }
              }} className="block px-4 py-2 text-green-800 hover:bg-green-50 text-sm">Logout</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-green-800">Eco Games</h2>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your Impact: 243 Trees Saved
          </div>
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-xs mx-auto w-full border border-green-100">
              <div className="relative">
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-lg opacity-90">
                  ECO GAME
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-1">{game.name}</h3>
                <p className="text-green-600 text-sm mb-3">{game.eco}</p>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center" onClick={()=>navigate(`/recycling-Home/${userId}`)}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      

    </div>
  );
};

export default GamesPage;