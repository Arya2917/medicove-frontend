import { useState, useEffect } from "react";
import { Calendar, Clock, User, FileText, DollarSign } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { useAuth } from "../../../hooks/useAuth";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, getToken } = useAuth();

  // Extract doctorId from URL query parameters
  const params = new URLSearchParams(location.search);
  const preselectedDoctorId = params.get("doctorId");

  const [formData, setFormData] = useState({
    doctorId: preselectedDoctorId || "",
    date: "",
    time: "",
    reason: "",
    amount: 500, // Default amount set to 500
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch doctors from the API
  const { data, loading } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_DOCTORS_API}`
  );
  const doctors = data?.doctors || [];

  // Extract user ID from JWT token
  useEffect(() => {
    // Extract userId from token
    const token = getToken();
    if (token) {
      try {
        // JWT tokens are in format: header.payload.signature
        const payload = token.split('.')[1];
        // Decode the base64 payload
        const decodedPayload = JSON.parse(atob(payload));
        if (decodedPayload.id) {
          console.log("Extracted user ID from token:", decodedPayload.id);
          setUserId(decodedPayload.id);
        }
      } catch (error) {
        console.error('Failed to extract ID from token:', error);
      }
    }
  }, [getToken]);

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate("/login", {
        state: { from: location.pathname + location.search },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  // Update doctor fee when doctor selection changes
  useEffect(() => {
    if (formData.doctorId) {
      const selectedDoctor = doctors.find(
        (doc) => doc._id === formData.doctorId
      );
      if (selectedDoctor && selectedDoctor.fee) {
        setFormData((prev) => ({
          ...prev,
          amount: selectedDoctor.fee,
        }));
      }
    }
  }, [formData.doctorId, doctors]);

  // Generate available time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage(""); // Clear any error messages when form changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    console.log("Current user object:", user);
    // Use the extracted userId from token
    console.log("User ID being used:", userId);

    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!userId) {
      setErrorMessage("Unable to identify user. Please try logging in again.");
      setIsSubmitting(false);
      return;
    }

    // Format the date properly
    const formattedDate = formData.date; // Already in YYYY-MM-DD format from input type="date"

    try {
      const token = getToken();

      // Create the request payload with userId from token
      const payload = {
        userId: userId, // Use the extracted userId from token
        docId: formData.doctorId,
        slotDate: formattedDate,
        slotTime: formData.time,
        reason: formData.reason,
        amount: parseInt(formData.amount)
      };

      console.log("Sending appointment data:", payload);

      // Use the correct endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_USER_BOOK_APPOINTMENT_API}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      // Get the response as text first for better debugging
      const responseText = await response.text();
      console.log("Raw API response:", responseText);

      // Try to parse it as JSON if possible
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Error parsing response as JSON:", e);
        throw new Error("Invalid response format from server");
      }

      // Check if the response is OK
      if (!response.ok) {
        console.error(`API responded with status ${response.status}:`, result);
        throw new Error(result.message || `API error: ${response.status}`);
      }

      console.log("API response:", result);

      if (
        result.message === "Appointment booked successfully" ||
        result.success
      ) {
        alert("Appointment booked successfully!");

        setFormData({
          doctorId: "",
          date: "",
          time: "",
          reason: "",
          amount: 500,
        });

        navigate("/appointments");
      } else {
        setErrorMessage(
          result.message || "Failed to book appointment. Please try again."
        );
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setErrorMessage(
        error.message ||
          "An error occurred while booking your appointment. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate min date (today) for the date picker
  const today = new Date().toISOString().split("T")[0];

  // If still loading and we have a preselected doctor ID, show loading state
  if (loading && preselectedDoctorId) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Book an Appointment
      </h2>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 px-6 py-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Calendar size={24} className="mr-2" />
            Schedule Your Visit
          </h3>
          <p className="text-teal-100 text-sm mt-1">
            Fill out the form below to request an appointment with one of our
            healthcare professionals.
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-6 mt-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Doctor Selection */}
            <div className="space-y-2">
              <label
                htmlFor="doctorId"
                className="block text-sm font-medium text-gray-700"
              >
                Select Doctor
              </label>
              <div className="relative">
                <select
                  id="doctorId"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 pl-10"
                >
                  <option value="">-- Select a doctor --</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name} - {doctor.speciality || ""}
                    </option>
                  ))}
                </select>
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 pl-10"
                />
                <Calendar
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Preferred Time
              </label>
              <div className="relative">
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 pl-10"
                >
                  <option value="">-- Select a time slot --</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <Clock
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="space-y-2">
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for Visit
              </label>
              <div className="relative">
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 pl-10"
                >
                  <option value="">-- Select reason --</option>
                  <option value="Regular checkup">Regular Check-up</option>
                  <option value="consultation">General Consultation</option>
                  <option value="followup">Follow-up Visit</option>
                  <option value="urgent">Urgent Care</option>
                  <option value="test">Medical Tests</option>
                  <option value="other">Other</option>
                </select>
                <FileText
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Amount Field */}
          <div className="mt-6 space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Consultation Fee (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                disabled={true}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 pl-10 bg-gray-50"
              />
              <DollarSign
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <span className="text-xs text-gray-500 mt-1 block">
                Fee in rupees (₹) - automatically set based on doctor selection
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 font-medium transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                  Processing...
                </span>
              ) : (
                "Request Appointment"
              )}
            </button>
          </div>

          {/* Info Note */}
          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>
              We will confirm your appointment via email or phone within 24
              hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;