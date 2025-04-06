import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const AdminPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order

  const { userId } = useParams();
  const navigate = useNavigate();

  // Fetch players
  const fetchPlayers = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/userDetails/allUser");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Failed to fetch players:", err);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Delete player
  const deletePlayer = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/${id}`, {
          method: "DELETE",
        });

        const result = await res.json();
        if (res.ok) {
          alert(result.message);
          setPlayers(players.filter((player) => player._id !== id));
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error deleting player:", error);
        alert("Something went wrong.");
      }
    }
  };

  // Filter and sort players
  const filteredPlayers = players
    .filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const field = searchTerm.includes("@") ? "email" : "name"; // If searching an email, sort by email
      if (sortOrder === "asc") {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-6 bg-gray-100">
      {/* <h1 className="text-3xl font-bold mb-6 text-green-700">All Players</h1> */}
      <h1 className="text-3xl font-bold mt-24 mb-6 text-green-700">All Players</h1>


      <button
        onClick={() => navigate(`/admin/${userId}`)}
        className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-700 transition"
      >
        ← Back
      </button>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full p-2 border rounded mt-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort Button */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="ml-4 bg-blue-500 text-white mt-5 px-4 py-2 rounded hover:bg-blue-600 transition text-lg"
      >
        Sort ({sortOrder === "asc" ? "⬆️ Ascending" : "⬇️ Descending"})
      </button>

      <div className="overflow-x-auto bg-white rounded shadow p-6 mt-5">
        {filteredPlayers.length === 0 ? (
          <p>No players found.</p>
        ) : (
          <table className="min-w-full text-lg text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player._id} className="border-t">
                  <td className="py-2 px-4">{player.name || "Unnamed"}</td>
                  <td className="py-2 px-4">{player.email}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deletePlayer(player._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </>
  );
};


export default AdminPlayers;
