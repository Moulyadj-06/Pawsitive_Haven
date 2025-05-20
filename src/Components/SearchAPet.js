import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const SearchAPet = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    petType: "",
    country: "",
    furColor: "",
    length: "",
    origin: "",
  });

  const [countries, setCountries] = useState([]);
  const [furColors, setFurColors] = useState([]);
  const [catLengths, setCatLengths] = useState([]);
  const [catOrigins, setCatOrigins] = useState([]);

  useEffect(() => {
    if (filters.petType === "dog") {
      axios
        .get("http://localhost:3001/api/dogBreeds")
        .then((response) => {
          setCountries([
            ...new Set(response.data.map((dog) => dog["Country of Origin"])),
          ]);
          setFurColors([
            ...new Set(response.data.map((dog) => dog["Fur Color"])),
          ]);
        })
        .catch((error) => console.error("❌ Error fetching dog breeds:", error));
    }

    if (filters.petType === "cat") {
      axios
        .get("http://localhost:3001/api/cats")
        .then((response) => {
          setCatOrigins([
            ...new Set(response.data.map((cat) => cat["origin"])),
          ]);
          setCatLengths([
            ...new Set(response.data.map((cat) => cat["length"])),
          ]);
        })
        .catch((error) => console.error("❌ Error fetching cat breeds:", error));
    }
  }, [filters.petType]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if (filters.petType === "dog") {
      navigate(
        `/view-adoptable-pets?petType=dog&country=${filters.country}&furColor=${filters.furColor}`
      );
    } else if (filters.petType === "cat") {
      navigate(
        `/view-cat-adoptable-pets?petType=cat&origin=${filters.origin}&length=${filters.length}`
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,rgb(126, 188, 214),rgb(86, 157, 185))",
        padding: "2rem 0",
      }}
    >
      {/* Hero Section */}
      <div style={{
      width: "100%",
      maxWidth: "1200px", // Adjust width as needed
      margin: "0 auto",   // Center the container
      padding: "60px 40px",
      background: "linear-gradient(to right, #87CEEB, #4169E1)",
      borderRadius: "20px", // Rounded corners
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
      color: "#fff", // White text for contrast
      fontFamily: "'Poppins', sans-serif"
    }}>
      <motion.h1 
        style={{
          fontSize: "2.5rem",
          fontWeight: "700", // or use "bold" (both work, but choose one)
          color: "#133b5c",
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "'Poppins', sans-serif" // Optional: Ensure consistent typography
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Your Perfect Pet Companion 🐾
      </motion.h1>

      <motion.p
        style={{
          fontSize: "1.2rem",
          lineHeight: "1.6",
          maxWidth: "800px",
          color: "#133b5c", 
          fontWeight: "bold",
          margin: "0 auto"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        For every home, there's a special pet waiting. They come through our doors and stay until they find their forever family!
      </motion.p>

      {/* Optional decorative elements */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "25px",
        gap: "15px"
      }}>
        {["🐶", "🐱", "🐰"].map((emoji, index) => (
          <motion.span
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.3 
            }}
            style={{ fontSize: "2rem" }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </div>


      {/* Filter Form */}
      <Container style={{ maxWidth: "600px" }} className="mb-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px #ccc",
          }}
        >
          🐾 Find Your Perfect Pet
        </motion.h2>

        <Card
          className="p-4 shadow-lg"
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(26, 115, 232, 0.3)",
          }}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>
                <FaFilter className="me-2" />
                Pet Type
              </Form.Label>
              <Form.Select
                name="petType"
                value={filters.petType}
                onChange={handleFilterChange}
              >
                <option value="">Select a pet type</option>
                <option value="dog">Dog 🐶</option>
                <option value="cat">Cat 🐱</option>
              </Form.Select>
            </Form.Group>

            {filters.petType === "dog" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fur Color</Form.Label>
                  <Form.Select
                    name="furColor"
                    value={filters.furColor}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Fur Color</option>
                    {furColors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}

            {filters.petType === "cat" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Country of Origin</Form.Label>
                  <Form.Select
                    name="origin"
                    value={filters.origin}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Origin</option>
                    {catOrigins.map((origin, index) => (
                      <option key={index} value={origin}>
                        {origin}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Length (inches)</Form.Label>
                  <Form.Select
                    name="length"
                    value={filters.length}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Length</option>
                    {catLengths.map((length, index) => (
                      <option key={index} value={length}>
                        {length}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={handleSearch}
                variant="primary"
                className="w-100"
                style={{
                  background: "#1a73e8",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 0",
                  fontWeight: "600",
                }}
              >
                🔍 Search Pets
              </Button>
            </motion.div>
          </Form>
        </Card>
      </Container>

      {/* Featured Pets */}
      <Container className="my-5" style={{ maxWidth: "1000px" }}>
        <h2 className="text-center mb-5" style={{ color: "#133b5c" }}>
          🐾 Pets Waiting for You
        </h2>

        <Row className="g-4">
        {['Esme and Ralda', 'Layla', 'Brown', 'Roy', 'Kristen', 'Jack and Daniel'].map((pet, index) => (
        <Col md={4} key={index}>
          <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <Card.Img 
              variant="top" 
              src={`/images/renamed_pets/${pet.toLowerCase().replace(/\s+/g, '-')}.jpeg`}
              alt={`${pet} the pet`}
              style={{ 
                height: "250px",
                objectFit: "cover",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px" 
             
              }}
            />
            <Card.Body className="text-center">
              <h4 className="mb-0">{pet}</h4>
            </Card.Body>
          </Card>
        </Col>
      ))}
        </Row>
      </Container>

     {/* Contact Section */}
        <Container
          className="py-5"
          style={{
            background: "linear-gradient(135deg, #2a9d8f, #264653)",
            color: "#000000",
            maxWidth: "1200px",
            borderRadius: "15px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Row>
            <Col md={6}>
              <h3 className="mb-4" style={{ color: "#ffffff" }}>📬 Contact Information</h3>
              <p>📍 Street: K.Narayanapura, Bengaluru-560077</p>
              <p>🏙️ County: Happy Country India</p>
              <p>📧 Email: <a href="mailto:contact@petadopt.org" style={{ color: "#4dabf7" }}>contact@petadopt.org</a></p>
            </Col>
            <Col md={6}>
              <h3 className="mb-4" style={{ color: "#ffffff" }}>🤝 Our Supporters</h3>
              <Row>
                {['Priyanka Anand', 'Moulya Shree DJ', 'Anupama. R', 'Beulah Mercy'].map((supporter, index) => (
                  <Col xs={6} key={index}>
                    <div
                      className="mb-3"
                      style={{
                        color: "#ffd700",
                        fontWeight: "500",
                      }}
                    >
                      {supporter}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>

    </div>
  );
};

export default SearchAPet;
