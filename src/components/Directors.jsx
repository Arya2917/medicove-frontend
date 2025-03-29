import React from 'react';

const BoardOfDirectors = () => {
  const directors = [
    {
      name: "Dr. Rajiv Sharma",
      title: "Chairperson",
      specialty: "Cardiology",
      education: "MBBS, MD, DM (Cardiology), FRCP (London)",
      experience: "35+ years",
      image: "/api/placeholder/400/400",
      bio: "Dr. Rajiv Sharma, a pioneering cardiologist, founded MediCare with a vision to provide world-class healthcare in India. Under his leadership, MediCare has grown from a single hospital to one of the country's largest healthcare networks. Dr. Sharma has been awarded the Padma Shri for his contributions to medicine and healthcare management."
    },
    {
      name: "Dr. Anita Patel",
      title: "Vice Chairperson",
      specialty: "Oncology",
      education: "MBBS, MD, DM (Medical Oncology), Fellowship (Mayo Clinic)",
      experience: "30+ years",
      image: "/api/placeholder/400/400",
      bio: "Dr. Anita Patel is a globally recognized oncologist who has been instrumental in establishing MediCare's comprehensive cancer care program. Her research on targeted therapies has been published in prestigious journals like The Lancet and NEJM. She serves on multiple international advisory boards and is dedicated to making cutting-edge cancer treatments accessible to all."
    },
    {
      name: "Mr. Vikram Mehta",
      title: "Director",
      specialty: "Finance & Strategy",
      education: "MBA (Harvard), CFA",
      experience: "25+ years",
      image: "/api/placeholder/400/400",
      bio: "Mr. Vikram Mehta brings extensive experience in healthcare finance and strategic planning. Prior to joining MediCare, he held leadership positions at global healthcare investment firms and advised major hospital chains on expansion and operational efficiency. His financial acumen has been crucial in MediCare's sustainable growth while maintaining affordability for patients."
    },
    {
      name: "Dr. Priya Nair",
      title: "Director",
      specialty: "Neurology",
      education: "MBBS, MD, DM (Neurology), Fellowship (Johns Hopkins)",
      experience: "28+ years",
      image: "/api/placeholder/400/400",
      bio: "Dr. Priya Nair has been pivotal in establishing MediCare's neurosciences department as a center of excellence. Her pioneering work in stroke management protocols has significantly improved patient outcomes across our hospitals. She leads MediCare's research initiatives and academic partnerships with medical institutions worldwide."
    },
    {
      name: "Mr. Sameer Kapoor",
      title: "Independent Director",
      specialty: "Information Technology",
      education: "MS Computer Science (Stanford), Executive MBA (INSEAD)",
      experience: "22+ years",
      image: "/api/placeholder/400/400",
      bio: "Mr. Sameer Kapoor guides MediCare's digital transformation journey. A former CTO of a Fortune 500 tech company, he brings expertise in healthcare IT solutions, cybersecurity, and data analytics. Under his guidance, MediCare has implemented cutting-edge electronic health record systems and telemedicine platforms to enhance patient care and accessibility."
    },
    {
      name: "Ms. Fatima Hussain",
      title: "Independent Director",
      specialty: "Public Health & Policy",
      education: "MPH (Harvard), PhD Health Policy (London School of Economics)",
      experience: "20+ years",
      image: "/api/placeholder/400/400",
      bio: "Ms. Fatima Hussain is a public health expert who has worked with WHO and various governments on healthcare policy implementation. At MediCare, she champions initiatives for preventive care, health education, and community outreach programs. Her expertise ensures that MediCare remains at the forefront of patient-centered care and public health innovation."
    }
  ];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Board of Directors</h1>
          <p className="text-xl max-w-3xl">
            Meet the visionary leaders guiding MediCare's mission to deliver exceptional healthcare 
            and drive innovation in medical services.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800 mb-6">Leadership With Purpose</h2>
            <p className="text-gray-700">
              Our Board of Directors brings together distinguished medical professionals, healthcare administrators, 
              and industry experts with decades of combined experience. This diverse leadership team provides strategic direction
              and governance to ensure MediCare continues to deliver on its promise of excellence, innovation, and compassionate care.
            </p>
          </div>
          
          {/* Director Profiles */}
          <div className="space-y-12">
            {directors.map((director, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                <div className="md:w-1/3">
                  <div className="relative">
                    <img 
                      src={director.image} 
                      alt={director.name} 
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-teal-800 bg-opacity-90 text-white p-4">
                      <h3 className="text-xl font-bold">{director.name}</h3>
                      <p className="text-yellow-400 font-medium">{director.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">SPECIALTY</h4>
                        <p className="text-teal-800 font-medium">{director.specialty}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500">EXPERIENCE</h4>
                        <p className="text-teal-800 font-medium">{director.experience}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-gray-500">EDUCATION</h4>
                        <p className="text-teal-800 font-medium">{director.education}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{director.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Governance Statement */}
          <div className="mt-16 p-6 bg-teal-50 rounded-lg">
            <h2 className="text-2xl font-bold text-teal-800 mb-4">Our Governance Principles</h2>
            <p className="text-gray-700 mb-4">
              MediCare's Board of Directors operates on the principles of transparency, accountability, and ethical leadership.
              The Board meets quarterly to review clinical outcomes, patient satisfaction, financial performance, and strategic initiatives.
            </p>
            <p className="text-gray-700">
              Our governance structure ensures that MediCare maintains the highest standards of patient care while operating 
              responsibly and sustainably for the benefit of all stakeholders, including patients, employees, and the communities we serve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOfDirectors;