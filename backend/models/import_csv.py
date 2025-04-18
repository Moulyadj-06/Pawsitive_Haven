import pandas as pd
from pymongo import MongoClient

# Connect to the updated MongoDB URI and database
client = MongoClient("mongodb://localhost:27017/")
db = client["PetAdoptionDB"]  # Updated database name
collection = db["pets"]       # Updated collection name

# Read CSV and insert data
df = pd.read_csv("Lost__found__adoptable_pets.csv")  # Replace with your actual file path/name
records = df.to_dict(orient='records')
collection.insert_many(records)

print("Data inserted successfully into PetAdoptionDB.pets!")
