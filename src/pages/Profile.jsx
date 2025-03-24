// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  AlertCircle, 
  Save, 
  Edit3, 
  Lock, 
  Shield
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Profile = () => {
  const { userData, updateUserProfile } = useUser();
  const { userRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize form data when user data is loaded
  React.useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        // Add other editable fields based on user role
        ...(userRole === 'patient' ? {
          emergencyContact: userData.emergencyContact || '',
          allergies: (userData.allergies || []).join(', ')
        } : {}),
        ...(userRole === 'doctor' ? {
          specialty: userData.specialty || '',
          bio: userData.bio || ''
        } : {})
      });
    }
  }, [userData, userRole]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading profile information...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Process form data for API
      const dataToUpdate = { ...formData };
      if (userRole === 'patient' && formData.allergies) {
        dataToUpdate.allergies = formData.allergies.split(',').map(item => item.trim()).filter(Boolean);
      }
      
      await updateUserProfile(dataToUpdate);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPatientSpecificFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="flex border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-2">
              <Calendar size={20} className="text-gray-500" />
            </div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || userData.dateOfBirth || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="flex-grow p-2 focus:outline-none disabled:bg-gray-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
          <div className="flex border rounded-md overflow-hidden">
            <div className="bg-gray-100 p-2">
              <AlertCircle size={20} className="text-gray-500" />
            </div>
            <select
              name="bloodType"
              value={formData.bloodType || userData.bloodType || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="flex-grow p-2 focus:outline-none disabled:bg-gray-50"
            >
              <option value="">Select blood type</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
        <input
          type="text"
          name="emergencyContact"
          value={formData.emergencyContact || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          placeholder="Name and phone number"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
        <textarea
          name="allergies"
          value={formData.allergies || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          placeholder="Enter allergies separated by commas"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 min-h-[100px]"
        />
      </div>
    </>
  );

  const renderDoctorSpecificFields = () => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
        <input
          type="text"
          name="specialty"
          value={formData.specialty || userData.specialty || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
        <textarea
          name="bio"
          value={formData.bio || userData.bio || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          placeholder="Write a short professional biography"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 min-h-[150px]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience || userData.yearsOfExperience || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
          min="0"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
        />
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        {successMessage && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p>{successMessage}</p>
          </div>
        )}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-blue-600 hover:text-blue-800"
            >
              {isEditing ? <Save size={20} /> : <Edit3 size={20} />}
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Avatar and name section */}
              <div className="flex flex-col sm:flex-row items-center mb-8">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold mb-4 sm:mb-0 sm:mr-6">
                  {userData.name?.charAt(0) || <User size={36} />}
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Role: <span className="capitalize">{userData.role}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Member since: {new Date().getFullYear() - Math.floor(Math.random() * 5)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Basic contact information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="flex border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-2">
                      <Mail size={20} className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-grow p-2 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-2">
                      <Phone size={20} className="text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-grow p-2 focus:outline-none disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="flex border rounded-md overflow-hidden">
                  <div className="bg-gray-100 p-2">
                    <MapPin size={20} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-grow p-2 focus:outline-none disabled:bg-gray-50"
                  />
                </div>
              </div>
              
              {/* Render role-specific fields */}
              {userRole === 'patient' && renderPatientSpecificFields()}
              {userRole === 'doctor' && renderDoctorSpecificFields()}
              
              {/* Security section */}
              <div className="mt-10 mb-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Shield size={18} className="mr-2 text-gray-500" />
                  Security Settings
                </h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <button
                    type="button"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Lock size={16} className="mr-2" />
                    Change Password
                  </button>
                </div>
              </div>
              
              {/* Submit button */}
              {isEditing && (
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mr-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                    {isLoading && (
                      <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;