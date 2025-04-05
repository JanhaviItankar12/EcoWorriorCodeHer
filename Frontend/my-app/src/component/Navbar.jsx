import { Leaf, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom"; // For active states

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {name: "Home", path: "/" },
    {name: "About", path: "/about" },
    {name: "Leaderboard", path: "/leaderboard" } // custom path
    ];

  return (

    
    <nav className="bg-green-700 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-500 via-green-200 to-green-400 shadow-lg py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6">

        {/* Logo & Mobile Menu Button */}
        <div className="w-full lg:w-auto flex justify-between items-center mb-4 lg:mb-0">
          <div className="flex items-center space-x-3">
            {/* Enhanced Leaf Icon */}
            <Leaf
              size={32}
              className="text-green-300 drop-shadow-lg animate-pulse"
            />
            {/* Animated Logo Text */}
            {/* <span className="text-3xl font-extrabold tracking-wider text-white bg-gradient-to-r from-green-400 to-green-200 px-3 py-1 rounded-md shadow-md">
              EcoWarriors
            </span> */}
            <span className="text-4xl font-extrabold tracking-wide text-green-300 bg-green-900 px-4 py-2 rounded-lg shadow-lg ring-2 ring-green-400">
              EcoWarriors
            </span>

          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-green-200 transition duration-300"
          >
            <Menu size={32} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`flex flex-col lg:flex-row gap-4 lg:gap-6 text-white font-medium 
                         ${isMenuOpen ? "block" : "hidden"} lg:flex`}>

       

          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `transition duration-300 px-4 py-2 rounded-lg hover:bg-green-600 ${isActive ? "bg-green-800 text-green-300" : ""
                }`
              }
            >
              {name}
            </NavLink>
          ))}

          {/* Call-to-Action Buttons */}
          <div className="flex space-x-3">
            <NavLink to="/signup" className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-100 transition-all duration-300 shadow-md hover:shadow-xl">
              Signup
            </NavLink>
            <NavLink to="/login" className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-100 transition-all duration-300 shadow-md hover:shadow-xl">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
