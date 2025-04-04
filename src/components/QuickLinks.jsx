import { useState} from 'react';
import { Search, Filter, Calendar, ArrowRight, Star, MapPin, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';


const QuickLinks = () => {
  // Fetch doctors from the API
  const { data, loading, error } = useFetch('http://localhost:4000/api/user/doctors');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [imageErrors, setImageErrors] = useState({});
  
  // Get unique specialties for the filter dropdown
  const specialties = data?.doctors ? 
    [...new Set(data.doctors.map(doctor => doctor.speciality))].filter(Boolean).sort() : 
    [];
  
  // Filter doctors based on search term and specialty
  const filteredDoctors = data?.doctors ? 
    data.doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (doctor.speciality && doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()));
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

  // Improved function to handle various image formats
  const renderDoctorImage = (doctor) => {
    // Default placeholder image
    const placeholderImage = "/api/placeholder/300/300";
    
    // If we already know this image has an error, use placeholder immediately
    if (imageErrors[doctor._id]) {
      return (
        <img 
          src={placeholderImage}
          alt={doctor.name} 
          className={`object-cover object-center ${viewMode === 'grid' ? 'w-full h-48 rounded-t-lg' : 'w-24 h-24 rounded-lg'}`}
        />
      );
    }
    
    // Valid image extensions - be more inclusive
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg', 'bmp', 'ico'];
    
    let doctorImage = placeholderImage;
    
    if (doctor.image && typeof doctor.image === 'string') {
      try {
        // Normalize backslashes to forward slashes
        const normalizedPath = doctor.image.replace(/\\/g, '/');
        
        // Get file extension if present
        const extension = normalizedPath.split('.').pop().toLowerCase();
        
        // Always attempt to use the image path regardless of extension
        // We'll rely on the onError handler to catch failures
        if (normalizedPath.startsWith('http')) {
          // For complete URLs, use directly
          doctorImage = normalizedPath;
        } else {
          // For all other paths, prepend server base URL
          doctorImage = `http://localhost:4000/${normalizedPath}`;
        }
      } catch (error) {
        console.error("Error processing doctor image path:", error);
        // Fallback to placeholder on path processing error
        doctorImage = placeholderImage;
      }
    }
    
    return (
      <img 
        src={doctorImage}
        alt={doctor.name} 
        className={`object-cover object-center ${viewMode === 'grid' ? 'w-full h-48 rounded-t-lg' : 'w-24 h-24 rounded-lg'}`}
        onError={() => handleImageError(doctor._id)}
      />
    );
  };

  // Render rating stars
  const renderRating = (rating = 4.5) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : 
                       i < rating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600">{rating}</span>
      </div>
    );
  };

  // Grid view for doctors
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDoctors.map((doctor) => (
        <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            {renderDoctorImage(doctor)}
            {doctor.featured && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Award size={12} className="mr-1" />
                Featured
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900 to-transparent text-white p-3">
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
              {renderRating(doctor.rating)}
              
              <p className="text-sm text-gray-500 mt-3 mb-2 flex items-center">
                <span className="font-medium mr-1">Degree:</span> {doctor.degree}
              </p>
              <p className="text-sm text-gray-500 mb-2 flex items-center">
                <span className="font-medium mr-1">Experience:</span> {doctor.experience}
              </p>
              {doctor.location && (
                <p className="text-sm text-gray-500 mb-2 flex items-center">
                  <MapPin size={14} className="mr-1 text-gray-400" />
                  {doctor.location}
                </p>
              )}
              {doctor.fee && (
                <p className="text-sm text-teal-600 font-medium mb-2">
                  Consultation Fee: ₹{doctor.fee}
                </p>
              )}
              {doctor.about && (
                <p className="text-sm text-gray-600 italic mt-2 line-clamp-2">{doctor.about}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Link 
                to={`/book-appointment?doctorId=${doctor._id}`} 
                className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 text-sm font-medium flex items-center justify-center transition-colors"
              >
                <Calendar size={16} className="mr-2" />
                Book Appointment
              </Link>
              <Link 
                to={`/doctor/${doctor._id}`}
                className="bg-gray-100 text-teal-600 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center justify-center transition-colors"
              >
                View Profile
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // List view for doctors
  const renderListView = () => (
    <div className="space-y-4">
      {filteredDoctors.map((doctor) => (
        <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="flex p-4">
            <div className="flex-shrink-0 mr-4">
              {renderDoctorImage(doctor)}
              {doctor.available && (
                <span className="block text-center mt-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Available</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-teal-600">{doctor.speciality}</p>
                  {renderRating(doctor.rating)}
                </div>
                {doctor.featured && (
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Award size={12} className="mr-1" />
                    Featured
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="font-medium mr-1">Degree:</span> {doctor.degree}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="font-medium mr-1">Experience:</span> {doctor.experience}
                </p>
                {doctor.location && (
                  <p className="text-sm text-gray-500 flex items-center col-span-2">
                    <MapPin size={14} className="mr-1 text-gray-400" />
                    {doctor.location}
                  </p>
                )}
              </div>
              
              {doctor.about && (
                <p className="text-sm text-gray-600 italic mt-2 line-clamp-2">{doctor.about}</p>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                {doctor.fee && (
                  <p className="text-sm text-teal-600 font-medium">
                    Consultation Fee: ₹{doctor.fee}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link 
                    to={`/book-appointment?doctorId=${doctor._id}`} 
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    <Calendar size={16} className="mr-2" />
                    Book Appointment
                  </Link>
                  <Link 
                    to={`/doctor/${doctor._id}`}
                    className="bg-gray-100 text-teal-600 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    View Profile
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Find Your Doctor</h2>
          <p className="text-teal-100 mb-6">Connect with the best healthcare specialists in your area</p>
          
          {/* Search and filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search doctors by name or specialty"
                  className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-4 text-gray-400" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select 
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <button 
                  className="flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors"
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
        </div>
        
        {/* Results section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-800">
              {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
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
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-gray-600">No doctors found matching your criteria.</p>
              <button 
                className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                }}
              >
                Clear filters and try again
              </button>
            </div>
          )}
          
          {/* Doctors list - conditionally render grid or list view */}
          {!loading && !error && filteredDoctors.length > 0 && (
            viewMode === 'grid' ? renderGridView() : renderListView()
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;