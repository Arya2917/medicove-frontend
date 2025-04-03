import React from 'react';
import { Calendar, Award, ThumbsUp } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const History = () => {
  const timelineEvents = [
    {
      year: 1985,
      title: "Foundation Established",
      description: "MediCare was founded with the establishment of our first 50-bed hospital in Delhi, focused on providing quality healthcare at affordable rates.",
      icon: <Calendar size={24} />
    },
    {
      year: 1992,
      title: "Expansion to Mumbai",
      description: "Following our success in Delhi, MediCare expanded to Mumbai with a 150-bed super-specialty hospital focusing on cardiac care and oncology.",
      icon: <Calendar size={24} />
    },
    {
      year: 2000,
      title: "International Accreditation",
      description: "MediCare became one of the first hospital chains in India to receive JCI accreditation, setting a new standard for healthcare in the region.",
      icon: <Award size={24} />
    },
    {
      year: 2008,
      title: "Research & Education",
      description: "Launch of MediCare Institute of Medical Sciences and Research Center dedicated to advancing medical knowledge and training the next generation of healthcare professionals.",
      icon: <Calendar size={24} />
    },
    {
      year: 2015,
      title: "Nationwide Network",
      description: "Expansion to all major metropolitan cities with specialized centers of excellence in cardiology, oncology, neurology, and orthopedics.",
      icon: <ThumbsUp size={24} />
    },
    {
      year: 2023,
      title: "Digital Transformation",
      description: "Implementation of comprehensive electronic health records and telemedicine services to enhance patient care and accessibility.",
      icon: <Calendar size={24} />
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Include Navbar */}
      <Navbar />
      
      <div className="flex-grow">
        {/* Page Header */}
        <div className="bg-teal-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Journey</h1>
            <p className="text-xl max-w-3xl">
              For over three decades, MediCare has been at the forefront of healthcare innovation and excellence in India, 
              serving millions of patients and their families.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Introduction */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-teal-800 mb-6">A Legacy of Healing</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <p className="text-gray-700 mb-4">
                    Since our humble beginnings in 1985, MediCare has grown from a single 50-bed hospital to one of the largest healthcare networks in India. Our journey has been driven by a steadfast commitment to our founding principles: providing world-class healthcare, investing in cutting-edge technology, and treating every patient with compassion and dignity.
                  </p>
                  <p className="text-gray-700">
                    Throughout our history, we have continuously evolved to meet the changing healthcare needs of our communities, pioneering new treatments and technologies while remaining true to our mission of making quality healthcare accessible to all.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="MediCare's first hospital in 1985" 
                    className="w-full h-auto rounded-lg shadow"
                  />
                  <p className="text-sm text-gray-500 mt-2 italic">MediCare's first hospital established in Delhi, 1985</p>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-teal-800 mb-10">Key Milestones</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-teal-200"></div>
                
                {/* Timeline events */}
                <div className="space-y-16">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white z-10">
                        {event.icon}
                      </div>
                      
                      {/* Year marker */}
                      <div className="ml-20 md:ml-0 mb-4 md:mb-0 md:w-1/2 md:px-12">
                        <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <span className="text-5xl font-bold text-teal-600">{event.year}</span>
                        </div>
                      </div>
                      
                      {/* Event content */}
                      <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-bold text-teal-800 mb-2">{event.title}</h3>
                          <p className="text-gray-700">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Vision for the future */}
            <div className="p-8 bg-teal-50">
              <h2 className="text-3xl font-bold text-teal-800 mb-6">Looking to the Future</h2>
              <p className="text-gray-700 mb-6">
                As we continue to grow and evolve, MediCare remains committed to pushing the boundaries of what's possible in healthcare. Our vision for the future includes expanding our digital health initiatives, furthering our research in personalized medicine, and continuing to make healthcare more accessible to underserved communities across India.
              </p>
              <p className="text-gray-700">
                With each new hospital, technology, and medical breakthrough, we move closer to our ultimate goal: creating a healthier future for all.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default History;