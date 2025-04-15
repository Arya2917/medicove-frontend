import React, { useState } from "react";
import { Save, X, Upload } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fee: "",
    availableDays: [],
    startTime: "",
    endTime: "",
    available: true,
    address: {
      line1: "",
      city: ""
    }
  });

  const specialties = [
    "Cardiology",
    "Neurology",
    "Oncology",
    "Gastroenterology",
    "Orthopedic",
    "Gynecology",
    "Dermatology",
    "Ophthalmology",
    "Pediatrics",
    "Psychiatry"
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'line1' || name === 'city') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle checkbox changes for available days
  const handleDayChange = (day) => {
    const updatedDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter(d => d !== day)
      : [...formData.availableDays, day];
    
    setFormData({ ...formData, availableDays: updatedDays });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      
      // Create FormData object to handle file upload
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("speciality", formData.speciality);
      formDataToSend.append("degree", formData.degree);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("about", formData.about);
      formDataToSend.append("fee", formData.fee);
      formDataToSend.append("available", formData.available);
      formDataToSend.append("address", JSON.stringify(formData.address));
      
      // Add schedule information if needed
      if (formData.availableDays.length) {
        formDataToSend.append("availableDays", JSON.stringify(formData.availableDays));
      }
      
      if (formData.startTime) {
        formDataToSend.append("startTime", formData.startTime);
      }
      
      if (formData.endTime) {
        formDataToSend.append("endTime", formData.endTime);
      }
      
      // Add image file if selected
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }
      
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}${import.meta.env.VITE_ADMIN_ADD_DOCTOR_API}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to add doctor");
      }
      
      // Show success message
      alert("Doctor added successfully!");
      
      // Redirect to doctors list or reset form
      navigate("/doctors");
      
    } catch (err) {
      setError(err.message);
      console.error("Error adding doctor:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      speciality: "",
      degree: "",
      experience: "",
      about: "",
      fee: "",
      availableDays: [],
      startTime: "",
      endTime: "",
      available: true,
      address: {
        line1: "",
        city: ""
      }
    });
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Add New Doctor</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <div className="mb-2">
                  <input
                    type="text"
                    id="line1"
                    name="line1"
                    placeholder="Address Line 1"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.address.line1}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Professional Information</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="speciality">
                  Specialty*
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.speciality}
                  onChange={handleChange}
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="experience">
                  Years of Experience*
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 15 years"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="degree">
                  Qualification*
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., MBBS, MD"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    <Upload size={18} className="mr-2" />
                    Upload Image
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  {imagePreview && (
                    <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-300">
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="about">
              Biography
            </label>
            <textarea
              id="about"
              name="about"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.about}
              onChange={handleChange}
              placeholder="Brief professional background and expertise..."
            ></textarea>
          </div>

          {/* Consultation Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Consultation Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fee">
                  Consultation Fee (₹)*
                </label>
                <input
                  type="number"
                  id="fee"
                  name="fee"
                  required
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.fee}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startTime">
                  Start Time*
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endTime">
                  End Time*
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Available Days */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Days*
            </label>
            <div className="flex flex-wrap gap-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    id={day}
                    checked={formData.availableDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={day} className="text-sm text-gray-700">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="available">
              Status
            </label>
            <select
              id="available"
              name="available"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.available.toString()}
              onChange={(e) => setFormData({...formData, available: e.target.value === "true"})}
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              <Save size={18} className="mr-2" />
              {loading ? "Saving..." : "Save Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;