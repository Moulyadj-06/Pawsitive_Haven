import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

// Adoption Readiness Data
const readinessData = [
  { type: "FOUND", count: 276 },
  { type: "LOST", count: 80 },
  { type: "ADOPTABLE", count: 250 }
];

const AdoptionReadinessChart = () => {
  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      
      
      {/* Adoption Readiness Overview */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h2 style={{ textAlign: "center" }}>🐾 Adoption Readiness Overview 🐾</h2>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={readinessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8">
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionReadinessChart;
