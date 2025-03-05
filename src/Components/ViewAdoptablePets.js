import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const ViewAdoptablePets = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/dogBreeds")
      .then(response => setDogs(response.data))
      .catch(error => console.error("❌ Error fetching dog breeds:", error));
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">🐾 Adoptable Pets</h2>
      <Row>
        {dogs.length > 0 ? (
          dogs.map((dog, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title>{dog.Breed}</Card.Title>
                  <Card.Text>
                    <strong>Country:</strong> {dog["Country of Origin"]} <br />
                    <strong>Fur Color:</strong> {dog["Fur Color"]} <br />
                    <strong>Height:</strong> {dog["Height (in)"]} <br />
                    <strong>Eye Color:</strong> {dog["Color of Eyes"]} <br />
                    <strong>Longevity:</strong> {dog["Longevity (yrs)"]} years <br />
                    <strong>Character Traits:</strong> {dog["Character Traits"]} <br />
                    <strong>Health Issues:</strong> {dog["Common Health Problems"]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No pets available for adoption.</p>
        )}
      </Row>
    </Container>
  );
};

export default ViewAdoptablePets;
