from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# ✅ Load Model
try:
    model_path = os.path.join(os.path.dirname(__file__), "models", "pet_adoption_model.pkl")
    model = joblib.load(model_path)
    expected_features = model.feature_names_in_
    print("✅ Model Loaded Successfully!")
except Exception as e:
    print("❌ Error loading model:", e)
    model = None

# ✅ Load & Filter Dataset (Keep Only FOUND & LOST Pets)
try:
    df = pd.read_csv(r"C:\Users\csc\Desktop\Project Nosql\Pawsitive_Haven\backend\models\Lost__found__adoptable_pets.csv")
    df = df[df["Record_Type"].isin(["FOUND", "LOST"])]  # ✅ Keep only FOUND & LOST records
    print(f"✅ Loaded {len(df)} Found & Lost Pets")
except Exception as e:
    print("❌ Error loading dataset:", e)

# ✅ New /predict function (Replaces the old one)
@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.json
        print("🔹 Received Data:", input_data)  # Debugging
        
        # Convert input keys to match dataset
        age_str = str(input_data["Age"])  # Convert to string since Age is an object
        animal_type = input_data["Animal_Type"].strip().lower()
        gender = input_data["Gender"].strip().lower()
        breed = input_data["Breed"].strip().lower()

        # Check if model is loaded
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500

        # Search for a matching record in the dataset
        matching_pet = df[
        (df["Age"].astype(str) == input_data["Age"]) &  
        (df["animal_type"].str.lower() == input_data["Animal_Type"].lower()) &  
        (df["Animal_Gender"].str.lower() == input_data["Gender"].lower()) &  
        (df["Animal_Breed"].str.lower().str.contains(input_data["Breed"].lower(), na=False))  # Allows partial matches
        ]


        if not matching_pet.empty:
            found_lost_status = matching_pet["Record_Type"].values[0]  # Return FOUND or LOST
            return jsonify({"prediction": found_lost_status})

        # If no match, use the model (fallback)
        return jsonify({"prediction": "Unknown (Not in Dataset)"})

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/")
def home():
    return "🚀 Flask API is running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
