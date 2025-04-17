import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ViewAdoptablePets() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/dogBreeds")
      .then((res) => setDogs(res.data))
      .catch((err) => console.error("Error fetching dog breeds:", err));
  }, []);

  const handleAdoptClick = (dog) => {
    setSelectedDog(dog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      petName: selectedDog.Breed,
      petType: "Dog",
      breed: selectedDog.Breed,
      origin: selectedDog["Country of Origin"],
      adoptionFee: Math.floor(Math.random() * 5000) + 1000,
    };

    try {
      await axios.post("http://localhost:3001/api/adoptPet", adoptionData);
      alert(`🎉 Adoption Request for ${selectedDog.Breed} submitted successfully!`);
      handleCloseModal();
    } catch (err) {
      console.error("❌ Error submitting adoption request:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const handleBackClick = () => {
    navigate("/search-pet"); // Navigate to the SearchAPet page when back button is clicked
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🐾 Adoptable Dogs</h2>

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
        {dogs.length > 0 ? (
          dogs.map((dog, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title><strong>Breed:</strong> {dog.Breed}</Card.Title>
                  <Card.Text>
                    <strong>Country:</strong> {dog["Country of Origin"]} <br />
                    <strong>Fur Color:</strong> {dog["Fur Color"]} <br />
                    <strong>Height:</strong> {dog["Height (in)"]} inches <br />
                    <strong>Eye Color:</strong> {dog["Color of Eyes"]} <br />
                    <strong>Longevity:</strong> {dog["Longevity (yrs)"]} years <br />
                    <strong>Character Traits:</strong> {dog["Character Traits"]} <br />
                    <strong>Health Issues:</strong> {dog["Common Health Problems"]}
                  </Card.Text>
                  <Button variant="success" onClick={() => handleAdoptClick(dog)}>
                    🐶 Adopt This Dog
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No pets available for adoption.</p>
        )}
      </Row>

      {/* Adoption Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adopt {selectedDog?.Breed}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter 10-digit phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
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
}

export default ViewAdoptablePets;
