import React, { useState, useEffect } from 'react';
import { Calendar, Search, Building2, ClipboardCheck, Headset, PillIcon, User, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickLinkCard = ({ icon, title, path, count }) => {
  return (
    <Link to={path} className="block">
      <div className="bg-white rounded-md shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
        <div className="mb-4 text-teal-600">
          {icon}
        </div>
        <p className="text-base font-medium text-gray-800 text-center">{title}</p>
        {count && (
          <div className="mt-2 bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">
            {count} available
          </div>
        )}
      </div>
    </Link>
  );
};

const QuickLinks = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/doctors');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDoctors(data.doctors || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Count available doctors
  const availableDoctors = doctors.filter(doctor => doctor.available).length;
  
  // Count unique specialties
  const specialties = [...new Set(doctors.map(doctor => doctor.speciality))].filter(Boolean).length;

  // Base links - same as original
  const links = [
    { title: 'Book Appointment', icon: <Calendar size={32} />, path: '/appointments/book' },
    { title: 'Find Doctor', icon: <Search size={32} />, path: '/doctors/search', count: availableDoctors },
    { title: 'Find Hospital', icon: <Building2 size={32} />, path: '/hospitals/search' },
    { title: 'Book Health Check-Up', icon: <ClipboardCheck size={32} />, path: '/health-checks/book' },
    { title: 'Consult Online', icon: <Headset size={32} />, path: '/consultations/online' },
    { title: 'Buy Medicine', icon: <PillIcon size={32} />, path: '/pharmacy' },
  ];

  // Add specialty links if we have doctors data
  const specialtyLinks = !loading && !error && specialties > 0 ? [
    { title: 'Browse Specialties', icon: <Filter size={32} />, path: '/specialties', count: specialties }
  ] : [];

  // Combine all links
  const allLinks = [...links, ...specialtyLinks];

  return (
    <div className="container mx-auto px-6 py-10">
      {loading ? (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-3 text-gray-600 text-sm">Loading quick links...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
          <p>Error loading doctor data. Some features may be limited.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Quick Access</h2>
            <div className="text-teal-600 font-medium text-sm">
              {availableDoctors} doctors available now
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {allLinks.map((link, index) => (
              <QuickLinkCard 
                key={index} 
                title={link.title} 
                icon={link.icon} 
                path={link.path}
                count={link.count}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuickLinks;