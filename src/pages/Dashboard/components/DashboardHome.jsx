import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Calendar, Clock, ChevronDown, ChevronRight, CreditCard, FileText, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardHome = () => {
  const { user, getToken } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  
  // Extract user ID from JWT token if it doesn't exist
  const getUserId = () => {
    if (user?.id) return user.id;
    
    // Try to extract from token if user has no ID
    const token = getToken();
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.id;
      } catch (error) {
        console.error('Failed to extract ID from token:', error);
      }
    }
    return null;
  };
  
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setProfileLoading(true);
        const token = getToken();
        
        if (!token) {
          console.error("No authentication token available");
          setProfileLoading(false);
          return;
        }
        
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_GET_PROFILE_API}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          setUserProfile(response.data.user);
          console.log("User profile fetched:", response.data.user);
        } else {
          console.error("Failed to fetch user profile:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };
    
    if (user) {
      fetchUserProfile();
    }
  }, [user, getToken]);

  // Load Razorpay script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        setRazorpayLoaded(true);
        console.log("Razorpay script loaded successfully");
      };
      
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
      };
      
      document.body.appendChild(script);
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else {
      setRazorpayLoaded(true);
    }
  }, []);
  
  // Fetch appointments and doctors
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Get user ID, preferably from user object or extract from token
        const userId = getUserId();
        
        if (!userId) {
          console.error('No user ID available');
          setError('User ID not available');
          setLoading(false);
          return;
        }
        
        console.log('Attempting to fetch appointments for user ID:', userId);
        
        // Get the authentication token
        const token = getToken();
        
        if (!token) {
          setError('Authentication token not available');
          setLoading(false);
          return;
        }
        
        // Make the API call with the available user ID and include the token in headers
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_APPOINTMENTS_API}`, 
          { userId }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          // Filter appointments that are not cancelled
          const activeAppointments = response.data.appointments.filter(
            appointment => !appointment.cancelled
          );
          setAppointments(activeAppointments);
        } else {
          setError('Failed to fetch appointments: ' + (response.data.message || 'Unknown error'));
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(`Failed to fetch appointments: ${err.message || 'Network error'}`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all doctors
    const fetchDoctors = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_DOCTORS_API}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          setDoctorsList(response.data.doctors);
        } else {
          console.error('Failed to fetch doctors:', response.data.message);
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };

    if (user) {
      fetchAppointments();
      fetchDoctors();
    }
  }, [user, getToken]);

  // Get doctor speciality based on doctor ID
  const getDoctorSpeciality = (docId) => {
    const doctor = doctorsList.find(doc => doc._id === docId);
    return doctor ? doctor.speciality : 'Not specified';
  };

  // Get user's display name
  const getUserDisplayName = () => {
    // First try to get the name from the fetched profile
    if (userProfile?.name) return userProfile.name;
    
    // Fall back to the name from the auth context
    if (user?.name) return user.name;
    
    // Default value if no name is available
    return "Patient";
  };

  // Get user's profile initial for avatar
  const getUserInitial = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  // Handle payment for appointment
  const handlePayment = async (appointmentId) => {
    try {
      if (!razorpayLoaded) {
        alert("Payment system is loading. Please try again in a moment.");
        return;
      }
      
      const token = getToken();
      
      console.log("Starting payment process for appointment:", appointmentId);
      
      // Call the Razorpay payment API
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_PAYMENT_RAZORPAY_API}`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Debug the response
      console.log("Payment initialization response:", response.data);
      
      if (response.data.success) {
        // Check if key_id exists
        if (!response.data.key_id) {
          console.error("No Razorpay key_id found in response");
          alert("Payment configuration error. Please contact support.");
          return;
        }
        
        // Initialize Razorpay checkout with the key from response
        const options = {
          key: response.data.key_id,
          amount: response.data.amount,
          currency: response.data.currency,
          name: "Hospital Name",
          description: "Appointment Payment",
          order_id: response.data.order_id,
          handler: async function (response) {
            // Send payment verification to your server
            try {
              const verifyResponse = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_VERIFY_RAZORPAY_API}`,
                {
                  appointmentId,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              
              if (verifyResponse.data.success) {
                // Update the local appointments list
                setAppointments(prev => 
                  prev.map(app => 
                    app._id === appointmentId ? {...app, payment: true} : app
                  )
                );
                alert("Payment successful!");
              }
            } catch (err) {
              console.error("Payment verification failed:", err);
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: getUserDisplayName(),
            email: userProfile?.email || user?.email || "",
            contact: userProfile?.phone || user?.phone || "", 
          },
          // Enable various payment methods including UPI
          config: {
            display: {
              blocks: {
                utib: { //name for AXIS block
                  name: "Pay using UPI",
                  instruments: [
                    {
                      method: "upi"
                    }
                  ]
                },
                other: { //name for other block
                  name: "Other Payment Methods",
                  instruments: [
                    {
                      method: "card"
                    },
                    {
                      method: "netbanking"
                    },
                    {
                      method: "wallet"
                    }
                  ]
                }
              },
              sequence: ["block.utib", "block.other"],
              preferences: {
                show_default_blocks: false // Should UPI block be shown by default
              }
            }
          },
          theme: {
            color: "#0D9488", // Teal color to match your UI
          },
        };
        
        console.log("Initializing Razorpay with options:", {
          ...options,
          key: "PRESENT" // Don't log the actual key for security
        });
        
        // Initialize Razorpay
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert('Payment initiation failed: ' + (response.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      alert('Payment processing failed. Please try again.');
    }
  };

  // Toggle between showing limited or all appointments
  const toggleAppointmentsView = () => {
    setShowAllAppointments(!showAllAppointments);
  };
  
  // Determine which appointments to display
  const displayedAppointments = showAllAppointments 
    ? appointments 
    : appointments.slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Welcome section */}
      <div className="bg-teal-600 text-white rounded-xl p-6 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            {profileLoading ? (
              <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                <User size={36} className="text-white" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-white text-teal-600 flex items-center justify-center text-4xl font-bold">
                {getUserInitial()}
              </div>
            )}
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {profileLoading ? (
                <span>Loading profile...</span>
              ) : (
                <span>Welcome, {getUserDisplayName()}!</span>
              )}
            </h2>
            <p className="text-teal-100">We are here to help you manage your healthcare journey.</p>
            <div className="mt-2">
              <span className="inline-block bg-teal-700 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                Patient ID: {getUserId() || "N/A"}
              </span>
              <span className="inline-block bg-teal-700 rounded-full px-3 py-1 text-sm font-semibold">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link to="/dashboard/appointments" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <div className="bg-teal-100 p-3 rounded-full mb-3">
            <Calendar size={24} className="text-teal-600" />
          </div>
          <h3 className="font-medium text-gray-800">Book Appointment</h3>
        </Link>
        
        <Link to="/dashboard/doctors" className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
          <div className="bg-teal-100 p-3 rounded-full mb-3">
            <FileText size={24} className="text-teal-600" />
          </div>
          <h3 className="font-medium text-gray-800">Find Doctors</h3>
        </Link>
      </div>
      
      {/* Upcoming appointments */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-teal-600 mr-3"><Calendar size={24} /></span>
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
          </div>
          {appointments.length > 3 && (
            <button 
              onClick={toggleAppointmentsView} 
              className="text-teal-600 hover:text-teal-800 flex items-center text-sm font-medium"
            >
              {showAllAppointments ? 'Show Less' : 'View All'} 
              {showAllAppointments ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading appointments...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-4">{error}</p>
          ) : appointments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {displayedAppointments.map((appointment) => (
                <div key={appointment._id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between mb-1 items-center">
                    <h4 className="font-medium text-gray-800">{appointment.docData?.name || 'Doctor'}</h4>
                    <div className="flex items-center">
                      {!appointment.payment && (
                        <button 
                          onClick={() => handlePayment(appointment._id)}
                          className="bg-teal-600 text-white px-3 py-1 rounded-md text-sm mr-2 hover:bg-teal-700 flex items-center"
                          disabled={!razorpayLoaded}
                        >
                          <CreditCard size={14} className="mr-1" />
                          Pay ₹{appointment.amount}
                        </button>
                      )}
                      <span className={`text-sm font-medium ${appointment.payment ? 'text-green-600' : 'text-amber-600'}`}>
                        {appointment.payment ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{getDoctorSpeciality(appointment.docId)}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">{appointment.slotDate}</span>
                    <Clock size={16} className="mr-1" />
                    <span>{appointment.slotTime}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No upcoming appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;