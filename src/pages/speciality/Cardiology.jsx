import React from 'react';
import Navbar from '../../components/Navbar';
import { ChevronRight, Heart, Activity, User, CheckCircle, AlertCircle, CalendarClock, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cardiology = () => {
  const treatments = [
    { name: 'Non-Invasive Cardiology', icon: <Heart size={20} /> },
    { name: 'Interventional Cardiology', icon: <Activity size={20} /> },
    { name: 'Electrophysiology', icon: <Heart size={20} /> },
    { name: 'Heart Failure Program', icon: <AlertCircle size={20} /> },
    { name: 'Cardiac Rehabilitation', icon: <User size={20} /> },
    { name: 'Structural Heart Disease', icon: <Heart size={20} /> }
  ];

  const conditions = [
    'Coronary Artery Disease',
    'Heart Valve Disorders',
    'Arrhythmias (Heart Rhythm Disorders)',
    'Heart Failure',
    'Cardiomyopathy',
    'Hypertension (High Blood Pressure)',
    'Angina',
    'Myocardial Infarction (Heart Attack)',
    'Congenital Heart Defects',
    'Peripheral Artery Disease'
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
            <span className="text-gray-600">Cardiology</span>
          </div>
        </div>
      </div>
      
      {/* Hero Banner */}
      <div className="relative bg-teal-800 py-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Cardiology <span className="text-yellow-400">Centre of Excellence</span>
            </h1>
            <p className="mb-6 text-lg">
              WAD Hospitals' Cardiology department is equipped with the latest technology 
              and staffed by internationally trained cardiologists to provide comprehensive 
              cardiac care.
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
              src="/images/specialties/cardiology-hero.jpg" 
              alt="Cardiology Department" 
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
                <p className="text-2xl font-bold text-gray-800">98.7%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <User size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">15,000+</p>
                <p className="text-sm text-gray-600">Patients Treated</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Stethoscope size={24} className="text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">35+</p>
                <p className="text-sm text-gray-600">Cardiac Specialists</p>
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">World-Class Heart Care</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <p className="mb-4 text-gray-700">
                The Cardiology department at WAD Hospitals is a Centre of Excellence dedicated to the 
                prevention, diagnosis, and treatment of cardiovascular diseases. Our team of experienced 
                cardiologists, cardiac surgeons, and specialized nursing staff is committed to providing 
                personalized care using advanced medical techniques and state-of-the-art technology.
              </p>
              <p className="mb-4 text-gray-700">
                We specialize in both adult and pediatric cardiac care, offering comprehensive services that 
                range from preventive screenings to complex surgical procedures, including minimally invasive 
                techniques that ensure faster recovery and better outcomes.
              </p>
              <p className="text-gray-700">
                Our dedicated cardiac emergency response teams are available 24/7 to provide immediate care 
                for heart attacks and other cardiac emergencies, ensuring that critical time-to-treatment 
                goals are met to maximize patient outcomes.
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
                  <span className="text-gray-700">Echocardiography</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Electrocardiogram (ECG/EKG)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Stress Testing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Holter Monitoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Cardiac CT Scan</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Cardiac MRI</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Cardiac Catheterization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle size={18} className="text-teal-600 mr-2" />
                  <span className="text-gray-700">Electrophysiology Studies</span>
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
                Consult with our expert cardiologists at your preferred location and time.
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
              <h3 className="text-xl font-bold mb-4 text-gray-800">Meet Our Senior Cardiologist</h3>
              <div className="flex flex-col items-center">
                <img 
                  src="/images/doctors/cardiologist.jpg" 
                  alt="Dr. Aisha Patel" 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-bold text-gray-800">Dr. Aisha Patel</h4>
                <p className="text-gray-600 mb-2">Senior Consultant, Interventional Cardiology</p>
                <p className="text-gray-700 text-center text-sm mb-4">
                  MBBS, MD (Cardiology), Fellowship (Interventional Cardiology)
                </p>
                <Link to="/doctors/dr-aisha-patel">
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
                "After my heart attack, the team at WAD Hospitals provided exceptional care. 
                The prompt response of the emergency team and the expertise of the cardiologists 
                saved my life. The follow-up care and cardiac rehabilitation program helped me 
                return to a normal, active lifestyle."
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img 
                    src="/images/rajesh.jpg" 
                    alt="Rajesh Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Cardiac Patient</p>
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
            Take the First Step Towards a Healthy Heart
          </h2>
          <p className="text-white mb-8 max-w-3xl mx-auto">
            Our expert cardiologists are ready to provide personalized care for all your cardiac needs.
            Schedule a consultation today or call our heart helpline for immediate assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-500 text-black font-medium px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
              Book an Appointment
            </button>
            <div>
              <span className="block text-white text-sm">Heart Helpline</span>
              <span className="text-yellow-400 font-bold text-xl">1860-500-HEART</span>
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

export default Cardiology;