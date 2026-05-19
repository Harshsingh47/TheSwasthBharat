import { Heart, Users, Target, CheckCircle2, ShieldCheck, Globe, Users2, Megaphone, Droplets, GraduationCap, HandHelping, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { whatWeDo, socialMission, whyChooseUs } from '../data/aboutData';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-background">
      {/* Premium Hero Section */}
      <section className="relative py-24 overflow-hidden bg-surface">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-grad opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-cta-grad opacity-5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/10 rounded-xl text-primary text-sm font-bold tracking-wide mb-6 uppercase"
          >
            About Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold text-foreground mb-8 leading-[1.1]"
          >
            The <span className="text-transparent bg-clip-text bg-brand-grad">Swasth Bharat</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              We are committed to making healthcare more accessible, transparent, and community-driven. 
              Our mission is to connect people with trusted doctors, hospitals, clinics, diagnostic centers, 
              pharmacies, and healthcare services across India — all through one reliable platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white border border-gray-100 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-grad" />
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium italic">
              "We believe healthcare is not just about treatment, but about awareness, support, and social responsibility. 
              That’s why The Swasth Bharat works beyond a healthcare directory to create a healthier and more informed society."
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              What <span className="text-transparent bg-clip-text bg-brand-grad">We Do</span>
            </h2>
            <div className="w-20 h-1.5 bg-brand-grad mx-auto rounded-full" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whatWeDo.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group hover:-translate-y-2 duration-300"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-grad transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Social Mission */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-[55%]">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-transparent bg-clip-text bg-cta-grad">Social Mission</span>
              </h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Our commitment goes beyond digital connections. We are actively involved in building a stronger, 
                healthier community through direct social initiatives and volunteer engagement.
              </p>
              
              <div className="space-y-3">
                {socialMission.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-cta/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-cta" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-[45%] relative flex justify-center lg:justify-end">
              <div className="absolute -inset-6 bg-cta-grad opacity-10 blur-3xl rounded-full" />
              <img 
                src="/image3.png" 
                alt="Social Mission" 
                className="relative rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 h-[550px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-grad opacity-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">Our Vision</h2>
          <p className="text-xl md:text-3xl text-gray-300 leading-relaxed font-light italic">
            "To build a strong digital healthcare ecosystem where every individual can easily access trusted medical information and healthcare services while creating a socially responsible and healthier India."
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1.5 bg-cta-grad mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <span className="font-bold text-gray-800">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Tagline */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              The Swasth Bharat
            </h3>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-brand-grad font-bold italic">
              Connecting Healthcare with Humanity.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
