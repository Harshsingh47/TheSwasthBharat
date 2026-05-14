import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Droplet, Search, MapPin, Users, Calendar, Activity, ShieldCheck, ChevronRight, Info, AlertCircle, Phone, ArrowRight, Share2, Award, CheckCircle2, Map, Crosshair, X } from 'lucide-react';
import { Link } from 'react-router';

// Visual Assets - Using high-quality healthcare placeholders for reliability
const HERO_IMAGE = '/image5.png';
const CAMP_IMAGE = '/image4.png';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const awarenessCards = [
  {
    title: "Why Donate Blood?",
    desc: "A single donation can save up to 3 lives. Your blood is a lifeline for surgeries, accidents, and chronic illnesses.",
    icon: Heart,
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Who Can Donate?",
    desc: "Anyone between 18-65 years, weighing 45kg+ and in good health can be a hero for someone in need.",
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "The Process",
    desc: "Simple, safe, and takes only 15 minutes. The body regenerates the donated volume within 24-48 hours.",
    icon: Activity,
    color: "bg-green-50 text-green-600"
  }
];

const impactStats = [
  { label: "Registered Donors", value: 15420, icon: Users },
  { label: "Emergency Requests", value: 8940, icon: Crosshair },
  { label: "Lives Supported", value: 45200, icon: Heart },
  { label: "Camps Organized", value: 342, icon: Map }
];

