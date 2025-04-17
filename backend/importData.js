const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csvtojson");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/PetAdoptionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const petSchema = new mongoose.Schema({}, { strict: false }); // Flexible schema for any CSV format
const PetAdoption = mongoose.model("PetAdoptionDashboard", petSchema);

// Load CSV and Store in MongoDB
async function importCSV() {
  try {
    const jsonArray = await csv().fromFile("Pet_Adoption_Cleaned_Dataset.csv");

    // Insert into MongoDB
    await PetAdoption.insertMany(jsonArray);
    console.log("✅ Data successfully imported to MongoDB!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing data:", error);
  }
}

// Run Import Function
importCSV();
