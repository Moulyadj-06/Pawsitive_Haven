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

        

        {/* ML Model Overview */}
        <div className="col-md-12 mt-4">
          <div className="p-4 bg-white border rounded shadow-sm">
            <h5 className="text-primary fw-bold">🧠 Pet Adoption Prediction Model – Overview</h5>
            <p>
              This dashboard integrates a <strong>Machine Learning model</strong> to help predict whether a pet is likely to be adopted. 
              This tool assists shelters and admins in identifying pets that have a higher chance of finding a home, 
              so that special care or promotion can be given to those with lower adoption probabilities.
            </p>
            <ul>
              <li><strong>Features used:</strong> Animal type, gender, breed, and vaccination status</li>
              <li><strong>Prediction output:</strong> 
                <span className="text-success"> "Adoptable" </span> or 
                <span className="text-danger"> "Not Adoptable"</span>
              </li>
              <li><strong>Accuracy:</strong> <span className="text-primary fw-bold">93.54%</span> overall</li>
              <li><strong>Adoptable Pets:</strong> 96% precision & recall — great at identifying pets likely to be adopted 🐕</li>
              <li><strong>Not Adoptable Pets:</strong> 71% precision & recall — useful but can be improved 🐾</li>
            </ul>
            <div className="alert alert-info mt-3 mb-0" role="alert">
              📊 This predictive system helps streamline decisions, boost adoption rates, and ensure no pet is left behind!
            </div>
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
