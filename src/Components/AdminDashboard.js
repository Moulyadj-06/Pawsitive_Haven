import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // <-- Added for navigation

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
  const navigate = useNavigate(); // <-- Navigation hook

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
  
    console.log("Selected IDs:", selectedRequests); // Log selected request IDs
    console.log("Bulk Status:", bulkStatus); // Log bulk status
  
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

        setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3s
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

  return (
    <div style={{ backgroundColor: "	#BDAE58", height: "1000vh", padding: "50px" }}>
    
    <Container className="my-5">
      {/* Back Button */}
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/admin-login")} // <-- Navigates to Admin Login page
        className="mb-3"
      >
        ← Back to Admin Login
      </Button>

      <h2 className="mb-4 text-center">Adoption Requests</h2>

       {/* ✅ Success Alert */}
       {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Status updated successfully!
        </Alert>
      )}

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search and Filters */}
      <div className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-2">
          <Button
            variant={filter === "All" ? "primary" : "outline-primary"}
            onClick={() => setFilter("All")}
            className="mr-2"
          >
            All
          </Button>
          <Button
            variant={filter === "Accepted" ? "success" : "outline-success"}
            onClick={() => setFilter("Accepted")}
            className="mr-2"
          >
            Accepted
          </Button>
          <Button
            variant={filter === "Rejected" ? "danger" : "outline-danger"}
            onClick={() => setFilter("Rejected")}
          >
            Rejected
          </Button>
        </div>
      </div>

      {/* Bulk Update Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Check
          type="checkbox"
          label="Select All"
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <Form.Select
          value={bulkStatus}
          onChange={(e) => setBulkStatus(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="">Change Status...</option>
          <option value="Accepted">Accept</option>
          <option value="Rejected">Reject</option>
        </Form.Select>
        <Button 
        variant="primary"
        onClick={handleBulkUpdate}
        disabled={!bulkStatus || selectedRequests.length === 0}
        >
          Update Selected
        </Button>
        
      </div>

      {/* Cards */}
      <Row>
        {currentRequests.map((req) => (
          <Col md={6} lg={4} key={req._id} className="mb-4">
            <Card>
              <Card.Body>
                <Form.Check
                  type="checkbox"
                  checked={selectedRequests.includes(req._id)}
                  onChange={() => handleCheckboxChange(req._id)}
                  className="mb-2"
                />
                <Card.Title>{req.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{req.email}</Card.Subtitle>
                <Card.Text>
                  <strong>Pet:</strong> {req.petName} ({req.petType})<br />
                  <strong>Breed:</strong> {req.breed}<br />
                  <strong>Origin:</strong> {req.origin}<br />
                  <strong>Fee:</strong> ₹{req.adoptionFee}<br />
                  <strong>Phone:</strong> {req.phone}<br />
                  <strong>Address:</strong> {req.address}<br />
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge bg-${
                      req.status === "Accepted"
                        ? "success"
                        : req.status === "Rejected"
                        ? "danger"
                        : "secondary"
                    }`}
                  >
                    {req.status}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => updateStatus(req._id, "Accepted")}
                    disabled={req.status === "Accepted"}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => updateStatus(req._id, "Rejected")}
                    disabled={req.status === "Rejected"}
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2">
          Page {currentPage} of {Math.ceil(filteredRequests.length / requestsPerPage)}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredRequests.length / requestsPerPage)}
        >
          Next
        </Button>
      </div>
    </Container>
    </div>
  );
}

export default AdminDashboard;