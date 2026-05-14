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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
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
              {['Home', 'About Us', 'Find Doctors', 'Health Blogs', 'Govt Schemes'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Govt Schemes' ? '/govt-schemes' : `/${item.toLowerCase().replace(' ', '-')}`} 
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
              {['Lab Tests', 'Teleconsultation', 'Emergency Care', 'Pharmacy', 'Govt Healthcare Schemes'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Govt Healthcare Schemes' ? '/govt-schemes' : '/find-doctors'} 
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
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-8 font-montserrat relative inline-block">
              Contact Support
              <div className="absolute bottom-[-8px] left-0 w-8 h-1 bg-accent rounded-full" />
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-9 h-9 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-[12px] text-white/90 font-bold truncate">Regional Hospital Solan</p>
                  <p className="text-[10px] text-white/50 font-medium truncate">Solan, HP 173212</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="w-9 h-9 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[12px] font-bold text-white/90">+91 1234 567 890</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:border-accent/50 transition-colors">
                <div className="w-9 h-9 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <span className="text-[12px] font-bold text-white/90 truncate">help@swasthbharat.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-8 font-montserrat relative inline-block">
              Join Our Community
              <div className="absolute bottom-[-8px] left-0 w-8 h-1 bg-primary rounded-full" />
            </h3>
            <div className="space-y-6">
              <p className="text-white/60 text-sm font-medium leading-relaxed">
                Stay updated with the latest healthcare insights and volunteer camps.
              </p>
              <div className="space-y-3">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all pr-12 text-white placeholder:text-white/30"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>
                <button className="w-full bg-brand-grad hover:shadow-lg text-white font-bold py-4 rounded-2xl transition-all active:scale-95 text-sm uppercase tracking-wider">
                  Subscribe Now
                </button>
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
