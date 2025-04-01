import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Calendar,
  Stethoscope,
  UserPlus,
  LogOut,
  Home,
} from "lucide-react";

// Import admin page components
import AdminHome from "./components/AdminHome";
import AllDoctors from "./components/AllDoctors";
import AddDoctor from "./components/AddDoctor";
import AllAppointments from "./components/AllAppointments";

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Redirect non-admin users
  if (!isAuthenticated() || !user?.isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  // Helper function to check if a link is active
  const isActive = (path) => {
    return location.pathname === `/admin/dashboard${path}`;
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    return <Navigate to="/" replace />;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 min-h-screen shadow-lg">
        <div className="p-4">
          <div className="text-white font-bold text-xl mb-8 text-center py-4 border-b border-indigo-700">
            Hospital Admin
          </div>

          <div className="mb-6">
            <div className="text-indigo-300 uppercase text-xs font-semibold tracking-wider mb-2 pl-2">
              Main
            </div>
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive("")
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <Home size={18} className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="mb-6">
            <div className="text-indigo-300 uppercase text-xs font-semibold tracking-wider mb-2 pl-2">
              Staff Management
            </div>
            <Link
              to="/admin/dashboard/all-doctors"
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive("/all-doctors")
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <Stethoscope size={18} className="mr-2" />
              <span>All Doctors</span>
            </Link>
            <Link
              to="/admin/dashboard/add-doctor"
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive("/add-doctor")
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <UserPlus size={18} className="mr-2" />
              <span>Add Doctor</span>
            </Link>
          </div>

          <div className="mb-6">
            <div className="text-indigo-300 uppercase text-xs font-semibold tracking-wider mb-2 pl-2">
              Hospital Management
            </div>
            <Link
              to="/admin/dashboard/appointments"
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive("/appointments")
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <Calendar size={18} className="mr-2" />
              <span>Appointments</span>
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-indigo-700">
            <Link
              to="/"
              className="flex items-center px-4 py-3 mb-2 rounded-lg text-indigo-100 hover:bg-indigo-700 transition-colors"
            >
              <Home size={18} className="mr-2" />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 mb-2 rounded-lg text-indigo-100 hover:bg-indigo-700 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Hospital Admin Dashboard
          </h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">
              Welcome, {user?.name || "Admin"}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="all-doctors" element={<AllDoctors />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="appointments" element={<AllAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;