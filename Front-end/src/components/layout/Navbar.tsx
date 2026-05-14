import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Menu, X, ChevronDown, User, Calendar, Heart, LogOut, Bell, MessageSquare, Briefcase, TrendingUp, Megaphone, PlusCircle, Droplet, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../brand/logo the swasth bharat (1).png';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [userData, setUserData] = useState<any>(null);

  // Sync auth state on route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role) {
        try {
          const endpoint = role === 'DOCTOR' ? '/api/doctor/profile' : '/api/patient/profile';
          const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (res.ok) {
            setUserData(data.profile);
          }
        } catch (error) {
          console.error("Error fetching navbar profile:", error);
        }
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;
  const isAboutActive = isActive('/about') || isActive('/careers');

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-white/20 font-sans">
      {/* Top Bar - Hides on Scroll */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 'auto', opacity: 1 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:block bg-gray-50 border-b border-gray-100 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-end items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors">
              <span>EN</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Link to="/careers" className="hover:text-primary transition-colors flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              We are Hiring
            </Link>
            <Link to="/investor-relations" className="hover:text-primary transition-colors flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Investor Relations
            </Link>
            <Link to="/leads" className="hover:text-primary transition-colors flex items-center gap-1">
              <div className="bg-yellow-100 p-1 rounded">
                <MessageSquare className="w-3.5 h-3.5 text-yellow-700" />
              </div>
              Leads
            </Link>
            <button 
              onClick={() => setIsAdvertiseModalOpen(true)}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              Advertise
            </button>
            <Link to="/business" className="flex items-center gap-1 group">
              <span className="bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded-sm font-bold leading-none">BUSINESS</span>
              <span className="hover:text-primary transition-colors flex items-center gap-1">
                <PlusCircle className="w-4 h-4" />
                Free Listing
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group py-2">
            <div className="group-hover:scale-105 transition-transform bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10 group-hover:border-primary/30">
              <img src={logo} alt="The Swasth Bharat" className="h-12 w-auto object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-foreground font-montserrat">The Swasth Bharat</span>
              <span className="text-[9px] text-primary font-bold tracking-[0.2em] uppercase">Healthcare Reimagined</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 font-medium transition-colors ${
                isActive('/') ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
              }`}
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* About Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
                className={`flex items-center space-x-1 px-3 py-2 font-medium transition-colors ${
                  isAboutActive ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
                }`}
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  className="absolute top-full left-0 w-48 bg-white/90 backdrop-blur-xl shadow-2xl py-2 border border-white/20 animate-in fade-in slide-in-from-top-1 duration-200 rounded-xl"
                >
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    Know About Us
                  </Link>
                  <Link
                    to="/careers"
                    className="block px-4 py-2 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/blogs" 
              className={`px-3 py-2 font-medium transition-colors ${
                isActive('/blogs') ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
              }`}
            >
              Blogs
            </Link>
            <Link 
              to="/find-doctors" 
              className={`px-3 py-2 font-medium transition-colors ${
                isActive('/find-doctors') ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
              }`}
            >
              Find Doctors
            </Link>
            <Link 
              to="/donations" 
              className={`px-3 py-2 font-medium transition-colors ${
                isActive('/donations') ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
              }`}
            >
              Donations
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 font-medium transition-colors ${
                isActive('/contact') ? 'text-primary font-bold' : 'text-gray-700 hover:text-cta'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side - Login/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors relative mr-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <Link
              to="/blood-donation"
              className={`group flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 border ${
                isActive('/blood-donation') 
                  ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-200' 
                  : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-red-100 hover:shadow-lg hover:shadow-red-200'
              }`}
            >
              <div className="relative">
                <Droplet className={`w-4 h-4 fill-current group-hover:animate-bounce ${isActive('/blood-donation') ? '' : ''}`} />
                {!isActive('/blood-donation') && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75 group-hover:hidden" />
                )}
              </div>
              <span>Blood Support</span>
            </Link>
            
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-cta-grad text-white px-6 py-2.5 rounded-full font-bold hover:shadow-[0_0_20px_rgba(249,115,6,0.4)] transition-all active:scale-95 shadow-lg"
              >
                Login / Sign Up
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-all"
                >
                  <User className="w-5 h-5" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-xl py-2 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-gray-900 truncate">{userData?.user?.name || 'User'}</p>
                      <p className="text-[10px] text-gray-500 truncate">{userData?.user?.email || 'Account settings'}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Appointments</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Saved Doctors</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive('/') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive('/about') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Know About Us
            </Link>
            <Link
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive('/blogs') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Blogs
            </Link>
            <Link
              to="/find-doctors"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive('/find-doctors') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/donations"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive('/donations') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Donations
            </Link>
            <Link
              to="/blood-donation"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                isActive('/blood-donation')
                  ? 'bg-red-600 text-white border-red-600 shadow-lg'
                  : 'bg-red-50 text-red-600 border-red-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl shadow-sm ${isActive('/blood-donation') ? 'bg-white/20' : 'bg-white'}`}>
                  <Droplet className="w-5 h-5" />
                </div>
                <span className="font-bold">Blood Support</span>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium transition-colors ${
                isActive('/contact') ? 'text-primary font-bold' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
            
            {!isLoggedIn ? (
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Login / Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
            
            {/* Mobile Top Bar Links */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)}>We are Hiring</Link>
              <Link to="/investor-relations" onClick={() => setIsMobileMenuOpen(false)}>Investors</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsAdvertiseModalOpen(true); }} className="text-left">Advertise</button>
              <Link to="/business" onClick={() => setIsMobileMenuOpen(false)}>Free Listing</Link>
            </div>
          </div>
        </div>
      )}

    </nav>
      {/* Advertise Modal */}
      <AnimatePresence>
        {isAdvertiseModalOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-center items-start overflow-y-auto pt-20 pb-10 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdvertiseModalOpen(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9998]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row z-[9999]"
            >
              {/* Left Side: Branding & Benefits */}
              <div className="md:w-5/12 bg-brand-grad p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10">
                  <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 leading-tight">Grow Your Healthcare Business</h2>
                  <p className="text-white/80 text-sm mb-8">
                    Partner with India's most trusted healthcare ecosystem and reach millions of patients searching for quality care.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">10M+ Monthly Reach</h4>
                        <p className="text-xs text-white/60">Targeted visibility across India.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Direct Patient Leads</h4>
                        <p className="text-xs text-white/60">High-intent inquiries for your services.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 pt-8 border-t border-white/10 mt-8">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Trusted by 5,000+ Providers</p>
                </div>
              </div>

              {/* Right Side: Contact Form */}
              <div className="md:w-7/12 p-8 md:p-12 bg-white relative">
                <button 
                  onClick={() => setIsAdvertiseModalOpen(false)}
                  className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-brand-grad inline-block">Get Started</h3>
                  <p className="text-sm text-gray-500">Fill out the form and our team will contact you within 24 hours.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Business Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="City Hospital" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="contact@business.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <button className="w-full bg-brand-grad text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all cursor-pointer active:scale-[0.98]">
                      Submit Application
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4 px-4">
                      By submitting, you agree to our terms of service and privacy policy regarding business inquiries.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
