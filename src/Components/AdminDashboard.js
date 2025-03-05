// AdminDashboard.js
import React, { useState } from "react";

const AdminDashboard = () => {
  const [adoptRequests, setAdoptRequests] = useState([
    { id: 1, name: "John Doe", pet: "Buddy", status: "Pending" },
    { id: 2, name: "Jane Smith", pet: "Milo", status: "Pending" },
  ]);

  const handleDecision = (id, decision) => {
    setAdoptRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      )
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Dashboard - Adoption Requests</h2>
      <table border="1" style={{ width: "50%", margin: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pet</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adoptRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.pet}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "Pending" && (
                  <>
                    <button onClick={() => handleDecision(request.id, "Accepted")}>
                      ✅ Accept
                    </button>
                    <button onClick={() => handleDecision(request.id, "Rejected")}>
                      ❌ Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
