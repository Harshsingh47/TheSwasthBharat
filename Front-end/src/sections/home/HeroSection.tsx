import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, MapPin, ChevronRight, Mic, Hospital, Stethoscope, Pill, Microscope, Home, Leaf, Dumbbell, Eye, Brain, Truck, HeartPulse, Activity, UserRound, PhoneCall, Grid, Calendar, X, Shield, Clock, Star, Smile } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const heroSlides = [
  {
    image: '/image1.png',
    title: 'Transforming Healthcare with Technology',
    subtitle: 'Search, compare & book services across 10,000+ providers',
    cta: 'GET BEST DEALS',
    link: '/find-doctors',
  },
  {
    image: '/image2.png',
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
  { icon: HeartPulse, name: 'Cardiology', color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-100' },
  { icon: Activity, name: 'Physiotherapy', color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
  { icon: PhoneCall, name: 'Teleconsult', color: 'text-secondary', bgColor: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { icon: Smile, name: 'Dental Care', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
  { icon: Grid, name: 'All Categories', color: 'text-gray-600', bgColor: 'bg-gray-100', borderColor: 'border-gray-200' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoId = "dK4EV9wJPm0";

  const phrases = ['Smart Health', 'Expert Care', 'Better Living', 'Modern Wellness', 'Healthy India'];
  const [phraseIndex, setPhraseIndex] = useState(0);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -100]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-transparent py-6 md:py-10 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Scroll-Responsive Content Wrapper */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }}>
          {/* Top Row: Heading + Trust Widget */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-8">
            {/* Left: Heading Section */}
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-[1.1] tracking-tight"
              >
                Your Gateway to <br className="md:hidden" />
                <span className="relative inline-block overflow-hidden h-[1.2em] align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phrases[phraseIndex]}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-transparent bg-clip-text bg-brand-grad animate-gradient-x inline-block whitespace-nowrap pb-1"
                    >
                      {phrases[phraseIndex].split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: i * 0.05,
                            duration: 0.1,
                            ease: "easeOut"
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-gray-600 font-medium max-w-xl"
              >
                Connecting communities with technology-driven healthcare solutions across India.
              </motion.p>
            </div>

            {/* Right: Trust & Review Widget (Desktop Only) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:flex"
            >
              <motion.div 
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white/60 backdrop-blur-xl p-8 px-10 rounded-[3rem] border border-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.07)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-shadow duration-500 group cursor-default relative overflow-hidden flex items-center gap-10"
              >
                {/* Interactive Glow Background */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05] 
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.5, opacity: 0.2 }}
                  className="absolute top-0 right-0 w-40 h-40 bg-brand-grad rounded-full -mr-20 -mt-20 blur-3xl" 
                />
                
                {/* Google Part */}
                <div className="flex items-center gap-5 pr-10 border-r border-gray-100/80 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="w-14 h-14 bg-white rounded-[1.25rem] flex items-center justify-center shadow-lg border border-gray-50 transition-transform duration-500"
                  >
                    <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-black text-gray-900 tracking-tight">4.9</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <motion.div
                            key={s}
                            whileHover={{ scale: 1.5, rotate: 15 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-primary font-black uppercase tracking-[0.2em] opacity-80">2,480+ Google Reviews</p>
                  </div>
                </div>
                
                {/* Trust Badges Part */}
                <div className="flex flex-col gap-4 relative z-10">
                  {[
                    { icon: Shield, text: 'ISO 9001:2015 Certified', color: 'text-primary', bgColor: 'bg-primary/10' },
                    { icon: Clock, text: '24/7 Priority Support', color: 'text-secondary', bgColor: 'bg-secondary/10' },
                    { icon: Activity, text: '100% Secure Data', color: 'text-amber-600', bgColor: 'bg-amber-50' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-3.5 text-[13px] font-bold text-gray-700 hover:${item.color} transition-colors group/item`}
                    >
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        className={`w-7 h-7 ${item.bgColor} rounded-xl flex items-center justify-center transition-transform`}
                      >
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </motion.div>
                      <span className="whitespace-nowrap">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Premium Search Bar */}
          <div className="flex flex-col md:flex-row gap-0 mb-8 glass rounded-2xl overflow-hidden p-1.5 shadow-xl border-white/50">
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
            <button className="bg-cta-grad hover:shadow-lg text-white px-7 py-3 rounded-xl font-bold transition-all flex items-center gap-2 group text-sm">
              <span>Search Now</span>
              <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Main Banner Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-7 relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl group border-2 border-white">
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
                  className={`h-1 rounded-sm transition-all duration-500 ${
                    i === currentSlide ? 'bg-cta w-10' : 'bg-white/30 w-3 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar with Video and Quick Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Video Player Area with Autoplay, Click-to-Expand, and Optimized Loading */}
            <div 
              className="relative h-[260px] rounded-3xl overflow-hidden shadow-2xl group border-2 border-white glass cursor-zoom-in bg-gray-50"
              onClick={() => setIsMaximized(true)}
            >
              {/* Instant Placeholder / Loading State */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    className="w-full h-full object-cover blur-md scale-110 opacity-60"
                    alt="Loading video..."
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                  <div className="relative z-30 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Loading Preview...</span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-[10px] font-bold border border-white/30 uppercase tracking-widest">
                  Click to Expand
                </div>
              </div>

              <iframe
                onLoad={() => setIsVideoLoaded(true)}
                className={`w-full h-full relative z-0 pointer-events-none scale-[1.02] transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&iv_load_policy=3`}
                title="The Swasth Bharat Awareness"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>

              {/* Premium Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold text-white uppercase tracking-wider pointer-events-none">
                Live Preview
              </div>
            </div>

            {/* Cinematic Modal (Expansion) */}
            <AnimatePresence>
              {isMaximized && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                  onClick={() => setIsMaximized(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                      className="w-full h-full"
                      title="Swasth Bharat Full Story"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <button 
                      className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:rotate-90"
                      onClick={() => setIsMaximized(false)}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Emergency Card */}
              <div className="bg-brand-grad rounded-2xl p-5 relative overflow-hidden group cursor-pointer shadow-lg border border-white/10 hover:scale-[1.02] transition-all">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                      <Truck className="text-white w-4 h-4" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-0.5">Emergency</h3>
                    <p className="text-white/70 font-medium text-[11px] leading-tight">24/7 Ambulance Support</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-white font-bold text-xs mt-3">
                    <span>Call Now</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
              </div>

              {/* Book Lab Card */}
              <div className="bg-white rounded-2xl p-5 relative overflow-hidden group cursor-pointer shadow-lg border border-gray-100 hover:scale-[1.02] transition-all">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 bg-success/10 rounded-xl flex items-center justify-center mb-2">
                      <Calendar className="text-success w-4 h-4" />
                    </div>
                    <h3 className="text-foreground font-bold text-lg mb-0.5">Book Lab</h3>
                    <p className="text-muted-foreground font-medium text-[11px] leading-tight">Home Sample Pickup</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary font-bold text-xs mt-3">
                    <span>Book Now</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Modern Categories Section */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1.5">Health <span className="text-transparent bg-clip-text bg-brand-grad">Categories</span></h2>
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
                <div className={`w-16 h-16 ${cat.bgColor} ${cat.borderColor} border-2 rounded-2xl group-hover:rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1.5 transition-all duration-500 relative`}>
                  {/* Animated Forming Border */}
                  <div className={`absolute -inset-[2.5px] border-2 border-primary rounded-2xl group-hover:rounded-xl opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-110 transition-all duration-500 pointer-events-none`} />
                  
                  <cat.icon className={`w-7 h-7 ${cat.color} group-hover:scale-110 transition-transform relative z-10`} />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-[1.5rem]" />
                </div>
                <div className="relative px-2 py-0.5">
                  {/* Animated Full Border for Keyword */}
                  <div className="absolute inset-0 border border-primary rounded-lg group-hover:rounded-md opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
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
