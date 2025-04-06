import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("player"); // Default role is player
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new request
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }), // Include role in the request
      });
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        alert(data.message || "Login Failed");
        return;
      }
      
      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("role", role); // Store the selected role
      
      // Redirect based on role
      if (data.user && data.user.id) {
        if (role === "admin") {
          navigate(`/admin/${data.user.id}`);
        } else {
          navigate(`/allGame/${data.user.id}`); // Fixed template literal syntax
        }
      } else {
        console.log("error");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700">Login to EcoWarriors</h2>
        <p className="text-gray-600 mt-2">Enter your credentials to access your account.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-3 border rounded-md focus:ring focus:ring-green-400"
            required
          />
          
          {/* Role selection */}
          <div className="mt-3">
            <p className="text-left text-gray-700 mb-2">Select your role:</p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="player"
                  checked={role === "player"}
                  onChange={() => setRole("player")}
                  className="mr-2"
                />
                <span>Player</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="mr-2"
                />
                <span>Admin</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Login
          </button>
          
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
        <a href="/forgot-password" className="block mt-4 text-green-600 hover:underline">Forgot Password?</a>
        <p className="mt-2 text-gray-600">Don't have an account? <a href="/signup" className="text-green-700 hover:underline">Sign Up</a></p>
      </div>
    </div>
    </>
  );
};

export default Login;