import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import logo from '../brand/logo the swasth bharat (1).png';

export function Footer() {
  return (
    <footer className="bg-[#0c111d] text-white relative overflow-hidden pt-12 pb-8 border-t border-white/5">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="group-hover:scale-105 transition-transform bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-white/10 group-hover:border-primary/30 shadow-2xl">
                <img src={logo} alt="The Swasth Bharat" className="h-14 w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-montserrat">The Swasth Bharat</span>
                <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase">Healthcare Reimagined</span>
              </div>
            </Link>
            
            <p className="text-white/60 leading-relaxed max-w-xs font-medium">
              Transforming the healthcare ecosystem in India through community innovation and technology.
            </p>
            
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-11 h-11 rounded-[1rem] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group hover:shadow-[0_0_15px_rgba(126,74,168,0.5)] hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 font-montserrat relative inline-block">
              Quick Explore
              <div className="absolute bottom-[-8px] left-0 w-8 h-1 bg-cta rounded-full" />
            </h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Find Doctors', 'Health Blogs', 'Careers'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/60 hover:text-cta font-medium transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-cta group-hover:scale-125 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 font-montserrat relative inline-block">
              Our Services
              <div className="absolute bottom-[-8px] left-0 w-8 h-1 bg-success rounded-full" />
            </h3>
            <ul className="space-y-4">
              {['Lab Tests', 'Teleconsultation', 'Emergency Care', 'Pharmacy', 'Home Care'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/find-doctors" 
                    className="text-white/60 hover:text-success font-medium transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-success group-hover:scale-125 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-8 font-montserrat relative inline-block">
              Contact Support
              <div className="absolute bottom-[-8px] left-0 w-8 h-1 bg-accent rounded-full" />
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <MapPin className="w-6 h-6 text-accent shrink-0" />
                <p className="text-sm text-white/70 font-medium">123 Healthcare Avenue, New Delhi, India 110001</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-white/90">+91 1234 567 890</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:border-accent/50 transition-colors">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-bold text-white/90">help@swasthbharat.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-medium">
            &copy; {new Date().getFullYear()} The Swasth Bharat. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-white/40 text-sm">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-white/60">Systems Operational</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/60 font-semibold italic">
            <span>Building for India</span>
            <Heart className="w-4 h-4 text-cta fill-cta animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
