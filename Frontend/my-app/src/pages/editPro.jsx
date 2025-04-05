import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const {userId} =useParams();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch current user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "", // Password shouldn't be pre-filled
          bio: response.data.bio || "",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Only send fields that have changed
      const updateData = {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
      };

      // Only include password if it's been entered
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await axios.put(
        `http://localhost:3001/api/profile/edit/${userId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage("Profile updated successfully! ✅");
      setTimeout(() =>{ setSuccessMessage("");
        navigate(`/userProfile/${userId}`) },3000);

      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Update failed:", error.response?.data);
      alert(error.response?.data?.message || "Profile update failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-4">
      <div className="max-w-md w-full bg-white text-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-green-700 text-center">Edit Your Profile ✏️</h2>
        <p className="text-center text-gray-600 mt-2">Update your information below</p>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Full Name</label>
            <input 
              name="name" 
              type="text" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Your Name" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium">Email Address</label>
            <input 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="you@example.com" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium">New Password (leave blank to keep current)</label>
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Enter new password" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
              <button 
                type="button" 
                className="absolute top-1/2 right-3 transform -translate-y-1/2" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us something about yourself..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              rows="3"
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white py-3 rounded-lg hover:scale-105 transition font-bold" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes 💾"}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:scale-105 transition font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;