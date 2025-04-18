import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const generateMockData = () => {
  const months = [
    "Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024",
    "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"
  ];

  return months.map((month) => ({
    month,
    Dog: Math.floor(Math.random() * 50) + 10,
    Cat: Math.floor(Math.random() * 40) + 5,
    Rabbit: Math.floor(Math.random() * 30) + 2,
  }));
};

const AdoptionTrendsChart = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const mockData = generateMockData();
    console.log("Mock Trend Data:", mockData); // Debug: Check data in console
    setTrendData(mockData);
  }, []);

  return (
    <div style={{ width: "100%", height: "450px", padding: "20px" }}>
      <h2 className="text-center mb-4">🐾 Monthly Pet Adoption Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Dog" stroke="#ff7300" strokeWidth={3} />
          <Line type="monotone" dataKey="Cat" stroke="#387908" strokeWidth={3} />
          <Line type="monotone" dataKey="Rabbit" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdoptionTrendsChart;