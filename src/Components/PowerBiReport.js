import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaw, FaChartPie, FaChartLine, FaChartBar, FaDog, FaCat } from "react-icons/fa";
import AnimalTypeChart from './AnimalTypeChart';
import MostChosenAnimalsChart from './MostChosenAnimalsChart';
import AdoptionTrendsChart from './AdoptionTrendsChart';
import AdoptionReadinessChart from './AdoptionReadinessChart';

const PowerBIReport = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const response = await fetch("http://localhost:3001/api/pets");
        const data = await response.json();
        setPets(data.pets);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
        setLoading(false);
      }
    };
    fetchPetsData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3
      }
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const loadingDotVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}>
        <motion.div
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ 
            display: "flex",
            marginBottom: "20px"
          }}>
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={loadingDotVariants}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#6a11cb",
                  margin: "0 5px"
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#6a11cb",
              display: "flex",
              alignItems: "center"
            }}
          >
            <FaPaw style={{ marginRight: "10px" }} />
            Loading Pet Analytics...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Floating pet icons */}
      <FaDog style={{
        position: "absolute",
        top: "50px",
        left: "50px",
        fontSize: "80px",
        color: "rgba(106, 17, 203, 0.1)",
        transform: "rotate(-15deg)"
      }} />
      <FaCat style={{
        position: "absolute",
        bottom: "50px",
        right: "50px",
        fontSize: "80px",
        color: "rgba(106, 17, 203, 0.1)",
        transform: "rotate(15deg)"
      }} />

      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#6a11cb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FaPaw style={{ marginRight: "15px" }} />
        Pet Adoption Analytics Dashboard
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 charts per row
          gap: "30px",
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >
        {/* Animal Type Distribution Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.05)",
            minHeight: "450px", // Adjusted to ensure consistency in card height
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            color: "#6a11cb"
          }}>
            <FaChartPie style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3 style={{ 
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0
            }}>
              Animal Type Distribution
            </h3>
          </div>
          <div style={{ 
            height: "350px", // Adjusted chart height
            flex: 1,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
          }}>
            <AnimalTypeChart pets={pets} />
          </div>
        </motion.div>

        {/* Most Chosen Animal Breeds Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.05)",
            minHeight: "450px", // Adjusted for consistency
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            color: "#6a11cb"
          }}>
            <FaChartBar style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3 style={{ 
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0
            }}>
              Most Chosen Animal Breeds
            </h3>
          </div>
          <div style={{ 
            height: "350px",
            flex: 1,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
          }}>
            <MostChosenAnimalsChart pets={pets} />
          </div>
        </motion.div>

        {/* Adoption Trends Over Time Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.05)",
            minHeight: "450px", // Adjusted for consistency
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            color: "#6a11cb"
          }}>
            <FaChartLine style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3 style={{ 
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0
            }}>
              Adoption Trends Over Time
            </h3>
          </div>
          <div style={{ 
            height: "350px",
            flex: 1,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
          }}>
            <AdoptionTrendsChart pets={pets} />
          </div>
        </motion.div>

        {/* Adoption Readiness by Record Type Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.05)",
            minHeight: "450px", // Adjusted for consistency
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            color: "#6a11cb"
          }}>
            <FaChartLine style={{ fontSize: "24px", marginRight: "10px" }} />
            <h3 style={{ 
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0
            }}>
              Adoption Readiness by Record Type
            </h3>
          </div>
          <div style={{ 
            height: "350px",
            flex: 1,
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box"
          }}>
            <AdoptionReadinessChart pets={pets} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PowerBIReport;
