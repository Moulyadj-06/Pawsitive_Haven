import React, { useState, useEffect } from "react"; // Import useState and useEffect
import AnimalTypeChart from './AnimalTypeChart';  // Ensure the path is correct
import MostChosenAnimalsChart from './MostChosenAnimalsChart';
import AdoptionTrendsChart from './AdoptionTrendsChart';
import AdoptionReadinessChart from './AdoptionReadinessChart';

const cardStyle = {
  background: "#ffffff",  // White background for cards
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  transition: "all 0.3s ease",  // Smooth hover effect
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "#333",
};

const PowerBIReport = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/pets");
        const data = await response.json();
        setPets(data.pets);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setLoading(false);
      }
    };
    fetchPetsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "40px",
        padding: "40px",
        background: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 50%, #ff6a88 100%)",  // Bold and vibrant gradient
        minHeight: "100vh",
      }}
    >
      <div style={cardStyle}>
        <div style={titleStyle}>Animal Type Distribution</div>
        <AnimalTypeChart pets={pets} />
      </div>

      <div style={cardStyle}>
        <div style={titleStyle}>Most Chosen Animal Breeds</div>
        <MostChosenAnimalsChart pets={pets} />
      </div>

      <div style={cardStyle}>
        <div style={titleStyle}>Adoption Trends Over Time</div>
        <AdoptionTrendsChart pets={pets} />
      </div>

      <div style={cardStyle}>
        <div style={titleStyle}>Adoption Readiness by Record Type</div>
        <AdoptionReadinessChart pets={pets} />
      </div>
    </div>
  );
};

export default PowerBIReport;
