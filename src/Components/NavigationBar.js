import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(90deg, #f8b500, #ff6b81)",
        padding: "10px 20px",
        borderRadius: "10px",
      }}
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            textShadow: "1px 1px 5px rgba(0,0,0,0.3)",
          }}
        >
          🐾 Pet Adoption
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="gap-3">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: location.pathname === "/" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/powerbi"
              style={{
                color: location.pathname === "/powerbi" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/powerbi" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              Analytics
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/search-pet"
              style={{
                color: location.pathname === "/search-pet" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/search-pet" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              Search a Pet
            </Nav.Link>

            {/* <Nav.Link
              as={Link}
              to="/about-us"
              style={{
                color: location.pathname === "/about-us" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/about-us" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              About Us
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/admin-login"
              style={{
                color: location.pathname === "/admin-login" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/admin-login" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              Admin Login
            </Nav.Link> */}



            <Nav.Link
              as={Link}
              to="/cat-recommendations"
              style={{
                color: location.pathname === "/cat-recommendations" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/cat-recommendations" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              cat-recommendations
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/dog-recommendations"
              style={{
                color: location.pathname === "/dog-recommendations" ? "#fff" : "#f1f1f1",
                fontSize: "1.1rem",
                fontWeight: "500",
                padding: "8px 15px",
                borderBottom: location.pathname === "/dog-recommendations" ? "2px solid white" : "none",
                transition: "0.3s",
              }}
            >
              dog recommendations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
