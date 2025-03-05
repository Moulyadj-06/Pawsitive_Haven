require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Dog Breed Schema
const dogBreedSchema = new mongoose.Schema({
  Breed: String,
  "Country of Origin": String,
  "Fur Color": String,
  "Height (in)": String,
  "Color of Eyes": String,
  "Longevity (yrs)": String,
  "Character Traits": String,
  "Common Health Problems": String,
});

const DogBreed = mongoose.model("DogBreed", dogBreedSchema);

// ✅ API Route to Fetch Dog Breeds
app.get("/api/dogBreeds", async (req, res) => {
  try {
    const dogBreeds = await DogBreed.find();
    console.log("🟢 Fetching Dog Breeds:", dogBreeds.length);
    res.json(dogBreeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
