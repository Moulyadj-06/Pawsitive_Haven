import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaDog, FaCat, FaChartLine, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  const adoptionStats = [
    { title: 'Total Adoptions', value: 1500, icon: FaHeart, bgColor: '#ff758f', color: 'red' },
    { title: 'Dogs Adopted', value: 900, icon: FaDog, bgColor: '#ffcd69', color: 'brown' },
    { title: 'Cats Adopted', value: 600, icon: FaCat, bgColor: '#6a9cf9', color: 'darkblue' },
    { title: 'Adoption Rate', value: '85%', icon: FaChartLine, bgColor: '#59d999', color: 'darkgreen' },
  ];

  return (
    <Container
  fluid
  className="p-5 d-flex flex-column align-items-center"
  style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, rgba(240, 244, 248, 0.9), rgba(194, 233, 251, 0.9))',
    backgroundImage: 'url("https://source.unsplash.com/1600x900/?pets,animals")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>

      <h1 className="text-dark text-center mb-5" style={{ fontWeight: 'bold' }}>
        🐾 Pet Adoption Dashboard 🐾
      </h1>

      {/* Adoption Stats with Hover Animation */}
      <Row className="g-4 justify-content-center">
        {adoptionStats.map((stat, index) => {
          const IconComponent = stat.icon; // Fixing the icon rendering issue
          return (
            <Col key={index} xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card
                  className="text-center p-3 shadow-lg text-white"
                  style={{
                    borderRadius: '15px',
                    backgroundColor: stat.bgColor,
                    border: 'none',
                  }}
                >
                  {/* Corrected Icon Usage */}
                  <div className="mb-2">
                    <IconComponent size={40} style={{ color: stat.color }} />
                  </div>
                  <Card.Title>{stat.title}</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {stat.value}
                  </Card.Text>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>

      {/* Action Buttons */}
      <Row className="mt-5 justify-content-center">
        <Col xs="auto">
          <Button
            style={{
              backgroundColor: '#28a745',
              border: 'none',
              padding: '12px 25px',
              fontSize: '1.2rem',
              borderRadius: '25px',
              transition: '0.3s',
            }}
            className="shadow"
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
            onClick={() => navigate('/adopt-pet')}
          >
            🐶 Adopt a Pet
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            style={{
              backgroundColor: '#007bff',
              border: 'none',
              padding: '12px 25px',
              fontSize: '1.2rem',
              borderRadius: '25px',
              transition: '0.3s',
            }}
            className="shadow"
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
            onClick={() => navigate('/view-adoptable-pets')}
          >
            📋 View Adoptable Pets
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
