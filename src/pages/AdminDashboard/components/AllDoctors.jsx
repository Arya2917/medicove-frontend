import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, Phone, Mail, MapPin, Award, Clock } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth"; // Import the useAuth hook
import { useFetch } from "../../../hooks/useFetch"; // Import the useFetch hook

const AllDoctors = () => {
  // State for doctors data
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken, isAuthenticated, isAdmin } = useAuth(); // Get authentication helpers

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch doctors data from API using the useFetch hook
  const { data, loading: fetchLoading, error: fetchError } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_ADMIN_ALL_DOCTORS_API}`
  );

  // Update state when data is fetched
  useEffect(() => {
    if (data) {
      setDoctors(data);
      setLoading(false);
    }
    if (fetchError) {
      setError(fetchError);
      setLoading(false);
    }
  }, [data, fetchError]);

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete doctor
  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        const token = getToken();
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_ADMIN_DOCTOR_DETAIL_API}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status}`);
        }
        
        // Update local state after successful deletion
        setDoctors(doctors.filter(doctor => doctor._id !== id));
      } catch (err) {
        alert(`Error deleting doctor: ${err.message}`);
      }
    }
  };

  // Format status based on availability
  const getStatus = (available) => {
    return available ? "Active" : "On Leave";
  };

  // Format address
  const formatAddress = (address) => {
    if (!address) return "N/A";
    return `${address.line1}, ${address.city}`;
  };

  // Check if user is authorized to view this page
  useEffect(() => {
    if (!loading && !isAdmin()) {
      // Redirect or show unauthorized message
      setError("Unauthorized: Admin access required");
    }
  }, [loading, isAdmin]);

  if (loading || fetchLoading) {
    return <div className="flex justify-center items-center h-64">Loading doctors data...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Doctors</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualification
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src="/api/placeholder/40/40" 
                            alt={doctor.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <Clock size={12} className="mr-1" />
                            {doctor.experience} years exp
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.speciality}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 flex flex-col">
                        <div className="flex items-center mb-1">
                          <Mail size={14} className="mr-1 text-gray-400" />
                          {doctor.email}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-gray-400" />
                          {formatAddress(doctor.address)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Award size={14} className="mr-1 text-gray-400" />
                        {doctor.degree}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {getStatus(doctor.available)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{doctor.fee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteDoctor(doctor._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No doctors found matching your search.
                  </td>
                </tr>  
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;