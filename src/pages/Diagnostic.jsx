import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FlaskConical, FileText, Clock, Calendar } from 'lucide-react';

const DiagnosticServices = () => {
  const diagnosticServices = [
    {
      title: "Laboratory Services",
      icon: <FlaskConical size={40} className="text-green-500" />,
      tests: [
        "Complete Blood Count (CBC)",
        "Lipid Profile",
        "Liver Function Test",
        "Kidney Function Test",
        "Thyroid Function Test",
        "Diabetes Screening"
      ]
    },
    {
      title: "Imaging Services",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M10 18v.01" />
        <path d="M14 18v.01" />
      </svg>,
      tests: [
        "X-Ray",
        "Ultrasound",
        "CT Scan",
        "MRI",
        "PET Scan",
        "Mammography"
      ]
    },
    {
      title: "Cardiac Diagnostics",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M19 12c0-4.97-4.03-9-9-9S1 7.03 1 12s4.03 9 9 9 9-4.03 9-9z" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </svg>,
      tests: [
        "Electrocardiogram (ECG)",
        "Echocardiogram",
        "Stress Test",
        "Holter Monitoring",
        "Cardiac CT",
        "Coronary Angiography"
      ]
    },
    {
      title: "Neurological Diagnostics",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96 12 12l8.73-5.04" />
        <path d="M12 22V12" />
      </svg>,
      tests: [
        "Electroencephalogram (EEG)",
        "Electromyography (EMG)",
        "Nerve Conduction Studies",
        "Brain MRI",
        "Carotid Ultrasound",
        "Lumbar Puncture"
      ]
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Diagnostic Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Comprehensive range of diagnostic services using cutting-edge technologies for accurate and timely health assessments
          </p>
          <div className="mt-8">
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Book a Diagnostic Test
            </button>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Diagnostic Offerings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art diagnostic facilities with advanced equipment and experienced technicians for precise test results
            </p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diagnosticServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.tests.map((test, idx) => (
                    <li key={idx} className="text-gray-600 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      {test}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-center">
                  <a href="#" className="text-green-600 hover:text-green-800 font-medium">
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Diagnostic Process</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          
          <div className="flex flex-wrap justify-center">
            {[
              { icon: <Calendar size={32} className="text-green-600" />, title: "Schedule", text: "Book your diagnostic test online or through our helpline" },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <path d="M9 7h1" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>, title: "Preparation", text: "Receive instructions on how to prepare for your specific test" },
              { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M2 12c0-3.28 3.36-6 7.5-6 1.53 0 2.93.4 4.1 1.06A5.5 5.5 0 0 1 21 11.5v.5" />
                <path d="M20 16v-2a2 2 0 0 0-2-2h-1" />
                <path d="M2 22h20" />
                <path d="M19 22v-6" />
                <path d="M3 22v-6" />
                <path d="M11 22V11" />
                <path d="M7 22v-4" />
                <path d="M15 22v-4" />
              </svg>, title: "Testing", text: "Undergo the diagnostic procedure with our skilled technicians" },
              { icon: <FileText size={32} className="text-green-600" />, title: "Results", text: "Receive detailed reports with expert interpretation" }
            ].map((step, index) => (
              <div key={index} className="w-full md:w-1/4 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center h-full">
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Advantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-green-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Why Choose Our Diagnostics</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Advanced technology for accurate results",
                "Experienced technicians and pathologists",
                "Quick turnaround time for reports",
                "Comfortable and patient-friendly environment",
                "Digital access to test results",
                "Affordable pricing with insurance coverage"
              ].map((advantage, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-green-500 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-green-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need diagnostic tests?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Our comprehensive diagnostic services provide accurate results to help you make informed health decisions.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Book a Test
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors">
              View Test Packages
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default DiagnosticServices;