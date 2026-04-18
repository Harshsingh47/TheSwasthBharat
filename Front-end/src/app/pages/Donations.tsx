import { Heart, Users, Target } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Donations() {
  const campaigns = [
    {
      id: 1,
      title: 'Rural Healthcare Initiative',
      description: 'Bringing quality healthcare to remote villages across India. Your contribution helps us set up medical camps, provide essential medicines, and train community health workers.',
      image: 'https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwbW9kZXJufGVufDF8fHx8MTc3NjM2MDk2MHww&ixlib=rb-4.1.0&q=80&w=1080',
      raised: 1250000,
      goal: 2500000,
      donors: 842,
    },
    {
      id: 2,
      title: 'Free Medical Camps',
      description: 'Organizing free health checkup camps for underprivileged communities. We provide basic health screenings, diagnostic tests, and consultations with qualified doctors.',
      image: 'https://images.unsplash.com/photo-1763770446480-d6b3f311b5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRpdmVyc2V8ZW58MXx8fHwxNzc2MzU0NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      raised: 875000,
      goal: 1500000,
      donors: 623,
    },
    {
      id: 3,
      title: 'Emergency Medical Fund',
      description: 'Support for patients facing medical emergencies who cannot afford treatment. Every donation helps save a life and provides hope to families in crisis.',
      image: 'https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwaGVhbHRoY2FyZSUyMGRvbmF0aW9ufGVufDF8fHx8MTc3NjQwNTAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      raised: 2100000,
      goal: 3000000,
      donors: 1245,
    },
    {
      id: 4,
      title: 'Child Nutrition Program',
      description: 'Fighting malnutrition among children in underserved areas. We provide nutritional supplements, education, and regular health monitoring.',
      image: 'https://images.unsplash.com/photo-1659352790848-b6455e5a2129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3NjQwNTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      raised: 650000,
      goal: 1000000,
      donors: 456,
    },
  ];

  const impactStories = [
    {
      id: 1,
      title: 'Saved 500+ Lives',
      description: 'Through emergency medical fund',
      icon: Heart,
    },
    {
      id: 2,
      title: '50,000+ Patients',
      description: 'Treated in free medical camps',
      icon: Users,
    },
    {
      id: 3,
      title: '100+ Villages',
      description: 'Now have access to healthcare',
      icon: Target,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPercentage = (raised: number, goal: number) => {
    return Math.round((raised / goal) * 100);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Make a Difference
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Your contribution can save lives and bring healthcare to those who need it most
          </p>
          <button className="bg-[#FF7F50] text-white px-8 py-4 rounded-lg text-lg hover:bg-opacity-90 transition-all transform hover:scale-105">
            Donate Now
          </button>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStories.map((story) => {
              const Icon = story.icon;
              return (
                <div
                  key={story.id}
                  className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-16 px-4 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Active Campaigns
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose a cause that resonates with you and make a meaningful impact
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((campaign) => (
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
                  <h3 className="text-2xl font-bold mb-3">{campaign.title}</h3>
                  <p className="text-gray-700 mb-6">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        Raised: <strong>{formatCurrency(campaign.raised)}</strong>
                      </span>
                      <span className="text-gray-600">
                        Goal: <strong>{formatCurrency(campaign.goal)}</strong>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-secondary h-3 rounded-full transition-all"
                        style={{ width: `${getPercentage(campaign.raised, campaign.goal)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {getPercentage(campaign.raised, campaign.goal)}% funded • {campaign.donors} donors
                    </p>
                  </div>

                  <button className="w-full bg-[#FF7F50] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                    Donate to this Campaign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Your Donation Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">100% Transparency</h3>
              <p className="text-gray-700">
                Every rupee is accounted for. We provide detailed reports on how your donation is used.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Direct Impact</h3>
              <p className="text-gray-700">
                Your donation directly helps patients and communities in need, with minimal overhead costs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Tax Benefits</h3>
              <p className="text-gray-700">
                All donations are eligible for tax deductions under Section 80G of the Income Tax Act.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">Regular Updates</h3>
              <p className="text-gray-700">
                Stay informed about the impact of your contribution through regular updates and stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of donors who are helping us transform healthcare in India
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
            Start Donating Today
          </button>
        </div>
      </section>
    </div>
  );
}
