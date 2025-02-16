import React, { useState } from "react";

const AdoptPet = ({ selectedPet }) => {
  const [adoptionDetails, setAdoptionDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [adoptionSuccess, setAdoptionSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only numbers and restrict length to 10 digits
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (numericValue.length > 10) return; // Prevent input longer than 10 digits

      setAdoptionDetails({ ...adoptionDetails, phone: numericValue });
    } else {
      setAdoptionDetails({ ...adoptionDetails, [name]: value });
    }
  };

  const handleAdoptionFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure phone number is exactly 10 digits
    if (adoptionDetails.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/adopt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...adoptionDetails,
          petId: selectedPet?._id,
          petName: selectedPet?.name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAdoptionSuccess(true);
        alert("🎉 Adoption request submitted successfully!");
      } else {
        alert(data.message || "Error submitting adoption request.");
      }
    } catch (error) {
      console.error("Error submitting adoption request:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div>
      <h2>Adopt a Pet</h2>
      <form onSubmit={handleAdoptionFormSubmit}>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={adoptionDetails.phone}
          onChange={handleChange}
          required
        />
        <input type="text" name="address" placeholder="Your Address" onChange={handleChange} required />
        <button type="submit">Adopt {selectedPet?.name}</button>
        {adoptionSuccess && <p>🎉 Adoption request submitted successfully!</p>}
      </form>
    </div>
  );
};

export default AdoptPet;
