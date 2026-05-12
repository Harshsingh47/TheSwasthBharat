import { Link } from 'react-router';
import { Heart } from 'lucide-react';
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
    <section className="py-12 px-4 bg-transparent relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-success rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-transparent bg-clip-text bg-brand-grad">Social Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">Join us in making healthcare accessible to every corner of India through community-driven initiatives.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {socialImpact.map((campaign) => {
            const percentage = (campaign.raised / campaign.goal) * 100;

            return (
              <motion.div
                key={campaign.id}
                variants={item}
                className="card-premium h-full group border-primary/5"
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6">
                    <span className="bg-white/90 backdrop-blur-md text-primary px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border border-white/20">
                      {percentage.toFixed(0)}% FUNDED
                    </span>
                  </div>
                </div>

                <div className="p-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-montserrat">
                    {campaign.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed font-medium">
                    {campaign.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Campaign Progress</p>
                      <p className="text-sm font-bold text-primary">{formatCurrency(campaign.raised)} <span className="text-muted-foreground font-medium">/ {formatCurrency(campaign.goal)}</span></p>
                    </div>

                    <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute left-0 top-0 h-full bg-brand-grad rounded-full shadow-[0_0_10px_rgba(126,74,168,0.3)]"
                      />
                    </div>
                  </div>

                  <Link
                    to="/donations"
                    className="flex items-center justify-center gap-3 w-full bg-cta-grad text-white px-8 py-4 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(249,115,6,0.4)] transition-all active:scale-[0.98]"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Support This Initiative</span>
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
