import { Link } from 'react-router';
import { Star, MapPinIcon } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

export interface Doctor {
  id: string | number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  fee: number;
  distance: string;
  image: string;
  verified: boolean;
  available: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string | number) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
          <ImageWithFallback
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                {doctor.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-1">{doctor.specialty}</p>
              <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <p className="text-2xl font-bold text-primary">₹{doctor.fee}</p>
              <p className="text-sm text-gray-600">Consultation Fee</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-gray-600 text-sm ml-1">({doctor.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPinIcon className="w-4 h-4 mr-1" />
              {doctor.distance} away
            </div>
            {doctor.available && (
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                Available Today
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/doctor/${doctor.id}`}
              className="flex-1 text-center border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              View Profile
            </Link>
            <button
              onClick={() => onBookAppointment(doctor.id)}
              className="flex-1 text-center bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
