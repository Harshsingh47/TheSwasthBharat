import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
  Search, MapPin, ChevronLeft, ChevronRight, Star, 
  Heart, Stethoscope, Brain, Eye, Bone, Baby, Activity,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const heroSlides = [
    {
      title: 'Find Trusted Doctors Near You',
      subtitle: 'Connect with verified healthcare professionals across India',
      cta: 'Find a Doctor',
      link: '/find-doctors',
    },
    {
      title: 'Your Health, Our Priority',
      subtitle: 'Access quality healthcare services from the comfort of your home',
      cta: 'Learn More',
      link: '/about',
    },
    {
      title: 'Join Our Healthcare Mission',
      subtitle: 'Making healthcare accessible to every corner of India',
      cta: 'Donate Now',
      link: '/donations',
    },
  ];

  const specialties = [
    { icon: Stethoscope, name: 'General Physician', count: 2500 },
    { icon: Heart, name: 'Cardiologist', count: 850 },
    { icon: Brain, name: 'Neurologist', count: 420 },
    { icon: Eye, name: 'Ophthalmologist', count: 650 },
    { icon: Bone, name: 'Orthopedic', count: 730 },
    { icon: Baby, name: 'Pediatrician', count: 920 },
    { icon: Activity, name: 'Dermatologist', count: 560 },
    { icon: Stethoscope, name: 'Dentist', count: 1200 },
  ];

  const topDoctors = [
    {
      id: 1,
      name: 'Dr. Amit Sharma',
      specialty: 'Cardiologist',
      experience: 15,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
    },
    {
      id: 2,
      name: 'Dr. Priya Patel',
      specialty: 'Pediatrician',
      experience: 12,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
    },
    {
      id: 3,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Orthopedic Surgeon',
      experience: 20,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
    },
    {
      id: 4,
      name: 'Dr. Sneha Reddy',
      specialty: 'Dermatologist',
      experience: 10,
      rating: 4.9,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: true,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Rahul Verma',
      location: 'Mumbai',
      rating: 5,
      text: 'Excellent platform! Found a great cardiologist within minutes.',
    },
    {
      id: 2,
      name: 'Anita Singh',
      location: 'Delhi',
      rating: 5,
      text: 'Very helpful and user-friendly. The doctors are highly qualified.',
    },
    {
      id: 3,
      name: 'Vikram Malhotra',
      location: 'Bangalore',
      rating: 4,
      text: 'Great service and easy appointment booking process.',
    },
  ];

  const successStories = [
    {
      id: 1,
      name: 'Meera Joshi',
      location: 'Pune',
      story: 'Thanks to Swasth Bharat, I found the perfect pediatrician for my baby. The care and attention we received was exceptional.',
      image: 'https://images.unsplash.com/photo-1659352790848-b6455e5a2129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3NjQwNTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Arjun Kapoor',
      location: 'Chennai',
      story: 'After months of pain, I finally got the right treatment. The orthopedic specialist was amazing and truly cared about my recovery.',
      image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      name: 'Kavita Sharma',
      location: 'Jaipur',
      story: 'The platform made it so easy to connect with specialists. My skin condition improved dramatically thanks to the dermatologist I found here.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const blogs = [
    {
      id: 1,
      title: '10 Tips for a Healthy Heart',
      description: 'Learn essential practices to maintain cardiovascular health and prevent heart disease.',
      category: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1546553836-33b20490e87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBibG9nJTIwd2VsbmVzc3xlbmwxfHx8fDE3NzY0MDUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Understanding Diabetes Management',
      description: 'A comprehensive guide to managing diabetes through diet, exercise, and medication.',
      category: 'Endocrinology',
      image: 'https://images.unsplash.com/photo-1655313719494-1d700d4aedd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZSUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc2Mzg5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Mental Health in Modern Times',
      description: 'Addressing the importance of mental health and strategies for emotional well-being.',
      category: 'Psychology',
      image: 'https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9uJTIwY2xpbmljfGVufDF8fHx8MTc3NjQwNTAxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const socialImpact = [
    {
      id: 1,
      title: 'Rural Healthcare Initiative',
      description: 'Bringing quality healthcare to remote villages across India. Join us in making healthcare accessible to all.',
      image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3NjM2MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      raised: '₹12,50,000',
      goal: '₹25,00,000',
    },
    {
      id: 2,
      title: 'Free Medical Camps',
      description: 'Organizing free health checkup camps for underprivileged communities. Your donation can save lives.',
      image: 'https://images.unsplash.com/photo-1763770446480-d6b3f311b5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRpdmVyc2V8ZW58MXx8fHwxNzc2MzU0NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      raised: '₹8,75,000',
      goal: '₹15,00,000',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] md:h-[700px] bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-[#FF7F50] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary w-8' : 'bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Search Bar Overlay */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search doctors, clinics, treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Link
                to="/find-doctors"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <Search className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Search</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating search */}
      <div className="h-16 md:h-20"></div>

      {/* Specialties Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Find Doctors by Specialty
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              return (
                <Link
                  key={index}
                  to="/find-doctors"
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-center group"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-2">{specialty.name}</h3>
                  <p className="text-sm text-gray-600">{specialty.count}+ Doctors</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-16 px-4 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Top Rated Doctors</h2>
            <Link to="/find-doctors" className="text-primary hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                to={`/doctor/${doctor.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{doctor.name}</h3>
                    {doctor.verified && (
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">({doctor.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 italic">"{story.story}"</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">{story.name}</p>
                      <p className="text-sm text-gray-600">{story.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{review.text}"</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 px-4 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Health & Wellness Blog</h2>
            <Link to="/blogs" className="text-primary hover:underline flex items-center">
              View All Blogs <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-3">
                    {blog.category}
                  </span>
                  <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
                  <Link to="/blogs" className="text-primary hover:underline text-sm font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our Social Impact
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join us in making healthcare accessible to every corner of India. Your contribution can save lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialImpact.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <ImageWithFallback
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{campaign.title}</h3>
                  <p className="text-gray-700 mb-4">{campaign.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Raised: {campaign.raised}</span>
                      <span className="text-gray-600">Goal: {campaign.goal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{
                          width: `${(parseInt(campaign.raised.replace(/[^0-9]/g, '')) / parseInt(campaign.goal.replace(/[^0-9]/g, ''))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Link
                    to="/donations"
                    className="block w-full bg-[#FF7F50] text-white text-center px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
