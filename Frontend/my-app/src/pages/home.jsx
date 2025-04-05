import { ArrowRight, Leaf, Users, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="shadow-md bg-white sticky top-0 z-50 transition-all duration-300" />


      <div className="main-container mt-10 bg-gradient-to-br from-green-100 via-green-200 to-green-100 text-gray-900">
        {/* Hero Section */}
       <div className="hero-section flex flex-col items-center justify-center text-center py-28 px-12 animate-fade-in-up">
  <h1 className="text-5xl font-extrabold leading-tight animate-bounce">
    Join the Fight for a <span className="text-green-700">Greener Planet</span>
  </h1>
  <p className="mt-4 max-w-xl text-lg text-gray-700">
    EcoWarriors lets you take action by playing games and supporting global environmental causes.
  </p>
  <div className="mt-8 flex flex-wrap gap-4 justify-center">
    <button
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-transform transform hover:scale-110 hover:rotate-1"
      onClick={() => navigate("/signup")}
    >
      Start Game <ArrowRight size={20} />
    </button>
    <button
      className="bg-white text-green-700 hover:bg-green-100 px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1"
      onClick={() => navigate("/about")}
    >
      Learn More
    </button>
    <button
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-110 hover:translate-y-1"
      onClick={() => navigate("/allUser")}
    >
      Our Players
    </button>
  </div>
</div>

        

        {/* Features Section */}
        <div className="features-section py-20 px-8 bg-white animate-fade-in">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800 animate-pulse">Why Play EcoWarriors?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="feature-card bg-green-50 hover:bg-green-100 p-8 rounded-2xl shadow-lg text-center transition duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="icon-box bg-green-500 p-4 rounded-full inline-block mb-4 animate-fade-in">
                <Leaf size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-800">Make a Difference</h3>
              <p className="mt-3 text-gray-600">Play to raise awareness for environmental causes and contribute to sustainability efforts.</p>
            </div>

            <div className="feature-card bg-green-50 hover:bg-green-100 p-8 rounded-2xl shadow-lg text-center transition duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="icon-box bg-blue-500 p-4 rounded-full inline-block mb-4 animate-fade-in">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800">Engage with Friends</h3>
              <p className="mt-3 text-gray-600">Join multiplayer missions and team up with friends to achieve shared goals and rewards.</p>
            </div>

            <div className="feature-card bg-green-50 hover:bg-green-100 p-8 rounded-2xl shadow-lg text-center transition duration-300 transform hover:-translate-y-2 hover:shadow-xl">
              <div className="icon-box bg-yellow-500 p-4 rounded-full inline-block mb-4 animate-fade-in">
                <Trophy size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-700">Earn Rewards</h3>
              <p className="mt-3 text-gray-600">Earn badges, trophies, and rewards for your contributions while making a real impact.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section py-20 text-center bg-gradient-to-r from-green-600 to-green-700 text-white animate-fade-in-up">
          <h2 className="text-4xl font-extrabold animate-pulse">Ready to Make an Impact?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Join thousands of players making a difference through gameplay. Start your eco-adventure today!
          </p>
          
          <button
            className="mt-6 bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition-transform transform hover:scale-110 hover:-rotate-1 animate-bounce delay-300"
            onClick={() => navigate("/signup")}
          >
            Join EcoWarriors Now
          </button>
          
          
       
      </div>
      </div>
    

      <Footer />
    </>
  );
};

export default HomePage;
