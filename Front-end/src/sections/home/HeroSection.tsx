import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, MapPin, ChevronLeft, ChevronRight, Mic, Hospital, Stethoscope, Pill, Microscope, Home, Leaf, Dumbbell, Eye, Brain, Truck, Dog, HeartPulse, Activity, UserRound, PhoneCall, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    title: 'Search compare prices & book doctors',
    cta: 'GET BEST DEALS',
    link: '/find-doctors',
  },
  {
    image: 'https://images.unsplash.com/photo-1505751172107-573957a243b0?auto=format&fit=crop&q=80&w=1000',
    title: 'Find Top Specialists in your city',
    cta: 'EXPLORE NOW',
    link: '/find-doctors',
  },
];

const categories = [
  { icon: Hospital, name: 'Hospitals', color: 'text-red-500', bgColor: 'bg-red-50' },
  { icon: Stethoscope, name: 'Clinics', color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { icon: UserRound, name: 'Specialists', color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { icon: Pill, name: 'Pharmacies', color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { icon: Microscope, name: 'Lab Tests', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { icon: Home, name: 'Home Care', color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { icon: Leaf, name: 'Ayurveda', color: 'text-green-500', bgColor: 'bg-green-50' },
  { icon: Dumbbell, name: 'Gyms', color: 'text-slate-700', bgColor: 'bg-slate-100' },
  { icon: Eye, name: 'Eye Care', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  { icon: Brain, name: 'Mental Health', color: 'text-pink-500', bgColor: 'bg-pink-50' },
  { icon: Truck, name: 'Ambulance', color: 'text-red-600', bgColor: 'bg-red-100' },
  { icon: Dog, name: 'Veterinary', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  { icon: HeartPulse, name: 'Cardiology', color: 'text-rose-500', bgColor: 'bg-rose-50' },
  { icon: Activity, name: 'Physiotherapy', color: 'text-teal-500', bgColor: 'bg-teal-50' },
  { icon: PhoneCall, name: 'Teleconsult', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { icon: Grid, name: 'More Categories', color: 'text-gray-600', bgColor: 'bg-gray-100' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Search across '10,000+' <span className="text-blue-600">Healthcare Services</span>
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-0 mb-10 shadow-lg rounded-2xl overflow-hidden border border-gray-200">
          <div className="flex-[0.3] flex items-center bg-white border-b md:border-b-0 md:border-r border-gray-200 px-4 py-4 group">
            <MapPin className="text-gray-400 w-5 h-5 mr-3 group-focus-within:text-blue-600" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full focus:outline-none text-gray-700 font-medium"
              placeholder="Enter location"
            />
          </div>
          <div className="flex-1 flex items-center bg-white px-4 py-4 group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full focus:outline-none text-gray-700"
              placeholder="Search for Doctors, Hospitals, Lab Tests..."
            />
            <Mic className="text-blue-600 w-5 h-5 mx-3 cursor-pointer hover:scale-110 transition-transform" />
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg transition-colors shadow-md">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Main Slider */}
          <div className="lg:col-span-8 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 md:px-16">
                  <div className="max-w-md">
                    <h2 className="text-3xl md:text-5xl font-serif text-white italic mb-6 leading-tight">
                      {heroSlides[currentSlide].title}
                    </h2>
                    <Link
                      to={heroSlides[currentSlide].link}
                      className="inline-block bg-white text-gray-900 px-6 py-3 rounded font-bold text-sm tracking-wider hover:bg-gray-100 transition-colors"
                    >
                      {heroSlides[currentSlide].cta}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Side Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="relative h-[142px] md:h-[192px] rounded-2xl overflow-hidden bg-blue-600 p-6 flex flex-col justify-between group cursor-pointer">
              <div className="z-10">
                <h3 className="text-white font-bold text-xl mb-1">EMERGENCY</h3>
                <p className="text-blue-100 text-sm">24/7 Service</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1587748834910-671e35992994?auto=format&fit=crop&q=80&w=300" 
                alt="Emergency" 
                className="absolute right-0 bottom-0 w-2/3 h-full object-cover opacity-50 group-hover:scale-110 transition-transform"
              />
              <ChevronRight className="absolute bottom-6 right-6 text-white w-6 h-6" />
            </div>
            <div className="relative h-[142px] md:h-[192px] rounded-2xl overflow-hidden bg-emerald-600 p-6 flex flex-col justify-between group cursor-pointer">
              <div className="z-10">
                <h3 className="text-white font-bold text-xl mb-1">BOOK NOW</h3>
                <p className="text-emerald-100 text-sm">Instant Appointment</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=300" 
                alt="Book Now" 
                className="absolute right-0 bottom-0 w-2/3 h-full object-cover opacity-50 group-hover:scale-110 transition-transform"
              />
              <ChevronRight className="absolute bottom-6 right-6 text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Categories Grid Section */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-y-10 gap-x-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/search?category=${cat.name.toLowerCase()}`}
              className="flex flex-col items-center group"
            >
              <div className={`w-16 h-16 ${cat.bgColor} rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all border border-gray-100`}>
                <cat.icon className={`w-8 h-8 ${cat.color}`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
