import React from 'react';
import Navbar from '../../components/Navbar';
import { ChevronRight, Eye, Activity, User, CheckCircle, AlertCircle, CalendarClock, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ophthalmology = () => {
  const treatments = [
    { name: 'Cataract Surgery', icon: <Eye size={20} /> },
    { name: 'Refractive Surgery', icon: <Activity size={20} /> },
    { name: 'Glaucoma Treatment', icon: <Eye size={20} /> },
    { name: 'Retinal Disorders', icon: <AlertCircle size={20} /> },
    { name: 'Corneal Treatments', icon: <Eye size={20} /> },
    { name: 'Pediatric Eye Care', icon: <User size={20} /> }
  ];

  const conditions = [
    'Cataracts',
    'Glaucoma',
    'Diabetic Retinopathy',
    'Age-related Macular Degeneration',
    'Refractive Errors',
    'Dry Eye Syndrome',
    'Conjunctivitis',
    'Corneal Disorders',
    'Retinal Detachment',
    'Strabismus & Amblyopia'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-teal-600 hover:text-teal-700">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <Link to="/specialties" className="text-teal-600 hover:text-teal-700">Specialties</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-600">Ophthalmology</span>
          </div>
        </div>
      </div>
      
      {/* Hero Banner */}
      <div className="relative bg-teal-800 py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Ophthalmology <span className="text-yellow-400">Centre of Excellence</span>
            </h1>
            <p className="mb-6 text-lg">
              WAD Hospitals' Ophthalmology department delivers comprehensive eye care with cutting-edge technology 
              and expert specialists for all vision-related conditions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
                Book an Appointment
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-teal-800 transition-colors">
                Consult Online
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="/images/specialties/ophthalmology-hero.jpg" 
              alt="Ophthalmology Department" 
              className="rounded-lg shadow-xl max-w-full h-auto max-h-80 object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Key Info Stats */}
      <div className="bg-white py-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Activity size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">99.2%</p>
                <p className="text-sm text-gray-600">Surgery Success Rate</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <User size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">20,000+</p>
                <p className="text-sm text-gray-600">Vision Corrective Surgeries</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Stethoscope size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">25+</p>
                <p className="text-sm text-gray-600">Eye Specialists</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <CalendarClock size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">12+</p>
                <p className="text-sm text-gray-600">Eye Centers Across India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Excellence in Eye Care</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <p className="mb-4 text-gray-700">
                The Ophthalmology department at WAD Hospitals is dedicated to providing comprehensive eye care 
                services ranging from routine vision tests to complex eye surgeries. Our team of highly skilled 
                ophthalmologists and eye care professionals utilize advanced diagnostic technology and 
                surgical techniques to treat various eye conditions.
              </p>
              <p className="mb-4 text-gray-700">
                We pride ourselves on being at the forefront of ophthalmic innovation, offering bladeless laser 
                cataract surgery, advanced LASIK procedures, and minimally invasive glaucoma treatments. Our facilities 
                are equipped with state-of-the-art diagnostic tools that enable precise diagnosis and treatment planning.
              </p>
              <p className="text-gray-700">
                From pediatric eye care to geriatric ophthalmology, our specialists are trained to address the unique 
                eye health needs of patients of all ages, ensuring optimal vision and eye health throughout their lifetimes.
              </p>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Specialized Treatments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {treatments.map((treatment, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-5 flex items-center hover:shadow-lg transition-shadow">
                  <div className="rounded-full bg-teal-100 p-3 mr-4">
                    {treatment.icon}
                  </div>
                  <span className="font-medium text-gray-800">{treatment.name}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Advanced Diagnostic Services</h3>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Optical Coherence Tomography (OCT)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Visual Field Testing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Corneal Topography</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Specular Microscopy</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Fundus Photography</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Fluorescein Angiography</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">A/B Scan Ultrasonography</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Electroretinography</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
            {/* Book Appointment Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Book an Appointment</h3>
              <p className="text-gray-700 mb-4">
                Schedule a consultation with our expert ophthalmologists at your preferred location and time.
              </p>
              <Link to="/appointments/book">
                <button className="w-full bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                  Schedule Now
                </button>
              </Link>
            </div>
            
            {/* Conditions We Treat */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Conditions We Treat</h3>
              <ul className="space-y-2">
                {conditions.map((condition, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight size={18} className="text-teal-600 mr-2 mt-1" />
                    <span className="text-gray-700">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Doctor Spotlight */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Meet Our Senior Ophthalmologist</h3>
              <div className="flex flex-col items-center">
                <img 
                  src="/images/doctors/ophthalmologist.jpg" 
                  alt="Dr. Priya Sharma" 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-bold text-gray-800">Dr. Priya Sharma</h4>
                <p className="text-gray-600 mb-2">Senior Consultant, Ophthalmology</p>
                <p className="text-gray-700 text-center text-sm mb-4">
                  MBBS, MS (Ophthalmology), Fellowship (Cornea & Refractive Surgery)
                </p>
                <Link to="/doctors/dr-priya-sharma">
                  <button className="text-teal-600 hover:text-teal-700 font-medium">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Patient Testimonial */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Patient Stories</h3>
              <div className="italic text-gray-700 mb-4">
                "After living with poor vision for years, my cataract surgery at WAD Hospitals was life-changing. 
                The clarity I now have is remarkable. The doctors were not only skilled but also took the time to explain 
                every step of the procedure and care for me with genuine concern."
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img 
                    src="/images/testimonials/patient3.jpg" 
                    alt="Rajesh Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Cataract Surgery Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Banner */}
      <div className="bg-teal-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vision Care Excellence is Just a Call Away
          </h2>
          <p className="text-white mb-8 max-w-3xl mx-auto">
            Our team of ophthalmologists is dedicated to preserving and enhancing your vision with personalized care plans. 
            Schedule a comprehensive eye examination today or call our vision helpline for immediate assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-500 text-black font-medium px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
              Book an Eye Checkup
            </button>
            <div>
              <span className="block text-white text-sm">Vision Helpline</span>
              <span className="text-yellow-400 font-bold text-xl">1860-500-EYES</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer placeholder */}
      <div className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 WAD Hospitals. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Ophthalmology;