import React, { useState, useEffect } from "react";
import { Search, Check, X, MoreHorizontal, Calendar, Clock, User, FileText } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = getToken();
        
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_ADMIN_APPOINTMENTS_API}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching appointments: ${response.status}`);
        }
        
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, [getToken]);

  // Filter options
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "all",
    date: "",
    doctor: "all"
  });

  // Get unique doctors for the filter dropdown
  const uniqueDoctors = [...new Set(appointments.map(app => app.docData.name))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters to appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Map API status to UI status
    const status = appointment.cancelled ? "Cancelled" : 
                  appointment.isCompleted ? "Completed" : 
                  appointment.payment ? "Confirmed" : "Pending";
    
    // Search term filter
    const searchMatches = 
      appointment.userData.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.docData.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.userData.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    // Status filter
    const statusMatches = filters.status === "all" || status === filters.status;
    
    // Date filter
    const dateMatches = !filters.date || appointment.slotDate === filters.date;
    
    // Doctor filter
    const doctorMatches = filters.doctor === "all" || appointment.docData.name === filters.doctor;
    
    return searchMatches && statusMatches && dateMatches && doctorMatches;
  });

  // Handle appointment status change
  const updateAppointmentStatus = async (id, actionType) => {
    try {
      const token = getToken();
      const endpoint = `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_ADMIN_APPOINTMENTS_API}/${id}/${actionType}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update appointment: ${response.status}`);
      }
      
      // Update local state based on action type
      setAppointments(appointments.map(app => {
        if (app._id === id) {
          switch(actionType) {
            case 'cancel':
              return { ...app, cancelled: true };
            case 'complete':
              return { ...app, isCompleted: true };
            case 'confirm':
              return { ...app, payment: true };
            default:
              return app;
          }
        }
        return app;
      }));
      
    } catch (err) {
      console.error("Failed to update appointment:", err);
      setError(err.message);
    }
  };

  // Modal state for appointment details
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Handle view appointment details
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetails(true);
  };

  // Close modal
  const closeModal = () => {
    setShowDetails(false);
    setSelectedAppointment(null);
  };

  // Helper function to get appointment status display
  const getStatusDisplay = (appointment) => {
    if (appointment.cancelled) return "Cancelled";
    if (appointment.isCompleted) return "Completed";
    if (appointment.payment) return "Confirmed";
    return "Pending";
  };

  // Helper function to get payment status display
  const getPaymentDisplay = (appointment) => {
    if (appointment.payment) return "Paid";
    return "Unpaid";
  };

  if (loading) return <div className="text-center p-8">Loading appointments...</div>;
  
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Appointments</h2>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              name="searchTerm"
              placeholder="Search appointments..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.searchTerm}
              onChange={handleFilterChange}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Status filter */}
          <div>
            <select
              name="status"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date filter */}
          <div>
            <input
              type="date"
              name="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>

          {/* Doctor filter */}
          <div>
            <select
              name="doctor"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filters.doctor}
              onChange={handleFilterChange}
            >
              <option value="all">All Doctors</option>
              {uniqueDoctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.userData.name}</div>
                      <div className="text-xs text-gray-500">{appointment.userData.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.docData.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.slotDate}</div>
                      <div className="text-xs text-gray-500">{appointment.slotTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${getStatusDisplay(appointment) === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            getStatusDisplay(appointment) === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            getStatusDisplay(appointment) === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'}`}
                      >
                        {getStatusDisplay(appointment)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${getPaymentDisplay(appointment) === 'Paid' ? 'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'}`}
                      >
                        {getPaymentDisplay(appointment)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleViewDetails(appointment)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                        >
                          <FileText size={18} />
                        </button>
                        {!appointment.payment && !appointment.cancelled && !appointment.isCompleted && (
                          <button 
                            onClick={() => updateAppointmentStatus(appointment._id, 'confirm')}
                            className="text-green-600 hover:text-green-900"
                            title="Confirm"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        {!appointment.cancelled && !appointment.isCompleted && (
                          <button 
                            onClick={() => updateAppointmentStatus(appointment._id, 'cancel')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                        )}
                        {appointment.payment && !appointment.cancelled && !appointment.isCompleted && (
                          <button 
                            onClick={() => updateAppointmentStatus(appointment._id, 'complete')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Complete"
                          >
                            <Check size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Appointment Details
                    </h3>
                    
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <User className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Patient</p>
                          <p className="text-sm font-medium">{selectedAppointment.userData.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <User className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Doctor</p>
                          <p className="text-sm font-medium">{selectedAppointment.docData.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-medium">{selectedAppointment.slotDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="text-sm font-medium">{selectedAppointment.slotTime}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Contact Information</p>
                      <p className="text-sm">Email: {selectedAppointment.userData.email}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm">₹{selectedAppointment.amount}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Appointment Created</p>
                      <p className="text-sm">{new Date(selectedAppointment.date).toLocaleString()}</p>
                    </div>
                    
                    <div className="mt-4 flex space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${getStatusDisplay(selectedAppointment) === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              getStatusDisplay(selectedAppointment) === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              getStatusDisplay(selectedAppointment) === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'}`}
                        >
                          {getStatusDisplay(selectedAppointment)}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${getPaymentDisplay(selectedAppointment) === 'Paid' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'}`}
                        >
                          {getPaymentDisplay(selectedAppointment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {!selectedAppointment.payment && !selectedAppointment.cancelled && !selectedAppointment.isCompleted && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment._id, 'confirm');
                      closeModal();
                    }}
                  >
                    Confirm Payment
                  </button>
                )}
                {selectedAppointment.payment && !selectedAppointment.cancelled && !selectedAppointment.isCompleted && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment._id, 'complete');
                      closeModal();
                    }}
                  >
                    Mark as Completed
                  </button>
                )}
                {!selectedAppointment.cancelled && !selectedAppointment.isCompleted && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment._id, 'cancel');
                      closeModal();
                    }}
                  >
                    Cancel Appointment
                  </button>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;