import React from 'react';
import Navbar from '../../components/Navbar';
import { ChevronRight, Brain, Activity, User, CheckCircle, AlertCircle, CalendarClock, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Neurology = () => {
  const treatments = [
    { name: 'Stroke Management', icon: <Brain size={20} /> },
    { name: 'Epilepsy Treatment', icon: <Activity size={20} /> },
    { name: 'Movement Disorder', icon: <Brain size={20} /> },
    { name: 'Neuro-Oncology', icon: <AlertCircle size={20} /> },
    { name: 'Neuro-Rehabilitation', icon: <User size={20} /> },
    { name: 'Neuro-Interventional', icon: <Brain size={20} /> }
  ];

  const conditions = [
    'Stroke',
    'Epilepsy',
    'Parkinson\'s Disease',
    'Multiple Sclerosis',
    'Alzheimer\'s Disease',
    'Brain Tumors',
    'Headache & Migraine',
    'Neuropathy',
    'Spinal Disorders',
    'Sleep Disorders'
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
            <span className="text-gray-600">Neurology</span>
          </div>
        </div>
      </div>
      
      {/* Hero Banner */}
      <div className="relative bg-teal-800 py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Neurology <span className="text-yellow-400">Centre of Excellence</span>
            </h1>
            <p className="mb-6 text-lg">
              WAD Hospitals' Neurology department combines advanced technology with expert neurologists 
              to provide comprehensive care for all neurological conditions.
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
              src="/images/specialties/neurology-hero.jpg" 
              alt="Neurology Department" 
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
                <p className="text-2xl font-bold text-gray-800">97.5%</p>
                <p className="text-sm text-gray-600">Recovery Rate</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <User size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">12,500+</p>
                <p className="text-sm text-gray-600">Patients Treated</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Stethoscope size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">30+</p>
                <p className="text-sm text-gray-600">Neuro Specialists</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <CalendarClock size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">24/7</p>
                <p className="text-sm text-gray-600">Emergency Care</p>
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Comprehensive Neurological Care</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <p className="mb-4 text-gray-700">
                The Neurology department at WAD Hospitals offers comprehensive diagnosis and treatment of 
                disorders affecting the brain, spinal cord, and nervous system. Our dedicated team of 
                neurologists, neurosurgeons, and specialized healthcare professionals work together to 
                provide exceptional care for patients with neurological conditions.
              </p>
              <p className="mb-4 text-gray-700">
                We utilize state-of-the-art imaging technology and advanced diagnostic tools to accurately 
                identify neurological conditions, ensuring that each patient receives a personalized 
                treatment plan tailored to their specific needs.
              </p>
              <p className="text-gray-700">
                Our emergency neurology team is available 24/7 to provide immediate care for stroke and 
                other neurological emergencies, where every minute counts in preserving brain function and 
                ensuring the best possible outcomes.
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
                  <span className="text-gray-700">Electroencephalogram (EEG)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Electromyography (EMG)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Nerve Conduction Studies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">MRI Brain & Spine</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">CT Scan</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">PET Scan</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Cerebral Angiography</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Sleep Studies</span>
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
                Consult with our expert neurologists at your preferred location and time.
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
              <h3 className="text-xl font-bold mb-4 text-gray-800">Meet Our Senior Neurologist</h3>
              <div className="flex flex-col items-center">
                <img 
                  src="/images/doctors/neurologist.jpg" 
                  alt="Dr. Rahul Mehta" 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-bold text-gray-800">Dr. Rahul Mehta</h4>
                <p className="text-gray-600 mb-2">Senior Consultant, Neurology</p>
                <p className="text-gray-700 text-center text-sm mb-4">
                  MBBS, MD (Neurology), Fellowship (Stroke Medicine)
                </p>
                <Link to="/doctors/dr-rahul-mehta">
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
                "After my stroke, I was terrified I'd never regain full function. The neurologists at WAD 
                Hospitals were incredible in their care and guidance. Their quick intervention and 
                comprehensive rehabilitation program helped me recover almost all my mobility. I'm forever 
                grateful for their expertise."
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img 
                    src="/images/testimonials/patient2.jpg" 
                    alt="Meera Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Meera Sharma</p>
                  <p className="text-sm text-gray-600">Stroke Survivor</p>
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
            Expert Neurological Care is One Step Away
          </h2>
          <p className="text-white mb-8 max-w-3xl mx-auto">
            Our team of specialists is dedicated to diagnosing and treating all neurological conditions with 
            compassion and expertise. Schedule a consultation today or call our neuro helpline for immediate assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-500 text-black font-medium px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
              Book an Appointment
            </button>
            <div>
              <span className="block text-white text-sm">Neuro Helpline</span>
              <span className="text-yellow-400 font-bold text-xl">1860-500-NEURO</span>
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

export default Neurology;