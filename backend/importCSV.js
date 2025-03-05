require("dotenv").config();
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const fs = require("fs");

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// ✅ Convert CSV to JSON and Insert into MongoDB
const importData = async () => {
  try {
    const jsonArray = await csvtojson().fromFile("dog_breeds.csv"); // Read CSV
    console.log("✅ Converted CSV to JSON:", jsonArray);

    await DogBreed.deleteMany(); // ❌ Clear previous data (optional)
    await DogBreed.insertMany(jsonArray); // ✅ Insert new data
    console.log("🎉 Data successfully imported to MongoDB!");
    mongoose.connection.close(); // ✅ Close connection
  } catch (error) {
    console.error("❌ Error importing data:", error);
  }
};

// Run Import
importData();
