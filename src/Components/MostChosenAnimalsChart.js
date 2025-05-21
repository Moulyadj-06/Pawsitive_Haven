import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Animal Type Distribution Data
const typeData = [
  { name: "Dog", value: 276 },
  { name: "Cat", value: 250 },
  { name: "Lionhead", value: 80 },
  { name: "Bird", value: 44 },
  { name: "Rabbit Sh", value: 38 },
  { name: "Deceased Bird", value: 34 },
  { name: "Deceased Cat", value: 34 },
  { name: "Equine", value: 30 },
  { name: "Barn Cat", value: 22 },
  { name: "Deceased Dog", value: 16 },
  { name: "Rabbit", value: 14 }
];

// Define COLORS array for chart cells
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF",
  "#FF6666", "#66CC99", "#FFB3E6", "#9999FF", "#FF9966", "#66B3FF"
];

const MostChosenAnimalsChart = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* First Row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
        {/* Animal Type Distribution */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2 style={{ textAlign: "center" }}> 🐾 Animal Type Distribution 🐾</h2>
          <div style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostChosenAnimalsChart;
