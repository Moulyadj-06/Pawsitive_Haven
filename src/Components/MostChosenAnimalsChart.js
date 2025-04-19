import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";

const MostChosenAnimalsChart = ({ pets }) => {
  const breedCounts = pets.reduce((acc, pet) => {
    const breed = pet.Animal_Breed || "Unknown Breed";
    acc[breed] = (acc[breed] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(breedCounts)
    .map(([breed, count]) => ({ breed, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 breeds

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <h3 style={{ textAlign: "center" }}>🐾Top 10 Most Chosen Animals (Breeds)🐾</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 50, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="breed" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8">
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MostChosenAnimalsChart;