import React from 'react';
import { ChevronRight } from 'lucide-react';

const HealthServices = () => {
  const services = [
    {
      title: "24/7 Emergency Care",
      description: "Immediate medical attention for critical conditions with state-of-the-art emergency facilities.",
      icon: "/images/emergency-icon.svg",
      color: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      title: "Specialized Treatments",
      description: "Advanced medical treatments across various specialties delivered by experienced specialists.",
      icon: "/images/treatment-icon.svg",
      color: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      title: "Diagnostic Services",
      description: "Comprehensive range of diagnostic services using the latest imaging and laboratory technologies.",
      icon: "/images/diagnostic-icon.svg",
      color: "bg-green-100",
      iconColor: "text-green-500"
    },
    {
      title: "Rehabilitation Programs",
      description: "Personalized rehabilitation programs to help patients recover and regain their independence.",
      icon: "/images/rehab-icon.svg",
      color: "bg-purple-100",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Our Healthcare Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services designed to meet all your medical needs
            with compassion and excellence
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`p-6 ${service.color}`}>
                <div className={`w-16 h-16 mx-auto mb-4 ${service.iconColor}`}>
                  <img 
                    src={service.icon || `/api/placeholder/80/80`} 
                    alt={service.title}
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center">
                  {service.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-center mb-4">
                  {service.description}
                </p>
                <div className="text-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Learn More
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthServices;