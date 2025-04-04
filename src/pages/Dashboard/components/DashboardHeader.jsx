import { useState } from 'react';
import { Bell, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };
  
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };
  
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Patient Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={toggleNotifications}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">Notifications</p>
                </div>
                <div className="p-4 text-center text-gray-500">
                  <p>No new notifications</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={toggleProfile}
              className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{user?.email || "No email provided"}</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => navigate('/dashboard/profile')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} className="mr-3" />
                    My Profile
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/settings')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </button>
                </div>
                <div className="py-1 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;