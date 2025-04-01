// src/hooks/useAuth.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Create an authentication context
const AuthContext = createContext(null);

// This is the provider component that will wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if there's a saved user session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Invalid stored data, clear it
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Login function - accepts user data including token
  const login = async (userData) => {
    // Store token
    const token = userData.token;
    localStorage.setItem("token", token);

    let userId = null;
    try {
      // JWT tokens are in format: header.payload.signature
      // We need the payload part which is the second segment
      const payload = token.split('.')[1];
      // Decode the base64 payload
      const decodedPayload = JSON.parse(atob(payload));
      userId = decodedPayload.id;
    } catch (error) {
      console.error('Failed to extract ID from token:', error);
    }

    // Create a user object with available data
    const userObject = {
      id: userData._id || userData.id, // Added proper ID handling
      email: userData.email,
      name: userData.name || "User",
      token: userData.token,
      isAdmin: userData.isAdmin || false // Add isAdmin flag
    };

    console.log("Saving user data:", userObject);

    // Save user data
    localStorage.setItem("user", JSON.stringify(userObject));
    setUser(userObject);

    return userObject;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!user;

  // Check if user is an admin
  const isAdmin = () => isAuthenticated() && user.isAdmin === true;

  // Get the authentication token
  const getToken = () => localStorage.getItem("token");

  // Auth context value
  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    getToken,
    loading,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};