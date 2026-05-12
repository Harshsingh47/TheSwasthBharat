import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Menu, X, ChevronDown, User, Calendar, Heart, LogOut, Bell, MessageSquare, Briefcase, TrendingUp, Megaphone, PlusCircle } from 'lucide-react';
import logo from '../brand/logo the swasth bharat (1).png';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
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

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 font-sans">
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-100">
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
            <Link to="/advertise" className="hover:text-primary transition-colors flex items-center gap-1">
              <Megaphone className="w-4 h-4" />
              Advertise
            </Link>
            <Link to="/business" className="flex items-center gap-1 group">
              <span className="bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded-sm font-bold leading-none">BUSINESS</span>
              <span className="hover:text-primary transition-colors flex items-center gap-1">
                <PlusCircle className="w-4 h-4" />
                Free Listing
              </span>
            </Link>
          </div>
        </div>
      </div>

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
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors">
              Home
            </Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors">
                Dashboard
              </Link>
            )}

            {/* About Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors"
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

            <Link to="/blogs" className="px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors">
              Blogs
            </Link>
            <Link to="/find-doctors" className="px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors">
              Find Doctors
            </Link>
            <Link to="/donations" className="px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors">
              Donations
            </Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-cta font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side - Login/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
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
              className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Know About Us
            </Link>
            <Link
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blogs
            </Link>
            <Link
              to="/find-doctors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Find Doctors
            </Link>
            <Link
              to="/donations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Donations
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
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
              <Link to="/advertise" onClick={() => setIsMobileMenuOpen(false)}>Advertise</Link>
              <Link to="/business" onClick={() => setIsMobileMenuOpen(false)}>Free Listing</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
