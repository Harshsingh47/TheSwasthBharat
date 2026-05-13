import { Link } from 'react-router';
import { Star, Heart, Bookmark, Clock, User, Stethoscope, Baby, Bone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const specialtyStyles = {
  Cardiology: {
    color: '#0d9488', // Teal
    bg: '#f0fdfa',
    border: '#99f6e4',
    icon: Heart
  },
  Pediatrics: {
    color: '#2563eb', // Blue
    bg: '#eff6ff',
    border: '#bfdbfe',
    icon: Baby
  },
  Orthopedics: {
    color: '#f43f5e', // Coral
    bg: '#fff1f2',
    border: '#fecdd3',
    icon: Bone
  },
  Dermatology: {
    color: '#9333ea', // Purple
    bg: '#faf5ff',
    border: '#e9d5ff',
    icon: Sparkles
  }
};

const topDoctors = [
  {
    id: 1,
    name: 'Dr. Amit Sharma',
    initials: 'AS',
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Cardiology',
    experience: 15,
    rating: 4.8,
    reviews: 2340,
    fee: 800,
    quote: 'My goal is to help you lead a heart-healthy life through proactive care and simple lifestyle shifts.',
    tags: ['Heart Failure', 'Arrhythmia', 'BP Care'],
    availability: { status: 'today', time: '3:00 PM' }
  },
  {
    id: 2,
    name: 'Dr. Priya Patel',
    initials: 'PP',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Pediatrics',
    experience: 12,
    rating: 4.9,
    reviews: 3120,
    fee: 500,
    quote: 'Every child deserves compassionate care. I treat my young patients as if they were my own family.',
    tags: ['Newborn Care', 'Vaccination', 'Nutrition'],
    availability: { status: 'today', time: '4:30 PM' }
  },
  {
    id: 3,
    name: 'Dr. Rajesh Kumar',
    initials: 'RK',
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Orthopedics',
    experience: 20,
    rating: 4.7,
    reviews: 1890,
    fee: 600,
    quote: 'Restoring mobility is about restoring freedom. Let’s get you back to the activities you love most.',
    tags: ['Joint Pain', 'Sports Injury', 'Fractures'],
    availability: { status: 'tomorrow', time: '10:00 AM' }
  },
  {
    id: 4,
    name: 'Dr. Sneha Reddy',
    initials: 'SR',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Dermatology',
    experience: 10,
    rating: 4.9,
    reviews: 2670,
    fee: 700,
    quote: 'Healthy skin is a reflection of overall wellness. I provide personalized care for your skin’s unique needs.',
    tags: ['Acne', 'Eczema', 'Laser Therapy'],
    availability: { status: 'today', time: '5:15 PM' }
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function TopDoctors() {
  return (
    <section className="py-10 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Discover Top <span className="text-transparent bg-clip-text bg-brand-grad">Doctors</span>
            </h2>
            <p className="text-muted-foreground text-base font-normal leading-relaxed">
              Connect with experienced specialists who prioritize your well-being.
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {topDoctors.map((doctor) => {
            const style = specialtyStyles[doctor.specialty as keyof typeof specialtyStyles];
            const Icon = style.icon;

            return (
              <motion.div 
                key={doctor.id} 
                variants={item} 
                className="h-full flex flex-col cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div 
                  className="bg-white rounded-[16px] p-4 flex flex-col h-full border-[0.5px] border-gray-200 hover:border-gray-400 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group"
                  style={{ '--accent-color': style.color } as any}
                >
                  {/* Top Row: Avatar Photo + Availability */}
                  <div className="flex justify-between items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm"
                      style={{ backgroundColor: style.bg, color: style.color }}
                    >
                      {doctor.image ? (
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-base font-medium">{doctor.initials}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[16px] bg-gray-50 border border-gray-100">
                      <div className={`w-1.5 h-1.5 rounded-full ${doctor.availability.status === 'today' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <span className="text-[10px] font-medium text-gray-600">
                        {doctor.availability.status === 'today' ? `Today ${doctor.availability.time}` : 'Tomorrow'}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="mb-3">
                    <h3 className="text-base font-medium text-gray-900 mb-0.5">{doctor.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Icon className="w-3.5 h-3.5" style={{ color: style.color }} />
                      <span className="text-xs">{doctor.specialty} · {doctor.experience} Yrs</span>
                    </div>
                  </div>

                  {/* Quote Block */}
                  <div 
                    className="mb-4 pl-3 border-l-2 py-0.5"
                    style={{ borderLeftColor: style.color }}
                  >
                    <p className="text-xs italic font-normal text-gray-600 leading-relaxed">
                      "{doctor.quote}"
                    </p>
                  </div>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doctor.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded-[16px] text-[9px] font-medium border border-gray-200 text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Spacer for Flexbox Alignment */}
                  <div className="flex-1" />

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">({doctor.reviews} patients)</span>
                  </div>

                  {/* Bottom Row: CTA + Save */}
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 text-white text-xs font-medium h-[38px] rounded-[10px] transition-all cursor-pointer hover:brightness-110 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      style={{ backgroundColor: style.color }}
                    >
                      Book · ₹{doctor.fee}
                    </button>
                    <button className="w-[38px] h-[38px] rounded-[10px] border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

