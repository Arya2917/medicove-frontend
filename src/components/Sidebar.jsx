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
  ChevronRight,
  Pill,
  Phone,
  UserPlus
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarItems = [
  
    { 
      icon: <User size={24} />, 
      text: 'All Doctors', 
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: '/quicklinks' 
    },
    { 
      icon: <Pill size={24} />, 
      text: 'Management Team', 
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      link: '/about/management-team' 
    },
    { 
      icon: <UserPlus size={24} />, 
      text: 'Register', 
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: '/register' 
    },
    { 
      icon: <Phone size={24} />, 
      text: 'Contact Us', 
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      link: '/contact' 
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