import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScannerPage from "./pages/ScannerPage";
import Dashboard from "./pages/Dashboard";
import "./css/main.css"; // Assuming you have some global styles
import StoragePage from "./pages/StoragePage";
import DefectsPage from "./pages/DefectsPage";

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">📦 Scanner</Link> | <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/storage">Storage</Link>
        <Link to="/defects">Defects</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ScannerPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/storage" element={<StoragePage />} />
        <Route path="/defects" element={<DefectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
