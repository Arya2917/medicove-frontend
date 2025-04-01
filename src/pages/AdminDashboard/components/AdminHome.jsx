import React from "react";
import { Users, Calendar, Stethoscope, Clock } from "lucide-react";

const AdminHome = () => {
  // Sample data - in a real app, you would fetch this from your backend
  const stats = [
    { id: 1, title: "Total Doctors", value: 42, icon: Stethoscope, color: "bg-blue-500" },
    { id: 2, title: "Total Patients", value: 1245, icon: Users, color: "bg-green-500" },
    { id: 3, title: "Appointments Today", value: 28, icon: Calendar, color: "bg-purple-500" },
    { id: 4, title: "Pending Appointments", value: 15, icon: Clock, color: "bg-amber-500" },
  ];

  // Sample recent appointments
  const recentAppointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Maria Rodriguez", date: "2025-04-01", time: "09:30 AM", status: "Confirmed" },
    { id: 2, patient: "Sarah Johnson", doctor: "Dr. Robert Chen", date: "2025-04-01", time: "10:45 AM", status: "Completed" },
    { id: 3, patient: "Michael Brown", doctor: "Dr. Lisa Wong", date: "2025-04-01", time: "02:15 PM", status: "Confirmed" },
    { id: 4, patient: "Emily Davis", doctor: "Dr. James Wilson", date: "2025-04-02", time: "11:00 AM", status: "Pending" },
    { id: 5, patient: "Alex Thompson", doctor: "Dr. Maria Rodriguez", date: "2025-04-02", time: "03:30 PM", status: "Confirmed" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`${stat.color} p-3 rounded-full mr-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {appointment.patient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.date} at {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;