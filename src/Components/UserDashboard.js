import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaDog, FaCat, FaSearch, FaHome, FaChartBar } from "react-icons/fa";
import { GiDogBowl, GiCat } from "react-icons/gi";

const UserDashboard = () => {
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
      setPets((prevPets) => (page === 1 ? response.data.pets : [...prevPets, ...response.data.pets]));
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
          setPage((prevPage) => prevPage + 1);
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

  // ✅ Memoized Chart Data with Custom Colors
  const chartData = useMemo(
    () => [
      { name: "Total Pets", count: filteredPets.length, fill: "#9c27b0" },
      { name: "Adopted", count: adoptedPets, fill: "#4caf50" },
      { name: "Lost", count: lostPets, fill: "#f44336" },
    ],
    [filteredPets, adoptedPets, lostPets]
  );

  // Custom colors for pet type badges
  const getPetTypeColor = (type) => {
    const typeColors = {
      DOG: "#2196F3",
      CAT: "#FF9800",
      BIRD: "#9C27B0",
      RABBIT: "#795548",
      default: "#607D8B"
    };
    return typeColors[type?.toUpperCase()] || typeColors.default;
  };

  return (
    <div className="container-fluid min-vh-100" style={{
      background: "linear-gradient(135deg, #f3e5f5, #e1bee7, #ce93d8)",
      padding: "20px",
      position: "relative",
      overflowX: "hidden"
    }}>
      {/* Floating Paws Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M39.5 17c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zm0 18c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm21-18c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zm0 18c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm-42-7c0-6.1-4.9-11-11-11s-11 4.9-11 11 4.9 11 11 11 11-4.9 11-11zm-18 0c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7-7-3.1-7-7zm63-7c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zm0 18c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z\' fill=\'%23ba68c8\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        opacity: 0.3,
        pointerEvents: "none",
        zIndex: 0
      }}></div>

      {/* Content with higher z-index */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Back Button with Animation */}
        <button
          className="btn btn-lg rounded-pill shadow-sm mb-4 d-flex align-items-center"
          style={{
            background: "linear-gradient(135deg, #7b1fa2, #9c27b0)",
            border: "none",
            color: "white",
            transition: "all 0.3s ease",
            padding: "10px 20px",
            fontWeight: "600",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateX(-5px)";
            e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateX(0)";
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
          onClick={() => navigate("/")}
        >
          <FaHome className="me-2" /> Back to Dashboard
        </button>

        {/* Header with Icon */}
        <div className="text-center mb-5">
          <h2 style={{
            color: "#7b1fa2",
            fontWeight: "700",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <FaPaw style={{ color: "#9c27b0" }} /> Paws Adoption Hub <FaPaw style={{ color: "#9c27b0" }} />
          </h2>
          <p className="text-muted">Find your perfect furry companion</p>
        </div>

        {/* Search Bar with Icon */}
        <div className="mb-4 position-relative">
          <div className="input-group">
            <span className="input-group-text" style={{
              background: "linear-gradient(135deg, #7b1fa2, #9c27b0)",
              color: "white",
              border: "none"
            }}>
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by pet name, type, or city..."
              style={{
                border: "none",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={(e) => {
                e.target.style.boxShadow = "0 4px 8px rgba(123, 31, 162, 0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>
        </div>

        {/* Summary Cards with Hover Effects */}
        <div className="row text-center g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm border-0 h-100"
              style={{
                background: "linear-gradient(135deg, #9c27b0, #7b1fa2)",
                color: "white",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px) scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
            >
              <div className="d-flex justify-content-center mb-2">
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaPaw size={24} />
                </div>
              </div>
              <h4>Total Pets</h4>
              <h2 style={{ fontWeight: "700" }}>{filteredPets.length}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm border-0 h-100"
              style={{
                background: "linear-gradient(135deg, #4caf50, #2e7d32)",
                color: "white",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px) scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
            >
              <div className="d-flex justify-content-center mb-2">
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaDog size={24} />
                </div>
              </div>
              <h4>Adopted</h4>
              <h2 style={{ fontWeight: "700" }}>{adoptedPets}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm border-0 h-100"
              style={{
                background: "linear-gradient(135deg, #f44336, #c62828)",
                color: "white",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px) scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
            >
              <div className="d-flex justify-content-center mb-2">
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaCat size={24} />
                </div>
              </div>
              <h4>Lost</h4>
              <h2 style={{ fontWeight: "700" }}>{lostPets}</h2>
            </div>
          </div>
        </div>

        {/* Bar Chart with Custom Styling */}
        <div className="mt-4 mb-5 p-4 rounded-3" style={{
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backdropFilter: "blur(5px)"
        }}>
          <h4 className="text-center mb-4 d-flex align-items-center justify-content-center gap-2" style={{ color: "#7b1fa2" }}>
            <FaChartBar /> Pet Adoption Statistics
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: "#7b1fa2" }} />
              <YAxis tick={{ fill: "#7b1fa2" }} />
              <Tooltip 
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e1bee7",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
              />
              <Legend />
              <Bar dataKey="count">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pet List with Infinite Scroll */}
        <div className="mt-4">
          <h4 className="text-center mb-4 d-flex align-items-center justify-content-center gap-2" style={{ color: "#7b1fa2" }}>
            <FaPaw /> Available Pets <FaPaw />
          </h4>
          <div className="row g-3">
            {filteredPets.map((pet, index) => (
              <div 
                className="col-md-6 col-lg-4"
                key={index}
                ref={index === filteredPets.length - 1 ? lastPetRef : null}
              >
                <div 
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    transition: "all 0.3s ease",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0" style={{ color: "#7b1fa2" }}>
                        {pet.Animal_Name || "Unknown Name"}
                      </h5>
                      <span 
                        className="badge rounded-pill px-3 py-2"
                        style={{ 
                          background: getPetTypeColor(pet.animal_type),
                          color: "white",
                          fontWeight: "600"
                        }}
                      >
                        {pet.animal_type || "Unknown"}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt-fill me-1"></i> {pet.City || "Unknown City"}
                      </small>
                    </div>
                    <div className="mt-3">
                      <span 
                        className={`badge px-3 py-2 ${pet.Record_Type === "ADOPTED" ? "bg-success" : "bg-warning"}`}
                        style={{ fontWeight: "600" }}
                      >
                        {pet.Record_Type || "UNKNOWN STATUS"}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Last updated: {new Date().toLocaleDateString()}
                    </small>
                    {pet.animal_type?.toLowerCase() === "dog" ? (
                      <GiDogBowl size={24} style={{ color: "#2196F3" }} />
                    ) : (
                      <GiCat size={24} style={{ color: "#FF9800" }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mt-4 mb-5">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2" style={{ color: "#7b1fa2" }}>Loading more pets...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;