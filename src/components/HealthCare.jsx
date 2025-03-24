import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { specialtiesData } from '../data/HealthCareData';

const CentresOfExcellence = () => {
  const [activeTab, setActiveTab] = useState('Specialties');
  const imageContainerRef = useRef(null);
  const gridContainerRef = useRef(null);
  
  // Effect to handle matching heights
  useEffect(() => {
    const matchHeights = () => {
      if (imageContainerRef.current && gridContainerRef.current) {
        // Reset the grid height first to get natural image height
        gridContainerRef.current.style.height = 'auto';
        
        // Get the height of the image container
        const imageHeight = imageContainerRef.current.clientHeight;
        
        // Set the grid container height to match
        gridContainerRef.current.style.height = `${imageHeight}px`;
      }
    };
    
    // Initial matching
    matchHeights();
    
    // Re-match on window resize
    window.addEventListener('resize', matchHeights);
    
    // Cleanup
    return () => window.removeEventListener('resize', matchHeights);
  }, []);
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm mb-8">
          <div className="flex justify-center">
            {['Specialties', 'Procedures', 'ProHealth'].map((tab) => (
              <button
                key={tab}
                className={`px-8 py-4 text-center text-gray-800 font-medium relative ${
                  activeTab === tab ? 'text-teal-600' : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Explore our Centres of Clinical Excellence
        </h2>
        <p className="text-center max-w-4xl mx-auto mb-8 text-gray-700">
          WAD Hospitals has dedicated Centres of Excellence for several key specialties and super specialties. 
          They are unique and state of the art facilities spread across several of the WAD hospital locations 
          and each Centre of Excellence stands out as a citadel of world class clinical outcomes.
        </p>
        <p className="text-center mb-12 text-teal-600 font-medium">
          Learn about the world class health care we provide
        </p>

        <div className="flex flex-wrap items-start">
          {/* Doctor Image - Left Side */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0" ref={imageContainerRef}>
            <div className="rounded-lg overflow-hidden shadow-lg h-full">
              <img
                src="/images/doctor-patient-consultation.jpg"
                alt="Doctor consulting with patient"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Specialties Grid - Right Side */}
          <div 
            className="w-full md:w-2/3 md:pl-8" 
            ref={gridContainerRef}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 h-full overflow-y-auto">
              {specialtiesData.map((specialty) => (
                <Link
                  key={specialty.id}
                  to={`/specialties/${specialty.id}`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    {specialty.iconPath ? (
                      <img 
                        src={specialty.iconPath}
                        alt={specialty.name}
                        className="max-w-full max-h-full" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {specialty.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {specialty.name}
                  </span>
                </Link>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CentresOfExcellence;