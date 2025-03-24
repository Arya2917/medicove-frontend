// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing login data
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    
    if (token && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Mock API call - Replace with actual authentication endpoint
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      
      // Simulate successful login with mock data
      const mockResponse = {
        token: 'mock-jwt-token',
        role: credentials.email.includes('admin') ? 'admin' :
              credentials.email.includes('doctor') ? 'doctor' : 'patient',
        success: true
      };
      
      if (mockResponse.success) {
        localStorage.setItem('token', mockResponse.token);
        localStorage.setItem('userRole', mockResponse.role);
        
        setIsAuthenticated(true);
        setUserRole(mockResponse.role);
        
        return mockResponse;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Mock API call - Replace with actual registration endpoint
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();
      
      // Simulate successful registration
      const mockResponse = {
        success: true,
        message: 'Registration successful'
      };
      
      if (mockResponse.success) {
        return mockResponse;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const value = {
    isAuthenticated,
    userRole,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};