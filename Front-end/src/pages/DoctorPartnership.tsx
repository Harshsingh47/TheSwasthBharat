import { motion } from 'framer-motion';
import { 
  Check, 
  ChevronRight, 
  Star, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Globe, 
  Video, 
  Camera, 
  BarChart3, 
  Search, 
  Layout, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';
import { packages, additionalServices } from '../data/doctorPartnershipData';

export default function DoctorPartnership() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A0F1E]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Growth Ecosystem</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              Grow Your Healthcare <br />
              <span className="text-transparent bg-clip-text bg-brand-grad">Practice With Swasth Bharat</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/60 mb-10 leading-relaxed font-medium"
            >
              Digital branding, patient reach, healthcare awareness campaigns, and growth solutions designed for modern healthcare professionals.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#packages" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20">
                Explore Packages
              </a>
              <Link to="/contact" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                Become a Partner
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle Himachal Element */}
        <div className="absolute bottom-4 right-8 opacity-20 hidden lg:block">
          <p className="text-[120px] font-black text-white leading-none select-none">HIMACHAL</p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="packages" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Growth Path</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Premium digital branding and patient engagement packages tailored for healthcare excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative group p-8 bg-white rounded-[2.5rem] shadow-xl border ${
                  pkg.popular ? 'border-primary shadow-primary/10' : 'border-gray-100'
                } flex flex-col hover:-translate-y-2 transition-all duration-500`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm font-medium">{pkg.tagline}</p>
                </div>

                <div className="mb-8 space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">₹{pkg.monthly}</span>
                    <span className="text-gray-400 font-bold">/month</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-2 border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-400">₹{pkg.sixMonth} / 6 months</span>
                    <span className="text-xs font-bold text-primary">₹{pkg.yearly} / 12 months</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-4 mb-10">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full bg-${pkg.color}/10 flex items-center justify-center shrink-0`}>
                        <Check className={`w-3 h-3 text-${pkg.color}`} />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                  pkg.popular 
                    ? 'bg-primary text-white shadow-primary/20 hover:scale-[1.02]' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  {pkg.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Additional Growth Services</h2>
              <p className="text-gray-500 font-medium">Bespoke digital solutions to further enhance your practice's visibility and authority.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Request Custom Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-[#0A0F1E] text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2>
            <p className="text-white/50 max-w-2xl mx-auto font-medium">Join India's fastest-growing healthcare community and transform your practice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { icon: TrendingUp, title: "Increased Patient Reach", val: "5X" },
              { icon: Globe, title: "Strong Digital Presence", val: "100%" },
              { icon: ShieldCheck, title: "Trusted Healthcare Brand", val: "Elite" },
              { icon: Users, title: "Community Impact", val: "10K+" }
            ].map((stat) => (
              <div key={stat.title} className="space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-1">{stat.val}</div>
                  <div className="text-sm font-bold text-white/40 uppercase tracking-widest">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-brand-grad p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                Join India's Growing <br /> Healthcare Ecosystem
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto font-medium">
                Partner with Swasth Bharat and grow your healthcare practice while creating meaningful community impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all">
                  Become a Partner
                </Link>
                <button className="px-10 py-5 bg-black/20 text-white border border-white/20 rounded-2xl font-black backdrop-blur-md hover:bg-black/30 transition-all">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
