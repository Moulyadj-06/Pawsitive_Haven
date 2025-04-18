import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(135deg, #ff6b81, #f8b500)',
          padding: '50px 0',
          color: '#fff',
          minHeight: '100vh',
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <h1 className="display-3 mb-4">About Us</h1>
              <p className="lead">
                Welcome to Pawsitive Heaven! We are dedicated to finding loving homes for
                pets in need and helping you find your perfect companion.
              </p>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-md-6">
              <div className="card bg-dark text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Our Mission</h5>
                  <p className="card-text">
                    Our mission is to provide a seamless platform for people to adopt
                    pets while promoting responsible pet ownership. We aim to reduce the
                    number of homeless animals and ensure every pet finds a loving family.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card bg-dark text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Our Vision</h5>
                  <p className="card-text">
                    We envision a world where all pets are cared for and live a life of
                    happiness and health in their forever homes. We also strive to build
                    a community that supports and promotes ethical pet ownership practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <h2>What We Do</h2>
              <p>
                At Pawsitive Heaven, we offer a variety of services to ensure that every pet
                finds their forever home:
              </p>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>
                  <strong>Pet Adoption:</strong> We help connect potential pet owners with
                  adoptable animals, ensuring each pet is placed in a safe, loving environment.
                </li>
                
                
                <li>
                  <strong>Pet Recommendation:</strong> We offer personalized recommendations
                  for food, toys, and clothes based on your pet's character traits, ensuring
                  they get the right items for a happy and healthy life.
                </li>
               
                  
              </ul>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <h2>Contact Us</h2>
              <p>If you have any questions, feel free to reach out to us!</p>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>
                  <strong>Email:</strong> support@pawsitiveheaven.com
                </li>
                <li>
                  <strong>Phone:</strong> +123 456 7890
                </li>
                <li>
                  <strong>Address:</strong> 123 Adoption St., Pet City, PC 12345
                </li>
              </ul>
              <a
                href="mailto:support@pawsitiveheaven.com"
                className="btn btn-outline-light"
                style={{
                  borderRadius: '30px',
                  padding: '10px 25px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="about-us"
        style={{
          backgroundColor: '#343a40',
          color: '#fff',
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2>Our Commitment</h2>
          <p>
            At Pawsitive Heaven, we are committed to ensuring that every pet is treated with
            kindness and respect. We believe in the power of adoption to change lives and
            reduce the number of animals in need. Whether you are adopting, shopping, or
            seeking advice, we are here to help make pet care easier and more enjoyable for
            everyone.
          </p>
          <a href="#subscribe" className="btn btn-success" style={{ borderRadius: '5px', padding: '10px 20px' }}>
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
