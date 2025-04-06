// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react"; // Password toggle icons

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     bio: "",
//   });

//   const navigate=useNavigate();

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: null });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
    
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setIsSubmitting(true);

//     try {
//       const response=await axios.post("http://localhost:3001/api/auth/signup", formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       alert("Signup Successful! 🌱");
//       console.log("API Response:", response);
//       if (response.data && response.data.userId) {
//         navigate(`/allGame/${response.data.userId}`); // Navigate with userId
//       }
//     } catch (error) {
//       console.error(error.response.data);
//       alert(error.response.data.message || "Signup Failed!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-4">
//       <div className="max-w-md w-full bg-white text-gray-900 p-8 rounded-xl shadow-lg">
//         <h2 className="text-4xl font-extrabold text-green-700 text-center">Join EcoWarriors 🌍</h2>
//         <p className="text-center text-gray-600 mt-2">Create an account and take action for a greener planet!</p>

//         <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block font-medium">Full Name</label>
//             <input 
//               name="name" 
//               type="text" 
//               value={formData.name} 
//               onChange={handleChange} 
//               placeholder="Your Name" 
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//           </div>

//           <div>
//             <label className="block font-medium">Email Address</label>
//             <input 
//               name="email" 
//               type="email" 
//               value={formData.email} 
//               onChange={handleChange} 
//               placeholder="you@example.com" 
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>

//           {/* Password Fields */}
//           {["password", "confirmPassword"].map((field, index) => (
//             <div key={index}>
//               <label className="block font-medium">{field === "password" ? "Password" : "Confirm Password"}</label>
//               <div className="relative">
//                 <input 
//                   name={field} 
//                   type={field === "password" ? (showPassword ? "text" : "password") : (showConfirmPassword ? "text" : "password")} 
//                   value={formData[field]} 
//                   onChange={handleChange} 
//                   placeholder={field === "password" ? "Enter your password" : "Confirm your password"} 
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
//                 />
//                 <button 
//                   type="button" 
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2" 
//                   onClick={() => field === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {field === "password" ? (showPassword ? <EyeOff size={20} /> : <Eye size={20} />) : (showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />)}
//                 </button>
//               </div>
//               {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//             </div>
//           ))}

//           {/* Bio Input Field */}
//           <div>
//             <label className="block font-medium">Bio</label>
//             <textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               placeholder="Tell us something about yourself..."
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
//               rows="3"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             className="w-full bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white py-3 rounded-lg hover:scale-105 transition font-bold" 
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Signing up..." : "Sign Up 🚀"}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/login" className="text-green-600 underline">Login</a></p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../component/Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Signup Successful! 🌱");
      if (response.data?.userId) {
        navigate(`/allGame/${response.data.userId}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-2xl text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-green-800 mb-2">Create Your Account</h2>
        <p className="text-gray-600 mb-6">Join EcoWarriors to protect the planet 🌍</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself..."
            className="w-full p-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-green-700 hover:underline">Login here</a>
        </p>
      </div>
    </div>
    </>
  );
};

export default Signup;

