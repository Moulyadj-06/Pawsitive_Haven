import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

const dogBreeds = [
  { name: "Golden Retriever", character: "Friendly, intelligent, devoted" },
  { name: "Labrador Retriever", character: "Outgoing, gentle, smart" },
  { name: "Bulldog", character: "Docile, willful, friendly" },
  { name: "Beagle", character: "Curious, friendly, merry" },
  { name: "Poodle", character: "Intelligent, active, alert" },
];

const ViewAdoptablePets = () => {
  const [adoptablePets, setAdoptablePets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [adoptionDetails, setAdoptionDetails] = useState({ name: "", email: "", phone: "", address: "" });
  const [adoptionSuccess, setAdoptionSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const pets = dogBreeds.map((breed, index) => ({
      id: index + 1,
      name: breed.name,
      image: `/images/renamed_pets/pets/${breed.name.replace(/\s+/g, '')}.jpeg`, // Replacing spaces with underscores
      description: `This adorable ${breed.name} is looking for a home!`,
      character: breed.character,
    }));
    setAdoptablePets(pets);
  }, []);
  

  const handleViewMore = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
    setShowAdoptionForm(false);
    setAdoptionSuccess(false);
    setAdoptionDetails({ name: "", email: "", phone: "", address: "" });
    setPhoneError("");
  };

  const handlePhoneChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (numericValue.length > 10) return;
    setAdoptionDetails({ ...adoptionDetails, phone: numericValue });
    setPhoneError(numericValue.length === 10 ? "" : "Phone number must be 10 digits");
  };

  const handleAdoptionFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!adoptionDetails.name || !adoptionDetails.email || adoptionDetails.phone.length !== 10 || !adoptionDetails.address) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const adoptionData = { ...adoptionDetails, petName: selectedPet?.name };

    try {
      const response = await fetch("http://localhost:5000/api/adopt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adoptionData),
      });

      const result = await response.json();

      if (response.ok) {
        setAdoptionSuccess(true);
      } else {
        alert(result.message || "Adoption request failed.");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4">🐶 Adoptable Dogs 🐶</h2>
      <Row className="g-4">
        {adoptablePets.map((pet) => (
          <Col key={pet.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="p-3 shadow-lg text-center">
              <Card.Img variant="top" src={pet.image} alt={pet.name} />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>{pet.description}</Card.Text>
                <Button variant="primary" onClick={() => handleViewMore(pet)}>
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedPet && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={selectedPet.image}
              alt={selectedPet.name}
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "200px" }}
            />
            <p><strong>Description:</strong> {selectedPet.description}</p>
            <p><strong>Character:</strong> {selectedPet.character}</p>

            {adoptionSuccess ? (
              <p className="text-success"><strong>🎉 Adoption request submitted successfully! 🎉</strong></p>
            ) : showAdoptionForm ? (
              <Form onSubmit={handleAdoptionFormSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={adoptionDetails.name}
                    onChange={(e) => setAdoptionDetails({ ...adoptionDetails, name: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={adoptionDetails.email}
                    onChange={(e) => setAdoptionDetails({ ...adoptionDetails, email: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={adoptionDetails.phone}
                    onChange={handlePhoneChange}
                    required
                  />
                  {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>}
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={adoptionDetails.address}
                    onChange={(e) => setAdoptionDetails({ ...adoptionDetails, address: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="mt-3">
                  Submit Adoption Request
                </Button>
              </Form>
            ) : (
              <Button variant="success" onClick={() => setShowAdoptionForm(true)}>Adopt {selectedPet.name} 🐾</Button>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ViewAdoptablePets;
