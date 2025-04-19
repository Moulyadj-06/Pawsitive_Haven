import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUserDashboard = () => {
    navigate("/user-dashboard");
  };

  // Data for the accuracy chart
  const data = {
    labels: ['Adoptable Pets', 'Not Adoptable Pets'],
    datasets: [
      {
        label: 'Precision & Recall',
        data: [96, 71],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#218838', '#c82333'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Model Performance: Precision & Recall for Adoption Predictions',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #76c7c0, #00bcd4)", // Calming blue/green gradient for project theme
        minHeight: "100vh",
      }}
    >
      <div
        className="container p-4 rounded shadow-lg"
        style={{
          backgroundColor: "#f8f9fa", // Light background for the container
          border: "2px solid #cccccc",
        }}
      >
        <h2 className="text-center mb-4 text-dark fw-bold">
          🐾 Pawsitive Haven Dashboard 🐾
        </h2>

        <div className="text-center mb-4">
          <button
            className="btn btn-primary btn-lg rounded-pill shadow-sm"
            onClick={handleUserDashboard}
            style={{
              background: "linear-gradient(135deg, #0077b6, #005f83)", // Project-matching button color
              border: "none",
              transition: "0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.background = "#005f83")}
            onMouseOut={(e) => (e.target.style.background = "#0077b6")}
          >
            Pets Analysis
          </button>
        </div>

        <div className="row text-start">
          {/* Dog Section */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 border rounded shadow-sm h-100"
              style={{
                background: "linear-gradient(135deg, #f0f4f5, #d1e7e1)", // Light dog section with soothing green
                borderLeft: "5px solid #28a745",
              }}
            >
              <h4 className="text-success">🐶 Dog Section</h4>
              <ul className="mb-2 text-dark">
                <li><strong>Popular Breeds:</strong> Labrador, Beagle, Golden Retriever</li>
                <li><strong>Recommended Items:</strong> Puzzle toys, Orthopedic beds, Grain-free high-protein diet</li>
                <li><strong>Daily Routine:</strong> 2+ walks/day, fetch games, cuddle sessions</li>
                <li><strong>Grooming Needs:</strong> Weekly brushing, ear cleaning, nail trimming</li>
                <li><strong>Health Tip:</strong> Vaccinations, tick/flea treatments, dental checkups</li>
              </ul>
              <div className="text-muted fst-italic">🐕 Happy dogs are active, loved, and healthy!</div>
            </div>
          </div>

          {/* Cat Section */}
          <div className="col-md-6 mb-4">
            <div
              className="p-4 border rounded shadow-sm h-100"
              style={{
                background: "linear-gradient(135deg, #f0f4f5, #d1e7e1)", // Light cat section with calming shades
                borderLeft: "5px solid #00bfff",
              }}
            >
              <h4 className="text-info">🐱 Cat Section</h4>
              <ul className="mb-2 text-dark">
                <li><strong>Popular Breeds:</strong> Persian, Siamese, Maine Coon</li>
                <li><strong>Recommended Items:</strong> Cozy beds, window perches, wet+dry food mix</li>
                <li><strong>Daily Routine:</strong> Laser play, sunny naps, gentle interactions</li>
                <li><strong>Grooming Needs:</strong> Brushing, claw trimming, litter care</li>
                <li><strong>Health Tip:</strong> Deworming, vaccinations, fresh water always</li>
              </ul>
              <div className="text-muted fst-italic">🐈 Calm cats thrive in clean, cozy spaces.</div>
            </div>
          </div>

          {/* ML Model Overview */}
          <div className="col-md-12 mt-4">
            <div
              className="p-4 bg-white border rounded shadow-sm"
              style={{
                borderLeft: "5px solid #0077b6",
                background: "linear-gradient(135deg, #ffffff, #f0f8ff)",
              }}
            >
              <h5 className="text-primary fw-bold">🧠 Pet Adoption Prediction Model – Overview</h5>
              <p>
                This dashboard integrates a <strong>Machine Learning model</strong> designed to predict whether a pet is likely to be adopted. 
                The system uses historical adoption data to analyze factors that influence adoption likelihood, such as breed, health status, and behavior. 
                It then outputs a prediction to help shelters and admins identify pets that need extra attention to boost their chances of adoption.
              </p>
              <h6 className="text-secondary fw-bold">Key Features:</h6>
              <ul>
                <li><strong>Animal Type:</strong> Whether the pet is a dog or cat.</li>
                <li><strong>Breed:</strong> Specific breeds tend to have higher adoption rates.</li>
                <li><strong>Gender:</strong> Gender of the pet (male/female) can influence adoption rates.</li>
                <li><strong>Vaccination Status:</strong> Pets with updated vaccinations are more likely to be adopted.</li>
              </ul>
              <h6 className="text-secondary fw-bold">Model Output:</h6>
              <p>
                The model provides a prediction of whether a pet is likely to be adopted based on the factors listed above:
                <ul>
                  <li><strong>Adoptable:</strong> The pet has a high probability of being adopted.</li>
                  <li><strong>Not Adoptable:</strong> The pet is less likely to be adopted, requiring more focus or promotion.</li>
                </ul>
              </p>
              <h6 className="text-secondary fw-bold">Model Performance:</h6>
              <ul>
                <li><strong>Overall Accuracy:</strong> <span className="text-primary fw-bold">93.54%</span></li>
                <li><strong>Adoptable Pets:</strong> 96% precision & recall — excellent at predicting adoptable pets 🐕</li>
                <li><strong>Not Adoptable Pets:</strong> 71% precision & recall — still useful but needs improvement 🐾</li>
              </ul>
              <div className="alert alert-info mt-3 mb-0" role="alert">
                📊 This predictive system helps streamline decisions, boost adoption rates, and ensure no pet is left behind!
              </div>

              {/* Chart displaying precision & recall */}
              <div className="mt-4">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>

          {/* Quick Tips Section */}
          <div className="col-md-12 mt-2">
            <div className="p-4 bg-light border rounded shadow-sm">
              <h5 className="text-dark">✨ Admin Quick Tips</h5>
              <ul>
                <li><span className="text-primary">✔ Keep listings fresh:</span> New updates = more visibility!</li>
                <li><span className="text-primary">✔ Use vibrant images:</span> Close-up pet faces work wonders!</li>
                <li><span className="text-primary">✔ Promote timely adoption:</span> Share pets on social media.</li>
                <li><span className="text-primary">✔ Highlight stories:</span> Adoption success stories inspire others.</li>
              </ul>
              {/* <p className="text-muted fst-italic">
                Want more engagement? Next, we can add charts, upcoming events, or a message center!
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
