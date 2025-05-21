import React, { useState, useEffect } from "react";  // Only this one
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Dashboard from "./Components/Dashboard";
import UserDashboard from "./Components/UserDashboard";
import AdoptPet from "./Components/AdoptPet";
import ViewAdoptablePets from "./Components/ViewAdoptablePets";
import CatAdoptable from "./Components/CatAdoptable"; // ✅ Import the CatAdoptable component
import PowerBIReport from "./Components/PowerBiReport";
import SearchAPet from "./Components/SearchAPet";
import AdminLogin from "./Components/AdminLogin";
import Services from "./Components/Services";
import AdminDashboard from "./Components/AdminDashboard";
import DogRecommendation from "./Components/DogRecommendation";
import CatRecommendation from "./Components/CatRecommendation";
import AboutUs from "./Components/AboutUs";


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/pets")
      .then((response) => setPets(response.data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);
  
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Pass setIsAdmin to AdminLogin */}
        <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        {/* Redirect to admin login if not authenticated */}
        <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
        <Route path="/search-pet" element={<SearchAPet />} />
        <Route path="/cat-recommendations" element={<CatRecommendation />} />
        <Route path="/dog-recommendations" element={<DogRecommendation />} />
        <Route path="/adopt-pet" element={<AdoptPet />} />
        <Route path="/view-adoptable-pets" element={<ViewAdoptablePets />} />
        <Route path="/view-cat-adoptable-pets" element={<CatAdoptable />} />  {/* ✅ New route added */}
        <Route path="/powerbi" element={<PowerBIReport pets={pets} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/about-us" element={<AboutUs />} />

      </Routes>
    </Router>
  );
}

export default App;
