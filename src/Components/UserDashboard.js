import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";


const UserDashboard= () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const navigate = useNavigate();

  // ✅ Fetch Data (Infinite Scroll)
  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/pets?page=${page}&limit=2000`);
      
      setPets((prevPets) => (page === 1 ? response.data.pets : [...prevPets, ...response.data.pets])); // Reset on first page
  
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
    setLoading(false);
  }, [page]);
  
  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // ✅ Intersection Observer for Infinite Scroll
  const lastPetRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // ✅ Filtered Pets (Optimized)
  const filteredPets = useMemo(
    () =>
      pets.filter(
        (pet) =>
          (pet.Animal_Name || "").toLowerCase().includes(search.toLowerCase()) ||
          (pet.animal_type || "").toLowerCase().includes(search.toLowerCase()) ||
          (pet.City || "").toLowerCase().includes(search.toLowerCase())
      ),
    [search, pets]
  );

  // ✅ Calculate Statistics
  const adoptedPets = filteredPets.filter((pet) => pet.Record_Type === "ADOPTED").length;
  const lostPets = filteredPets.filter((pet) => pet.Record_Type === "FOUND").length;

  // ✅ Memoized Chart Data (Prevents re-renders)
  const chartData = useMemo(
    () => [
      { name: "Total Pets", count: filteredPets.length, fill: "#4caf50" },
      { name: "Adopted", count: adoptedPets, fill: "#2196f3" },
      { name: "Lost", count: lostPets, fill: "#f44336" },
    ],
    [filteredPets, adoptedPets, lostPets]
  );

  return (
    <div className="container mt-4">
        <button
    className="btn btn-outline-secondary btn-sm"
    style={{
      borderRadius: "20px",
      padding: "8px 16px",
      fontWeight: "bold",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
    }}
    onClick={() => navigate("/")}
  >
    ⬅️ Back to Dashboard
  </button>
      <h2 className="text-center mb-4">🐾 Pet Adoption Dashboard 🐾</h2>

      {/* ✅ Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by pet name, type, or city..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ✅ Summary Cards */}
      <div className="row text-center">
        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            <h4>Total Pets</h4>
            <h2>{filteredPets.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-primary text-white p-3">
            <h4>Adopted</h4>
            <h2>{adoptedPets}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-danger text-white p-3">
            <h4>Lost</h4>
            <h2>{lostPets}</h2>
          </div>
        </div>
      </div>

      {/* ✅ Bar Chart */}
      <div className="mt-4">
        <h4 className="text-center">📊 Pet Adoption Statistics</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Pet List with Infinite Scroll */}
      <div className="mt-4">
        <h4 className="text-center">🐶 Pet List</h4>
        <ul className="list-group">
          {filteredPets.map((pet, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              ref={index === filteredPets.length - 1 ? lastPetRef : null} // Attach observer to last item
            >
              <span>{pet.Animal_Name} ({pet.animal_type}) - {pet.City}</span>
              <span className={`badge bg-${pet.Record_Type === "ADOPTED" ? "primary" : "danger"}`}>
                {pet.Record_Type}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Loading Indicator */}
      {loading && <p className="text-center mt-3">🔄 Loading more pets...</p>}
    </div>
  );
};

export default UserDashboard;