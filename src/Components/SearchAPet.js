import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
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
        background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Container style={{ maxWidth: "600px" }}>
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
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
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
                  background: "#ff6f91",
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
    </div>
  );
};

export default SearchAPet;
