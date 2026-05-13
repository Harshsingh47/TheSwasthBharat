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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            What Our <span className="text-transparent bg-clip-text bg-brand-grad">Users Say</span>
          </h2>
          <p className="text-gray-500">What our users say about their experience with Swasth Bharat</p>
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
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-orange-400 text-orange-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{review.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
