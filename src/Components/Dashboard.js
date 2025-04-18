import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUserDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <div className="container mt-5 p-4 rounded shadow" style={{ backgroundColor: "#e6f7ff" }}>
      <h2 className="text-center mb-4 text-primary fw-bold">
        🐾 Dashboard Overview 🐾
      </h2>

      <div className="text-center mb-4">
        <button
          className="btn btn-primary btn-lg rounded-pill shadow-sm"
          onClick={handleUserDashboard}
        >
          Go to User Dashboard
        </button>
      </div>

      <div className="row text-start">
        {/* Dog Section */}
        <div className="col-md-6 mb-4">
          <div className="p-4 border rounded shadow-sm h-100" style={{ backgroundColor: "#fffaf0" }}>
            <h4 className="text-success">🐶 Dog Section</h4>
            <ul className="mb-2">
              <li><strong>Popular Breeds:</strong> Labrador, Beagle, Golden Retriever</li>
              <li><strong>Recommended Items:</strong> Puzzle toys, Orthopedic beds, Grain-free high-protein diet</li>
              <li><strong>Daily Routine:</strong> 2+ walks/day, fetch games, cuddle sessions</li>
              <li><strong>Grooming Needs:</strong> Weekly brushing, ear cleaning, nail trimming</li>
              <li><strong>Health Tip:</strong> Vaccinations, tick/flea treatments, dental checkups</li>
            </ul>
            <div className="text-muted fst-italic">🐕 Happy dogs are active, loved, and healthy!</div>
          </div>
        </div>

        {/* Cat Section */}
        <div className="col-md-6 mb-4">
          <div className="p-4 border rounded shadow-sm h-100" style={{ backgroundColor: "#f0f8ff" }}>
            <h4 className="text-info">🐱 Cat Section</h4>
            <ul className="mb-2">
              <li><strong>Popular Breeds:</strong> Persian, Siamese, Maine Coon</li>
              <li><strong>Recommended Items:</strong> Cozy beds, window perches, wet+dry food mix</li>
              <li><strong>Daily Routine:</strong> Laser play, sunny naps, gentle interactions</li>
              <li><strong>Grooming Needs:</strong> Brushing, claw trimming, litter care</li>
              <li><strong>Health Tip:</strong> Deworming, vaccinations, fresh water always</li>
            </ul>
            <div className="text-muted fst-italic">🐈 Calm cats thrive in clean, cozy spaces.</div>
          </div>
        </div>

        {/* Adoption Summary */}
        <div className="col-md-12 mb-4">
          <div className="p-4 bg-white border rounded shadow-sm">
            <h5 className="text-warning fw-bold">📈 Adoption Summary</h5>
            <div className="row text-center">
              <div className="col-md-3">
                <div className="bg-light p-3 rounded shadow-sm">
                  <h6 className="text-secondary">Total Requests</h6>
                  <p className="fs-4 fw-bold text-dark">152</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-light p-3 rounded shadow-sm">
                  <h6 className="text-success">Approved</h6>
                  <p className="fs-4 fw-bold text-success">89</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-light p-3 rounded shadow-sm">
                  <h6 className="text-danger">Pending</h6>
                  <p className="fs-4 fw-bold text-danger">42</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-light p-3 rounded shadow-sm">
                  <h6 className="text-primary">Top Pet Type</h6>
                  <p className="fs-4 fw-bold text-primary">Dogs 🐶</p>
                </div>
              </div>
            </div>
            <p className="text-muted mt-3 fst-italic">
              Stay on top of approvals to keep the adoption process smooth and timely! 🕒
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="col-md-12 mt-2">
          <div className="p-4 bg-light border rounded shadow-sm">
            <h5 className="text-dark">✨ Admin Quick Tips</h5>
            <ul>
              <li><span className="text-primary">✔ Keep listings fresh:</span> New updates = more visibility!</li>
              <li><span className="text-primary">✔ Use vibrant images:</span> Close-up pet faces work wonders!</li>
              <li><span className="text-primary">✔ Promote timely adoption:</span> Share pets on social media.</li>
              <li><span className="text-primary">✔ Highlight stories:</span> Adoption success stories inspire others.</li>
            </ul>
            <p className="text-muted fst-italic">
              Want more engagement? Next, we can add charts, upcoming events, or a message center!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
