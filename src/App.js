import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AdoptPet from "./Components/AdoptPet";
import ViewAdoptablePets from "./Components/ViewAdoptablePets";
import PowerBIReport from "./Components/PowerBiReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/adopt-pet" element={<AdoptPet />} />
        <Route path="/view-adoptable-pets" element={<ViewAdoptablePets />} />
        <Route path="/powerbi" element={<PowerBIReport />} />
      </Routes>
    </Router>
  );
}

export default App;
