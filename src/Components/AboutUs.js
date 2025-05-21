import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { FaPaw, FaHeart, FaHome, FaShoppingBasket, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const AboutUs = () => {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      {/* Gradient Header Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          padding: '80px 0 60px',
          color: '#fff',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating paw prints */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 30c6.6 0 12-5.4 12-12s-5.4-12-12-12-12 5.4-12 12 5.4 12 12 12zm0 10c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm24-14c0-6.6-5.4-12-12-12s-12 5.4-12 12 5.4 12 12 12 12-5.4 12-12zm-48 0c0-6.6-5.4-12-12-12s-12 5.4-12 12 5.4 12 12 12 12-5.4 12-12z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          pointerEvents: 'none'
        }}></div>

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="row text-center"
          >
            <div className="col">
              <FaPaw size={60} className="mb-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
              <h1 className="display-3 mb-4 fw-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                About <span style={{ color: '#ffcc00' }}>Pawsitive Heaven</span>
              </h1>
              <p className="lead fw-semibold" style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                Welcome to <strong style={{ color: '#ffcc00' }}>Pawsitive Heaven</strong>! We are dedicated to finding loving homes for
                pets in need and helping you find your perfect companion.
              </p>
            </div>
          </motion.div>

          {/* Mission & Vision Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="row text-center mt-5"
          >
            <div className="col-md-6 mb-4">
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="card border-0 shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  minHeight: '250px'
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-3">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(255,204,0,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <FaHeart size={24} color="#ffcc00" />
                    </div>
                  </div>
                  <h5 className="card-title fw-bold" style={{ color: '#ffcc00' }}>Our Mission</h5>
                  <p className="card-text fw-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Our mission is to provide a seamless platform for people to adopt
                    pets while promoting responsible pet ownership. We aim to reduce the
                    number of homeless animals and ensure every pet finds a loving family.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-md-6 mb-4">
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="card border-0 shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  minHeight: '250px'
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                  <div className="mb-3">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(255,204,0,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}>
                      <FaHome size={24} color="#ffcc00" />
                    </div>
                  </div>
                  <h5 className="card-title fw-bold" style={{ color: '#ffcc00' }}>Our Vision</h5>
                  <p className="card-text fw-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    We envision a world where all pets are cared for and live a life of
                    happiness and health in their forever homes. We also strive to build
                    a community that supports and promotes ethical pet ownership practices.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* What We Do Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="row text-center mt-5"
          >
            <div className="col">
              <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem', color: '#ffcc00' }}>
                What We Do
              </h2>
              <p className="fw-medium mb-5" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
                At Pawsitive Heaven, we offer a variety of services to ensure that every pet
                finds their forever home:
              </p>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-3 shadow"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      minHeight: '200px'
                    }}
                  >
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(255,204,0,0.2)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}>
                        <FaPaw size={20} color="#ffcc00" />
                      </div>
                      <h4 style={{ color: '#fff' }}>Pet Adoption</h4>
                    </div>
                    <p className="text-start" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      We help connect potential pet owners with adoptable animals, ensuring each pet is placed in a safe, loving environment with thorough vetting processes and post-adoption support.
                    </p>
                  </motion.div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-3 shadow"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      minHeight: '200px'
                    }}
                  >
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(255,204,0,0.2)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px'
                      }}>
                        <FaShoppingBasket size={20} color="#ffcc00" />
                      </div>
                      <h4 style={{ color: '#fff' }}>Pet Recommendations</h4>
                    </div>
                    <p className="text-start" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      We offer personalized recommendations for food, toys, and accessories based on your pet's breed, age, and personality, ensuring they get the perfect items for a happy life.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="row text-center mt-5"
          >
            <div className="col">
              <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem', color: '#ffcc00' }}>
                Contact Us
              </h2>
              <p className="fw-medium mb-4" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
                Have questions or want to learn more? We'd love to hear from you!
              </p>
              
              <div className="d-flex flex-column flex-md-row justify-content-center gap-4 mb-5">
                <div className="d-flex align-items-center justify-content-center">
                  <FaEnvelope size={24} className="me-3" color="#ffcc00" />
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>support@pawsitiveheaven.com</span>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <FaPhone size={24} className="me-3" color="#ffcc00" />
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>+91 9475261458</span>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <FaMapMarkerAlt size={24} className="me-3" color="#ffcc00" />
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>K Narayanapura, Bangalore, India</span>
                </div>
              </div>
              
              <motion.a
                href="mailto:support@pawsitiveheaven.com"
                className="btn btn-lg fw-bold d-inline-flex align-items-center"
                style={{
                  borderRadius: '50px',
                  padding: '12px 30px',
                  fontSize: '1.2rem',
                  background: '#ffcc00',
                  color: '#6a11cb',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(255,204,0,0.4)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 6px 20px rgba(255,204,0,0.6)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="me-2" />
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Commitment Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container py-5">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="mb-4"
          >
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <FaPaw size={36} color="#ffcc00" />
            </div>
          </motion.div>
          
          <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>Our Commitment</h2>
          <p className="fw-medium mb-5 mx-auto" style={{ 
            fontSize: '1.25rem', 
            maxWidth: '800px',
            color: 'rgba(255,255,255,0.9)'
          }}>
            At Pawsitive Heaven, we are committed to ensuring that every pet is treated with
            kindness and respect. We believe in the power of adoption to change lives and
            reduce the number of animals in need. Whether you are adopting, shopping, or
            seeking advice, we are here to help make pet care easier and more enjoyable for
            everyone.
          </p>
          
          <motion.a
            href="#subscribe"
            className="btn btn-lg fw-bold"
            style={{
              borderRadius: '50px',
              padding: '12px 30px',
              background: '#ffcc00',
              color: '#6a11cb',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Join Our Community
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;