import { Link, useParams } from 'react-router';
import { Star, MapPin, GraduationCap, Award, Clock, Phone, Mail, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function DoctorProfile() {
  const { id } = useParams();

  // Mock doctor data - in real app, fetch based on id
  const doctor = {
    id: 1,
    name: 'Dr. Amit Sharma',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.8,
    reviews: 234,
    fee: 800,
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    about: 'Dr. Amit Sharma is a highly experienced cardiologist with over 15 years of practice. He specializes in interventional cardiology and has successfully treated thousands of patients. His patient-centric approach and dedication to healthcare excellence have earned him numerous accolades.',
    education: [
      'MBBS - All India Institute of Medical Sciences (AIIMS), New Delhi',
      'MD (Medicine) - AIIMS, New Delhi',
      'DM (Cardiology) - AIIMS, New Delhi',
    ],
    awards: [
      'Best Cardiologist Award 2023',
      'Excellence in Healthcare 2022',
      'Patient Care Award 2021',
    ],
    clinic: {
      name: 'Heart Care Center',
      address: '123 Medical Complex, Connaught Place, New Delhi 110001',
      phone: '+91 11 2345 6789',
      email: 'dr.amit@heartcare.com',
    },
    availableSlots: [
      '9:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '2:00 PM - 3:00 PM',
      '3:00 PM - 4:00 PM',
      '4:00 PM - 5:00 PM',
    ],
  };

  const patientReviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      date: 'April 10, 2026',
      text: 'Excellent doctor! Very thorough examination and clear explanation of my condition. Highly recommended.',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 5,
      date: 'April 8, 2026',
      text: 'Dr. Sharma is very professional and caring. He took time to listen to all my concerns.',
    },
    {
      id: 3,
      name: 'Vikram Singh',
      rating: 4,
      date: 'April 5, 2026',
      text: 'Great experience. The doctor was knowledgeable and the staff was helpful.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-64 md:h-auto flex-shrink-0">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{doctor.name}</h1>
                        {doctor.verified && (
                          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xl text-gray-600 mb-2">{doctor.specialty}</p>
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        {doctor.experience} years experience
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-bold">{doctor.rating}</span>
                      <span className="text-gray-600 ml-1">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      ₹{doctor.fee}
                      <span className="text-sm font-normal text-gray-600"> / consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                Education
              </h2>
              <ul className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Awards Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-primary" />
                Awards & Recognition
              </h2>
              <ul className="space-y-3">
                {doctor.awards.map((award, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{award}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinic Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Clinic Details</h2>
              <h3 className="text-xl font-semibold mb-4">{doctor.clinic.name}</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{doctor.clinic.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3" />
                  <a href={`tel:${doctor.clinic.phone}`} className="text-gray-700 hover:text-primary">
                    {doctor.clinic.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <a href={`mailto:${doctor.clinic.email}`} className="text-gray-700 hover:text-primary">
                    {doctor.clinic.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Patient Reviews</h2>
              <div className="space-y-6">
                {patientReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-600">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Available Slots
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Available Time Slots</p>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <Link
                to={`/book-appointment/${doctor.id}`}
                className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