export default function BloodDonation() {
  const [searchGroup, setSearchGroup] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isVolunteer, setIsVolunteer] = useState(true); // Default to true for demo logic
  const [isEmergencyDonor, setIsEmergencyDonor] = useState(false);

  // Form State for Volunteers
  const [donorProfile, setDonorProfile] = useState({
    bloodGroup: 'B+',
    lastDonation: '2023-11-15',
    city: 'Shimla',
    district: 'Shimla',
    state: 'Himachal Pradesh'
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="Himachal Blood Donation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
        </div>

        <div className="max-w-7xl relative z-10 text-left pl-8 sm:pl-12 lg:pl-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-600/30 text-red-400 font-bold text-xs uppercase tracking-widest mb-6">
              <Droplet className="w-4 h-4" />
              Community Driven Initiative
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] text-left">
              Donate Blood, <br />
              <span className="text-red-500">Save Lives</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl text-left">
              Join Swasth Bharat's volunteer-driven blood donation network and help save lives during emergencies in the hills of Himachal and beyond.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-600/20 transition-all flex items-center gap-2 group cursor-pointer">
                Become a Blood Donor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold transition-all cursor-pointer">
                Emergency Blood Request
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Initiative */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] min-h-[300px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white group"
            >
              <img src={CAMP_IMAGE} alt="Healthcare Camp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <div className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 max-w-max mx-auto">
                  <p className="text-white text-xs md:text-sm font-medium italic tracking-wide text-center">
                    "From the hills of Himachal Pradesh to communities across India, every donor becomes a hero."
                  </p>
                </div>
              </div>
            </motion.div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                A Community-Driven <br />
                <span className="text-blue-600">Healthcare Ecosystem</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Swasth Bharat's blood donation initiative is born from the spirit of community service found in our Himalayan villages. We believe that local empowerment is the key to national health.
                </p>
                <p>
                  By connecting registered volunteers with those in need, we've built a high-speed emergency response system that works even in the most remote mountain regions.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                      <Crosshair className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Quick Response</h4>
                      <p className="text-xs">Emergency donor matching</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Local Impact</h4>
                      <p className="text-xs">Rural outreach programs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Dashboard (For Registered Volunteers) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Donor <span className="text-red-600">Dashboard</span></h2>
            <p className="text-gray-500">Manage your donation status and help save lives in your area.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left: Donor Status Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
            >
              <div className="bg-brand-grad p-8 text-white">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Silver Donor
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">Harsh Singh</h3>
                <p className="text-white/70 text-sm">Volunteer since 2023</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-500">Blood Group</span>
                  <span className="text-lg font-bold text-red-600 bg-red-50 px-4 py-1 rounded-xl">B+</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                  <span className="text-sm font-medium text-gray-500">Last Donation</span>
                  <span className="text-sm font-bold text-gray-900">Nov 15, 2023</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-blue-900">Emergency Status</span>
                  </div>
                  <button 
                    onClick={() => setIsEmergencyDonor(!isEmergencyDonor)}
                    className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${isEmergencyDonor ? 'bg-red-600' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isEmergencyDonor ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: Availability Settings */}
            <div className="lg:col-span-8 bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-red-600" />
                Update Availability & Location
              </h4>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">State</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    <option>Himachal Pradesh</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">District</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    <option>Shimla</option>
                    <option>Mandi</option>
                    <option>Kullu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred Area</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Near IGMC Hospital"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    <option>Weekends Only</option>
                    <option>Available 24/7</option>
                    <option>Evenings Only</option>
                  </select>
                </div>
              </div>
              <button className="btn-primary w-full md:w-auto px-12 cursor-pointer">Save Preferences</button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Search */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find <span className="text-red-500">Emergency</span> Donors</h2>
            <p className="text-gray-400">Search for active blood donors in your city. Verified volunteers ready to support during emergencies.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-4 mb-16">
            <div className="flex-1 flex items-center px-6 py-4 bg-white/5 rounded-2xl border border-white/10 group focus-within:border-red-500/50 transition-all cursor-pointer">
              <Droplet className="text-red-500 w-5 h-5 mr-3" />
              <select className="w-full bg-transparent focus:outline-none text-white appearance-none cursor-pointer">
                <option className="text-gray-900">Select Blood Group</option>
                {bloodGroups.map(g => <option key={g} className="text-gray-900">{g}</option>)}
              </select>
            </div>
            <div className="flex-1 flex items-center px-6 py-4 bg-white/5 rounded-2xl border border-white/10 group focus-within:border-red-500/50 transition-all">
              <MapPin className="text-red-500 w-5 h-5 mr-3" />
              <input type="text" className="w-full bg-transparent focus:outline-none text-white" placeholder="Enter City/District" />
            </div>
            <button className="px-10 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20 cursor-pointer">
              Search Donors
            </button>
          </div>

          {/* Search Results (Mock) */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center font-bold text-red-500 text-xl">
                    O+
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Available
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-1">Donor #0{i}42</h4>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  Mandi, Himachal Pradesh
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active 2h ago</div>
                  <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {awarenessCards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 group transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50"
              >
                <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{card.desc}</p>
                <Link to="/blogs" className="text-blue-600 font-bold text-xs flex items-center gap-1 group/link">
                  Learn More
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Myths vs Facts Card */}
          <div className="bg-brand-grad rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -mb-48 -mr-48" />
            <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Debunking <span className="text-white/60">Myths</span></h2>
                <div className="space-y-6">
                  {[
                    { m: "It's painful", f: "It's just a small pinch like an ant bite." },
                    { m: "I'll get weak", f: "Body recovers fluids in 24-48 hours." },
                    { m: "It takes too much time", f: "The process takes only 10-15 minutes." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-bold text-red-200 line-through opacity-70 mb-1">{item.m}</p>
                        <p className="text-white font-medium italic">Fact: {item.f}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <Info className="w-10 h-10 mb-4 opacity-50" />
                <h4 className="text-xl font-bold mb-4">Did you know?</h4>
                <p className="text-white/80 leading-relaxed">
                  Regular blood donation can improve heart health and reduce the risk of certain cancers. It's a win-win for both the donor and the recipient!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                  <stat.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">
                  {stat.value.toLocaleString()}+
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden border-8 border-gray-100">
             {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px]" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Be Someone's <span className="text-red-500">Lifeline</span></h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                Your one donation can save multiple lives. Join Swasth Bharat's volunteer network today and make a difference.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-xl shadow-red-600/20 transition-all scale-110 cursor-pointer">
                  Become a Donor
                </button>
                <button className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all cursor-pointer">
                  Join Volunteer Network
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
