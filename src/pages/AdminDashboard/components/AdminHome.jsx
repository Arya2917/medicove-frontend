import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Stethoscope,
  Clock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

const AdminHome = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([
    {
      id: 1,
      title: "Total Doctors",
      value: 0,
      icon: Stethoscope,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Total Patients",
      value: 0,
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Appointments Today",
      value: 0,
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Pending Appointments",
      value: 0,
      icon: Clock,
      color: "bg-amber-500",
    },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        // Get the auth token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(
          "http://localhost:4000/api/admin/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(response.data);

        // Extract unique doctors and patients
        const uniqueDoctors = new Set(
          response.data.map((app) => app.docData.id)
        );
        const uniquePatients = new Set(
          response.data.map((app) => app.userData.id)
        );

        // Count appointments for today
        const today = new Date().toISOString().split("T")[0];
        const appointmentsToday = response.data.filter(
          (app) => app.slotDate === today && !app.cancelled
        ).length;

        // Count pending appointments (not cancelled, not completed)
        const pendingAppointments = response.data.filter(
          (app) => !app.cancelled && !app.isCompleted && !app.payment
        ).length;

        // Update stats
        setStats([
          {
            id: 1,
            title: "Total Doctors",
            value: uniqueDoctors.size,
            icon: Stethoscope,
            color: "bg-blue-500",
          },
          {
            id: 2,
            title: "Total Patients",
            value: uniquePatients.size,
            icon: Users,
            color: "bg-green-500",
          },
          {
            id: 3,
            title: "Appointments Today",
            value: appointmentsToday,
            icon: Calendar,
            color: "bg-purple-500",
          },
          {
            id: 4,
            title: "Pending Appointments",
            value: pendingAppointments,
            icon: Clock,
            color: "bg-amber-500",
          },
        ]);

        setError(null);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(
          "Failed to load appointments. Please make sure you're logged in."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [refreshTrigger]);

  // Sort appointments by date (newest first)
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Get current appointments for pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = sortedAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(appointments.length / appointmentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow p-6 flex items-center"
          >
            <div className={`${stat.color} p-3 rounded-full mr-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* All Appointments with Pagination */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">All Appointments</h3>
          <button
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <RefreshCw size={16} className="mr-1" />
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-center">Loading appointments...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Doctor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Booking Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAppointments.length > 0 ? (
                    currentAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {appointment.userData.name}
                          <div className="text-xs text-gray-500">
                            {appointment.userData.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.docData.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.slotDate} at {appointment.slotTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{appointment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                appointment.cancelled
                                  ? "bg-red-100 text-red-800"
                                  : appointment.isCompleted
                                  ? "bg-blue-100 text-blue-800"
                                  : appointment.payment
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {appointment.cancelled
                              ? "Cancelled"
                              : appointment.isCompleted
                              ? "Completed"
                              : appointment.payment
                              ? "Confirmed"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white ${
                    currentPage === 1
                      ? "text-gray-300"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(appointments.length / appointmentsPerPage)
                  }
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white ${
                    currentPage ===
                    Math.ceil(appointments.length / appointmentsPerPage)
                      ? "text-gray-300"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {indexOfFirstAppointment + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastAppointment, appointments.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{appointments.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {/* Page numbers */}
                    {[
                      ...Array(
                        Math.min(
                          5,
                          Math.ceil(appointments.length / appointmentsPerPage)
                        )
                      ).keys(),
                    ].map((number) => {
                      const pageNumber = number + 1;
                      // Logic to show pages around current page
                      const totalPages = Math.ceil(
                        appointments.length / appointmentsPerPage
                      );
                      let showPage = false;

                      if (totalPages <= 5) {
                        showPage = true;
                      } else if (
                        pageNumber === 1 ||
                        pageNumber === totalPages
                      ) {
                        showPage = true;
                      } else if (Math.abs(pageNumber - currentPage) <= 1) {
                        showPage = true;
                      }

                      if (showPage) {
                        return (
                          <button
                            key={number}
                            onClick={() => paginate(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === pageNumber
                                ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                                : "text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (pageNumber === 2 && currentPage > 3) {
                        return (
                          <span
                            key="ellipsis-start"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      } else if (
                        pageNumber === totalPages - 1 &&
                        currentPage < totalPages - 2
                      ) {
                        return (
                          <span
                            key="ellipsis-end"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }

                      return null;
                    })}

                    <button
                      onClick={nextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(appointments.length / appointmentsPerPage)
                      }
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage ===
                        Math.ceil(appointments.length / appointmentsPerPage)
                          ? "text-gray-300"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
