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
    <Container
          fluid
          className="py-4"
          style={{
            background: "linear-gradient(to bottom right,rgb(183, 53, 209), #ffffff)",
            minHeight: "100vh",
          }}
        >
      <h2 className="text-center mb-4">🐱 Adoptable Cats</h2>

      {/* Back Button with Enhanced UI */}
      <div className="text-center mb-4">
        <button
          className="btn btn-primary btn-lg rounded-pill shadow-sm"
          onClick={handleBackClick}
          style={{
            background: "linear-gradient(135deg, #0077b6, #005f83)",
            border: "none",
            transition: "0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.target.style.background = "#005f83")}
          onMouseOut={(e) => (e.target.style.background = "#0077b6")}
        >
          <i className="bi bi-arrow-left-circle" style={{ marginRight: "8px", fontSize: "18px" }}></i>
          🔙 Back to Search Pets
        </button>
      </div>

      <Row>
        {cats.length > 0 ? (
          cats.map((cat, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card
                className="shadow-lg border-0"
                style={{ borderRadius: "20px", backgroundColor: "#fef9f4" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fff3e6")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fef9f4")}
              >
                <Card.Body>
                  <div className="text-center mb-3">
                  <img
                    src={`/images/renamed_pets/pets2/${cat.name ? cat.name.replace(/\s+/g, "") : "default"}.jpeg`}
                    alt={cat.name}
                    style={{ width: "80%", height: "370px", objectFit: "cover", borderRadius: "8px" }}
                    onError={(e) => { e.target.src = "/images/default.jpg"; }}
                  />

                  </div>
                  <Card.Title> <strong>Breed:</strong> {cat.name}</Card.Title>
                  <Card.Text>
                    <strong>Breed:</strong> {cat.Breed} <br />
                    <strong>Origin:</strong> {cat.origin} <br />
                    <strong>Life Span:</strong> {cat.min_life_expectancy} - {cat.max_life_expectancy} years <br />
                    <strong>Weight:</strong> {cat.min_weight} - {cat.max_weight} kg <br />
                    <strong>Family Friendly:</strong> {cat.family_friendly}/5 <br />
                    <strong>Grooming:</strong> {cat.grooming}/5 <br />
                    <strong>Intelligence:</strong> {cat.intelligence}/5 <br />
                  </Card.Text>
                  <div className="text-center">
                    <Button variant="success" onClick={() => handleAdopt(cat)}>
                      🐱 Adopt This Cat
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
        <p className="text-center">No adoptable cats available right now 🐾</p>
      )}
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
