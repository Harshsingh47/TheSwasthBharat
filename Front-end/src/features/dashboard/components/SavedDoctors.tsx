import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface SavedDoctorsProps {
  doctors: any[];
}

export function SavedDoctors({ doctors }: SavedDoctorsProps) {
  if (doctors.length === 0) {
    return (
      <div className="col-span-2 text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No saved doctors yet</p>
        <Link
          to="/find-doctors"
          className="inline-block mt-4 text-primary hover:underline"
        >
          Find doctors to save
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm">{doctor.rating}</span>
                <span className="text-sm text-gray-600 ml-1">({doctor.reviews})</span>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600">
              <Heart className="w-6 h-6 fill-current" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-primary">₹{doctor.fee}</p>
            <Link
              to={`/book-appointment/${doctor.id}`}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
