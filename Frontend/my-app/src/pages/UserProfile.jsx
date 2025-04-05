import { Leaf, User, Mail, Edit } from "lucide-react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";

export default function ProfilePage() {
    const { userId } = useParams(); // Extract userId from the route
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showOptions, setShowOptions] = useState(false);

    const navigate=useNavigate();
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/profile/${userId}`);
          setUser(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };
  
      
        fetchUserData();
      
    }, [userId]);

    // ✅ Show loading state until user data is fetched
  if (loading) {
    return <div className="text-center text-gray-600">Loading Profile...</div>;
  }
  
    if (!user) {
      return <div className="text-center mt-10">User not found...</div>;
    }
  
  

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 relative">
        <div className="flex flex-col items-center text-center">
          <div
            className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mb-4 cursor-pointer relative"
            onClick={() => setShowOptions(!showOptions)}
          >
            {user.name ? (
              <span className="text-3xl font-bold text-green-600">
                {user.name[0]}
              </span>
            ) : (
              <User className="w-12 h-12 text-green-600" />
            )}
          </div>
          {showOptions && (
            <div className="absolute top-28 bg-white shadow-lg rounded-md p-2 w-40">
              <button className="w-full text-left p-2 hover:bg-green-100 text-sm">Change Avatar</button>
            
            </div>
          )}
          <h2 className="text-xl font-bold text-green-800">{user.name}</h2>
          <p className="text-lg text-gray-500 flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-400" /> {user.email}
          </p>
          <p className="mt-2 text-green-600 font-semibold flex items-center gap-1">
            <Leaf className="w-5 h-5 text-green-500" /> {user.bio}
          </p>
        </div>

        {/* <div className="mt-6">
          <p className="text-sm font-medium text-gray-600">Progress</p>
          <div className="w-full bg-green-200 h-3 rounded-full mt-2">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${user.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-green-700">Recent Activities</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {user.activities.map((activity, index) => (
              <li key={index} className="bg-green-100 p-2 rounded-md">{activity}</li>
            ))}
          </ul>
        </div> */}

        <div className="mt-6 flex justify-center">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-700" onClick={() => navigate(`/edit/${userId}`)} >
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>
    </div>
    </>
  );
}