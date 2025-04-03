import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Camera, Save, X } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: '',
    phone: ''
  });
  
  useEffect(() => {
    fetchUserProfile();
  }, []);
  
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/user/get-profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.user);
        setFormData({
          name: data.user.name || '',
          address: data.user.address || { line1: '', line2: '' },
          gender: data.user.gender || 'Not Selected',
          dob: data.user.dob || 'Not Selected',
          phone: data.user.phone || '0000000000'
        });
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      setError('Error loading profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'line1' || name === 'line2') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProfile({...profile, ...formData});
        setEditMode(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile: ' + err.message);
    }
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/update-profile-image', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ image: reader.result })
        });
        
        const data = await response.json();
        
        if (data.success) {
          setProfile({...profile, image: reader.result});
        } else {
          setError('Failed to update profile image');
        }
      } catch (err) {
        setError('Error updating profile image: ' + err.message);
      }
    };
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <X className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No profile data found</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(false);
              setFormData({
                name: profile.name || '',
                address: profile.address || { line1: '', line2: '' },
                gender: profile.gender || 'Not Selected',
                dob: profile.dob || 'Not Selected',
                phone: profile.phone || '0000000000'
              });
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              {profile.image ? (
                <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-teal-600 text-white flex items-center justify-center text-4xl font-bold">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-200 transition-colors">
              <Camera size={18} className="text-gray-600" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="mt-4 text-lg font-semibold text-center">{profile.name}</p>
          <p className="text-gray-500 text-sm text-center">{profile.email}</p>
        </div>
        
        <div className="md:w-2/3 md:pl-6">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Not Selected">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob !== 'Not Selected' ? formData.dob : ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <input
                    type="text"
                    name="line1"
                    value={formData.address.line1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input
                    type="text"
                    name="line2"
                    value={formData.address.line2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{profile.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{profile.phone === '0000000000' ? 'Not provided' : profile.phone}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <p className="mt-1">{profile.gender}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="mt-1">{profile.dob}</p>
              </div>
              
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="mt-1">
                  {profile.address.line1 ? profile.address.line1 : 'No address provided'}
                  {profile.address.line2 && profile.address.line1 ? ', ' : ''}
                  {profile.address.line2 ? profile.address.line2 : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
