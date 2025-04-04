import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, CheckCircle, MapPin, Phone } from 'lucide-react';

const EmergencyCare = () => {
  const emergencyFeatures = [
    { 
      icon: <Clock size={24} className="text-red-500" />,
      title: "24/7 Availability",
      description: "Round-the-clock emergency services with zero waiting time for critical cases"
    },
    { 
      icon: <CheckCircle size={24} className="text-red-500" />,
      title: "Rapid Response Teams",
      description: "Specialized teams trained to handle all types of emergencies with speed and precision"
    },
    { 
      icon: <MapPin size={24} className="text-red-500" />,
      title: "Multiple Access Points",
      description: "Strategic locations across the city for quick and easy access during emergencies"
    },
    { 
      icon: <Phone size={24} className="text-red-500" />,
      title: "Emergency Helpline",
      description: "Dedicated emergency number (1066) with trained professionals to guide you"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Emergency Care Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Immediate medical attention when every second counts, backed by state-of-the-art facilities and expert medical professionals
          </p>
          <div className="mt-8">
            <a 
              href="tel:1066" 
              className="bg-white text-red-600 px-8 py-3 rounded-full font-bold text-lg inline-flex items-center hover:bg-gray-100 transition-colors"
            >
              <Phone size={20} className="mr-2" />
              Call Emergency: 1066
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emergencyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-500">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Emergency Process */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Emergency Response Process</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start max-w-4xl mx-auto">
            {[
              { number: "01", title: "Call Receipt", text: "Emergency calls are answered within seconds by trained professionals" },
              { number: "02", title: "Dispatch", text: "Immediate dispatch of the appropriate emergency response team" },
              { number: "03", title: "On-scene Care", text: "Rapid assessment and stabilization at the scene" },
              { number: "04", title: "Hospital Transfer", text: "Quick transfer to our emergency department for comprehensive care" }
            ].map((step, index) => (
              <div key={index} className="flex-1 text-center px-4 mb-8 md:mb-0 relative">
                <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-red-300"></div>
                )}
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-red-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Know the Signs of an Emergency</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Understanding when to seek emergency care can be life-saving. Learn to recognize the warning signs that require immediate medical attention.
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
            View Emergency Guidelines
          </button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default EmergencyCare;