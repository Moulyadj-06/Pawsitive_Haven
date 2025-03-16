const mongoose = require("mongoose");

// ✅ Cat Breed Schema
const catBreedSchema = new mongoose.Schema({
  name: String,
  length: String,
  origin: String,
  min_life_expectancy: Number,
  max_life_expectancy: Number,
  min_weight: Number,
  max_weight: Number,
  family_friendly: Number,
  shedding: Number,
  general_health: Number,
  playfulness: Number,
  children_friendly: Number,
  grooming: Number,
  intelligence: Number,
  other_pets_friendly: Number
});

const CatBreed = mongoose.model("CatBreed", catBreedSchema);

module.exports = CatBreed;
