import { Heart, Users, Award, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function About() {
  const offerings = [
    {
      icon: Heart,
      title: 'Quality Healthcare',
      description: 'Access to verified and experienced healthcare professionals',
    },
    {
      icon: Users,
      title: 'Patient-Centric',
      description: 'Personalized care tailored to your unique health needs',
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Secure and reliable healthcare service delivery',
    },
    {
      icon: Target,
      title: 'Accessible Care',
      description: 'Healthcare services available across all of India',
    },
  ];

  const approach = [
    {
      step: '01',
      title: 'Search & Discover',
      description: 'Find the right doctor based on specialty, location, and ratings',
    },
    {
      step: '02',
      title: 'Book Appointment',
      description: 'Schedule your consultation at your convenience',
    },
    {
      step: '03',
      title: 'Get Care',
      description: 'Receive quality healthcare from verified professionals',
    },
    {
      step: '04',
      title: 'Follow-up',
      description: 'Continuous care and support for your health journey',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Priya Patel',
      role: 'Pediatrician',
      text: 'Swasth Bharat has helped me reach more patients and provide better care. The platform is easy to use and truly patient-focused.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Orthopedic Surgeon',
      text: 'This platform has transformed how I connect with patients. It\'s efficient, professional, and makes healthcare more accessible.',
      image: 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Dr. Sneha Reddy',
      role: 'Dermatologist',
      text: 'I love how Swasth Bharat empowers both doctors and patients. It\'s making healthcare more transparent and accessible.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc3NjMxMDkwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Know About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Connecting India to Quality Healthcare
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At The Swasth Bharat, we are committed to making quality healthcare accessible to every corner of India. 
              We connect patients with verified, experienced healthcare professionals, ensuring that everyone has access 
              to the care they deserve. Our platform bridges the gap between patients and doctors, making healthcare 
              simple, transparent, and trustworthy.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
                <p className="text-gray-600">Verified Doctors</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">50,000+</p>
                <p className="text-gray-600">Happy Patients</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">100+</p>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">25+</p>
                <p className="text-gray-600">Specialties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="py-16 px-4 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{offering.title}</h3>
                  <p className="text-gray-600">{offering.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all h-full">
                  <div className="text-6xl font-bold text-primary/10 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < approach.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Testimonials */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Doctor Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-96 md:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763770446480-d6b3f311b5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRpdmVyc2V8ZW58MXx8fHwxNzc2MzU0NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6">Message from Our CEO</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  "Our vision is to create a healthier India where quality healthcare is not a privilege, but a right. 
                  Through technology and compassion, we're building a platform that brings doctors and patients together, 
                  making healthcare accessible, affordable, and trustworthy for all."
                </p>
                <div>
                  <p className="font-semibold text-lg">Dr. Arjun Mehta</p>
                  <p className="text-gray-600">Founder & CEO, The Swasth Bharat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
