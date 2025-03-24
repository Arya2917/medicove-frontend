import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorsList from './services/DoctorsList';
import MedicineList from './services/MedicineList.';
import Cardiology from './pages/speciality/Cardiology';
import Neurology from './pages/speciality/Neurology';
import Oncology from './pages/speciality/Oncology';
import Gastroenterology from './pages/speciality/Gastroenterology';
import Orthopedic from './pages/speciality/Orthopedic';
import Gynecology from './pages/speciality/Gynecology';
import Dermatology from './pages/speciality/Dermatology';
import Ophthalmology from './pages/speciality/Ophthalmology';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors/search" element={<DoctorsList />} />
      <Route path="/pharmacy" element={<MedicineList />} />
      <Route path="/specialties/cardiology" element={<Cardiology />} />
      <Route path="/specialties/neurology" element={<Neurology />} />
      <Route path="/specialties/oncology" element={<Oncology />} />
      <Route path="/specialties/gastroenterology" element={<Gastroenterology />} />
      <Route path="/specialties/orthopedic" element={<Orthopedic />} />
      <Route path="/specialties/gynecology" element={<Gynecology />} />
      <Route path="/specialties/dermatology" element={<Dermatology />} />
      <Route path="/specialties/ophthalmology" element={<Ophthalmology />} />
      {/* Add other routes as needed */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;