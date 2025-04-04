import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { specialtiesData } from '../data/HealthCareData';

const CentresOfExcellence = () => {
  const imageContainerRef = useRef(null);
  const gridContainerRef = useRef(null);

  // Match the height of grid with image container
  useEffect(() => {
    const matchHeights = () => {
      if (imageContainerRef.current && gridContainerRef.current) {
        gridContainerRef.current.style.height = 'auto';
        const imageHeight = imageContainerRef.current.clientHeight;
        gridContainerRef.current.style.height = `${imageHeight}px`;
      }
    };

    matchHeights();
    window.addEventListener('resize', matchHeights);

    return () => window.removeEventListener('resize', matchHeights);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
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
          {/* Doctor Image */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0" ref={imageContainerRef}>
            <div className="rounded-lg overflow-hidden shadow-lg h-full">
              <img
                src="/images/doctor-patient-consultation.jpg"
                alt="Doctor consulting with patient"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Specialties Grid */}
          <div className="w-full md:w-2/3 md:pl-8" ref={gridContainerRef}>
            <div className="grid grid-cols-2 gap-4 h-full overflow-y-auto">
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
