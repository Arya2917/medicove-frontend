import React from 'react';
import { medicines } from  './../data/quickLinksData';

const MedicineList = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Medicines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="font-medium text-lg mb-2">{medicine.name}</h3>
            <p className="text-gray-600 mb-1">{medicine.category}</p>
            <p className="text-gray-600 mb-1">{medicine.manufacturer}</p>
            <p className="text-gray-600 mb-2">{medicine.description}</p>
            <p className="font-medium text-teal-600 mb-4">${medicine.price}</p>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${medicine.prescription ? 'text-red-600' : 'text-green-600'}`}>
                {medicine.prescription ? 'Prescription Required' : 'Over the Counter'}
              </span>
              <button className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineList;
