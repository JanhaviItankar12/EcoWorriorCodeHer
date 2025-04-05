import { useState } from "react";
import { useNavigate,useParams  } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {token}=useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/api/auth/reset-password/${token}`, { password });
      alert(response.data.message);
      navigate("/login"); // Redirect after success
    } catch (error) {
      console.log(error.message)
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700">Reset Password</h2>
        <p className="text-gray-600 mt-2">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring focus:ring-green-400 mt-2"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Reset Password
          </button>
        </form>

        <a href="/login" className="block mt-4 text-green-600 hover:underline">Back to Login</a>
      </div>
    </div>
  );
};

export default ResetPassword;
