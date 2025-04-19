import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#8DD1E1", "#A4DE6C", "#D0ED57", "#FFB6C1"
];

const AnimalTypeChart = ({ pets }) => {
  const animalCounts = pets.reduce((acc, pet) => {
    const type = pet.animal_type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(animalCounts).map(([type, count]) => ({
    name: type,
    value: count
  }));

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <h3>🐾 Animal Type Distribution🐾</h3>
      <PieChart width={500} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  );
};

export default AnimalTypeChart;