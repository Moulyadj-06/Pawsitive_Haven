import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDog, FaCat } from "react-icons/fa"; // Cleaned up imports


// Sample images for each item (replace these with actual image paths)
const imageUrls = {
  dogFood: "https://via.placeholder.com/100?text=Dog+Food",
  catFood: "https://via.placeholder.com/100?text=Cat+Food",
  shampoo: "https://via.placeholder.com/100?text=Shampoo",
  leash: "https://via.placeholder.com/100?text=Leash",
  // Add more as needed...
};

const recommendations = {
  Dog: {
    food: [
      { name: "Dry Kibble", description: "A balanced dry food packed with essential nutrients.", img: imageUrls.dogFood },
      { name: "Wet Food", description: "Moist and delicious, great for picky eaters.", img: imageUrls.dogFood },
      { name: "Raw Diet", description: "High-protein raw food that mimics a dog's natural diet.", img: imageUrls.dogFood },
    ],
    accessories: [
      { name: "Collar", description: "Comfortable and stylish collars for dogs.", img: imageUrls.leash },
      { name: "Leash", description: "Durable leash for walks and adventures.", img: imageUrls.leash },
      { name: "Harness", description: "Perfect for walks, offering comfort and control.", img: imageUrls.leash },
    ],
    grooming: [
      { name: "Shampoo", description: "Gentle shampoo for a clean and shiny coat.", img: imageUrls.shampoo },
      { name: "Brush", description: "Helps maintain a healthy coat by removing loose fur.", img: imageUrls.shampoo },
      { name: "Nail Clipper", description: "Essential for keeping nails trimmed and neat.", img: imageUrls.shampoo },
    ],
    icon: <FaDog size={50} color="#ff9800" />,
  },
  Cat: {
    food: [
      { name: "Canned Food", description: "Rich and tasty canned food your cat will love.", img: imageUrls.catFood },
      { name: "Raw Meat", description: "Raw meat offers high protein and natural nutrition.", img: imageUrls.catFood },
      { name: "Dry Biscuits", description: "Crunchy biscuits to help with dental health.", img: imageUrls.catFood },
    ],
    litter: [
      { name: "Clumping Litter", description: "Easy to clean and controls odor.", img: imageUrls.shampoo },
      { name: "Silica Gel", description: "Absorbs moisture, keeps the litter box dry.", img: imageUrls.shampoo },
      { name: "Wood Pellet Litter", description: "Eco-friendly litter made from compressed wood.", img: imageUrls.shampoo },
    ],
    toys: [
      { name: "Feather Wand", description: "Interactive toy for hours of fun.", img: imageUrls.shampoo },
      { name: "Scratching Post", description: "Essential for keeping claws healthy and sharp.", img: imageUrls.shampoo },
      { name: "Laser Pointer", description: "Stimulates hunting instincts with a moving light.", img: imageUrls.shampoo },
    ],
    grooming: [
      { name: "Shampoo", description: "Gentle cat shampoo for clean and soft fur.", img: imageUrls.shampoo },
      { name: "Brush", description: "Keeps your cat's coat shiny and free from mats.", img: imageUrls.shampoo },
      { name: "Nail Clipper", description: "Helps trim cat claws safely and easily.", img: imageUrls.shampoo },
    ],
    icon: <FaCat size={50} color="#9c27b0" />,
  },
};

const PetRecommendations = () => {
  const [selectedPet, setSelectedPet] = useState("Dog");

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">🐾 Pet Care Recommendations</h3>

      {/* 🔹 Pet Selection Buttons */}
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn mx-2 ${selectedPet === "Dog" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setSelectedPet("Dog")}
        >
          🐶 Dogs
        </button>
        <button
          className={`btn mx-2 ${selectedPet === "Cat" ? "btn-purple" : "btn-outline-purple"}`}
          onClick={() => setSelectedPet("Cat")}
        >
          🐱 Cats
        </button>
      </div>

      {/* 🔹 Recommendations Section */}
      <div className="card shadow p-4">
        <div className="text-center">{recommendations[selectedPet].icon}</div>
        <h4 className="text-center">{selectedPet} Care</h4>

        {/* ✅ Food Recommendations */}
        <h5 className="mt-3">🍽️ Best Food:</h5>
        <ul>
          {recommendations[selectedPet].food.map((food, index) => (
            <li key={index} className="d-flex align-items-center">
              <img src={food.img} alt={food.name} className="mr-2" style={{ width: 40, height: 40 }} />
              <div>
                <strong>{food.name}</strong>
                <p>{food.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* ✅ Accessories (for Dog only) */}
        {selectedPet === "Dog" && (
          <>
            <h5 className="mt-3">🐾 Dog Accessories:</h5>
            <ul>
              {recommendations.Dog.accessories.map((accessory, index) => (
                <li key={index} className="d-flex align-items-center">
                  <img src={accessory.img} alt={accessory.name} className="mr-2" style={{ width: 40, height: 40 }} />
                  <div>
                    <strong>{accessory.name}</strong>
                    <p>{accessory.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ✅ Grooming Products */}
        <h5 className="mt-3">🧴 Grooming Products:</h5>
        <ul>
          {recommendations[selectedPet].grooming.map((groomingItem, index) => (
            <li key={index} className="d-flex align-items-center">
              <img src={groomingItem.img} alt={groomingItem.name} className="mr-2" style={{ width: 40, height: 40 }} />
              <div>
                <strong>{groomingItem.name}</strong>
                <p>{groomingItem.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* ✅ Cat-specific Products */}
        {selectedPet === "Cat" && (
          <>
            <h5 className="mt-3">🐱 Cat Litter:</h5>
            <ul>
              {recommendations.Cat.litter.map((litter, index) => (
                <li key={index} className="d-flex align-items-center">
                  <img src={litter.img} alt={litter.name} className="mr-2" style={{ width: 40, height: 40 }} />
                  <div>
                    <strong>{litter.name}</strong>
                    <p>{litter.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h5 className="mt-3">🎾 Best Cat Toys:</h5>
            <ul>
              {recommendations.Cat.toys.map((toy, index) => (
                <li key={index} className="d-flex align-items-center">
                  <img src={toy.img} alt={toy.name} className="mr-2" style={{ width: 40, height: 40 }} />
                  <div>
                    <strong>{toy.name}</strong>
                    <p>{toy.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PetRecommendations;
