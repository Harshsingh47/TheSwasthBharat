import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Heart, 
  ArrowRight,
  Mail,
  Stethoscope,
  Activity,
  Globe,
  Droplets,
  Users,
  ChevronRight,
  Zap,
  Phone,
  MapPin
} from 'lucide-react';
import logo from '../brand/logo the swasth bharat (1).png';

export function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Find Doctors', path: '/find-doctors' },
    { name: 'Blood Donation', path: '/blood-donation' },
    { name: 'Doctor Partnership', path: '/doctor-partnership' },
    { name: 'Healthcare Camps', path: '/govt-schemes' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Teleconsultation', icon: Stethoscope },
    { name: 'Lab Tests', icon: Activity },
    { name: 'Emergency Support', icon: Zap },
    { name: 'Blood Network', icon: Droplets },
    { name: 'Awareness Campaigns', icon: Globe },
    { name: 'Community Care', icon: Users },
    { name: 'Volunteer Programs', icon: Heart }
  ];

  const socials = [
    { icon: Facebook, name: 'Facebook' },
    { icon: Instagram, name: 'Instagram' },
    { icon: Linkedin, name: 'LinkedIn' },
    { icon: Twitter, name: 'Twitter' },
    { icon: Youtube, name: 'YouTube' }
  ];

  return (
    <footer className="relative bg-[#0A0F1E] text-white pt-16 pb-6 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-success/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cta/5 rounded-full blur-[80px]" />
        
        {/* Subtle Himachal Mountain Silhouette (SVG) */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 320L120 266.7C240 213 480 107 720 101.3C960 96 1200 192 1320 240L1440 288V320H1320C1200 320 960 320 720 320C480 320 240 320 120 320H0Z" fill="url(#mountainGradient)" />
          <defs>
            <linearGradient id="mountainGradient" x1="720" y1="101" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-12">
          
          {/* Section 1: Brand Info (Column 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-6">
              <Link to="/" className="inline-block group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl">
                      <img src={logo} alt="The Swasth Bharat" className="h-12 w-auto" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-white uppercase font-montserrat leading-none">The Swasth Bharat</h2>
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.3em] block mt-1">Healthcare Reimagined</span>
                  </div>
                </div>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm font-medium">
                Building a healthier India through healthcare innovation, awareness, and community impact. Join us in our mission to revolutionize accessible wellness.
              </p>
            </div>

            {/* Contact Info Hub */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <a href="mailto:help@swasthbharat.com" className="flex items-center gap-3 group/contact">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/contact:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-white/30 group-hover/contact:text-primary" />
                </div>
                <span className="text-sm font-bold text-white/50 group-hover/contact:text-white transition-colors">help@swasthbharat.com</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white/30" />
                </div>
                <span className="text-sm font-bold text-white/50">+91 1234 567 890</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white/30" />
                </div>
                <span className="text-xs font-medium text-white/30 leading-relaxed">
                  Regional Hospital Solan, Himachal Pradesh 173212
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Quick Links (Column 5-6) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-cta" /> Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm font-bold text-white/60 hover:text-cta transition-all flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-cta group-hover:translate-x-1 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Healthcare Services (Column 7-9) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-4 h-[1px] bg-success" /> Our Services
            </h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to="/find-doctors" 
                    className="text-sm font-bold text-white/60 hover:text-success transition-all flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-success group-hover:translate-x-1 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Connect (Column 10-12) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-black text-white mb-2">Stay Connected</h3>
                <p className="text-xs text-white/40 font-medium">Healthcare updates & awareness initiatives.</p>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-xs focus:outline-none focus:border-primary/30 transition-all text-white font-bold"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Join the Community</div>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group hover:bg-white/10 hover:border-primary/30 transition-all backdrop-blur-md"
                  >
                    <social.icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Redesign */}
        <div className="relative pt-6 mt-6">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="space-y-1">
              <p className="text-white/40 text-[10px] font-bold tracking-wider">
                &copy; {new Date().getFullYear()} THE SWASTH BHARAT &mdash; BUILDING HEALTHIER COMMUNITIES
              </p>
            </div>

            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
              <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <Link to="#" className="hover:text-primary transition-colors">Terms</Link>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <Link to="#" className="hover:text-primary transition-colors">Support</Link>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="text-[10px] font-bold text-white/40 italic">Made with</span>
              <Heart className="w-3 h-3 text-cta fill-cta animate-pulse" />
              <span className="text-[10px] font-bold text-white/40 italic">for India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
