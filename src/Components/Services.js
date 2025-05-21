import { 
  Container, Row, Col, Card, Carousel, Button, Form 
} from 'react-bootstrap';
import { 
  FaPaw, FaWalking, FaHome, FaMedkit, FaQuoteLeft,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeart
} from 'react-icons/fa';
import { GiDogBowl, GiCat } from 'react-icons/gi';

const Services = () => {
  // Services data
  const services = [
    {
      title: "Dog Walking",
      icon: <FaWalking size={40} className="text-info mb-3" />,
      description: "Professional dog walking services to keep your pet active and healthy.",
      bg: "bg-info bg-opacity-10"
    },
    {
      title: "Pet Sitting",
      icon: <FaHome size={40} className="text-success mb-3" />,
      description: "In-home pet sitting while you're away, maintaining your pet's routine.",
      bg: "bg-success bg-opacity-10"
    },
    {
      title: "Overnight Care",
      icon: <FaPaw size={40} className="text-warning mb-3" />,
      description: "24/7 care for your pet with overnight stays at your home.",
      bg: "bg-warning bg-opacity-10"
    },
    {
      title: "Pet Medical",
      icon: <FaMedkit size={40} className="text-danger mb-3" />,
      description: "Basic medical care and medication administration for your pets.",
      bg: "bg-danger bg-opacity-10"
    }
  ];

  // Pricing plans data
  const plans = [
    {
      name: "Friendly Pack",
      price: "$100",
      duration: "Day care",
      features: [
        "15 Days service",
        "Pet shower",
        "Interactive Checkup",
        "Grooming",
        "Hair & Hair Cut"
      ],
      popular: false
    },
    {
      name: "Exclusive Pack",
      price: "$175",
      duration: "2X care",
      features: [
        "15 Days service",
        "Pet shower",
        "Interactive Checkup",
        "Grooming",
        "Hair & Hair Cut",
        "Controls Hair Filling",
        "Fresh Snack",
        "Pet park & games"
      ],
      popular: true
    },
    {
      name: "Family Pack",
      price: "$200",
      duration: "4X care",
      features: [
        "15 Days service",
        "Pet shower",
        "Interactive Checkup",
        "Grooming",
        "Hair & Hair Cut"
      ],
      popular: false
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Mary watched our 17 year old Mattees for a week & went above and beyond her duties! She came to our house 4 times a day & always gave us updates on how she was doing!",
      author: "Happy Client",
      pet: <GiDogBowl size={24} className="text-primary" />
    },
    {
      quote: "She was wonderful! She sent me pictures everyday & had great communication! My baby loved her as well. Thank you so much. I will definitely be using her again in the future.",
      author: "Satisfied Customer",
      pet: <GiCat size={24} className="text-info" />
    },
    {
      quote: "Mary was great!! We contacted easily at our meet-up. We needed a little extra care since our kitty had some recent health issues & Lynn was available to meet the need.",
      author: "Pet Owner",
      pet: <GiCat size={24} className="text-info" />
    }
  ];

  return (
    <>
      {/* Services Section with Paws Background */}
      <section className="py-5 position-relative" style={{ 
        backgroundColor: '#f8f9fa',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23e9ecef\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
      }}>
        <Container>
          <h2 className="text-center mb-5 text-primary">Our Services</h2>
          <p className="text-center mb-5 lead">Services That Speak To Your Pet's Happiness</p>
          
          <Row>
            {services.map((service, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className={`h-100 border-0 shadow-sm ${service.bg} transition-all`} 
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Body className="text-center p-4">
                    {service.icon}
                    <Card.Title className="fw-bold">{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                    <div className="position-absolute bottom-0 end-0 m-3">
                      <FaPaw className="text-muted opacity-25" size={24} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Pricing Section with Gradient Background */}
      <section className="py-5 position-relative" style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232196F3\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <Container>
          <h2 className="text-center mb-4 text-secondary">Pricing Plan</h2>
          <p className="text-center lead mb-5">Special Packages for Your Pet's Needs</p>
          
          <Row className="g-4">
            {plans.map((plan, index) => (
              <Col md={4} key={index}>
                <Card className={`h-100 border-0 shadow-sm overflow-hidden transition-all ${plan.popular ? "border-primary border-2" : ""}`}
                  style={{ transition: 'all 0.3s ease' }}>
                  {plan.popular && (
                    <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 small fw-bold">
                      POPULAR
                    </div>
                  )}
                  <Card.Body className="p-4 position-relative">
                    {plan.popular && (
                      <div className="position-absolute top-0 start-0 mt-2 ms-2">
                        <FaHeart className="text-danger" />
                      </div>
                    )}
                    <h3 className="text-center">{plan.name}</h3>
                    <h2 className="text-center my-4 text-primary">{plan.price}</h2>
                    <p className="text-center text-muted mb-4">{plan.duration}</p>
                    
                    <ul className="list-unstyled mb-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="mb-2">
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="d-grid">
                      <Button 
                        variant={plan.popular ? "primary" : "outline-primary"}
                        className="fw-bold position-relative overflow-hidden"
                        style={{ transition: 'all 0.3s' }}
                        onMouseEnter={e => {
                          if (!plan.popular) {
                            e.target.style.backgroundColor = '#0d6efd';
                            e.target.style.color = 'white';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!plan.popular) {
                            e.target.style.backgroundColor = '';
                            e.target.style.color = '';
                          }
                        }}
                      >
                        Buy now
                        <span className="position-absolute top-0 end-0 bg-white bg-opacity-25 w-100 h-100" 
                          style={{ transform: 'translateX(100%)', transition: 'transform 0.3s' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(0)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'translateX(100%)'}>
                        </span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section with Pet Pattern */}
      <section className="py-5 position-relative" style={{
        backgroundColor: '#fff9f9',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffc1cc\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}>
        <Container>
          <h2 className="text-center mb-5" style={{ color: '#d63384' }}>Reviews from Clients</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel indicators={false} interval={3000}>
                {testimonials.map((testimonial, index) => (
                  <Carousel.Item key={index}>
                    <Card className="border-0 bg-transparent">
                      <Card.Body className="text-center py-4 position-relative">
                        <div className="position-absolute top-0 start-0 mt-3 ms-3">
                          {testimonial.pet}
                        </div>
                        <FaQuoteLeft size={32} className="mb-3" style={{ color: '#fd7e14' }} />
                        <p className="lead mb-4 fst-italic" style={{ color: '#495057' }}>
                          "{testimonial.quote}"
                        </p>
                        <p className="text-muted fw-bold">— {testimonial.author}</p>
                        <div className="text-warning">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <div className="position-absolute bottom-0 end-0 mb-3 me-3">
                          <FaPaw className="text-muted opacity-25" />
                        </div>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section with Diagonal Gradient */}
      <section className="py-5 position-relative overflow-hidden" id="contact" style={{
        background: 'linear-gradient(45deg, #e3f2fd 0%, #bbdefb 100%)'
      }}>
        <div className="position-absolute top-0 end-0 w-50 h-100 opacity-10">
          <GiDogBowl className="w-100 h-100" style={{ fontSize: '20rem' }} />
        </div>
        <div className="position-absolute bottom-0 start-0 w-50 h-100 opacity-10">
          <GiCat className="w-100 h-100" style={{ fontSize: '20rem' }} />
        </div>
        <Container className="position-relative">
          <h2 className="text-center mb-5" style={{ color: '#0d47a1' }}>Contact Us</h2>
          <Row className="mb-5">
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)'
              }}>
                <Card.Body className="p-4">
                  <h3 className="mb-4" style={{ color: '#1976d2' }}>Get In Touch</h3>
                  <div className="mb-4 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <FaPhone size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="mb-1">Phone Number</h5>
                      <p className="text-muted mb-0">+91 9845647890</p>
                    </div>
                  </div>
                  <div className="mb-4 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <FaEnvelope size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="mb-1">Business Email</h5>
                      <p className="text-muted mb-0">contact@mpawsitive_haven.com</p>
                    </div>
                  </div>
                  <div className="mb-4 d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <FaMapMarkerAlt size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="mb-1">Location</h5>
                      <p className="text-muted mb-0">K Narayanapyura, 560077</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <FaPaw className="text-primary me-2" />
                    <FaPaw className="text-primary me-2" />
                    <FaPaw className="text-primary" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)'
              }}>
                <Card.Body className="p-4">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        className="border-0 shadow-sm"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        className="border-0 shadow-sm"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        className="border-0 shadow-sm"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Service Needed</Form.Label>
                      <Form.Select className="border-0 shadow-sm">
                        <option>Select a service</option>
                        <option>Dog Walking</option>
                        <option>Pet Sitting</option>
                        <option>Overnight Care</option>
                        <option>Pet Medical</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Your message" 
                        className="border-0 shadow-sm"
                      />
                    </Form.Group>
                    <Button 
                      variant="primary" 
                      type="submit"
                      className="w-100 fw-bold position-relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(45deg, #1976d2, #0d47a1)',
                        border: 'none',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={e => {
                        e.target.style.background = 'linear-gradient(45deg, #0d47a1, #1976d2)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.background = 'linear-gradient(45deg, #1976d2, #0d47a1)';
                      }}
                    >
                      Send Message
                      <span className="position-absolute top-0 end-0 bg-white bg-opacity-25 w-100 h-100" 
                        style={{ transform: 'translateX(100%)', transition: 'transform 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateX(0)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateX(100%)'}>
                      </span>
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Services;