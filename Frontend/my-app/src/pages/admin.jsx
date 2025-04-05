import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import { UserCircle, Gamepad2, CalendarCheck2, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });

  const { userId } = useParams();
  const navigate=useNavigate();

  // Fetch admin data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setAdmin({
            name: data.name || "",
            email: data.email || "",
          });
        } else {
          alert("Failed to load admin data");
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchAdmin();
  }, [userId]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: admin.name,
      email: admin.email,
    };

    try {
      const response = await fetch(`http://localhost:3001/api/admin/edit/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 mt-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Profile</h1>

        {/* Profile Card */}
        <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition">
          <div className="flex items-center space-x-6">
            <UserCircle className="w-20 h-20 text-green-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {admin.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Edit Info Form */}
        <div className="mt-10 bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition">
          <h2 className="text-xl font-bold text-green-700">
            Edit Personal Information
          </h2>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-md focus:ring focus:ring-green-400 shadow-sm"
            />
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:ring focus:ring-green-400 shadow-sm"
            />

            <button
              type="submit"
              className="mt-6 bg-green-700 text-white py-3 px-8 rounded-lg hover:bg-green-600 hover:shadow-xl transition text-lg font-semibold"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Quick Access Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
          <a href={`/adminGame/${userId}`} className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow-md transition flex flex-col items-center text-center ">
            <Gamepad2 className="w-10 h-10 text-green-700 mb-2" />
            <span className="text-lg font-semibold text-green-800">Games</span>
          </a>
          <a href="/event-requests" className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow-md transition flex flex-col items-center text-center">
            <CalendarCheck2 className="w-10 h-10 text-green-700 mb-2" />
            <span className="text-lg font-semibold text-green-800">Event Requests</span>
          </a>
          <a href={`/adminPlayers/${userId}`} className="bg-green-100 hover:bg-green-200 p-6 rounded-xl shadow-md transition flex flex-col items-center text-center">
            <Users className="w-10 h-10 text-green-700 mb-2" />
            <span className="text-lg font-semibold text-green-800">Players</span>
          </a>
          <a href="/" onClick={(e) => {
                e.preventDefault(); // Stop default navigation
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                
                if(!localStorage.removeItem("token")){
                navigate("/"); // Proper redirection
                }
              }} className="bg-red-100 hover:bg-red-200 p-6 rounded-xl shadow-md transition flex flex-col items-center text-center">
            <LogOut className="w-10 h-10 text-red-700 mb-2" />
            <span className="text-lg font-semibold text-red-800">Logout</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

