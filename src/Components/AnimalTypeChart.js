import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
  "#FF9F40", "#8DD1E1", "#A4DE6C", "#D0ED57", "#FFB6C1"
];

const AnimalTypeChart = ({ pets }) => {
  const animalCounts = pets.reduce((acc, pet) => {
    const type = pet.animal_type ? pet.animal_type.toLowerCase() : "unknown";
    if (type === "dog" || type === "cat") {
      acc[type] = (acc[type] || 0) + 1;
    } else {
      acc["other"] = (acc["other"] || 0) + 1;
    }
    return acc;
  }, {});

  // Calculate the total count of pets
  const totalPets = pets.length;

  // Set a max percentage (e.g., 15%) for "Other" to allow more space for Dogs and Cats
  const maxOtherPercentage = 0.15; // 15%

  // If "Other" exceeds 15% of total pets, adjust it
  if (animalCounts["other"] > totalPets * maxOtherPercentage) {
    animalCounts["other"] = totalPets * maxOtherPercentage;
  }

  // Ensure that Dogs and Cats take up a larger share of the pie
  const totalCatsAndDogs = animalCounts["dog"] + animalCounts["cat"];
  const remainingPercentage = 1 - maxOtherPercentage;
  const catsAndDogsPercentage = remainingPercentage;

  if (totalCatsAndDogs > 0) {
    const scaleFactor = catsAndDogsPercentage / (totalCatsAndDogs / totalPets);
    animalCounts["dog"] = Math.round(animalCounts["dog"] * scaleFactor);
    animalCounts["cat"] = Math.round(animalCounts["cat"] * scaleFactor);
  }

  const data = Object.entries(animalCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the first letter of the type
    value: count
  }));

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <h3>🐾 Animal Type Distribution 🐾</h3>
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
