import React from 'react';
import { Award, Shield, Medal, CheckCircle, Star } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const AccreditationAwards = () => {
  // Accreditation data
  const accreditations = [
    {
      name: "NABH Accreditation",
      description: "The National Accreditation Board for Hospitals & Healthcare Providers (NABH) recognizes our commitment to quality care and patient safety standards.",
      year: "Since 2012",
      icon: <Shield size={40} className="text-white" />
    },
    {
      name: "JCI Accreditation",
      description: "Joint Commission International (JCI) certification acknowledges our dedication to international healthcare quality standards and patient safety.",
      year: "Since 2014",
      icon: <CheckCircle size={40} className="text-white" />
    },
    {
      name: "ISO 9001:2015",
      description: "Our quality management systems meet international standards for consistency, quality improvement, and patient satisfaction.",
      year: "Since 2010",
      icon: <CheckCircle size={40} className="text-white" />
    },
    {
      name: "Green Hospital Certification",
      description: "Recognition for our sustainable practices, energy efficiency, and environmentally responsible healthcare delivery systems.",
      year: "Since 2018",
      icon: <Star size={40} className="text-white" />
    }
  ];
  
  // Awards data
  const awards = [
    {
      name: "Excellence in Healthcare Service",
      presenter: "National Healthcare Association",
      year: "2024",
      description: "Awarded for exceptional quality of medical care and outstanding patient satisfaction scores."
    },
    {
      name: "Best Multi-Specialty Hospital",
      presenter: "Healthcare Leadership Summit",
      year: "2023",
      description: "Recognized for comprehensive specialty care, successful patient outcomes, and cutting-edge treatment options."
    },
    {
      name: "Innovation in Medical Technology",
      presenter: "Medical Technology Forum",
      year: "2023",
      description: "Honored for implementation of advanced medical technologies and digital healthcare solutions."
    },
    {
      name: "Patient Safety Excellence Award",
      presenter: "Patient Safety Coalition",
      year: "2022",
      description: "Acknowledged for exceptional standards in patient safety protocols and infection control measures."
    },
    {
      name: "Healthcare Employer of the Year",
      presenter: "Healthcare HR Association",
      year: "2022",
      description: "Recognized for staff development programs, workplace culture, and employee satisfaction."
    },
    {
      name: "Community Healthcare Initiative Award",
      presenter: "Community Health Foundation",
      year: "2021",
      description: "Awarded for outreach programs addressing healthcare disparities and improving community health outcomes."
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Accreditation & Awards</h1>
          <p className="text-xl max-w-3xl">
            Recognition of our commitment to excellence, quality healthcare, and continuous improvement 
            at MediCare.
          </p>
        </div>
      </div>
      
      {/* Accreditation Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-8">Our Accreditations</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              MediCare holds prestigious accreditations from leading national and international healthcare 
              quality assessment organizations. These certifications reflect our unwavering commitment to 
              maintaining the highest standards of patient care, safety, and operational excellence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {accreditations.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg shadow overflow-hidden">
                  <div className="bg-teal-600 p-4 flex items-center">
                    {item.icon}
                    <h3 className="text-xl font-bold text-white ml-4">{item.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <p className="text-teal-600 font-semibold">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Awards Section */}
      <div className="bg-teal-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-700 mb-12 text-center">Awards & Recognition</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {awards.map((award, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                  <div className="bg-teal-700 text-white p-6 flex flex-col justify-center items-center md:w-1/4">
                    <Award size={40} className="mb-3" />
                    <p className="text-xl font-bold text-center">{award.year}</p>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <h3 className="text-xl font-bold text-teal-700 mb-2">{award.name}</h3>
                    <p className="text-sm text-teal-600 font-medium mb-3">Presented by: {award.presenter}</p>
                    <p className="text-gray-600">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quality Commitment Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Our Commitment to Quality</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At MediCare, our pursuit of excellence extends beyond awards and accreditations. We are committed to a culture of continuous improvement and innovation in healthcare delivery. Our quality framework encompasses:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-l-4 border-teal-600 pl-4">
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Continuous Quality Improvement</h3>
                  <p className="text-gray-600">
                    Rigorous monitoring of clinical outcomes, regular reviews, and implementation of evidence-based practices to enhance care quality.
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-600 pl-4">
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Patient-Centered Approach</h3>
                  <p className="text-gray-600">
                    Regular patient feedback collection, patient satisfaction surveys, and service improvements based on patient experiences.
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-600 pl-4">
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Safety Culture</h3>
                  <p className="text-gray-600">
                    Promoting a non-punitive reporting environment, proactive risk assessments, and safety drills to ensure patient and staff safety.
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-600 pl-4">
                  <h3 className="text-xl font-semibold text-teal-700 mb-2">Professional Development</h3>
                  <p className="text-gray-600">
                    Continuous education and training for all staff members to maintain clinical excellence and update skills.
                  </p>
                </div>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-lg">
                <p className="text-teal-800 font-medium italic text-center">
                  "Our accreditations and awards reflect not just what we've achieved, but our ongoing commitment to what healthcare should be."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AccreditationAwards;