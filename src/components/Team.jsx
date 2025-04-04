import React from 'react';
import { Phone, Mail, Linkedin } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const ManagementTeam = () => {
  // Team members data
  const teamLeader = {
    name: "Arya Thanekar",
    position: "Chief Executive Officer",
    image: "/images/arya.jpeg",
    education: "B.Tech in Information Technology, Pune Institute of Computer Technology",
    about: "Arya Thanekar leads the team with innovative vision and technical expertise. With a strong foundation in Information Technology from PICT, Arya has pioneered several groundbreaking initiatives and continues to drive the organization toward technological excellence and sustainable growth."
  };
  
  const teamMembers = [
    {
      name: "Sampada Tagalpallewar",
      position: "Chief Technology Officer",
      image: "/images/sam.jpeg",
      education: "B.Tech in Information Technology, Pune Institute of Computer Technology",
      about: "Sampada Tagalpallewar oversees all technological aspects and innovation strategies. Her expertise in emerging technologies and system architecture has been instrumental in developing scalable and robust solutions."
    },
    {
      name: "Arnav Vaidya",
      position: "Chief Operations Officer",
      image: "/images/arnav.jpeg",
      education: "B.Tech in Information Technology, Pune Institute of Computer Technology",
      about: "Arnav Vaidya manages day-to-day operations and implementation strategies. With exceptional analytical skills and attention to detail, he ensures optimal performance across all operational workflows and project executions."
    },
    {
      name: "Pranav Sonar",
      position: "Chief Product Officer",
      image: "/images/pranav.jpeg",
      education: "B.Tech in Information Technology, Pune Institute of Computer Technology",
      about: "Pranav Sonar heads product development and client solutions. His user-centric approach and technical insight drive the creation of intuitive and effective products that exceed client expectations and market demands."
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Include Navbar */}
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-teal-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Leadership Team</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the innovative minds from Pune Institute of Computer Technology 
            who are driving our vision forward with their expertise in Information Technology.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Team Leader Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-20">
          <div className="p-8 border-b border-gray-200 text-center">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Leadership</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Our team comprises talented graduates from Pune Institute of Computer Technology, 
              each bringing unique skills and perspectives to drive innovation and excellence.
            </p>
          </div>
          
          {/* Team Leader Profile */}
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2">
              <div className="h-full">
                <img 
                  src={teamLeader.image} 
                  alt={teamLeader.name} 
                  className="w-full h-[100%] object-cover object-center"
                />
              </div>
            </div>
            <div className="md:col-span-3 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-teal-800 mb-2">{teamLeader.name}</h3>
              <p className="text-xl text-yellow-600 mb-4">{teamLeader.position}</p>
              <p className="text-gray-600 mb-6">{teamLeader.education}</p>
              <p className="text-gray-700 text-lg mb-8">{teamLeader.about}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-teal-600 hover:text-teal-800 p-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors">
                  <Phone size={20} />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800 p-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors">
                  <Mail size={20} />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800 p-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-teal-600 hover:text-teal-800 p-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Members */}
        <h2 className="text-3xl font-bold text-teal-800 mb-12 text-center">Core Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-[4/3] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900 to-transparent opacity-0 hover:opacity-70 transition-opacity flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-white hover:text-yellow-400 p-2">
                        <Phone size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-yellow-400 p-2">
                        <Mail size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-yellow-400 p-2">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-yellow-400 p-2">
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-1">{member.name}</h3>
                <p className="text-yellow-600 mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.education}</p>
                <p className="text-gray-700">{member.about}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Approach */}
        <div className="bg-white rounded-xl shadow-lg mt-20 p-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-teal-50 p-6 rounded-lg transform transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-700 mb-3 text-center">Innovation First</h3>
              <p className="text-gray-700 text-center">
                We approach every challenge with fresh perspectives and innovative solutions, 
                leveraging our technical expertise to create forward-thinking implementations.
              </p>
            </div>
            
            <div className="bg-teal-50 p-6 rounded-lg transform transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-700 mb-3 text-center">Collaborative Excellence</h3>
              <p className="text-gray-700 text-center">
                Our team thrives on collaboration, pooling our diverse skills and perspectives 
                to deliver comprehensive solutions that exceed expectations.
              </p>
            </div>
            
            <div className="bg-teal-50 p-6 rounded-lg transform transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-teal-700 mb-3 text-center">Rapid Execution</h3>
              <p className="text-gray-700 text-center">
                We pride ourselves on efficient implementation and quick turnarounds, 
                ensuring our solutions are deployed promptly without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default ManagementTeam;