import React, { useState } from "react";
import { Search, Edit, Trash2, Phone, Mail } from "lucide-react";

const AllDoctors = () => {
  // Sample doctor data - in a real app, you would fetch this from your backend
  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: "Dr. Maria Rodriguez", 
      specialty: "Cardiology", 
      email: "maria.rodriguez@hospital.com", 
      phone: "+1 (555) 123-4567", 
      joinDate: "2022-05-15", 
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/1.jpg" 
    },
    { 
      id: 2, 
      name: "Dr. Robert Chen", 
      specialty: "Neurology", 
      email: "robert.chen@hospital.com", 
      phone: "+1 (555) 234-5678", 
      joinDate: "2021-08-10", 
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/2.jpg" 
    },
    { 
      id: 3, 
      name: "Dr. Lisa Wong", 
      specialty: "Oncology", 
      email: "lisa.wong@hospital.com", 
      phone: "+1 (555) 345-6789", 
      joinDate: "2023-01-20", 
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/3.jpg" 
    },
    { 
      id: 4, 
      name: "Dr. James Wilson", 
      specialty: "Orthopedic", 
      email: "james.wilson@hospital.com", 
      phone: "+1 (555) 456-7890", 
      joinDate: "2020-11-05",
      status: "On Leave",
      image: "https://randomuser.me/api/portraits/men/4.jpg" 
    },
    { 
      id: 5, 
      name: "Dr. Sarah Patel", 
      specialty: "Dermatology", 
      email: "sarah.patel@hospital.com", 
      phone: "+1 (555) 567-8901", 
      joinDate: "2023-05-12",
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/5.jpg" 
    },
  ]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete doctor
  const handleDeleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Doctors</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt={doctor.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctor.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex flex-col">
                      <div className="flex items-center mb-1">
                        <Mail size={14} className="mr-1 text-gray-400" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-1 text-gray-400" />
                        {doctor.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doctor.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      <Trash2 size={18} />
                    </button>
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

export default AllDoctors;