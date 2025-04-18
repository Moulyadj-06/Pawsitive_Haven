import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#AF19FF", "#FF4560"];

const AdoptionReadinessChart = ({ pets }) => {
  // Count pets by Record_Type
  const typeCounts = pets.reduce((acc, pet) => {
    const type = pet.Record_Type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(typeCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 style={{ textAlign: "center" }}>🐾 Adoption Readiness Overview</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdoptionReadinessChart;