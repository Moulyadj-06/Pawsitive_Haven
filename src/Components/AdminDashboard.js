import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const requestsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/adoptPetRequests");
      setRequests(res.data);
    } catch (err) {
      setError("Failed to fetch adoption requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedRequests.includes(id)) {
      setSelectedRequests(selectedRequests.filter((reqId) => reqId !== id));
    } else {
      setSelectedRequests([...selectedRequests, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRequests([]);
    } else {
      const ids = currentRequests.map((req) => req._id);
      setSelectedRequests(ids);
    }
    setSelectAll(!selectAll);
  };

  const handleBulkUpdate = async () => {
    if (!bulkStatus || selectedRequests.length === 0) return;

    try {
      const res = await axios.put("http://localhost:3001/api/adoptPetRequests/bulk-update", {
        ids: selectedRequests,
        status: bulkStatus,
      });

      if (res.status === 200) {
        setRequests((prev) =>
          prev.map((req) =>
            selectedRequests.includes(req._id) ? { ...req, status: bulkStatus } : req
          )
        );
        setSelectedRequests([]);
        setSelectAll(false);
        setBulkStatus("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      setError("Failed to perform bulk update.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/adoptPetRequests/${id}`, { status });
      if (res.status === 200) {
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? { ...req, status: status } : req))
        );
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      setError("Failed to update request status.");
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter !== "All" && req.status !== filter) return false;
    return (
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "50px 0",
      background: "linear-gradient(135deg,rgb(116, 149, 199) 0%,rgb(64, 130, 236) 100%)",
      backgroundAttachment: "fixed"
    }}>
      <Container className="my-5">
        {/* Back Button with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => navigate("/admin-login")}
            className="mb-4 rounded-pill shadow-sm"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              padding: "10px 25px",
              fontWeight: "600",
              color: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            ← Back to Admin Login
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h1 style={{
            color: "#2c3e50",
            fontWeight: "700",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            position: "relative",
            display: "inline-block"
          }}>
            Adoption Requests
            <motion.div
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "0",
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)",
                borderRadius: "2px"
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h1>
          <p className="text-muted">Manage all pet adoption applications</p>
        </motion.div>

        {/* Success Alert with Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                variant="success" 
                onClose={() => setShowSuccess(false)} 
                dismissible
                style={{
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  borderLeft: "5px solid #28a745",
                  background: "linear-gradient(135deg, #d4edda, #c3e6cb)"
                }}
              >
                <strong>Success!</strong> Status updated successfully!
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Spinner 
              animation="grow" 
              variant="primary" 
              style={{ 
                width: "3rem", 
                height: "3rem",
                background: "radial-gradient(circle, #667eea, #764ba2)"
              }} 
            />
            <p className="mt-3" style={{ color: "#6c757d" }}>Loading adoption requests...</p>
          </motion.div>
        )}
        
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert variant="danger" style={{
              background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
              color: "white",
              border: "none",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}>
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div 
          className="mb-4 p-4 rounded"
          style={{ 
            backgroundColor: "rgba(255,255,255,0.8)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Form.Control
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
            style={{
              borderRadius: "50px",
              padding: "12px 20px",
              border: "1px solid #ced4da",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              background: "rgba(255,255,255,0.7)"
            }}
          />
          <div className="d-flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant={filter === "All" ? "primary" : "outline-primary"} 
                onClick={() => setFilter("All")}
                className="rounded-pill"
                style={{
                  borderWidth: "2px",
                  fontWeight: "500"
                }}
              >
                All Requests
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant={filter === "Accepted" ? "success" : "outline-success"} 
                onClick={() => setFilter("Accepted")}
                className="rounded-pill"
                style={{
                  borderWidth: "2px",
                  fontWeight: "500"
                }}
              >
                Accepted
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant={filter === "Rejected" ? "danger" : "outline-danger"} 
                onClick={() => setFilter("Rejected")}
                className="rounded-pill"
                style={{
                  borderWidth: "2px",
                  fontWeight: "500"
                }}
              >
                Rejected
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bulk Update Controls */}
        <motion.div 
          className="d-flex align-items-center gap-3 mb-4 p-3 rounded"
          style={{
            backgroundColor: "rgba(233, 236, 239, 0.7)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            backdropFilter: "blur(5px)"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Form.Check 
            type="checkbox" 
            checked={selectAll} 
            onChange={handleSelectAll} 
            label={<span style={{ fontWeight: "500" }}>Select All</span>}
            className="me-3"
          />
          <Form.Select 
            value={bulkStatus} 
            onChange={(e) => setBulkStatus(e.target.value)} 
            style={{ 
              maxWidth: "200px",
              borderRadius: "50px",
              border: "2px solid #ced4da",
              background: "rgba(255,255,255,0.7)"
            }}
          >
            <option value="">Bulk Update Status</option>
            <option value="Accepted">Accept Selected</option>
            <option value="Rejected">Reject Selected</option>
          </Form.Select>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="dark" 
              onClick={handleBulkUpdate} 
              disabled={!bulkStatus || selectedRequests.length === 0}
              className="rounded-pill px-4"
              style={{
                background: "linear-gradient(135deg, #434343, #000000)",
                border: "none",
                fontWeight: "500",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              Apply Changes
            </Button>
          </motion.div>
          {selectedRequests.length > 0 && (
            <motion.span 
              className="ms-auto badge bg-primary rounded-pill"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              {selectedRequests.length} selected
            </motion.span>
          )}
        </motion.div>

        {/* Cards */}
        <Row className="g-4">
          <AnimatePresence>
            {currentRequests.map((req) => (
              <Col md={6} lg={4} key={req._id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card 
                    style={{ 
                      border: "none",
                      borderRadius: "15px",
                      overflow: "hidden",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      background: "rgba(255,255,255,0.8)",
                      backdropFilter: "blur(5px)"
                    }}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Form.Check
                          type="checkbox"
                          checked={selectedRequests.includes(req._id)}
                          onChange={() => handleCheckboxChange(req._id)}
                          className="custom-checkbox"
                        />
                        <motion.span 
                          className={`badge rounded-pill ${
                            req.status === "Accepted" ? "bg-success" :
                            req.status === "Rejected" ? "bg-danger" : "bg-secondary"
                          }`}
                          style={{
                            fontSize: "0.8rem",
                            padding: "5px 10px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {req.status}
                        </motion.span>
                      </div>
                      
                      <Card.Title className="mb-3" style={{ color: "#2c3e50" }}>
                        {req.name}
                        <small className="d-block text-muted">{req.email}</small>
                      </Card.Title>
                      
                      <Card.Text style={{ color: "#495057" }}>
                        <div className="mb-2">
                          <strong>Pet:</strong> {req.petName} ({req.petType})
                        </div>
                        <div className="mb-2">
                          <strong>Breed:</strong> {req.breed}
                        </div>
                        <div className="mb-2">
                          <strong>Origin:</strong> {req.origin}
                        </div>
                        <div className="mb-2">
                          <strong>Fee:</strong> <span className="text-success">₹{req.adoptionFee}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Phone:</strong> {req.phone}
                        </div>
                        <div className="mb-3">
                          <strong>Address:</strong> {req.address}
                        </div>
                      </Card.Text>
                      
                      <div className="d-flex justify-content-between">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="success" 
                            onClick={() => updateStatus(req._id, "Accepted")} 
                            disabled={req.status === "Accepted"}
                            className="rounded-pill px-4"
                            style={{
                              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                              border: "none",
                              fontWeight: "500",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                            }}
                          >
                            Accept
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="danger" 
                            onClick={() => updateStatus(req._id, "Rejected")} 
                            disabled={req.status === "Rejected"}
                            className="rounded-pill px-4"
                            style={{
                              background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
                              border: "none",
                              fontWeight: "500",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                            }}
                          >
                            Reject
                          </Button>
                        </motion.div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </AnimatePresence>
        </Row>

        {/* Empty State */}
        {!loading && currentRequests.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <i className="bi bi-inbox" style={{ fontSize: "3rem", color: "#6c757d" }}></i>
            </div>
            <h4 className="text-muted">No adoption requests found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredRequests.length > requestsPerPage && (
          <motion.div 
            className="d-flex justify-content-center mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <Button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="page-link rounded-pill mx-1"
                    style={{
                      border: "none",
                      fontWeight: "500",
                      background: "transparent",
                      color: "#495057"
                    }}
                  >
                    Previous
                  </Button>
                </li>
                
                {Array.from({ length: Math.ceil(filteredRequests.length / requestsPerPage) }).map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <Button 
                      onClick={() => handlePageChange(index + 1)}
                      className="page-link rounded-circle mx-1"
                      style={{
                        minWidth: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: currentPage === index + 1 ? "none" : "1px solid #dee2e6",
                        fontWeight: "500",
                        background: currentPage === index + 1 ? 
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "transparent",
                        color: currentPage === index + 1 ? "white" : "#495057"
                      }}
                    >
                      {index + 1}
                    </Button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === Math.ceil(filteredRequests.length / requestsPerPage) ? 'disabled' : ''}`}>
                  <Button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === Math.ceil(filteredRequests.length / requestsPerPage)}
                    className="page-link rounded-pill mx-1"
                    style={{
                      border: "none",
                      fontWeight: "500",
                      background: "transparent",
                      color: "#495057"
                    }}
                  >
                    Next
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </Container>
    </div>
  );
}

export default AdminDashboard;