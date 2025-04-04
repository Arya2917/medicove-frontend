import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import QuickLinks from "./components/QuickLinks";   
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

// Specialty pages
import Cardiology from "./pages/speciality/Cardiology";
import Neurology from "./pages/speciality/Neurology";
import Oncology from "./pages/speciality/Oncology";
import Gastroenterology from "./pages/speciality/Gastroenterology";
import Orthopedic from "./pages/speciality/Orthopedic";
import Gynecology from "./pages/speciality/Gynecology";
import Dermatology from "./pages/speciality/Dermatology";
import Ophthalmology from "./pages/speciality/Ophthalmology";

// About Us pages
import History from "./components/History";
import BoardOfDirectors from "./components/Directors";
import ManagementTeam from "./components/Team";
import VisionMission from "./components/Vision";
import AccreditationAwards from "./components/Accredations";

// Health Services Pages
import EmergencyCare from "./pages/EmergencyCare";
import DiagnosticServices from "./pages/Diagnostic";
import SpecializedTreatments from "./pages/Treatment";


// Authentication pages
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Register";
import AdminLoginPage from "./pages/AdminLogin"; 

// Contact page
import Contact from "./pages/Contact";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quicklinks" element={<QuickLinks />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Dashboard routes with nested routes */}
        <Route path="/dashboard/*" element={<UserDashboard />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        
        {/* Specialty routes */}
        <Route path="/specialties/cardiology" element={<Cardiology />} />
        <Route path="/specialties/neurology" element={<Neurology />} />
        <Route path="/specialties/oncology" element={<Oncology />} />
        <Route path="/specialties/gastroenterology" element={<Gastroenterology />} />
        <Route path="/specialties/orthopedic" element={<Orthopedic />} />
        <Route path="/specialties/gynecology" element={<Gynecology />} />
        <Route path="/specialties/dermatology" element={<Dermatology />} />
        <Route path="/specialties/ophthalmology" element={<Ophthalmology />} />
        
        {/* About Us routes */}
        <Route path="/about/history" element={<History />} />
        <Route path="/about/board-of-directors" element={<BoardOfDirectors />} />
        <Route path="/about/management-team" element={<ManagementTeam />} />
        <Route path="/about/vision-&-mission" element={<VisionMission />} />
        <Route path="/about/accredationawards" element={<AccreditationAwards />} />

        {/* Health Service Pages */}
        <Route path="/emergency" element={<EmergencyCare />} />
        <Route path="/diagnostic" element={<DiagnosticServices />} />
        <Route path="/specialized-treatments" element={<SpecializedTreatments />} />
        

        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;