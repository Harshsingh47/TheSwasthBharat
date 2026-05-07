import { Link } from 'react-router';
import { Star, ArrowRight, BadgeCheck, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

const topDoctors = [
  {
    id: 1,
    name: 'Dr. Amit Sharma',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Priya Patel',
    specialty: 'Pediatrician',
    experience: 12,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Orthopedic Surgeon',
    experience: 20,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
  },
  {
    id: 4,
    name: 'Dr. Sneha Reddy',
    specialty: 'Dermatologist',
    experience: 10,
    rating: 4.9,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function TopDoctors() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Top Rated <span className="text-blue-600">Doctors</span>
            </h2>
            <p className="text-gray-500">Book appointments with our most recommended specialists</p>
          </div>
          <Link
            to="/find-doctors"
            className="hidden md:flex items-center gap-1 text-blue-600 font-bold hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {topDoctors.map((doctor) => (
            <motion.div key={doctor.id} variants={item}>
              <Link
                to={`/doctor/${doctor.id}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {doctor.verified && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded-lg">
                      <BadgeCheck className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    <span className="text-sm font-bold">{doctor.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">{doctor.specialty}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <p className="font-bold text-gray-700">{doctor.experience} Years</p>
                      <p>Experience</p>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <p className="font-bold text-gray-700">{doctor.reviews}</p>
                      <p>Reviews</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <Link
          to="/find-doctors"
          className="md:hidden flex items-center justify-center gap-1 text-blue-600 font-bold mt-8 border border-blue-600 py-3 rounded-xl"
        >
          View All Doctors
        </Link>
      </div>
    </section>
  );
}
