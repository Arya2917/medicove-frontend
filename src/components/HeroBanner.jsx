import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
  const slides = [
    {
      id: 1,
      title: 'WE TOOK THE HIT',
      subtitle: 'TO KEEP YOU BREATHING',
      description: 'Listen to your concerned lungs.',
      subtext: 'Take action now with India\'s first',
      tagline: '#LungLife screening program for early detection of lung cancer.',
      buttonText: 'Click here to know more',
      buttonLink: '/lung-screening',
      bgImage: 'url("/images/lung-bg.jpg")',
      iconPath: '/images/lung-icon.svg'
    },
    {
      id: 2,
      title: 'HEART CARE',
      subtitle: 'EXPERTS YOU CAN TRUST',
      description: 'Your heart deserves the best care.',
      subtext: 'Advanced cardiac treatments with',
      tagline: '#HeartHealthy program for comprehensive cardiac evaluations.',
      buttonText: 'Learn about heart care',
      buttonLink: '/heart-care',
      bgImage: 'url("/images/heart-bg.jpg")',
      iconPath: '/images/heart-icon.svg'
    },
    {
      id: 3,
      title: 'PREVENTIVE CARE',
      subtitle: 'STAY AHEAD OF ILLNESS',
      description: 'Prevention is better than cure.',
      subtext: 'Comprehensive health checkups with',
      tagline: '#WellnessFirst approach for early detection and prevention.',
      buttonText: 'Book a checkup',
      buttonLink: '/preventive-care',
      bgImage: 'url("/images/preventive-bg.jpg")',
      iconPath: '/images/shield-icon.svg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const prevSlide = () => {
    if (isChanging) return;
    setIsChanging(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsChanging(false), 500);
  };

  const nextSlide = () => {
    if (isChanging) return;
    setIsChanging(true);
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setTimeout(() => setIsChanging(false), 500);
  };

  const goToSlide = (slideIndex) => {
    if (isChanging || slideIndex === currentIndex) return;
    setIsChanging(true);
    setCurrentIndex(slideIndex);
    setTimeout(() => setIsChanging(false), 500);
  };

  // Auto-advance slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(slideInterval);
  }, [currentIndex, isChanging]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative mt-12 mx-4 md:mx-8 rounded-lg overflow-hidden shadow-xl z-10">
      <div 
        className="relative h-80 md:h-96 bg-teal-800 overflow-hidden group transition-all duration-500"
        style={{
          backgroundImage: currentSlide.bgImage || '',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-800/70"></div>
        
        {/* Animated wave shape for the background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path 
              d="M0,800 C300,700 600,900 1200,800 L1200,0 L0,0 Z" 
              fill="white" 
              className="animate-wave"
            />
          </svg>
        </div>

        {/* Content with refined layout */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-3xl px-8 md:px-12 text-center relative z-10">
            <div className="mb-2 opacity-0 animate-slide-up" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
              <h2 className="text-yellow-500 text-2xl md:text-4xl font-bold tracking-wider">
                {currentSlide.title}
              </h2>
            </div>
            
            <div className="mb-6 opacity-0 animate-slide-up" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
              <h3 className="text-white text-xl md:text-3xl font-bold tracking-wide">
                {currentSlide.subtitle}
              </h3>
            </div>
            
            <div className="mb-6 opacity-0 animate-fade-in" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
              <p className="text-yellow-500 text-lg mb-2 font-medium">
                {currentSlide.description}
              </p>
              <p className="text-white text-sm mb-1">
                {currentSlide.subtext}
              </p>
              <p className="text-white">
                <span className="text-yellow-500 font-bold">{currentSlide.tagline.split(' ')[0]}</span> 
                {currentSlide.tagline.substring(currentSlide.tagline.indexOf(' '))}
              </p>
            </div>
            
            <div className="opacity-0 animate-slide-up" style={{animationDelay: '0.7s', animationFillMode: 'forwards'}}>
              <Link to={currentSlide.buttonLink}>
                <button className="bg-yellow-500 text-black font-medium px-6 py-2 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-md">
                  {currentSlide.buttonText}
                </button>
              </Link>
            </div>
          </div>
          
          {/* Logo with pulsing animation */}
          <div className="absolute top-4 right-4 animate-pulse">
            <img src="/images/doctor-logo.png" alt="Logo" className="h-12 md:h-16" />
          </div>
          
          {/* Decorative elements */}
          {currentSlide.iconPath && (
            <div className="absolute bottom-4 left-4 opacity-20">
              <img src={currentSlide.iconPath} alt="" className="h-24 md:h-32" />
            </div>
          )}
        </div>

        {/* Left Arrow with improved styles */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Right Arrow with improved styles */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Navigation dots with animation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === slideIndex ? 'bg-yellow-500 w-8' : 'bg-white/60 w-2 hover:bg-white'
              }`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        .animate-wave {
          animation: wave 15s ease-in-out infinite;
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease forwards;
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;