import React from "react";
import { Container, Row, Col, Card, Navbar, Nav } from "react-bootstrap";

const CatRecommendation = () => {
  return (
    <div style={{ fontFamily: "sans-serif", backgroundColor: "#343a40", scrollBehavior: "smooth" }}>
      {/* Navbar */}
      <Navbar bg="dark" expand="lg" className="px-4 py-3 shadow-sm" > {/* fixed-top */}
        <Navbar.Brand href="#"style={{ color: "white" }}><strong>Meow Mart</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Home</Nav.Link>
            <Nav.Link href="#food" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Cat Food</Nav.Link>
            <Nav.Link href="#accessories" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Accessories</Nav.Link>
            <Nav.Link href="#toys" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Toys</Nav.Link>
            <Nav.Link href="#ourstory" style={{ color: "#f8f9fa", fontWeight: "bold" }}>Our Story</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Section */}
      <div id="home" className="d-flex flex-column flex-md-row align-items-center justify-content-between px-5 py-4" style={{ backgroundColor: "#ffe8f0" }}>
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#343a40" }}>Luxury for Your Cat 🐱</h2>
          <p className="text-muted" style={{ color: "#343a40" }}>Tasty treats and comfy gear await</p>
        </div>
        <img src="/images/renamed_pets/cat/cat-hero.jpeg" alt="Cat" style={{ maxWidth: "250px" }} />
      </div>

      {/* Expert Recommendations */}
      <Container className="my-5">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Expert Recommendations</h4>
        <Row className="g-4">
          {[{
            title: "Our Top Pick", category: "Food", badge: "Vet Approved", imgSrc: "/images/renamed_pets/cat/food.jpeg" 
          }, {
            title: "Great for Playful Cats", category: "Toys", badge: "User Favorite", imgSrc: "/images/renamed_pets/cat/play.jpeg"
          }, {
            title: "Best Shampoo for Sensitive Skin", category: "Shampoo", badge: "Budget Friendly", imgSrc: "/images/renamed_pets/cat/shampoo.jpeg"
          }, {
            title: "Perfect for Playtime", category: "Tunnels", badge: "Highly Recommended", imgSrc: "/images/renamed_pets/cat/tunnel.jpeg"
          }, {
            title: "Cozy & Comfortable", category: "Beds", badge: "Top Rated", imgSrc: "/images/renamed_pets/cat/bed.jpeg"
          }].map((item, index) => (
            <Col xs={6} md={4} lg={2} key={index}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body>
                  <Card.Img variant="top" src={item.imgSrc} className="mb-2" />
                  <Card.Title className="h6" style={{ fontWeight: "bold", color: "black" }}>{item.title}</Card.Title>
                  <Card.Text style={{ fontWeight: "bold", color: "black" }}>{item.category}</Card.Text>
                  <span className="badge bg-success">{item.badge}</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Cat Food */}
      <Container id="food" className="my-5 pt-4">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Recommended Cat Foods</h4>
        <Row className="g-4">
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="text-center shadow-sm border-0">
              <Card.Img
                variant="top"
                src="/images/renamed_pets/cat/gourmet.jpeg"
                style={{ maxWidth: "200px", height: "auto", margin: "0 auto" }}
              />
              <Card.Body>
                <Card.Title className="h6" style={{ fontWeight: "bold", color: "black" }}>Gourmet Tuna Delight</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "black" }}>
                  High Protein, Vet Approved. This premium cat food offers a rich tuna flavor your cat will love. Packed with high-quality protein, it supports muscle growth and provides essential nutrients for your cat’s overall health.
                </Card.Text>
                <span className="badge bg-success">Top Pick</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Accessories */}
      <Container id="accessories" className="my-5 pt-4">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Must-Have Accessories</h4>
        <Row className="g-4">
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="text-center shadow-sm border-0">
              <Card.Img
                variant="top"
                src="/images/renamed_pets/cat/collar.jpeg"
                style={{ maxWidth: "200px", height: "auto", margin: "0 auto" }}
              />
              <Card.Body>
                <Card.Title className="h6" style={{ fontWeight: "bold", color: "black" }}>Elegant Velvet Collar</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "black" }}>
                  With Safety Buckle. This luxurious velvet collar is not only stylish but also comfortable for your cat. The safety buckle ensures that your cat can move freely without any risk, making it ideal for both indoor and outdoor cats.
                </Card.Text>
                <span className="badge bg-success">Cat Chic</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Toys */}
      <Container id="toys" className="my-5 pt-4">
        <h4 className="fw-bold mb-4" style={{ color: "white" }}>Top Cat Toys</h4>
        <Row className="g-4">
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="text-center shadow-sm border-0">
              <Card.Img
                variant="top"
                src="/images/renamed_pets/cat/feather.jpeg"
                style={{ maxWidth: "200px", height: "auto", margin: "0 auto" }}
              />
              <Card.Body>
                <Card.Title className="h6" style={{ fontWeight: "bold", color: "black" }}>Feather Teaser Wand</Card.Title>
                <Card.Text style={{ fontWeight: "bold", color: "black" }}>
                  Interactive & Fun. This feather teaser wand is designed to keep your cat entertained for hours! Perfect for exercise and bonding, the wand helps mimic prey movement, promoting your cat's natural hunting instincts while providing lots of physical and mental stimulation.
                </Card.Text>
                <span className="badge bg-success">Bestseller</span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Our Story */}
      <Container id="ourstory" className="my-5 pt-4">
        <h4 className="fw-bold mb-3" style={{ color: "white" }}>Our Story</h4>
        <p style={{ color: "white" }}>
          At Meow Mart, we believe cats rule the world — and rightly so! That’s why we go the extra mile to
          recommend quality, comfort, and fun for your furry royalty. From nutrition to nap time,
          your cat deserves the very best.
        </p>
      </Container>

      {/* Footer */}
      <footer className="text-center py-4 bg-light mt-5">
        <small>© 2025 Meow Mart. Purrfectly Yours 🐾</small>
      </footer>
    </div>
  );
};

export default CatRecommendation;
