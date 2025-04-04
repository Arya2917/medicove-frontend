import React from 'react';

const MedicalPartners = () => {
  const partners = [
    { name: "TrustMed Insurance", logo: "/images/service.jpg" },
    { name: "National Health Alliance", logo: "/images/emergency.jpg" },
    { name: "Global Medical Research", logo: "/images/program.jpg" },
    { name: "PharmaTech Solutions", logo: "/images/treatement.jpg" },
    { name: "HealthCare International", logo: "/images/doctor-patient-consultation.jpg" },
    { name: "MedEd University", logo: "/images/service.jpg" }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Collaborating with industry leaders to provide exceptional healthcare services
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
            >
              <img 
                src={partner.logo || `/api/placeholder/180/80`} 
                alt={partner.name}
                className="h-16 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicalPartners;