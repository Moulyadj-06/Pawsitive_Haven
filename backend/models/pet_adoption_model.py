import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.impute import SimpleImputer
import joblib

# 🔹 Load datasets
pets_df = pd.read_csv('Lost__found__adoptable_pets.csv')
license_no_tags_df = pd.read_csv('Pet_License_Sales_Locations_NO_TAGS.csv')
license_with_tags_df = pd.read_csv('Pet_License_Sales_Locations_WITH_TAGS.csv')

# 🔹 Merge Pet License Data (If relevant)
licenses_df = pd.concat([license_no_tags_df, license_with_tags_df], ignore_index=True)

# 🔹 Clean and prepare pet adoption data
selected_columns = ['animal_type', 'Age', 'Animal_Gender', 'Animal_Breed', 'Record_Type', 'City']
pets_df = pets_df[selected_columns]

# 🔹 Extract numerical Age
pets_df['Age'] = pets_df['Age'].str.extract(r'(\d+)').astype(float)  

# 🔹 Handle missing values
num_imputer = SimpleImputer(strategy='median')
pets_df[['Age']] = num_imputer.fit_transform(pets_df[['Age']])

cat_imputer = SimpleImputer(strategy='most_frequent')
pets_df[['animal_type', 'Animal_Gender', 'Animal_Breed', 'City']] = cat_imputer.fit_transform(
    pets_df[['animal_type', 'Animal_Gender', 'Animal_Breed', 'City']]
)

# 🔹 Encode categorical variables
pets_df = pd.get_dummies(pets_df, columns=['animal_type', 'Animal_Gender', 'Animal_Breed', 'City'])

# 🔹 Define target variable
y = pets_df['Record_Type'].apply(lambda x: 1 if x == 'ADOPTABLE' else 0)
X = pets_df.drop(columns=['Record_Type'])

# 🔹 Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 🔹 Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 🔹 Predictions
y_pred = model.predict(X_test)

# 🔹 Evaluate model
accuracy = accuracy_score(y_test, y_pred)
print("✅ Model Accuracy:", accuracy)
print(classification_report(y_test, y_pred))

# 🔹 Save trained model
joblib.dump(model, 'pet_adoption_model.pkl')
print("🎯 Model saved as 'pet_adoption_model.pkl'")
