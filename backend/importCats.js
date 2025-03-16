require("dotenv").config();
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const CatBreed = require("./models/CatBreed.js"); // ✅ Notice the ".js" added!

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Function to Import CSV Data
const importData = async () => {
  try {
    console.log("⏳ Converting CSV to JSON...");
    
    // ✅ Convert CSV to JSON
    const jsonArray = await csvtojson().fromFile("cat_breeds.csv"); 

    console.log(`✅ Converted ${jsonArray.length} Cat Breeds to JSON! 🚀`);
    
    // ✅ Clear Previous Data (Optional)
    await CatBreed.deleteMany();
    console.log("🗑️ Deleted Old Data ✅");

    // ✅ Insert New Data
    await CatBreed.insertMany(jsonArray);
    console.log(`🎉 Successfully Imported ${jsonArray.length} Cat Breeds to MongoDB! 🚀`);

    // ✅ Close MongoDB Connection
    mongoose.connection.close();
    console.log("🔌 MongoDB Connection Closed ✅");
  } catch (error) {
    console.error("❌ Error importing data:", error);
  }
};

// ✅ Run Import Function
importData();
