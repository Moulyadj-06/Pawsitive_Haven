const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Adoption = require("./models/AdoptionRequest");

const app = express();
app.use(cors());
app.use(express.json()); // Corrected this line

app.post("/api/adopt", async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Log request

        const { name, email, phone, address, petName } = req.body;

        if (!name || !email || !phone || !address || !petName) {
            console.error("Validation Failed: Missing fields", req.body);
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAdoption = new Adoption({ name, email, phone, address, petName });
        const savedAdoption = await newAdoption.save();

        console.log("Adoption saved:", savedAdoption);
        res.status(201).json({ message: "Adoption request submitted successfully", data: savedAdoption });
    } catch (error) {
        console.error("Error in adoption request:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

mongoose.connect("mongodb://localhost:27017/petAdoption", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.log(err));
