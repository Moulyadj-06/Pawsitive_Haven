// src/components/PieChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';

const PieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/pets").then((res) => {
      const data = res.data;
      const animalCounts = {};

      data.forEach((pet) => {
        animalCounts[pet.animal_type] = (animalCounts[pet.animal_type] || 0) + 1;
      });

      setChartData({
        labels: Object.keys(animalCounts),
        datasets: [
          {
            label: "Animal Type Distribution",
            data: Object.values(animalCounts),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8AFFC1"],
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h3>Animal Type Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;