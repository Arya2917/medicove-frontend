import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const PatientTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 45,
      treatment: "Cardiac Bypass Surgery",
      image: "/images/patient1.jpg",
      rating: 5,
      quote: "I had almost given up hope until I met the cardiac team here. The care I received was extraordinary, and I'm now back to my normal life. The doctors explained everything clearly and made a scary process feel manageable.",
      doctor: "Dr. Aisha Sharma",
      specialty: "Cardiology"
    },
    {
      id: 2,
      name: "Priya Mehta",
      age: 36,
      treatment: "Neurological Rehabilitation",
      image: "/images/patient2.jpg",
      rating: 5,
      quote: "After my stroke, I couldn't imagine regaining my mobility. The neurological team designed a personalized rehab program that helped me recover much faster than expected. Their dedication and encouragement made all the difference.",
      doctor: "Dr. Vikram Malhotra",
      specialty: "Neurology"
    },
    {
      id: 3,
      name: "Ananya Singh",
      age: 28,
      treatment: "Oncology Treatment",
      image: "/images/patient3.jpg",
      rating: 5,
      quote: "Fighting cancer was the toughest battle of my life, but I never felt alone. The oncology team became like family, providing not just medical expertise but emotional support through my entire journey. I'm forever grateful.",
      doctor: "Dr. Rahul Kapoor",
      specialty: "Oncology"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-gradient-to-r from-teal-800 to-teal-700 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Patient Testimonials</h2>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Hear from patients who have experienced our care and compassion firsthand
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Background decorative elements */}
          <div className="absolute -top-6 -left-6">
            <Quote size={60} className="text-teal-600/30" />
          </div>
          <div className="absolute -bottom-6 -right-6 transform rotate-180">
            <Quote size={60} className="text-teal-600/30" />
          </div>
          
          {/* Testimonial card */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div>
            
            <div className={`flex flex-col md:flex-row items-center gap-8 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {/* Patient image and info */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-100 shadow-md mb-4">
                  <img
                    src={currentTestimonial.image || "/api/placeholder/200/200"} 
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-xl text-teal-800">{currentTestimonial.name}</h3>
                  <p className="text-gray-500 text-sm">Age {currentTestimonial.age}, {currentTestimonial.treatment}</p>
                  <div className="flex items-center justify-center md:justify-start mt-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Testimonial content */}
              <div className="flex-1">
                <p className="text-gray-700 italic mb-6 text-lg">"{currentTestimonial.quote}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-teal-700 font-medium">Treated by: {currentTestimonial.doctor}</p>
                  <p className="text-gray-500 text-sm">{currentTestimonial.specialty} Department</p>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 -translate-y-1/2 left-4 bg-teal-800/10 hover:bg-teal-800/20 p-2 rounded-full text-teal-800"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 -translate-y-1/2 right-4 bg-teal-800/10 hover:bg-teal-800/20 p-2 rounded-full text-teal-800"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating || index === currentIndex) return;
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-yellow-500 w-8' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTestimonials;