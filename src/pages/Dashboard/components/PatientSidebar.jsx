import React from 'react';
import { Users, MessageSquare, Calendar, Phone, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PatientSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/dashboard',
    },
    {
      title: 'Find Doctors',
      icon: <Users size={20} />,
      path: '/dashboard/doctors',
    },
    {
      title: 'Chat with Assistant',
      icon: <MessageSquare size={20} />,
      path: '/dashboard/chat',
    },
    {
      title: 'Book Appointment',
      icon: <Calendar size={20} />,
      path: '/dashboard/appointments',
    },
    {
      title: 'Contact Us',
      icon: <Phone size={20} />,
      path: '/dashboard/contact',
    }
  ];
  
  return (
    <div className="w-64 bg-white shadow-md min-h-screen flex flex-col border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-teal-600">MediCare</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-teal-50 text-gray-700 hover:text-teal-600'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
                {isActive(item.path) && (
                  <div className="w-1 h-8 bg-teal-300 rounded-full ml-auto"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-1">
          © 2025 MediCare
        </div>
        <div className="text-xs text-gray-500">
          Caring for your health
        </div>
      </div>
    </div>
  );
};

export default PatientSidebar;