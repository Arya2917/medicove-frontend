import React from 'react';
import { Phone, Mail, Linkedin } from 'lucide-react';

const ManagementTeam = () => {
  const executives = [
    {
      name: "Dr. Sanjay Gupta",
      position: "Chief Executive Officer",
      image: "/api/placeholder/300/300",
      education: "MBBS, MD, MBA (Healthcare Management)",
      about: "Dr. Sanjay Gupta brings over 25 years of experience in healthcare leadership. Under his guidance, MediCare has expanded its network while maintaining the highest standards of clinical excellence. He previously served as Medical Director at leading hospitals in the US and UK before returning to India to lead MediCare."
    },
    {
      name: "Ms. Deepa Reddy",
      position: "Chief Operating Officer",
      image: "/api/placeholder/300/300",
      education: "MBA (Operations), Six Sigma Black Belt",
      about: "Ms. Deepa Reddy oversees daily operations across all MediCare facilities. With her background in process optimization and quality management, she has streamlined patient care workflows and improved operational efficiency while enhancing patient experience. Her leadership has resulted in reduced wait times and improved resource utilization."
    },
    {
      name: "Mr. Amit Khanna",
      position: "Chief Financial Officer",
      image: "/api/placeholder/300/300",
      education: "CA, CFA, MBA (Finance)",
      about: "Mr. Amit Khanna manages MediCare's financial strategy and planning. His innovative approach to healthcare financing has enabled MediCare to invest in cutting-edge technology while maintaining affordable care. He has successfully guided multiple hospital acquisitions and expansion projects."
    },
    {
      name: "Dr. Lakshmi Narayan",
      position: "Chief Medical Officer",
      image: "/api/placeholder/300/300",
      education: "MBBS, MD, Fellowship in Patient Safety (Johns Hopkins)",
      about: "Dr. Lakshmi Narayan leads MediCare's clinical governance and quality improvement initiatives. She has implemented evidence-based protocols that have significantly improved patient outcomes across specialties. Under her leadership, MediCare has achieved remarkably low hospital-acquired infection rates and high clinical quality benchmarks."
    },
    {
      name: "Ms. Priyanka Shah",
      position: "Chief Human Resources Officer",
      image: "/api/placeholder/300/300",
      education: "MA (HR Management), Certified Executive Coach",
      about: "Ms. Priyanka Shah oversees talent acquisition, development, and retention strategies at MediCare. She has pioneered innovative staff wellness programs and professional development initiatives that have made MediCare one of the most sought-after employers in healthcare. Her leadership has resulted in high employee satisfaction and low turnover rates."
    },
    {
      name: "Mr. Rahul Mehta",
      position: "Chief Information Officer",
      image: "/api/placeholder/300/300",
      education: "MS (Computer Science), Healthcare IT Certification",
      about: "Mr. Rahul Mehta leads MediCare's digital transformation and IT strategy. He has successfully implemented an integrated electronic health records system across all facilities and launched innovative telehealth solutions. His focus on cybersecurity and data privacy ensures that patient information remains secure while enabling seamless care coordination."
    },
    {
      name: "Dr. Meera Patel",
      position: "Director of Research & Education",
      image: "/api/placeholder/300/300",
      education: "MBBS, MD, PhD (Clinical Research)",
      about: "Dr. Meera Patel oversees MediCare's academic partnerships and research initiatives. She has established collaborations with leading global medical institutions and secured significant research grants. Under her leadership, MediCare has published groundbreaking research and trained hundreds of medical professionals through fellowship programs."
    },
    {
      name: "Mr. Thomas Jacob",
      position: "Chief Marketing Officer",
      image: "/api/placeholder/300/300",
      education: "MBA (Marketing), Digital Health Certification",
      about: "Mr. Thomas Jacob directs MediCare's brand strategy and patient engagement initiatives. He has transformed MediCare's digital presence and developed award-winning health education campaigns. His patient-centered marketing approach has strengthened MediCare's reputation as a trusted healthcare provider."
    }
  ];
  
  const departments = [
    { name: "Clinical Excellence", leader: "Dr. Lakshmi Narayan" },
    { name: "Hospital Operations", leader: "Ms. Deepa Reddy" },
    { name: "Finance & Strategy", leader: "Mr. Amit Khanna" },
    { name: "Information Technology", leader: "Mr. Rahul Mehta" },
    { name: "Human Resources", leader: "Ms. Priyanka Shah" },
    { name: "Research & Education", leader: "Dr. Meera Patel" },
    { name: "Marketing & Communications", leader: "Mr. Thomas Jacob" },
    { name: "Quality & Patient Safety", leader: "Dr. Arun Kumar" },
    { name: "Facilities Management", leader: "Mr. Rajesh Agarwal" },
    { name: "Supply Chain", leader: "Ms. Sunita Sharma" }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Management Team</h1>
          <p className="text-xl max-w-3xl">
            Meet the dedicated professionals who lead our day-to-day operations and drive 
            excellence in every aspect of our healthcare delivery.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Executive Leadership */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">Executive Leadership</h2>
            <p className="text-gray-700 max-w-4xl">
              Our executive team brings together diverse expertise in medicine, hospital administration, 
              finance, technology, and healthcare innovation. Working collaboratively, they ensure MediCare 
              continues to deliver exceptional care while adapting to the evolving landscape of healthcare.
            </p>
          </div>
          
          {/* Executive Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
            {executives.map((executive, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={executive.image} 
                    alt={executive.name} 
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-teal-800 bg-opacity-80 text-white p-3">
                    <h3 className="font-bold truncate">{executive.name}</h3>
                    <p className="text-sm text-yellow-400">{executive.position}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-2">{executive.education}</p>
                  <p className="text-gray-700 text-sm line-clamp-4 mb-3">{executive.about}</p>
                  <div className="flex space-x-2">
                    <a href="#" className="text-teal-600 hover:text-teal-800 p-2 rounded-full bg-teal-50">
                      <Phone size={16} />
                    </a>
                    <a href="#" className="text-teal-600 hover:text-teal-800 p-2 rounded-full bg-teal-50">
                      <Mail size={16} />
                    </a>
                    <a href="#" className="text-teal-600 hover:text-teal-800 p-2 rounded-full bg-teal-50">
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Organizational Structure */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">Organizational Structure</h2>
            <p className="text-gray-700 max-w-4xl">
              MediCare's organizational structure is designed to ensure clear accountability, 
              efficient decision-making, and seamless coordination across all departments and facilities. 
              Our management approach combines centralized governance with operational autonomy 
              for individual hospitals to meet the unique needs of their communities.
            </p>
          </div>
          
          {/* Org Structure Visualization */}
          <div className="p-8">
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="p-6 border-2 border-teal-600 rounded-lg text-center mb-4">
                <h3 className="text-xl font-bold text-teal-800">Dr. Sanjay Gupta</h3>
                <p className="text-gray-700">Chief Executive Officer</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-teal-50 rounded-lg text-center">
                  <h4 className="font-bold text-teal-700">Clinical Excellence</h4>
                  <p className="text-sm text-gray-700">Dr. Lakshmi Narayan</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg text-center">
                  <h4 className="font-bold text-teal-700">Operations</h4>
                  <p className="text-sm text-gray-700">Ms. Deepa Reddy</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg text-center">
                  <h4 className="font-bold text-teal-700">Business Strategy</h4>
                  <p className="text-sm text-gray-700">Mr. Amit Khanna</p>
                </div>
              </div>
            </div>
            
            {/* Departments */}
            <h3 className="text-xl font-bold text-teal-800 mb-4">Departmental Leadership</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {departments.map((dept, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h4 className="font-bold text-teal-700 mb-1">{dept.name}</h4>
                  <p className="text-sm text-gray-700">Led by: {dept.leader}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Management Approach */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">Our Management Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Patient-Centered Leadership</h3>
                <p className="text-gray-700">
                  Every management decision at MediCare is evaluated based on its impact on patient care and experience. 
                  Our leaders regularly engage with patients and frontline staff to ensure decisions reflect real needs.
                </p>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Data-Driven Excellence</h3>
                <p className="text-gray-700">
                  We leverage advanced analytics and comprehensive metrics to continuously monitor and improve 
                  clinical outcomes, operational efficiency, and patient satisfaction across all facilities.
                </p>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-teal-700 mb-3">Collaborative Innovation</h3>
                <p className="text-gray-700">
                  MediCare fosters a culture where ideas can come from anywhere. Our cross-functional 
                  improvement teams bring together staff from different departments and levels to 
                  solve challenges and implement innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementTeam;