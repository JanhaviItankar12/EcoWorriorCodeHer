import { Gamepad2, Sprout, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-white via-lime-50 to-white text-gray-900 min-h-screen pt-10 pb-20 px-4 md:px-8">
        {/* Hero Section */}
        
        <header className="text-center mt-24 py-20 bg-white/60 backdrop-blur-sm shadow-xl rounded-3xl border border-lime-200 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-lime-700">
    About <span className="text-lime-500">EcoWarriors</span>
  </h1>
  <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
    Join a movement that blends gaming with environmental action. Play, learn, and make a difference!
  </p>
</header>

        



        {/* Mission Section */}
        
        <section className="mt-16 max-w-6xl mx-auto text-center bg-white/60 backdrop-blur-sm py-20 px-12 rounded-3xl shadow-lg border border-lime-100">
  <h2 className="text-3xl font-bold text-lime-700">🌍 Our Mission</h2>
  <p className="mt-4 text-lg text-gray-700">
    EcoWarriors empowers individuals to contribute to real-world environmental efforts through fun and interactive gameplay.
  </p>
</section>


        

        {/* How It Works */}
        <section className="mt-16 max-w-6xl mx-auto bg-white/60 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-lime-100">
          <h2 className="text-3xl font-bold text-center text-lime-700">⚙️ How It Works</h2>
          <div className="mt-10 flex flex-col md:flex-row gap-10 justify-around items-stretch">
            {[
              {
                Icon: Gamepad2,
                title: "Play & Earn",
                desc: "Complete eco-friendly challenges, win points, and level up.",
              },
              {
                Icon: Sprout,
                title: "Make an Impact",
                desc: "Earn rewards that translate into real-world environmental efforts.",
              },
              {
                Icon: Users,
                title: "Join the Community",
                desc: "Connect with like-minded players and build a sustainable future together.",
              },
            ].map(({ Icon, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all w-full text-center border border-lime-100"
              >
                <Icon size={48} className="text-lime-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="mt-2 text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="mt-16 max-w-6xl mx-auto bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-lime-100 text-center">
          <h2 className="text-3xl font-bold text-lime-700">📊 Our Impact So Far</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: "15,000+", label: "Players Making a Difference" },
              { stat: "230+", label: "Trees Planted" },
              { stat: "45+", label: "Conservation Projects Supported" },
              { stat: "$12,000", label: "Funds Raised for Sustainability" },
            ].map(({ stat, label }, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-md transition border border-lime-100"
              >
                <h3 className="text-3xl font-bold text-lime-700">{stat}</h3>
                <p className="mt-2 text-gray-600">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
  <div className="max-w-6xl mx-auto bg-lime-100 text-lime-800 rounded-3xl py-14 px-8 shadow-lg border border-lime-200">
    <h2 className="text-4xl font-bold">✨ Be Part of the Change</h2>
    <p className="mt-4 text-lg text-lime-700">
      Start your journey today and contribute to a greener planet.
    </p>
    <button
      className="mt-8 bg-lime-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-lime-700 transition hover:scale-105"
      onClick={() => navigate("/signup")}
    >
      Join EcoWarriors
    </button>
  </div>
</section>

      </div>
      <Footer />
    </>
  );
};

export default About;

