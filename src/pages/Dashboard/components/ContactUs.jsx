import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Contact form submitted:", formData);
    
    // Show success message
    alert("Thank you for your message! We will get back to you shortly.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="bg-teal-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Get In Touch</h3>
              <p className="text-teal-100 text-sm mt-1">
                We're here to help and answer any questions you might have
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Phone size={20} className="text-teal-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600 mt-1">+91 1066 (Emergency)</p>
                  <p className="text-gray-600">+91 1000 0000 (General Inquiries)</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Mail size={20} className="text-teal-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">info@medicare.com</p>
                  <p className="text-gray-600">support@medicare.com</p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <MapPin size={20} className="text-teal-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-gray-600 mt-1">
                    123 Healthcare Avenue,<br />
                    Medical District, Bengaluru<br />
                    Karnataka, India - 560001
                  </p>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Clock size={20} className="text-teal-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Working Hours</h4>
                  <p className="text-gray-600 mt-1">Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                  <p className="text-teal-600 font-medium mt-1">Emergency Care: 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-teal-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <MessageSquare size={24} className="mr-2" />
                Send us a Message
              </h3>
              <p className="text-teal-100 text-sm mt-1">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Your name"
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Your phone number"
                  />
                </div>
                
                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">-- Select a subject --</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="general">General Inquiry</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              {/* Message */}
              <div className="mt-6 space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Please describe your question or concern"
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 font-medium transition-colors"
                >
                  Send Message
                </button>
              </div>
              
              {/* Privacy Note */}
              <div className="mt-4 text-sm text-gray-500 text-center">
                <p>By submitting this form, you agree to our <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Map Section - Replace with actual map if needed */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-80 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={40} className="mx-auto text-teal-600 mb-2" />
            <p className="text-gray-500">Map would be displayed here</p>
            <p className="text-sm text-gray-400">Interactive map showing our hospital location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;