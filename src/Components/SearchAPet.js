import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaSearchLocation, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

const SearchAPet = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ petType: "", location: "", age: "" });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    navigate(`/view-adoptable-pets?petType=${filters.petType}&location=${filters.location}&age=${filters.age}`);
  };

  return (
    <Container className="p-5" style={{ maxWidth: "600px" }}>
      <motion.h2
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🔍 Find Your Perfect Pet
      </motion.h2>

      <Card className="p-4 shadow-lg" style={{ borderRadius: "15px" }}>
        <Form>
          {/* Pet Type Filter */}
          <Form.Group className="mb-3">
            <Form.Label><FaFilter /> Pet Type</Form.Label>
            <Form.Select name="petType" value={filters.petType} onChange={handleFilterChange}>
              <option value="">Select a pet type</option>
              <option value="dog">🐶 Dog</option>
              <option value="cat">🐱 Cat</option>
            </Form.Select>
          </Form.Group>

          {/* Location Filter */}
          <Form.Group className="mb-3">
            <Form.Label><FaSearchLocation /> Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </Form.Group>

          {/* Age Filter */}
          <Form.Group className="mb-3">
            <Form.Label><FaFilter /> Age</Form.Label>
            <Form.Select name="age" value={filters.age} onChange={handleFilterChange}>
              <option value="">Select age</option>
              <option value="puppy">Puppy</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </Form.Select>
          </Form.Group>

          {/* Search Button */}
          <Row className="mt-4">
            <Col className="text-center">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="primary" size="lg" onClick={handleSearch}>
                  🔎 Search Pets
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default SearchAPet;
