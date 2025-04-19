import React from "react";
import { Container, Row, Col, Card, Navbar, Nav } from "react-bootstrap";

const DogRecommendation = () => {
  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#343a40", scrollBehavior: "smooth" }}>
          {/* Navbar */}
          <Navbar bg="dark" expand="lg" className="px-4 py-3 shadow-sm"> {/* fixed-top */}
        <Navbar.Brand href="#" style={{ color: "white", fontWeight: "bold" }}>
          Dog World
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Home</Nav.Link>
            <Nav.Link href="#food" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Dog Food</Nav.Link>
            <Nav.Link href="#toys" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Toys</Nav.Link>
            <Nav.Link href="#grooming" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Grooming</Nav.Link>
            <Nav.Link href="#ourstory" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Our Story</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero / Home */}
      <div id="home" className="d-flex flex-column flex-md-row align-items-center justify-content-between px-5 py-4" style={{ backgroundColor: "#ffe8f0" }}>
        <div
        >
          <div>
            <h2 className="fw-bold mb-2" style={{ color: "#343a40" }}>
              Your Dog Deserves the Best 🐶
            </h2>
            <p className="text-muted">Premium food, playful toys, and loving care</p>
          </div>
          <img
            src="/images/renamed_pets/dog/dog-hero.jpeg"
            alt="Dog"
            style={{ maxWidth: "250px", borderRadius: "15px" }}
          />
        </div>

        {/* Expert Recommendations */}
        <Container className="my-5">
          <h4 className="fw-bold mb-4" style={{ color: "white" }}>Expert Recommendations</h4>
          <Row className="g-4">
            {[
              {
                title: "Our Top Pick",
                category: "Food",
                badge: "Vet Approved",
                imgSrc: "/images/renamed_pets/dog/food.jpeg",
              },
              {
                title: "Great for Active Dogs",
                category: "Toys",
                badge: "User Favorite",
                imgSrc: "/images/renamed_pets/dog/toys.jpeg",
              },
              {
                title: "Best Shampoo for Sensitive Skin",
                category: "Shampoo",
                badge: "Budget Friendly",
                imgSrc: "/images/renamed_pets/dog/shampoo.jpeg",
              },
              {
                title: "Perfect for Training",
                category: "Leashes",
                badge: "Highly Recommended",
                imgSrc: "/images/renamed_pets/dog/belt.jpeg",
              },
              {
                title: "Cozy & Comfortable",
                category: "Beds",
                badge: "Top Rated",
                imgSrc: "/images/renamed_pets/dog/bed.jpeg",
              },
            ].map((item, index) => (
              <Col xs={6} md={4} lg={2} key={index}>
                <Card className="text-center shadow-sm border-0 rounded-4">
                  <Card.Img
                    variant="top"
                    src={item.imgSrc}
                    className="mb-2"
                    style={{ height: "160px", objectFit: "cover", borderRadius: "12px" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ fontWeight: "bold", color: "black" }}>{item.title}</Card.Title>
                    <Card.Text style={{ fontWeight: "bold", color: "black" }}>{item.category}</Card.Text>
                    <span className="badge bg-success">{item.badge}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Dog Food */}
      <Container id="food" className="my-5 pt-4">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Recommended Dog Foods</h4>
        <Row className="g-4">
          <Col>
            <Card className="text-center shadow-sm border-0 rounded-4">
              <Card.Img
                variant="top"
                src="/images/renamed_pets/dog/kibble.jpeg"
                style={{ maxWidth: "200px", height: "auto", margin: "0 auto" }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "black" }}>Premium Kibble</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "black" }}>Vet Approved A protein-rich, grain-free formula that supports healthy digestion, shiny coats, and strong bones. 
                Ideal for dogs of all sizes and life stages, this kibble offers complete daily nutrition</Card.Text>
                <span className="badge bg-success">Top Pick</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      {/* Toys */}
      <Container id="toys" className="my-5 pt-4">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Top Toys</h4>
        <Row className="g-4">
          <Col>
            <Card className="text-center shadow-sm border-0 rounded-4">
              <Card.Img
                variant="top"
                src="/images/renamed_pets/dog/chew.jpeg"
                style={{ maxWidth: "200px", height: "auto", margin: "0 auto" }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "black" }}>Chew Toy Deluxe</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "black" }}>User Favorite Made of durable rubber with a bacon scent — perfect for keeping your pup busy and their teeth clean.
                Great for solo play or a fun game of fetch indoors and out.</Card.Text>
                <span className="badge bg-success">Bestseller</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      {/* Grooming */}
      <Container id="grooming" className="my-5 pt-4">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Grooming Essentials</h4>
        <Row className="g-4">
          <Col>
            <Card className="text-center shadow-sm border-0 rounded-4">
              <Card.Img
                variant="top"
                src="/images/renamed_pets/dog/shampoo2.jpeg"
                style={{ maxWidth: "200px", height: "auto", margin: "0 auto" }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "black" }}>Sensitive Skin Shampoo</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "black" }}>Budget Friendly Hypoallergenic, tear-free formula infused with aloe vera and oatmeal for soothing baths.
                Designed to calm itchy skin while leaving your dog’s coat soft and fresh-smelling.</Card.Text>
                <span className="badge bg-success">Gentle Formula</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      {/* Our Story */}
      <Container id="ourstory" className="my-5 pt-4">
        <h4 className="fw-bold mb-3" style={{ color: "white" }}>Our Story</h4>
        <p style={{ color: "white" }}>
          At <strong>Dog World</strong>, we believe every pup deserves love, care, and joy. Our mission is to
          recommend only the best for your four-legged friend — from nutritious food to
          playful fun!
        </p>
      </Container>

      {/* Footer */}
      <footer className="text-center py-4" style={{ backgroundColor: "#003366", color: "white" }}>
        <small>© 2025 Dog World. Woof & Love 🐾</small>
      </footer>
    </div>
  );
};

export default DogRecommendation;
