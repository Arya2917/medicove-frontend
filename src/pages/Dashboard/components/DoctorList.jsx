import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

const DoctorsList = () => {
  // Fetch doctors from the API
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_DOCTORS_API}`);
  ;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  
  // Get unique specialties for the filter dropdown
  const specialties = data?.doctors ? 
    [...new Set(data.doctors.map(doctor => doctor.speciality))] : 
    [];
  
  // Filter doctors based on search term and specialty
  const filteredDoctors = data?.doctors ? 
    data.doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === '' || doctor.speciality === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    }) : 
    [];

  // Handle image error once and store in state to prevent cascading requests
  const handleImageError = (doctorId) => {
    setImageErrors(prev => ({
      ...prev,
      [doctorId]: true
    }));
  };

  // Render doctor image with safe fallback handling
  const renderDoctorImage = (doctor) => {
    // Default placeholder image
    const placeholderImage = "/api/placeholder/300/300";
    
    // If we already know this image has an error, use placeholder immediately
    if (imageErrors[doctor._id]) {
      return (
        <img 
          src={placeholderImage}
          alt={doctor.name} 
          className="w-full h-48 object-cover object-center"
        />
      );
    }
    
    // Check if doctor image exists and is valid
    const doctorImage = doctor.image && typeof doctor.image === 'string' && 
      (doctor.image.startsWith('http') || doctor.image.startsWith('uploads')) ? 
        doctor.image.startsWith('http') ? doctor.image : `http://localhost:4000/${doctor.image}` : 
        placeholderImage;
    
    return (
      <img 
        src={doctorImage}
        alt={doctor.name} 
        className="w-full h-48 object-cover object-center"
        onError={() => handleImageError(doctor._id)}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Doctors</h2>
      
      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search doctors by name or specialty"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>{specialty}</option>
              ))}
            </select>
            <button 
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('');
              }}
            >
              <Filter size={18} />
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading, error and empty states */}
      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>Error loading doctors: {error}</p>
          <p>Please try again later or contact support.</p>
        </div>
      )}
      
      {!loading && !error && filteredDoctors.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No doctors found matching your criteria.</p>
        </div>
      )}
      
      {/* Doctors list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              {renderDoctorImage(doctor)}
              <div className="absolute bottom-0 left-0 right-0 bg-teal-800 bg-opacity-90 text-white p-3">
                <h3 className="font-bold truncate">{doctor.name}</h3>
                <div className="flex justify-between">
                  <p className="text-sm text-yellow-300">{doctor.speciality}</p>
                  {doctor.available && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Available</span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Degree:</span> {doctor.degree}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Experience:</span> {doctor.experience}
                </p>
                {doctor.fee && (
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Consultation Fee:</span> ₹{doctor.fee}
                  </p>
                )}
                {doctor.about && (
                  <p className="text-sm text-gray-600 italic mt-2">"{doctor.about}"</p>
                )}
              </div>
              <div className="flex gap-2">
                <Link 
                  to={`/book-appointment?doctorId=${doctor._id}`} 
                  className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 text-sm font-medium flex items-center justify-center"
                >
                  <Calendar size={16} className="mr-2" />
                  Book Appointment
                </Link>
                <Link 
                  to={`/doctor/${doctor._id}`}
                  className="bg-gray-100 text-teal-600 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center justify-center"
                >
                  View Profile
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
