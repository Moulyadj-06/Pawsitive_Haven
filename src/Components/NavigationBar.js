import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      style={{
        background: "#ffffff",
        padding: "10px 20px",
        borderRadius: "0 0 15px 15px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderBottom: "3px solid rgba(0, 0, 0, 0.05)"
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#4a00e0",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            fontFamily: "'Poppins', sans-serif"
          }}
          className="hover-glow"
        >
          🐾 Pet Adoption
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="navbar-nav" 
          className="border-0"
          style={{
            color: "#4a00e0",
          }}
        />

        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="gap-1">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: location.pathname === "/" ? "#4a00e0" : "#555",
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "8px",
                background: location.pathname === "/" ? "rgba(74, 0, 224, 0.1)" : "transparent",
                borderBottom: location.pathname === "/" ? "3px solid #ff9a9e" : "none",
                transition: "all 0.3s ease",
                margin: "0 5px",
              }}
              className="nav-link-hover"
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/powerbi"
              style={{
                color: location.pathname === "/powerbi" ? "#4a00e0" : "#555",
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "8px",
                background: location.pathname === "/powerbi" ? "rgba(74, 0, 224, 0.1)" : "transparent",
                borderBottom: location.pathname === "/powerbi" ? "3px solid #a18cd1" : "none",
                transition: "all 0.3s ease",
                margin: "0 5px",
              }}
              className="nav-link-hover"
            >
              Analytics
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/search-pet"
              style={{
                color: location.pathname === "/search-pet" ? "#4a00e0" : "#555",
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "8px",
                background: location.pathname === "/search-pet" ? "rgba(74, 0, 224, 0.1)" : "transparent",
                borderBottom: location.pathname === "/search-pet" ? "3px solid #84fab0" : "none",
                transition: "all 0.3s ease",
                margin: "0 5px",
              }}
              className="nav-link-hover"
            >
              Search a Pet
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about-us"
              style={{
                color: location.pathname === "/about-us" ? "#4a00e0" : "#555",
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "8px",
                background: location.pathname === "/about-us" ? "rgba(74, 0, 224, 0.1)" : "transparent",
                borderBottom: location.pathname === "/about-us" ? "3px solid #fbc2eb" : "none",
                transition: "all 0.3s ease",
                margin: "0 5px",
              }}
              className="nav-link-hover"
            >
              About Us
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/admin-login"
              style={{
                color: location.pathname === "/admin-login" ? "#4a00e0" : "#555",
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "10px 20px",
                borderRadius: "8px",
                background: location.pathname === "/admin-login" ? "rgba(74, 0, 224, 0.1)" : "transparent",
                borderBottom: location.pathname === "/admin-login" ? "3px solid #f6d365" : "none",
                transition: "all 0.3s ease",
                margin: "0 5px",
              }}
              className="nav-link-hover"
            >
              Admin Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Add this to your global CSS or style tag */}
      <style>{`
        .hover-glow:hover {
          text-shadow: 0 0 5px rgba(74, 0, 224, 0.3);
          transform: scale(1.02);
        }
        .nav-link-hover:hover {
          background: rgba(74, 0, 224, 0.08) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          color: #4a00e0 !important;
        }
        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.25rem rgba(74, 0, 224, 0.2);
        }
      `}</style>
    </Navbar>
  );
};

export default NavigationBar;