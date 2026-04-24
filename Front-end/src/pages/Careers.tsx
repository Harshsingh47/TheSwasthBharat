import { useState } from 'react';
import { MapPin, Briefcase, Clock, Building } from 'lucide-react';

export default function Careers() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
      description: 'Build scalable healthcare solutions and lead technical initiatives.',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai',
      type: 'Full-time',
      description: 'Drive product strategy and work with cross-functional teams.',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Delhi',
      type: 'Full-time',
      description: 'Create beautiful and intuitive user experiences for our platform.',
    },
    {
      id: 4,
      title: 'Healthcare Partnership Manager',
      department: 'Business Development',
      location: 'Pan India',
      type: 'Full-time',
      description: 'Build relationships with hospitals and clinics across India.',
    },
  ];

  const hospitalJobs = [
    {
      id: 1,
      hospital: 'Apollo Hospital',
      role: 'Cardiologist',
      location: 'Delhi',
      type: 'Full-time',
      experience: '5+ years',
    },
    {
      id: 2,
      hospital: 'Fortis Healthcare',
      role: 'Pediatrician',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '3+ years',
    },
    {
      id: 3,
      hospital: 'Max Hospital',
      role: 'Orthopedic Surgeon',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '7+ years',
    },
    {
      id: 4,
      hospital: 'Manipal Hospital',
      role: 'General Physician',
      location: 'Chennai',
      type: 'Full-time',
      experience: '2+ years',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Swasth Bharat
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Be part of India's healthcare revolution. Build a career that makes a difference.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Join Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meaningful Work</h3>
              <p className="text-gray-600">
                Make a real impact on healthcare accessibility across India
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">
                Continuous learning and career advancement in a fast-growing company
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Work-Life Balance</h3>
              <p className="text-gray-600">
                Flexible work environment that values your well-being
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring at Swasth Bharat */}
      <section className="py-16 px-4 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Open Positions at Swasth Bharat
          </h2>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Locations</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="pan-india">Pan India</option>
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="product">Product</option>
              <option value="design">Design</option>
              <option value="business">Business Development</option>
            </select>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital/Clinic Jobs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Jobs at Partner Hospitals & Clinics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitalJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{job.role}</h3>
                <p className="text-lg text-primary mb-3">{job.hospital}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {job.type}
                  </span>
                  <span className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.experience}
                  </span>
                </div>
                <button className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
