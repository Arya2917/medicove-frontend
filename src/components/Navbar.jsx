import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navbarData } from '../data/NavbarData';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Updated helper function to determine link path based on item text
  const getSpecialtyPath = (itemText) => {
    if (itemText === 'View All Specialties') {
      return '/specialties';
    } else if (['Cardiology', 'Neurology', 'Gastroenterology', 'Orthopedic', 'Oncology', 'Gynecology'].includes(itemText)) {
      // Convert specialty name to kebab-case and create consistent path
      return `/specialties/${itemText.toLowerCase().replace(/\s+/g, '-')}`;
    } else {
      // Default behavior for other items
      return `#${itemText.toLowerCase().replace(/\s+/g, '-')}`;
    }
  };

  return (
    <div className="w-full bg-white shadow-md">
      {/* Top bar with search and contact info */}
      <div className="container mx-auto px-4 py-6 flex justify-center items-center">
        <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl w-full">
          {/* Centered search bar */}
          <div className="flex items-center justify-center flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Search Doctor or Hospital"
              className="border border-gray-300 rounded-l-lg px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
            />
            <button className="bg-teal-600 text-white p-4 rounded-r-lg hover:bg-teal-700 transition-colors">
              <Search size={24} />
            </button>
          </div>
          
          <div className="flex gap-8">
            <div>
              <span className="text-sm text-gray-500">Emergency</span>
              <div className="flex items-center text-teal-600">
                <span className="mr-1">📞</span>
                <span className="font-medium text-lg">1066</span>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">Hospital Lifeline</span>
              <div className="flex items-center text-teal-600">
                <span className="mr-1">📞</span>
                <span className="font-medium text-lg">1860-500-1066</span>
              </div>
            </div>
            
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium">
              English
            </button>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex flex-wrap justify-center">
            {navbarData.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="#"
                  className={`group py-5 px-6 text-base font-medium flex items-center transition-all ${
                    activeDropdown === index
                      ? 'text-teal-600 bg-white'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-white'
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown 
                    size={18} 
                    className={`ml-1 ${
                      activeDropdown === index ? 'text-teal-600' : 'text-gray-400 group-hover:text-teal-600'
                    } transition-colors`} 
                  />
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform ${
                    activeDropdown === index ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform origin-left`}></div>
                </Link>
                
                {/* Dropdown Menu */}
                {activeDropdown === index && (
                  <div className="absolute z-10 left-0 mt-0 w-64 bg-white shadow-lg rounded-b-lg py-2 border-t-2 border-teal-600 animate-fadeIn">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={item.name === 'Centers of Excellence' ? getSpecialtyPath(subItem) : '#'}
                        className="block px-6 py-2 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;