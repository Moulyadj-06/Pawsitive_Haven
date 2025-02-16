const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    character: String,
    adopted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Pet", PetSchema);
