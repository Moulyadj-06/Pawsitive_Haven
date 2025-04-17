const petSchema = new mongoose.Schema({
    Animal_Name: String,   // Is this the exact field name in the DB?
    animal_type: String,   // Check for any mismatches
    Animal_Breed: String,
    City: String,
    Record_Type: String
  });
  