import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const reviews = [
  {
    id: 1,
    name: 'Rahul Verma',
    location: 'Mumbai',
    rating: 5,
    text: 'Excellent platform! Found a great cardiologist within minutes. The booking process was seamless.',
  },
  {
    id: 2,
    name: 'Anita Singh',
    location: 'Delhi',
    rating: 5,
    text: 'Very helpful and user-friendly. The doctors are highly qualified and the support team is responsive.',
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    location: 'Bangalore',
    rating: 4,
    text: 'Great service and easy appointment booking process. Saved me so much time finding the right specialist.',
  },
  {
    id: 4,
    name: 'Deepa Krishnan',
    location: 'Hyderabad',
    rating: 5,
    text: 'Trustworthy platform with verified doctors. The video consultation feature is a game-changer!',
  },
  {
    id: 5,
    name: 'Sanjay Gupta',
    location: 'Kolkata',
    rating: 5,
    text: 'Impressed by the quality of doctors and the smooth experience. Highly recommend to everyone.',
  },
  {
    id: 6,
    name: 'Neha Agarwal',
    location: 'Ahmedabad',
    rating: 4,
    text: 'Found the perfect pediatrician for my children. The reviews and ratings really help in making decisions.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function Reviews() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-amber-50 rounded-full text-amber-700 text-sm tracking-wide mb-4">
              TRUSTED BY THOUSANDS
            </span>
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied patients who found their perfect healthcare match
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={item}
              className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-primary/20"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    } transition-all duration-300 group-hover:scale-110`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
