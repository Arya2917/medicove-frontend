import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HealthServices = () => {
  const services = [
    {
      title: "24/7 Emergency Care",
      description: "Immediate medical attention for critical conditions with state-of-the-art emergency facilities.",
      image: "/images/emergency.jpg",
      color: "bg-red-100",
      borderColor: "border-red-500",
      link: "/emergency"
    },
    {
      title: "Specialized Treatments",
      description: "Advanced medical treatments across various specialties delivered by experienced specialists.",
      image: "/images/treatement.jpg",
      color: "bg-blue-100",
      borderColor: "border-blue-500",
      link: "/specialized-treatments"
    },
    {
      title: "Diagnostic Services",
      description: "Comprehensive range of diagnostic services using the latest imaging and laboratory technologies.",
      image: "/images/service.jpg",
      color: "bg-green-100",
      borderColor: "border-green-500",
      link: "/diagnostic"
    },
    {
      title: "Rehabilitation Programs",
      description: "Personalized rehabilitation programs to help patients recover and regain their independence.",
      image: "/images/program.jpg",
      color: "bg-purple-100",
      borderColor: "border-purple-500",
      link: "/rehabilitation"
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
              <div className={`${service.color} p-4 flex justify-center`}>
                <div className={`w-32 h-32 rounded-lg overflow-hidden ${service.borderColor} border-2`}>
                  <img 
                    src={service.image || `/api/placeholder/160/160`} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  {service.description}
                </p>
                <div className="text-center">
                  <Link 
                    to={service.link} 
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Learn More
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
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