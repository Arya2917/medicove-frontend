// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, [isAuthenticated, userRole]);

  const fetchUserData = async () => {
    try {
      // Mock API call - Replace with actual user data endpoint
      // const response = await fetch('/api/user/profile');
      // const data = await response.json();
      
      // Simulate fetching user data
      setTimeout(() => {
        // Generate mock user data based on role
        let mockData;
        
        switch (userRole) {
          case 'admin':
            mockData = {
              id: 'admin-123',
              name: 'Admin User',
              email: 'admin@healthcare.com',
              avatar: null,
              role: 'admin',
              department: 'Administration',
              permissions: ['manage_users', 'manage_billing', 'view_reports']
            };
            break;
          case 'doctor':
            mockData = {
              id: 'doc-456',
              name: 'Dr. Sarah Smith',
              email: 'dr.smith@healthcare.com',
              avatar: null,
              role: 'doctor',
              specialty: 'Cardiology',
              patients: 128,
              yearsOfExperience: 12
            };
            break;
          case 'patient':
          default:
            mockData = {
              id: 'pat-789',
              name: 'John Doe',
              email: 'john.doe@example.com',
              avatar: null,
              role: 'patient',
              dateOfBirth: '1985-06-15',
              bloodType: 'O+',
              allergies: ['Penicillin'],
              primaryDoctor: 'Dr. Sarah Smith'
            };
        }
        
        setUserData(mockData);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      // Mock API call - Replace with actual update endpoint
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData)
      // });
      // const data = await response.json();
      
      // Simulate successful update
      return new Promise((resolve) => {
        setTimeout(() => {
          setUserData({ ...userData, ...updatedData });
          resolve({ success: true });
        }, 500);
      });
      
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    userData,
    loading,
    updateUserProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};