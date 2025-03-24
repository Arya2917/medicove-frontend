import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Building, 
  Shield, 
  FileText, 
  PhoneCall,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarItems = [
    { 
      icon: <Calendar size={24} />, 
      text: 'Book Appointment', 
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      link: '/appointment' 
    },
    { 
      icon: <Building size={24} />, 
      text: 'Find Location', 
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: '/locations' 
    },
    { 
      icon: <Shield size={24} />, 
      text: 'Health Packages', 
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      link: '/packages' 
    },
    { 
      icon: <User size={24} />, 
      text: 'Find Doctor', 
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: '/doctors' 
    },
    { 
      icon: <Clock size={24} />, 
      text: 'Working Hours', 
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      link: '/working-hours' 
    },
  ];

  return (
    <div 
      className={`fixed left-0 top-1/4 bg-white rounded-r-lg shadow-lg z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col py-4">
        {sidebarItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.link}
            className="relative flex items-center py-3 px-4 hover:bg-gray-50 transition-colors"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${item.color}`}>
              <span className={item.iconColor}>{item.icon}</span>
            </div>
            
            <span 
              className={`ml-4 text-gray-800 whitespace-nowrap transition-opacity ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.text}
            </span>

            <ChevronRight 
              size={16} 
              className={`absolute right-3 text-gray-400 transition-opacity ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;