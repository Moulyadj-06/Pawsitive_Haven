// models/AdoptionRequest.js

const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  petName: String,
  petType: String,
  breed: String,
  origin: String,
  adoptionFee: Number,
  status: { type: String, default: "Pending" }, // Add this if using status in AdminDashboard
  adoptedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdoptionRequest", adoptionRequestSchema);
