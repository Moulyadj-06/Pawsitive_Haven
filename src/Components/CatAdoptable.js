import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

const CatAdoptable = () => {
  const [cats, setCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ Fetch Cats Data from Backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/cats")
      .then((res) => setCats(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Open Modal When "Adopt This Cat" is Clicked
  const handleAdopt = (cat) => {
    setSelectedCat(cat);
    setShowModal(true);

    // ✅ Clear the form every time new cat is adopted
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  // ✅ Strong Email Validation Function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // ✅ Strong Phone Number Validation Function
  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
    return phoneRegex.test(phone);
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic Validation Before Submission
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("⚠️ All fields are required!");
      return;
    }

    // ✅ Phone Number Validation
    if (!isValidPhoneNumber(formData.phone)) {
      alert("⚠️ Phone number must be exactly 10 digits (no alphabets)!");
      return;
    }

    // ✅ Email Validation
    if (!isValidEmail(formData.email)) {
      alert("⚠️ Please enter a valid email address (with @ and .com)!");
      return;
    }

    // ✅ Preparing Adoption Data to Send to MongoDB
    const adoptionData = {
      ...formData,
      catName: selectedCat.name,
      catBreed: selectedCat.Breed,
      origin: selectedCat.origin,
      min_life_expectancy: selectedCat.min_life_expectancy,
      max_life_expectancy: selectedCat.max_life_expectancy,
      min_weight: selectedCat.min_weight,
      max_weight: selectedCat.max_weight,
      family_friendly: selectedCat.family_friendly,
      grooming: selectedCat.grooming,
      intelligence: selectedCat.intelligence,
      adoptionFee: Math.floor(Math.random() * 5000) + 1000, // Random Adoption Fee
    };

    // ✅ Send Data to MongoDB
    axios
      .post("http://localhost:3001/api/adoptCat", adoptionData)
      .then(() => {
        alert(`🎉 Adoption Request for ${selectedCat.name} Submitted Successfully!`);
        setShowModal(false);

        // ✅ Clear Form Data
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <h2 className="text-center my-4">🐱 Adoptable Cats</h2>

      {/* ✅ Display Cats */}
      <Row>
        {cats.map((cat) => (
          <Col key={cat._id} sm={12} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title><strong>Name:</strong> {cat.name}</Card.Title>
                <Card.Text>
                  <strong>Breed:</strong> {cat.Breed} <br />
                  <strong>Origin:</strong> {cat.origin} <br />
                  <strong>Life Span:</strong> {cat.min_life_expectancy} - {cat.max_life_expectancy} yrs <br />
                  <strong>Weight:</strong> {cat.min_weight} - {cat.max_weight} kg <br />
                  <strong>Family Friendly:</strong> {cat.family_friendly}/5 <br />
                  <strong>Grooming:</strong> {cat.grooming}/5 <br />
                  <strong>Intelligence:</strong> {cat.intelligence}/5 <br />
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleAdopt(cat)}
                >
                  🐱 Adopt {cat.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Modal Form */}
      {selectedCat && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>🐱 Adopt {selectedCat.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success">
                ✅ Submit Adoption Request
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default CatAdoptable;
