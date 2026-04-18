import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, ChevronDown, User, Calendar, Heart, LogOut } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock logged in state - in real app, this would come from auth context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SB</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">The Swasth Bharat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            
            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors"
              >
                <span>About</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isAboutDropdownOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                  <Link
                    to="/about"
                    onClick={() => setIsAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    Know About Us
                  </Link>
                  <Link
                    to="/careers"
                    onClick={() => setIsAboutDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>

            <Link to="/blogs" className="text-gray-700 hover:text-primary transition-colors">
              Blogs
            </Link>
            <Link to="/find-doctors" className="text-gray-700 hover:text-primary transition-colors">
              Find Doctors
            </Link>
            <Link to="/donations" className="text-gray-700 hover:text-primary transition-colors">
              Donations
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side - Login/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Appointments</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Saved Doctors</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Know About Us
            </Link>
            <Link
              to="/careers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Careers
            </Link>
            <Link
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Blogs
            </Link>
            <Link
              to="/find-doctors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Find Doctors
            </Link>
            <Link
              to="/donations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Donations
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-primary transition-colors py-2"
            >
              Contact
            </Link>
            
            {!isLoggedIn ? (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors py-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
