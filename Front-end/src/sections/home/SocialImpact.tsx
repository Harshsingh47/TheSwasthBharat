import { Link } from 'react-router';
import { Heart, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

const socialImpact = [
  {
    id: 1,
    title: 'Rural Healthcare Initiative',
    description: 'Bringing quality healthcare to remote villages across India. Join us in making healthcare accessible to all.',
    image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3NjM2MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    raised: 1250000,
    goal: 2500000,
  },
  {
    id: 2,
    title: 'Free Medical Camps',
    description: 'Organizing free health checkup camps for underprivileged communities. Your donation can save lives.',
    image: 'https://images.unsplash.com/photo-1763770446480-d6b3f311b5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRpdmVyc2V8ZW58MXx8fHwxNzc2MzU0NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    raised: 875000,
    goal: 1500000,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export function SocialImpact() {
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)}L`;
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Our <span className="text-blue-600">Social Impact</span>
          </h2>
          <p className="text-gray-500">Join us in making healthcare accessible to every corner of India</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {socialImpact.map((campaign) => {
            const percentage = (campaign.raised / campaign.goal) * 100;

            return (
              <motion.div
                key={campaign.id}
                variants={item}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                      {percentage.toFixed(0)}% FUNDED
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {campaign.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</p>
                      <p className="text-xs font-bold text-blue-600">{formatCurrency(campaign.raised)} / {formatCurrency(campaign.goal)}</p>
                    </div>

                    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>

                  <Link
                    to="/donations"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Donate Now</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
