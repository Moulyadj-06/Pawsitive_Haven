import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import { motion } from "framer-motion";
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

  const handleServices = () => {
    navigate("/services");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Data for the accuracy chart
  const data = {
    labels: ['Adoptable Pets', 'Not Adoptable Pets'],
    datasets: [
      {
        label: 'Precision & Recall',
        data: [96, 71],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(220, 53, 69, 0.7)'
        ],
        borderColor: [
          'rgba(33, 136, 56, 1)',
          'rgba(200, 35, 51, 1)'
        ],
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: [
          'rgba(40, 167, 69, 0.9)',
          'rgba(220, 53, 69, 0.9)'
        ]
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
          weight: 'bold'
        },
        color: '#2c3e50'
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        labels: {
          font: {
            size: 14
          },
          color: '#495057'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: '#6c757d'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          color: '#6c757d'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #76c7c0, #00bcd4)",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container p-4 rounded shadow-lg"
        style={{
          backgroundColor: "rgba(248, 249, 250, 0.95)",
          border: "none",
          backdropFilter: "blur(10px)"
        }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="mb-3 fw-bold" style={{ 
            color: "#2c3e50",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            position: "relative",
            display: "inline-block"
          }}>
            🐾 Pawsitive Haven Dashboard 🐾
            <motion.div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, #76c7c0, #00bcd4)",
                borderRadius: "2px"
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container"
        >
          <div className="row justify-content-center">
            <motion.div 
              variants={itemVariants}
              className="col-md-6 col-lg-4 text-center mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-lg rounded-pill shadow-sm w-100 py-3"
                onClick={handleUserDashboard}
                style={{
                  background: "linear-gradient(135deg, #0077b6, #005f83)",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem"
                }}
              >
                Pets Analysis
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="col-md-6 col-lg-4 text-center mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-lg rounded-pill shadow-sm w-100 py-3"
                onClick={handleServices}
                style={{
                  background: "linear-gradient(135deg, #0077b6, #005f83)",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem"
                }}
              >
                Pet Services
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="row text-start"
        >
          {/* Dog Section */}
          <motion.div 
            variants={itemVariants}
            className="col-md-6 mb-4"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              className="p-4 border rounded shadow-sm h-100"
              style={{
                background: "linear-gradient(135deg, rgba(240, 244, 245, 0.9), rgba(209, 231, 225, 0.9))",
                borderLeft: "5px solid #28a745",
                backdropFilter: "blur(5px)"
              }}
            >
              <h4 className="text-success mb-3">
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ display: "inline-block" }}
                >
                  🐶
                </motion.span> Dog Section
              </h4>
              <ul className="mb-2 text-dark">
                <li><strong>Popular Breeds:</strong> Labrador, Beagle, Golden Retriever</li>
                <li><strong>Recommended Items:</strong> Puzzle toys, Orthopedic beds, Grain-free high-protein diet</li>
                <li><strong>Daily Routine:</strong> 2+ walks/day, fetch games, cuddle sessions</li>
                <li><strong>Grooming Needs:</strong> Weekly brushing, ear cleaning, nail trimming</li>
                <li><strong>Health Tip:</strong> Vaccinations, tick/flea treatments, dental checkups</li>
              </ul>
              <div className="text-muted fst-italic">🐕 Happy dogs are active, loved, and healthy!</div>
            </motion.div>
          </motion.div>

          {/* Cat Section */}
          <motion.div 
            variants={itemVariants}
            className="col-md-6 mb-4"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              className="p-4 border rounded shadow-sm h-100"
              style={{
                background: "linear-gradient(135deg, rgba(240, 244, 245, 0.9), rgba(209, 231, 225, 0.9))",
                borderLeft: "5px solid #00bfff",
                backdropFilter: "blur(5px)"
              }}
            >
              <h4 className="text-info mb-3">
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ display: "inline-block" }}
                >
                  🐱
                </motion.span> Cat Section
              </h4>
              <ul className="mb-2 text-dark">
                <li><strong>Popular Breeds:</strong> Persian, Siamese, Maine Coon</li>
                <li><strong>Recommended Items:</strong> Cozy beds, window perches, wet+dry food mix</li>
                <li><strong>Daily Routine:</strong> Laser play, sunny naps, gentle interactions</li>
                <li><strong>Grooming Needs:</strong> Brushing, claw trimming, litter care</li>
                <li><strong>Health Tip:</strong> Deworming, vaccinations, fresh water always</li>
              </ul>
              <div className="text-muted fst-italic">🐈 Calm cats thrive in clean, cozy spaces.</div>
            </motion.div>
          </motion.div>

          {/* ML Model Overview */}
          <motion.div 
            variants={itemVariants}
            className="col-md-12 mt-4"
          >
            <motion.div
              whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              className="p-4 border rounded shadow-sm"
              style={{
                borderLeft: "5px solid #0077b6",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.9))",
                backdropFilter: "blur(5px)"
              }}
            >
              <h5 className="text-primary fw-bold mb-3">
                <motion.span 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🧠
                </motion.span> Pet Adoption Prediction Model – Overview
              </h5>
              <p className="text-dark">
                This dashboard integrates a <strong>Machine Learning model</strong> designed to predict whether a pet is likely to be adopted. 
                The system uses historical adoption data to analyze factors that influence adoption likelihood, such as breed, health status, and behavior. 
                It then outputs a prediction to help shelters and admins identify pets that need extra attention to boost their chances of adoption.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h6 className="text-secondary fw-bold mt-4">Key Features:</h6>
                <ul className="text-dark">
                  <li><strong>Animal Type:</strong> Whether the pet is a dog or cat.</li>
                  <li><strong>Breed:</strong> Specific breeds tend to have higher adoption rates.</li>
                  <li><strong>Gender:</strong> Gender of the pet (male/female) can influence adoption rates.</li>
                  <li><strong>Vaccination Status:</strong> Pets with updated vaccinations are more likely to be adopted.</li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h6 className="text-secondary fw-bold mt-4">Model Output:</h6>
                <p className="text-dark">
                  The model provides a prediction of whether a pet is likely to be adopted based on the factors listed above:
                  <ul>
                    <li><strong>Adoptable:</strong> The pet has a high probability of being adopted.</li>
                    <li><strong>Not Adoptable:</strong> The pet is less likely to be adopted, requiring more focus or promotion.</li>
                  </ul>
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h6 className="text-secondary fw-bold mt-4">Model Performance:</h6>
                <ul className="text-dark">
                  <li><strong>Overall Accuracy:</strong> <span className="text-primary fw-bold">93.54%</span></li>
                  <li><strong>Adoptable Pets:</strong> 96% precision & recall — excellent at predicting adoptable pets 🐕</li>
                  <li><strong>Not Adoptable Pets:</strong> 71% precision & recall — still useful but needs improvement 🐾</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="alert alert-info mt-3 mb-4" role="alert" style={{
                  background: "linear-gradient(135deg, rgba(23, 162, 184, 0.2), rgba(23, 162, 184, 0.1))",
                  borderLeft: "4px solid #17a2b8"
                }}>
                  📊 This predictive system helps streamline decisions, boost adoption rates, and ensure no pet is left behind!
                </div>
              </motion.div>

              {/* Chart displaying precision & recall */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-4"
              >
                <Bar data={data} options={options} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quick Tips Section */}
          <motion.div 
            variants={itemVariants}
            className="col-md-12 mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 border rounded shadow-sm"
              style={{
                background: "linear-gradient(135deg, rgba(248, 249, 250, 0.9), rgba(233, 236, 239, 0.9))",
                borderLeft: "5px solid #6c757d",
                backdropFilter: "blur(5px)"
              }}
            >
              <h5 className="text-dark mb-3">
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ✨
                </motion.span> Admin Quick Tips
              </h5>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {[
                  "Keep listings fresh: New updates = more visibility!",
                  "Use vibrant images: Close-up pet faces work wonders!",
                  "Promote timely adoption: Share pets on social media.",
                  "Highlight stories: Adoption success stories inspire others."
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="mb-2"
                  >
                    <span className="text-primary fw-bold">✔</span> {tip}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;