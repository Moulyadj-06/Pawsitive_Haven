import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CatRecommendation = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cat Recommendations</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Food</h5>
              <p className="card-text">
                For your feline friend, **Royal Canin** and **Hill's Science Diet** provide nutritionally balanced options that support healthy coats and digestion.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Toys</h5>
              <p className="card-text">
                Interactive toys such as **PetSafe Pounce** or **SmartyKat** can keep your cat engaged. Additionally, scratching posts and wands are excellent for their physical and mental health.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Accessories</h5>
              <p className="card-text">
                **Catit Design Senses** provides unique cat furniture that satisfies their climbing instincts, and **LitterMaid** automatic litter boxes keep your cat’s environment clean and odor-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatRecommendation;
