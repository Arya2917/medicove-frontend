import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ChevronRight, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-teal-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About & Contact */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/images/doctor-logo.png" alt="Hospital Logo" className="h-12" />
              <span className="ml-3 text-xl font-bold">MediCare</span>
            </div>
            
            <p className="text-teal-100 mb-6">
              Leading healthcare provider committed to excellence in patient care, 
              advanced medical treatments, and compassionate service since 1985.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-teal-100">123 Medical Center Drive, Delhi 110001, India</p>
              </div>
              
              <div className="flex items-center">
                <Phone size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                <p className="text-teal-100">1860-500-1066</p>
              </div>
              
              <div className="flex items-center">
                <Mail size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                <p className="text-teal-100">contact@medicare.com</p>
              </div>
              
              <div className="flex items-start">
                <Clock size={20} className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-teal-100">
                  Mon - Fri: 8:00 AM - 8:00 PM<br />
                  Sat - Sun: 9:00 AM - 6:00 PM<br />
                  <span className="text-yellow-500 font-bold">Emergency: 24/7</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-500 -mb-2"></span>
            </h3>
            
            <ul className="space-y-3">
              {['About Us', 'Our Doctors', 'Book Appointment', 'Find Locations', 'Patient Stories', 'Careers', 'News & Media', 'Research & Education', 'CSR Initiatives', 'Privacy Policy'].map((link, index) => (
                <li key={index}>
                  <Link to="#" className="text-teal-100 hover:text-yellow-500 transition-colors flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Departments */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              Our Specialties
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-500 -mb-2"></span>
            </h3>
            
            <ul className="space-y-3">
              {['Cardiology', 'Neurology', 'Gastroenterology', 'Orthopedic', 'Oncology', 'Gynecology', 'Pediatrics', 'Urology', 'Dermatology', 'Pulmonology'].map((dept, index) => (
                <li key={index}>
                  <Link to={`/specialties/${dept.toLowerCase()}`} className="text-teal-100 hover:text-yellow-500 transition-colors flex items-center">
                    <ChevronRight size={16} className="mr-2" />
                    {dept}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Newsletter - FIXED EMAIL CONTRAST ISSUE */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-500 -mb-2"></span>
            </h3>
            
            <p className="text-teal-100 mb-4">
              Subscribe to our newsletter for health tips, hospital news, and service updates.
            </p>
            
            <div className="flex mb-6 bg-white rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-3 flex-grow text-gray-800 focus:outline-none border-0"
              />
              <button className="bg-yellow-500 text-teal-900 px-4 py-3 font-medium hover:bg-yellow-400 transition-colors border-0">
                Subscribe
              </button>
            </div>
            
            <h4 className="font-medium mb-3">Follow Us:</h4>
            <div className="flex space-x-3">
              {[
                { icon: <Facebook size={20} />, label: "Facebook" },
                { icon: <Twitter size={20} />, label: "Twitter" },
                { icon: <Instagram size={20} />, label: "Instagram" },
                { icon: <Linkedin size={20} />, label: "LinkedIn" },
                { icon: <Youtube size={20} />, label: "YouTube" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 bg-teal-800 hover:bg-yellow-500 flex items-center justify-center rounded-full transition-colors hover:text-teal-900"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Accreditations */}
        <div className="border-t border-teal-800 mt-12 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <img src="/api/placeholder/100/60" alt="ISO Certified" className="h-12 mb-2" />
              <span className="text-sm text-teal-100">ISO Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/api/placeholder/100/60" alt="NABH Accredited" className="h-12 mb-2" />
              <span className="text-sm text-teal-100">NABH Accredited</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/api/placeholder/100/60" alt="JCI Accredited" className="h-12 mb-2" />
              <span className="text-sm text-teal-100">JCI Accredited</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/api/placeholder/100/60" alt="Green Hospital" className="h-12 mb-2" />
              <span className="text-sm text-teal-100">Green Hospital</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-teal-800 pt-6 text-center">
          <p className="text-teal-100 text-sm">
            © {currentYear} MediCare Hospitals. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;