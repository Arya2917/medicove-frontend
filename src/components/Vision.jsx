import React from 'react';
import { Heart, Users, Award, Zap, BookOpen, Globe } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const VisionMission = () => {
  const values = [
    {
      title: "Compassion",
      description: "We treat every patient with empathy, dignity, and respect, recognizing that healthcare is fundamentally about human connection.",
      icon: <Heart size={40} className="text-white" />
    },
    {
      title: "Excellence",
      description: "We strive for the highest standards in clinical care, patient safety, and service delivery, constantly challenging ourselves to improve.",
      icon: <Award size={40} className="text-white" />
    },
    {
      title: "Innovation",
      description: "We embrace new ideas, technologies, and approaches that can transform healthcare delivery and improve patient outcomes.",
      icon: <Zap size={40} className="text-white" />
    },
    {
      title: "Collaboration",
      description: "We work as a cohesive team across disciplines and departments, believing that the best care emerges from collective expertise.",
      icon: <Users size={40} className="text-white" />
    },
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our actions and decisions, earning trust through transparency and accountability.",
      icon: <BookOpen size={40} className="text-white" />
    },
    {
      title: "Accessibility",
      description: "We are committed to making quality healthcare accessible to all, regardless of socioeconomic background or geographic location.",
      icon: <Globe size={40} className="text-white" />
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Vision & Mission</h1>
          <p className="text-xl max-w-3xl">
            Discover the core principles that guide our work, inspire our team, 
            and shape the future of healthcare at MediCare.
          </p>
        </div>
      </div>
      
      {/* Vision Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              To be the most trusted healthcare provider, setting new standards in patient care, 
              medical innovation, and community health. We envision a world where everyone has 
              access to exceptional healthcare delivered with compassion and respect.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
              <p className="text-xl font-medium text-teal-800 italic">
                "Creating a healthier tomorrow through excellence in care today."
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our mission is to enhance the health and wellbeing of the communities we serve by:
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-700 leading-relaxed mb-8 space-y-2">
              <li>Providing patient-centered, high-quality healthcare services with compassion and respect</li>
              <li>Advancing medical knowledge through research and education</li>
              <li>Embracing innovation and technology to improve healthcare delivery</li>
              <li>Fostering a collaborative environment that values and develops our team</li>
              <li>Promoting health equity and ensuring healthcare accessibility</li>
              <li>Building meaningful partnerships within our communities</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Core Values Section */}
      <div className="bg-teal-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-teal-700 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-teal-600 p-6 flex justify-center">
                  {value.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-teal-100">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Strategic Goals */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Strategic Goals</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">1</span>
                <div>
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Clinical Excellence</h3>
                  <p className="text-gray-700">Continuously improve patient outcomes, safety, and satisfaction through evidence-based practices and quality improvement initiatives.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">2</span>
                <div>
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Digital Transformation</h3>
                  <p className="text-gray-700">Leverage technology to enhance patient experience, improve operational efficiency, and enable data-driven decision making.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">3</span>
                <div>
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Community Health</h3>
                  <p className="text-gray-700">Expand preventive care initiatives and community partnerships to address social determinants of health and improve population health outcomes.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">4</span>
                <div>
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Sustainable Growth</h3>
                  <p className="text-gray-700">Ensure financial stability while expanding services to meet evolving community healthcare needs and maintaining commitment to accessible care.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VisionMission;