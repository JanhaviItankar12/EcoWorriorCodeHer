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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex flex-col">
      {/* Header with profile avatar */}
      <main className="flex-grow">
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
            <button className="flex items-center space-x-2 focus:outline-none">
              <span className="hidden md:block text-sm font-medium">My Profile</span>
              <div className="h-10 w-10 rounded-full bg-white p-1 overflow-hidden ring-2 ring-white">
                <img src="/api/placeholder/100/100" alt="User avatar" className="h-full w-full object-cover rounded-full" />
              </div>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-green-100 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
              <a href={`/userProfile/${userId}`} className="block px-4 py-2 text-green-800 hover:bg-green-50 text-sm">View Profile</a>
              <a href="/" onClick={(e) => {
                e.preventDefault(); // Stop default navigation
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                if (!localStorage.removeItem("token")) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">

  {/*  Game Card */}
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-sm w-full mx-auto border border-green-200">
    <div className="relative">
      <img src="/images/recycling-game.jpg" alt="Recycling Game" className="w-full h-56 object-cover" />
      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
        ECO GAME
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-green-800 mb-2">Recycling Game</h3>
      <p className="text-green-700 text-base mb-4">Learn how to sort waste into the correct bins and save the planet!</p>
      <button 
        onClick={() => navigate(`/recycling-Home/${userId}`)} 
        className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.586-2.65A1 1 0 009 9.342v5.316a1 1 0 001.166.974l4.586-1.05a1 1 0 00.752-.974v-1.49a1 1 0 00-.752-.95z" />
        </svg>
        Play Now
      </button>
    </div>
  </div>

  {/* Clean City Game Card */}
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-sm w-full mx-auto border border-green-200">
    <div className="relative">
      <img src="/images/clean-city.jpg" alt="Clean City Game" className="w-full h-56 object-cover" />
      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
        ECO GAME
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-green-800 mb-2">Energy Conservation</h3>
      <p className="text-green-700 text-base mb-4">Conserve Energy</p>
      <button 
        onClick={() => navigate(`/conserve-energy/${userId}`)} 
        className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.586-2.65A1 1 0 009 9.342v5.316a1 1 0 001.166.974l4.586-1.05a1 1 0 00.752-.974v-1.49a1 1 0 00-.752-.95z" />
        </svg>
        Play Now
      </button>
    </div>
  </div>

</div>

      </main> {/* Corrected JSX closing tag */}
      </main>
      
      <Footer /> {/* Adding Footer component if needed */}
    </div>
  );
};

export default GamesPage;
