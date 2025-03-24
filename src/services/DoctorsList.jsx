import React from 'react';
import { doctors } from './../data/quickLinksData';
import { Star } from 'lucide-react';

const DoctorsList = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-medium text-lg">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{doctor.rating}</span>
              </p>
              <p className="text-gray-600">{doctor.experience} experience</p>
              <p className="text-gray-600">{doctor.hospital}</p>
              <p className="text-gray-600">Available: {doctor.availability}</p>
              <p className="font-medium text-teal-600">{doctor.consultationFee}</p>
              <button className="w-full mt-4 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;