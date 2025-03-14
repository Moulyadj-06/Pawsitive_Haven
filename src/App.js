import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Dashboard from "./Components/Dashboard";
import AdoptPet from "./Components/AdoptPet";
import ViewAdoptablePets from "./Components/ViewAdoptablePets";
import PowerBIReport from "./Components/PowerBiReport";
import SearchAPet from "./Components/SearchAPet";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Pass setIsAdmin to AdminLogin */}
        <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />

        {/* Redirect to admin login if not authenticated */}
        <Route 
          path="/admin-dashboard" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" />} 
        />

        <Route path="/search-pet" element={<SearchAPet />} />
        <Route path="/adopt-pet" element={<AdoptPet />} />
        <Route path="/view-adoptable-pets" element={<ViewAdoptablePets />} />
        <Route path="/powerbi" element={<PowerBIReport />} />
      </Routes>
    </Router>
  );
}

export default App;
