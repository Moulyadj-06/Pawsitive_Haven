const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    petName: { type: String, required: true }
}, { timestamps: true });

const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = Adoption;
