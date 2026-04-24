import { Link } from 'react-router';
import { Star, ArrowRight, BadgeCheck } from 'lucide-react';
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
    <section className="py-24 px-4 bg-gradient-to-b from-white to-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm tracking-wide mb-4">
              VERIFIED PROFESSIONALS
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Top Rated Doctors
            </h2>
          </div>
          <Link
            to="/find-doctors"
            className="group flex items-center gap-2 text-primary hover:gap-3 transition-all"
          >
            <span className="text-lg">View All Doctors</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {topDoctors.map((doctor) => (
            <motion.div key={doctor.id} variants={item}>
              <Link
                to={`/doctor/${doctor.id}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {doctor.verified && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <BadgeCheck className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-gray-900">Verified</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl mb-1.5 text-gray-900">{doctor.name}</h3>
                  <p className="text-gray-600 mb-3">{doctor.specialty}</p>

                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-gray-900">{doctor.rating}</span>
                    <span className="text-gray-500">({doctor.reviews})</span>
                  </div>

                  <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
