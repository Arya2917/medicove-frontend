import React, { useState } from "react";
import { Search, Check, X, MoreHorizontal, Calendar, Clock, User, FileText } from "lucide-react";

const AllAppointments = () => {
  // Sample appointment data - in a real app, you would fetch this from your backend
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patient: "John Doe", 
      patientEmail: "john.doe@example.com",
      patientPhone: "+1 (555) 123-4567",
      doctor: "Dr. Maria Rodriguez", 
      specialty: "Cardiology",
      date: "2025-04-01", 
      time: "09:30 AM", 
      status: "Confirmed",
      notes: "Follow-up consultation",
      paymentStatus: "Paid"
    },
    { 
      id: 2, 
      patient: "Sarah Johnson", 
      patientEmail: "sarah.johnson@example.com",
      patientPhone: "+1 (555) 234-5678",
      doctor: "Dr. Robert Chen", 
      specialty: "Neurology",
      date: "2025-04-01", 
      time: "10:45 AM", 
      status: "Completed",
      notes: "Initial consultation",
      paymentStatus: "Paid"
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      patientEmail: "michael.brown@example.com",
      patientPhone: "+1 (555) 345-6789",
      doctor: "Dr. Lisa Wong", 
      specialty: "Oncology",
      date: "2025-04-01", 
      time: "02:15 PM", 
      status: "Confirmed",
      notes: "Discussion of test results",
      paymentStatus: "Pending"
    },
    { 
      id: 4, 
      patient: "Emily Davis", 
      patientEmail: "emily.davis@example.com",
      patientPhone: "+1 (555) 456-7890",
      doctor: "Dr. James Wilson", 
      specialty: "Orthopedic",
      date: "2025-04-02", 
      time: "11:00 AM", 
      status: "Pending",
      notes: "First-time consultation",
      paymentStatus: "Unpaid"
    },
    { 
      id: 5, 
      patient: "Alex Thompson", 
      patientEmail: "alex.thompson@example.com",
      patientPhone: "+1 (555) 567-8901",
      doctor: "Dr. Maria Rodriguez", 
      specialty: "Cardiology",
      date: "2025-04-02", 
      time: "03:30 PM", 
      status: "Confirmed",
      notes: "Regular check-up",
      paymentStatus: "Paid"
    },
    { 
      id: 6, 
      patient: "Linda Martinez", 
      patientEmail: "linda.martinez@example.com",
      patientPhone: "+1 (555) 678-9012",
      doctor: "Dr. Sarah Patel", 
      specialty: "Dermatology",
      date: "2025-04-03", 
      time: "09:00 AM", 
      status: "Pending",
      notes: "Skin condition examination",
      paymentStatus: "Unpaid"
    },
    { 
      id: 7, 
      patient: "Robert Wilson", 
      patientEmail: "robert.wilson@example.com",
      patientPhone: "+1 (555) 789-0123",
      doctor: "Dr. Lisa Wong", 
      specialty: "Oncology",
      date: "2025-04-03", 
      time: "01:15 PM", 
      status: "Cancelled",
      notes: "Follow-up consultation",
      paymentStatus: "Refunded"
    },
  ]);

  // Filter options
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "all",
    date: "",
    doctor: "all"
  });

  // Get unique doctors for the filter dropdown
  const uniqueDoctors = [...new Set(appointments.map(app => app.doctor))];

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters to appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Search term filter
    const searchMatches = 
      appointment.patient.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    // Status filter
    const statusMatches = filters.status === "all" || appointment.status === filters.status;
    
    // Date filter
    const dateMatches = !filters.date || appointment.date === filters.date;
    
    // Doctor filter
    const doctorMatches = filters.doctor === "all" || appointment.doctor === filters.doctor;
    
    return searchMatches && statusMatches && dateMatches && doctorMatches;
  });

  // Handle appointment status change
  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
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
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                      <div className="text-xs text-gray-500">{appointment.patientEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.doctor}</div>
                      <div className="text-xs text-gray-500">{appointment.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                            appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            appointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appointment.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                            appointment.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            appointment.paymentStatus === 'Unpaid' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'}`}
                      >
                        {appointment.paymentStatus}
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
                        {appointment.status === 'Pending' && (
                          <button 
                            onClick={() => updateAppointmentStatus(appointment.id, 'Confirmed')}
                            className="text-green-600 hover:text-green-900"
                            title="Confirm"
                          >
                            <Check size={18} />
                          </button>
                        )}
                        {(appointment.status === 'Pending' || appointment.status === 'Confirmed') && (
                          <button 
                            onClick={() => updateAppointmentStatus(appointment.id, 'Cancelled')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel"
                          >
                            <X size={18} />
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
                          <p className="text-sm font-medium">{selectedAppointment.patient}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Stethoscope className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Doctor</p>
                          <p className="text-sm font-medium">{selectedAppointment.doctor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm font-medium">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="mr-2 text-gray-400" size={18} />
                        <div>
                          <p className="text-xs text-gray-500">Time</p>
                          <p className="text-sm font-medium">{selectedAppointment.time}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Contact Information</p>
                      <p className="text-sm">Email: {selectedAppointment.patientEmail}</p>
                      <p className="text-sm">Phone: {selectedAppointment.patientPhone}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs text-gray-500">Notes</p>
                      <p className="text-sm">{selectedAppointment.notes}</p>
                    </div>
                    
                    <div className="mt-4 flex space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${selectedAppointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              selectedAppointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              selectedAppointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'}`}
                        >
                          {selectedAppointment.status}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${selectedAppointment.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 
                              selectedAppointment.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              selectedAppointment.paymentStatus === 'Unpaid' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'}`}
                        >
                          {selectedAppointment.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedAppointment.status === 'Pending' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'Confirmed');
                        closeModal();
                      }}
                    >
                      Confirm Appointment
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'Cancelled');
                        closeModal();
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {selectedAppointment.status === 'Confirmed' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'Completed');
                        closeModal();
                      }}
                    >
                      Mark as Completed
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'Cancelled');
                        closeModal();
                      }}
                    >
                      Cancel Appointment
                    </button>
                  </>
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
