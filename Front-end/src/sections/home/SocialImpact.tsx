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
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full text-secondary text-sm tracking-wide mb-4">
              <Heart className="w-4 h-4" />
              <span>MAKE A DIFFERENCE</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Our Social Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in making healthcare accessible to every corner of India. Your contribution can save lives and bring hope to thousands.
            </p>
          </motion.div>
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
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white/90 text-sm">{percentage.toFixed(0)}% funded</span>
                    </div>
                    <h3 className="text-2xl text-white mb-2">
                      {campaign.title}
                    </h3>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {campaign.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Raised</p>
                        <p className="text-xl text-gray-900">{formatCurrency(campaign.raised)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Goal</p>
                        <p className="text-xl text-gray-900">{formatCurrency(campaign.goal)}</p>
                      </div>
                    </div>

                    <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                      />
                    </div>
                  </div>

                  <Link
                    to="/donations"
                    className="group/btn flex items-center justify-center gap-2 w-full bg-[#FF7F50] text-white px-8 py-4 rounded-2xl hover:bg-[#ff6a35] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Heart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-lg">Donate Now</span>
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
