import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import PatientSidebar from './components/PatientSidebar';
import DashboardHeader from './components/DashboardHeader';
import DashboardHome from './components/DashboardHome';
import DoctorsList from './components/DoctorList';
import ChatAssistant from './components/ChatAssistant';
import BookAppointment from './components/BookAppointment';
import ContactUs from './components/ContactUs';
import UserProfile from './Profile/UserProfile';

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <PatientSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/chat" element={<ChatAssistant />} />
            <Route path="/appointments" element={<BookAppointment />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;