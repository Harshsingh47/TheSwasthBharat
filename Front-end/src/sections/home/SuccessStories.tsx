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
    <section className="py-12 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Patient <span className="text-transparent bg-clip-text bg-brand-grad">Success Stories</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">Real experiences from people who found healing through our technology-driven community.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={item}
              className="card-premium group border-primary/5 h-full"
            >
              <div className="p-10 flex flex-col h-full">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 p-1 bg-white">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg font-montserrat">{story.name}</p>
                    <p className="text-sm font-bold text-secondary uppercase tracking-wider">{story.location}</p>
                  </div>
                </div>

                <div className="relative mt-auto">
                  <Quote className="absolute -top-6 -left-6 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors" />
                  <p className="text-muted-foreground italic leading-relaxed text-lg relative z-10 font-medium">
                    "{story.story}"
                  </p>
                </div>
                
                <div className="mt-8 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-cta" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
