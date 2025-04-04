import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Award, Heart, Brain } from 'lucide-react';
    
const SpecializedTreatments = () => {
  const specialtyCards = [
    {
      icon: <Heart size={40} className="text-blue-500" />,
      title: "Cardiology",
      treatments: ["Coronary Angioplasty", "Cardiac Bypass Surgery", "Pacemaker Implantation", "Heart Valve Repair"]
    },
    {
      icon: <Brain size={40} className="text-blue-500" />,
      title: "Neurology",
      treatments: ["Brain Tumor Surgery", "Stroke Management", "Epilepsy Treatment", "Parkinson's Disease Management"]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
        <line x1="6" y1="17" x2="18" y2="17"></line>
      </svg>,
      title: "Oncology",
      treatments: ["Chemotherapy", "Radiation Therapy", "Immunotherapy", "Surgical Oncology"]
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <line x1="12" y1="2" x2="12" y2="22"></line>
        <path d="M4.93 4.93c3.9-3.9 10.24-3.9 14.14 0"></path>
        <path d="M7.76 7.76c2.34-2.34 6.14-2.34 8.48 0"></path>
        <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
      </svg>,
      title: "Orthopedics",
      treatments: ["Joint Replacement", "Spine Surgery", "Sports Injury Management", "Arthroscopic Procedures"]
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Specialized Medical Treatments</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Advanced treatment options across multiple specialties delivered by experienced medical experts using cutting-edge technology
          </p>
          <div className="mt-8">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Book a Specialist Consultation
            </button>
          </div>
        </div>
      </section>
      
      {/* Specialists Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Medical Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive specialized care delivered by expert teams of specialists using the latest advancements in medical science
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialtyCards.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="flex justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{card.title}</h3>
                <ul className="space-y-2">
                  {card.treatments.map((treatment, idx) => (
                    <li key={idx} className="text-gray-600">{treatment}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Our Specialized Care</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>
          
          <div className="flex flex-wrap justify-center">
            {[
              { icon: <Users size={32} className="text-blue-600" />, title: "Expert Specialists", text: "Internationally trained doctors with extensive experience in their fields" },
              { icon: <Award size={32} className="text-blue-600" />, title: "Advanced Technology", text: "State-of-the-art medical equipment and cutting-edge treatment techniques" },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M19.66 14A6.97 6.97 0 0 0 12.93 8h-2.4c-1.09.04-2.1.58-2.71 1.55-.61.96-.61 2.2 0 3.22"/>
                <path d="M19.74 12.9c-1.31-.12-2.42.52-2.99 1.53s-.6 2.26.05 3.25 1.8 1.64 3 1.48"/>
                <path d="M12.52 6c-1.28-.12-2.4.5-2.98 1.47"/>
                <path d="M4.56 9.2c-1.31 0-2.38 1.14-2.38 2.78h0c0 1.64 1.07 2.67 2.38 2.67 1.32 0 2.38-1.12 2.37-2.67h0c0-1.64-1.05-2.78-2.37-2.78Z"/>
                <path d="M16.36 6.07c.9-.21 1.88-.18 2.82.12a4.2 4.2 0 0 1 2.2 1.59c1.98 2.57-.06 6.68-4.21 8.59-1.91.88-3.88 1.19-5.62.9"/>
                <path d="M9.12 9.26a4.2 4.2 0 0 0-3.12.78A4.27 4.27 0 0 0 4.34 13"/>
                <path d="M9.28 21c.9 0 1.63-.73 1.63-1.63v-3.4c0-.65-.37-1.23-.95-1.5L7 13"/>
              </svg>, title: "Multidisciplinary Approach", text: "Collaborative care involving specialists from various disciplines for comprehensive treatment" }
            ].map((feature, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Need specialized medical advice?</h2>
            <p className="text-gray-700">Schedule a consultation with our specialists to discuss your specific healthcare needs.</p>
          </div>
          <div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Book an Appointment
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default SpecializedTreatments;