import React from 'react';
import { Calendar, Search, Building2, ClipboardCheck, Headset, PillIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickLinkCard = ({ icon, title, path }) => {
  return (
    <Link to={path} className="block">
      <div className="bg-white rounded-md shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
        <div className="mb-4 text-teal-600">
          {icon}
        </div>
        <p className="text-base font-medium text-gray-800 text-center">{title}</p>
      </div>
    </Link>
  );
};

const QuickLinks = () => {
  const links = [
    { title: 'Book Appointment', icon: <Calendar size={32} />, path: '/appointments/book' },
    { title: 'Find Doctor', icon: <Search size={32} />, path: '/doctors/search' },
    { title: 'Find Hospital', icon: <Building2 size={32} />, path: '/hospitals/search' },
    { title: 'Book Health Check-Up', icon: <ClipboardCheck size={32} />, path: '/health-checks/book' },
    { title: 'Consult Online', icon: <Headset size={32} />, path: '/consultations/online' },
    { title: 'Buy Medicine', icon: <PillIcon size={32} />, path: '/pharmacy' },
  ];

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {links.map((link, index) => (
          <QuickLinkCard 
            key={index} 
            title={link.title} 
            icon={link.icon} 
            path={link.path} 
          />
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;