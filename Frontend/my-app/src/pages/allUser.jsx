import React, { useState, useEffect } from "react";
import { Leaf, User, Search } from "lucide-react";
import Navbar from "../component/Navbar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/userDetails/allUser");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Navbar/>
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-green-300 text-gray-900 font-sans">
      
      

      {/* Main Content */}
      {/* <main className="flex-grow flex flex-col items-center p-6 w-full max-w-5xl mx-auto animate-fade-in">
        <h2 className="flex items-center gap-2 text-4xl font-extrabold text-green-800 mb-6">
          <Leaf className="text-green-600 animate-pulse" /> EcoWarriors Players
        </h2> */}
        <main className="flex-grow flex flex-col items-center py-20 px-16 w-full max-w-5xl mx-auto animate-fade-in">
      <h2 className="flex items-center gap-2 text-4xl font-extrabold text-green-800 mb-6">
    <Leaf className="text-green-600 animate-pulse" /> EcoWarriors Players
     </h2>



        {/* Search Input */}
        <div className="mb-6 flex items-center bg-white border border-green-300 rounded-full px-4 py-2 w-full shadow-lg">
          <Search className="text-green-600 mr-3" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent outline-none w-full text-green-900 placeholder-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Users Table */}
        <div className="w-full bg-white rounded-3xl shadow-2xl border border-green-500 overflow-hidden">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-green-500 bg-green-800">
                <th className="py-3 px-6 text-white text-lg">Player</th>
                <th className="py-3 px-6 text-white text-lg">Email</th>
                <th className="py-3 px-6 text-white text-lg">Eco Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-green-200 hover:bg-green-100 transition duration-300">
                    <td className="py-4 px-6 flex items-center gap-2 text-green-900">
                      <User className="text-green-500" /> {user.name}
                    </td>
                    <td className="py-4 px-6 text-green-800">{user.email}</td>
                    <td className="py-4 px-6 flex items-center gap-2 text-yellow-600">
                      <Leaf className="text-green-500" /> {user.score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-green-700">
                    No eco-heroes found. Try a different search!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-900 to-blue-900 text-center py-4 text-green-300 border-t border-green-700 animate-fade-in-up">
        <p>&copy; 2025 EcoWarriors. All Rights Reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default AllUsers;


