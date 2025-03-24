import React from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';

const MedicalNews = () => {
  const newsItems = [
    {
      title: "New Cardiac Wing Inauguration",
      excerpt: "State-of-the-art cardiac care center inaugurated with advanced technologies and specialized care units.",
      image: "/images/cardiac-wing.jpg",
      date: "March 15, 2025",
      author: "Dr. Ravi Kumar",
      category: "Hospital Updates"
    },
    {
      title: "Breakthrough in Minimally Invasive Surgeries",
      excerpt: "Our surgeons achieve remarkable success with new minimally invasive techniques reducing recovery time.",
      image: "/images/surgery.jpg",
      date: "March 10, 2025",
      author: "Dr. Priya Singh",
      category: "Medical Advances"
    },
    {
      title: "Free Health Camp Next Month",
      excerpt: "MediCare announces free community health screening camp focusing on preventive healthcare.",
      image: "/images/health-camp.jpg",
      date: "March 5, 2025",
      author: "Admin Team",
      category: "Community Outreach"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Latest News & Updates
            </h2>
            <div className="w-24 h-1 bg-teal-600"></div>
          </div>
          <a 
            href="/news" 
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            View All Updates
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image || `/api/placeholder/600/400`} 
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex mb-3 text-sm text-gray-500">
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{item.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicalNews;