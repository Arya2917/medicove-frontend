import React from 'react';
import Navbar from './../components/Navbar';
import HeroBanner from './../components/HeroBanner';
import Sidebar from './../components/Sidebar';
import CentresOfExcellence from './../components/HealthCare';
import HealthServices from './../components/HealthServices';

import PatientTestimonials from './../components/PatientTestimonials';
import MedicalNews from './../components/MedicalNews';
import MedicalPartners from './../components/MedicalPartners';
import UpdatedFooter from './../components/Footer';





const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Sidebar that expands on hover */}
      <Sidebar />
      
      <main>
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Health Services Section */}
        <HealthServices />
        
        {/* Centers of Excellence */}
        <CentresOfExcellence />
        
       
        
        {/* Patient Testimonials */}
        <PatientTestimonials />
        
        {/* Medical News & Updates */}
        <MedicalNews />
        
        {/* Medical Partners */}
        <MedicalPartners />
      </main>
      
      {/* Updated Footer with fixed email contrast */}
      <UpdatedFooter />
    </div>
  );
};

export default HomePage;