import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, MapPin, ChevronRight, Mic, Hospital, Stethoscope, Pill, Microscope, Home, Leaf, Dumbbell, Eye, Brain, Truck, Dog, HeartPulse, Activity, UserRound, PhoneCall, Grid, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    title: 'Transforming Healthcare with Technology',
    subtitle: 'Search, compare & book services across 10,000+ providers',
    cta: 'GET BEST DEALS',
    link: '/find-doctors',
  },
  {
    image: 'https://images.unsplash.com/photo-1505751172107-573957a243b0?auto=format&fit=crop&q=80&w=1000',
    title: 'Your Wellness, Our Community Priority',
    subtitle: 'Find top specialists and clinics in your city instantly',
    cta: 'EXPLORE NOW',
    link: '/find-doctors',
  },
];

const categories = [
  { icon: Hospital, name: 'Hospitals', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
  { icon: Stethoscope, name: 'Clinics', color: 'text-secondary', bgColor: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { icon: UserRound, name: 'Specialists', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
  { icon: Pill, name: 'Pharmacies', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
  { icon: Microscope, name: 'Lab Tests', color: 'text-secondary', bgColor: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { icon: Home, name: 'Home Care', color: 'text-cta', bgColor: 'bg-cta/10', borderColor: 'border-cta/20' },
  { icon: Leaf, name: 'Ayurveda', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
  { icon: Dumbbell, name: 'Gyms', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
  { icon: Eye, name: 'Eye Care', color: 'text-secondary', bgColor: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { icon: Brain, name: 'Mental Health', color: 'text-pink', bgColor: 'bg-pink/10', borderColor: 'border-pink/20' },
  { icon: Truck, name: 'Ambulance', color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-100' },
  { icon: Dog, name: 'Veterinary', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
  { icon: HeartPulse, name: 'Cardiology', color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-100' },
  { icon: Activity, name: 'Physiotherapy', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
  { icon: PhoneCall, name: 'Teleconsult', color: 'text-secondary', bgColor: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { icon: Grid, name: 'All Categories', color: 'text-gray-600', bgColor: 'bg-gray-100', borderColor: 'border-gray-200' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-transparent py-8 md:py-12 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading Section */}
        <div className="max-w-2xl mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-3 text-foreground leading-[1.1]"
          >
            Your Gateway to <span className="text-transparent bg-clip-text bg-brand-grad animate-gradient-x">Smart Health</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground font-medium"
          >
            Connecting communities with technology-driven healthcare solutions.
          </motion.p>
        </div>

        {/* Premium Search Bar */}
        <div className="flex flex-col md:flex-row gap-0 mb-12 glass rounded-[1.5rem] overflow-hidden p-1.5 shadow-xl border-white/50">
          <div className="flex-[0.3] flex items-center px-5 py-3 group">
            <MapPin className="text-primary w-4 h-4 mr-2" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full focus:outline-none text-foreground font-semibold bg-transparent text-sm"
              placeholder="Your Location"
            />
          </div>
          <div className="hidden md:block w-px h-8 bg-gray-200 self-center" />
          <div className="flex-1 flex items-center px-5 py-3 group">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full focus:outline-none text-foreground bg-transparent text-sm"
              placeholder="Search for Doctors, Hospitals, Lab Tests..."
            />
            <Mic className="text-primary w-4 h-4 mx-2 cursor-pointer hover:scale-110 transition-transform" />
          </div>
          <button className="bg-cta-grad hover:shadow-lg text-white px-7 py-3 rounded-[1.25rem] font-bold transition-all flex items-center gap-2 group text-sm">
            <span>Search Now</span>
            <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Main Banner Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-8 relative h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-xl group border-2 border-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-8 md:px-16">
                  <div className="max-w-md">
                    <motion.h2 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-montserrat"
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/80 text-base mb-6 font-medium"
                    >
                      {heroSlides[currentSlide].subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        to={heroSlides[currentSlide].link}
                        className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-2.5"
                      >
                        {heroSlides[currentSlide].cta}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="absolute bottom-8 left-8 flex gap-2 z-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentSlide ? 'bg-cta w-10' : 'bg-white/30 w-3 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex-1 bg-brand-grad rounded-[2rem] p-6 relative overflow-hidden group cursor-pointer shadow-lg border border-white/10">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-3">
                    <Truck className="text-white w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-1">Emergency</h3>
                  <p className="text-white/80 font-medium text-sm">Available 24/7 for you</p>
                </div>
                <div className="flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all text-sm">
                  <span>Call Now</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-15 -mt-15 blur-2xl group-hover:bg-white/10 transition-colors" />
            </div>

            <div className="flex-1 bg-white rounded-[2rem] p-6 relative overflow-hidden group cursor-pointer shadow-lg border border-gray-100">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center mb-3">
                    <Calendar className="text-success w-5 h-5" />
                  </div>
                  <h3 className="text-foreground font-bold text-2xl mb-1">Book Lab</h3>
                  <p className="text-muted-foreground font-medium text-sm">Home sample collection</p>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all text-sm">
                  <span>Explore Tests</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mb-8 -mr-8 blur-xl group-hover:bg-primary/10 transition-colors" />
            </div>
          </div>
        </div>

        {/* Modern Categories Section */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1.5">Health Categories</h2>
          <div className="w-16 h-1 bg-cta-grad mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/search?category=${cat.name.toLowerCase()}`}
                className="flex flex-col items-center group relative"
              >
                <div className={`w-16 h-16 ${cat.bgColor} ${cat.borderColor} border-2 rounded-[1.5rem] flex items-center justify-center mb-3 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1.5 transition-all duration-500 relative`}>
                  {/* Animated Forming Border */}
                  <div className={`absolute -inset-[2.5px] border-2 border-primary rounded-[1.75rem] opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-110 transition-all duration-500 pointer-events-none`} />
                  
                  <cat.icon className={`w-7 h-7 ${cat.color} group-hover:scale-110 transition-transform relative z-10`} />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-[1.5rem]" />
                </div>
                <div className="relative px-2 py-0.5">
                  {/* Animated Full Border for Keyword */}
                  <div className="absolute inset-0 border border-primary rounded-full opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
                  <span className="text-[11px] font-bold text-foreground text-center group-hover:text-primary transition-colors font-montserrat relative z-10 whitespace-nowrap">
                    {cat.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
