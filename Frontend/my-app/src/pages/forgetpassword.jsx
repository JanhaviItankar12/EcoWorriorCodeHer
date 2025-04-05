import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/api/auth/forgot-password", { email });
      alert(response.data.message);
      navigate(`/resetPassword/${response.data.token}`); // Redirect after success
  } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
  }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700">Forgot Password</h2>
        <p className="text-gray-600 mt-2">Enter your email to reset your password.</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Send Reset Link
          </button>
        </form>

        <a href="/login" className="block mt-4 text-green-600 hover:underline">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
