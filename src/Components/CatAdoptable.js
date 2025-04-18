import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch Cat Data
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/cats")
      .then((res) => setCats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdopt = (cat) => {
    setSelectedCat(cat);
    setShowModal(true);

    // Clear form on selecting new cat
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("⚠️ All fields are required!");
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      alert("⚠️ Phone number must be exactly 10 digits!");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("⚠️ Please enter a valid email address!");
      return;
    }

    const adoptionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      petName: selectedCat.name,
      petType: "Cat", // Keeping this as Cat
      breed: selectedCat.Breed,
      origin: selectedCat.origin,
      adoptionFee: Math.floor(Math.random() * 5000) + 1000,
    };

    try {
      // No need to store response as it's not used
      await axios.post("http://localhost:3001/api/adoptPet", adoptionData);
      alert(`🎉 Adoption Request for ${selectedCat.name} submitted successfully!`);
     // Redirect after successful adoption based on pet type
    if (adoptionData.petType === "Dog") {
      navigate("/dog-recommendations");
    } else {
      navigate("/cat-recommendations");
    }
    setShowModal(false); // Close the modal after submission
  } catch (err) {
    console.error("❌ Error submitting adoption request:", err.response || err.message);
    alert("❌ Something went wrong. Please try again.");
  }
  };

  const handleBackClick = () => {
    navigate("/search-pet"); // Navigate to the SearchAPet page when back button is clicked
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🐱 Adoptable Cats</h2>

      {/* Back Button with Enhanced UI */}
      <Button
        variant="primary"
        onClick={handleBackClick}
        className="mb-4 d-flex align-items-center justify-content-center"
        style={{
          padding: "10px 20px",
          borderRadius: "30px",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "16px",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          border: "none",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#0056b3"; // Darker blue on hover
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#007bff"; // Original blue
          e.target.style.transform = "scale(1)";
        }}
      >
        <i className="bi bi-arrow-left-circle" style={{ marginRight: "8px", fontSize: "18px" }}></i>
        🔙 Back to Search Pets
      </Button>

      <Row>
        {cats.map((cat, idx) => (
          <Col md={4} lg={3} sm={6} xs={12} key={idx} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Card.Text>
                  <strong>Breed:</strong> {cat.Breed} <br />
                  <strong>Origin:</strong> {cat.origin} <br />
                  <strong>Life Span:</strong> {cat.min_life_expectancy} - {cat.max_life_expectancy} years <br />
                  <strong>Weight:</strong> {cat.min_weight} - {cat.max_weight} kg <br />
                  <strong>Family Friendly:</strong> {cat.family_friendly}/5 <br />
                  <strong>Grooming:</strong> {cat.grooming}/5 <br />
                  <strong>Intelligence:</strong> {cat.intelligence}/5 <br />
                </Card.Text>
                <Button variant="success" onClick={() => handleAdopt(cat)}>
                  🐱 Adopt This Cat
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🐱 Adopt {selectedCat?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter 10-digit phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Submit Request
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default CatAdoptable;
