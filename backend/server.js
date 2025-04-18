require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AdoptionRequest = require("./models/AdoptionRequest"); 
const sendEmail = require("./utils/sendEmail");
const adoptPetRequestsRoutes = require("./routes/adoptPetRequests");

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/api/adoptPetRequests", adoptPetRequestsRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ---------------------------------------------------
✅ PET SCHEMA (Pet Collection for Dashboard)
--------------------------------------------------- */
const petSchema = new mongoose.Schema({
  Animal_Name: String,
  animal_type: String,
  Animal_Breed: String,
  City: String,
  Record_Type: String, // Lost, Adopted, etc.
});

// ✅ Indexing for better search performance
petSchema.index({ Record_Type: 1 });

const PetModel = mongoose.model("petadoptiondashboards", petSchema, "petadoptiondashboards");

// ✅ API: Get Pets with Pagination
app.get("/api/pets", async (req, res) => {
  try {
    let { page = 1, limit = 50 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const pets = await PetModel.find({}, "Animal_Name animal_type Animal_Breed City Record_Type")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPets = await PetModel.countDocuments();

    res.json({ pets, totalPages: Math.ceil(totalPets / limit) });
  } catch (error) {
    console.error("❌ Error fetching pets:", error);
    res.status(500).json({ message: error.message });
  }
});

/* ---------------------------------------------------
✅ DOG SCHEMA (Dog Breeds)
--------------------------------------------------- */
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

// ✅ DOG API ROUTE (Fetch All Dogs)
app.get("/api/dogBreeds", async (req, res) => {
  try {
    const dogBreeds = await DogBreed.find();
    res.json(dogBreeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------------------------------------------------
✅ CAT SCHEMA (Cat Breeds)
--------------------------------------------------- */
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
  other_pets_friendly: Number,
});

const CatBreed = mongoose.model("CatBreed", catBreedSchema);

// ✅ CAT API ROUTE (Fetch All Cats)
app.get("/api/cats", async (req, res) => {
  try {
    const catBreeds = await CatBreed.find();
    res.json(catBreeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------------------------------------------------
✅ PET ADOPTION SCHEMA (Unified Schema for Dogs & Cats)
--------------------------------------------------- */
const petAdoptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  petName: String,
  petType: String, // 'Dog' or 'Cat'
  breed: String,
  origin: String,
  adoptionFee: Number,
  adoptedAt: { type: Date, default: Date.now },
});

const PetAdoption = mongoose.model("PetAdoption", petAdoptionSchema);

// ✅ PET ADOPTION API (POST Request - Unified)
app.post("/api/adoptPet", async (req, res) => {
  try {
    const adoptionData = req.body;
    const newAdoption = new PetAdoption(adoptionData);
    await newAdoption.save();

    const subject = "Pet Adoption Confirmation";
    const text = `Hi ${adoptionData.name},\n\nThank you for adopting ${adoptionData.petName}! 🐾\nWe'll get in touch soon for the next steps.`;
    await sendEmail(adoptionData.email, subject, text);
    res.status(201).json({ message: "🎉 Pet Adoption Successful!" });

  } catch (error) {
    console.error("❌ Error during adoption:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ---------------------------------------------------
✅ ADOPTION TRENDS API
--------------------------------------------------- */
app.get("/api/adoption-trends", async (req, res) => {
  try {
    const trends = await AdoptionRequest.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$adoptedAt" } },
          adoptions: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(trends.map((t) => ({ date: t._id, adoptions: t.adoptions })));
  } catch (error) {
    console.error("❌ Error fetching adoption trends:", error);
    res.status(500).json({ message: "Error fetching adoption trends", error });
  }
});

/* ---------------------------------------------------
✅ GLOBAL ERROR HANDLER
--------------------------------------------------- */
app.use((err, req, res, next) => {
  console.error("🚨 Global Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});


/* ---------------------------------------------------
✅ ERROR HANDLING MIDDLEWARE (Global)
--------------------------------------------------- */
app.use((err, req, res, next) => {
  console.error("🚨 Global Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Pet Adoption Request Endpoint (using /api/adoptPet for both Cats and future Pets)
app.post("/api/adoptPet", async (req, res) => {
  try {
    const adoptionData = req.body;
    const newAdoption = new PetAdoption(adoptionData);
    await newAdoption.save();
    console.log(`✅ Pet Adopted Successfully: ${req.body.petName}`);

    res.status(201).json({ message: "🎉 Pet Adoption Successful!" });
  } catch (error) {
    console.error("❌ Error during adoption:", error);
    res.status(500).json({ message: error.message });
  }
});


// GET: Retrieve all adoption requests
app.get("/api/adoptPetRequests", async (req, res) => {
  try {
    const requests = await PetAdoption.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error("❌ Failed to fetch adoption requests:", error);
    res.status(500).json({ error: "Failed to fetch adoption requests" });
  }
});

// PUT: Update status of an adoption request (Accepted/Rejected)
app.put("/api/adoptPetRequests/:id", async (req, res) => {
  try {
    const updated = await PetAdoption.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Failed to update status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});


// ✅ API: Adoption Trends
app.get("/api/adoption-trends", async (req, res) => {
  try {
    const trends = await PetAdoption.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$adoptedAt" } },
          adoptions: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(trends.map((t) => ({ date: t._id, adoptions: t.adoptions })));
  } catch (error) {
    console.error("❌ Error fetching trends:", error);
    res.status(500).json({ message: "Error fetching trends", error });
  }
});



/* ---------------------------------------------------
✅ Start Server
--------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
