import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-teal-700">Contact Us</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact information */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="text-teal-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Phone Numbers</h3>
                  <p className="text-gray-700">Emergency: 1066</p>
                  <p className="text-gray-700">Hospital Lifeline: 1860-500-1066</p>
                  <p className="text-gray-700">Appointment: +91 022-1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-teal-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-700">info@healthplus.com</p>
                  <p className="text-gray-700">appointments@healthplus.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-teal-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-700">123 Health Avenue, Medical District</p>
                  <p className="text-gray-700">Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-teal-500 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Working Hours</h3>
                  <p className="text-gray-700">24/7 Emergency Services</p>
                  <p className="text-gray-700">Outpatient Department: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Appointment Hours: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-teal-600">Send us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        {/* Map section (placeholder) */}
        <div className="mt-12 bg-gray-200 p-4 rounded-lg h-80 flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here</p>
          {/* You would add your Google Maps or other map integration here */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;