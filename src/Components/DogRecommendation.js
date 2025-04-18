import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DogRecommendation = () => {
  return (
    <div className="container my-5" style={{ backgroundColor: '#f0f8ff', padding: '30px', borderRadius: '15px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}>
      <h2 className="text-center mb-4" style={{ color: '#007bff', fontWeight: 'bold' }}>Dog Recommendations</h2>

      <div>
        <h4 style={{ color: '#28a745' }}>Food:</h4>
        <p>
          For active dogs, we recommend **Hill's Science Diet** or **Blue Buffalo** dry food, rich in protein to support muscle health. If your dog is picky, try wet food options like **Royal Canin** or **Wellness Core** for more variety.
        </p>
        <img src="https://via.placeholder.com/200" alt="Dog Food" className="img-fluid mt-2 rounded shadow-sm" />
      </div>

      <div className="mt-4">
        <h4 style={{ color: '#28a745' }}>Toys:</h4>
        <p>
          Strong chewers will love the durable **KONG Classic** or **Nylabone** toys. For mental stimulation, try puzzle toys from **Outward Hound**—perfect for keeping your dog engaged and active.
        </p>
        <img src="https://via.placeholder.com/200" alt="Dog Toy" className="img-fluid mt-2 rounded shadow-sm" />
      </div>

      <div className="mt-4">
        <h4 style={{ color: '#28a745' }}>Accessories:</h4>
        <p>
          For comfortable walks, consider an adjustable **PetSafe Easy Walk** harness to reduce pulling. For older dogs or those with joint issues, an orthopedic bed like **PetFusion** provides excellent support.
        </p>
        <img src="https://via.placeholder.com/200" alt="Dog Accessories" className="img-fluid mt-2 rounded shadow-sm" />
      </div>
    </div>
  );
};

export default DogRecommendation;
