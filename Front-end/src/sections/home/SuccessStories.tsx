import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const successStories = [
  {
    id: 1,
    name: 'Meera Joshi',
    location: 'Pune',
    story: 'Thanks to Swasth Bharat, I found the perfect pediatrician for my baby. The care and attention we received was exceptional.',
    image: 'https://images.unsplash.com/photo-1659352790848-b6455e5a2129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3NjQwNTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Arjun Kapoor',
    location: 'Chennai',
    story: 'After months of pain, I finally got the right treatment. The orthopedic specialist was amazing and truly cared about my recovery.',
    image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Kavita Sharma',
    location: 'Jaipur',
    story: 'The platform made it so easy to connect with specialists. My skin condition improved dramatically thanks to the dermatologist I found here.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export function SuccessStories() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Patient <span className="text-blue-600">Success Stories</span>
          </h2>
          <p className="text-gray-500">Real experiences from people who found healing through our platform</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={item}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{story.name}</p>
                    <p className="text-xs text-gray-500">{story.location}</p>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-50 opacity-10" />
                  <p className="text-gray-600 italic leading-relaxed relative z-10">
                    "{story.story}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
