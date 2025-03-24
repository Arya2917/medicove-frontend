// src/hooks/useAuth.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Create an authentication context
const AuthContext = createContext(null);

// This is the provider component that will wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if there's a saved user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    // In a real app, you would make an API call here
    // This is a mock implementation for demonstration
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock validation logic
        if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
          const userData = { id: 1, name: 'Admin User', email: credentials.email, role: 'admin' };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else if (credentials.email === 'doctor@example.com' && credentials.password === 'password') {
          const userData = { id: 2, name: 'Doctor User', email: credentials.email, role: 'doctor' };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else if (credentials.email === 'patient@example.com' && credentials.password === 'password') {
          const userData = { id: 3, name: 'Patient User', email: credentials.email, role: 'patient' };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!user;

  // Auth context value
  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};