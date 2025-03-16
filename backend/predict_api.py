from flask import Flask, jsonify
from flask_cors import CORS  # Enable CORS for frontend
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load trained model
model = joblib.load('pet_adoption_model.pkl')

# Load dataset for analysis
pets_df = pd.read_csv('Lost__found__adoptable_pets.csv')

# ✅ Default Home Route
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Pet Adoption Prediction API is running!"})

# ✅ Insights Route
@app.route('/insights', methods=['GET'])
def get_insights():
    try:
        # 1️⃣ 🔥 Model Classification Metrics
        classification_metrics = {
            "model_accuracy": 0.8871,  # Example accuracy (replace with actual computation if needed)
            "classification_report": {
                "0": {"precision": 0.94, "recall": 0.93, "f1-score": 0.94, "support": 55},
                "1": {"precision": 0.50, "recall": 0.57, "f1-score": 0.53, "support": 7}
            }
        }

        # 2️⃣ 📊 Feature Importance Analysis
        feature_importance = dict(zip(model.feature_names_in_, model.feature_importances_))

        # 3️⃣ 📈 Adoption Rate
        adoption_rate = (pets_df['Record_Type'] == 'ADOPTABLE').mean() * 100

        # 4️⃣ 👶 Adoption by Age Group
        pets_df['Age'] = pets_df['Age'].astype(str).str.extract('(\d+)').astype(float)  # Convert Age column safely
        age_groups = pd.cut(pets_df['Age'], bins=[0, 1, 5, 10, 15, np.inf], labels=["0-1", "1-5", "5-10", "10-15", "15+"])
        adoption_by_age = pets_df.groupby(age_groups)['Record_Type'].apply(lambda x: (x == 'ADOPTABLE').mean()).to_dict()

        # 5️⃣ 🐶 Adoption by Animal Type
        adoption_by_type = pets_df.groupby('animal_type')['Record_Type'].apply(lambda x: (x == 'ADOPTABLE').mean()).to_dict()

        # ✅ Combine all insights
        insights_data = {
            "classification_metrics": classification_metrics,
            "feature_importance": feature_importance,
            "adoption_rate": adoption_rate,
            "adoption_by_age": adoption_by_age,
            "adoption_by_type": adoption_by_type
        }

        return jsonify(insights_data)

    except Exception as e:
        return jsonify({"error": str(e)})

# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)
