import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorsList from './services/DoctorsList';
import MedicineList from './services/MedicineList.';

// Specialty pages
import Cardiology from './pages/speciality/Cardiology';
import Neurology from './pages/speciality/Neurology';
import Oncology from './pages/speciality/Oncology';
import Gastroenterology from './pages/speciality/Gastroenterology';
import Orthopedic from './pages/speciality/Orthopedic';
import Gynecology from './pages/speciality/Gynecology';
import Dermatology from './pages/speciality/Dermatology';
import Ophthalmology from './pages/speciality/Ophthalmology';

// About Us pages
import History from './components/History';
import BoardOfDirectors from './components/Directors';
import ManagementTeam from './components/Team';
import VisionMission from './components/Vision';
//import Accreditations from './components/Accreditations';
//import Awards from './components/Awards';

// Authentication pages
import LoginPage from './pages/Login';
import SignupPage from './pages/Register';

// Contact page
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} /> {/* Added redirect for /home */}
      <Route path="/doctors" element={<DoctorsList />} />
      <Route path="/pharmacy" element={<MedicineList />} />
      <Route path="/contact" element={<Contact />} />
      
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
   
      {/* Authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} /> 
      
      {/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;