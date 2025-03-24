// src/components/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  PlusSquare, 
  Bell, 
  User,
  Menu,
  X,
  LogOut
} from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userRole, logout } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, roles: ['admin', 'doctor', 'patient'] },
    { name: 'Patients', path: '/patients', icon: Users, roles: ['admin', 'doctor'] },
    { name: 'Doctors', path: '/doctors', icon: Users, roles: ['admin'] },
    { name: 'Appointments', path: '/appointments', icon: Calendar, roles: ['admin', 'doctor', 'patient'] },
    { name: 'Chat', path: '/chat', icon: MessageSquare, roles: ['admin', 'doctor', 'patient'] },
    { name: 'Prescriptions', path: '/prescriptions', icon: FileText, roles: ['admin', 'doctor', 'patient'] },
    { name: 'Billing', path: '/billing', icon: CreditCard, roles: ['admin', 'patient'] },
    { name: 'Pharmacy', path: '/pharmacy', icon: PlusSquare, roles: ['admin', 'doctor', 'patient'] },
    { name: 'Notifications', path: '/notifications', icon: Bell, roles: ['admin', 'doctor', 'patient'] },
    { name: 'Profile', path: '/profile', icon: User, roles: ['admin', 'doctor', 'patient'] }
  ];
  
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(userRole) || item.roles.length === 0
  );
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className={`bg-blue-700 text-white w-64 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}>
        <div className="flex justify-between items-center h-16 px-4">
          <h2 className="text-xl font-bold">HealthCare Plus</h2>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-2 px-2">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ${
                    location.pathname === item.path ? 'bg-blue-800' : ''
                  }`}
                >
                  <item.icon className="mr-3" size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={logout}
            className="flex items-center w-full py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <LogOut className="mr-3" size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-gray-500 focus:outline-none"
                >
                  <Menu size={24} />
                </button>
              </div>
              
              <div className="flex items-center">
                <Link to="/notifications" className="mr-4 relative">
                  <Bell className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Link>
                
                <Link to="/profile" className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {userRole?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="ml-2 text-gray-700">
                    {userRole === 'doctor' ? 'Dr. Smith' : 
                     userRole === 'admin' ? 'Admin User' : 
                     'John Doe'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;