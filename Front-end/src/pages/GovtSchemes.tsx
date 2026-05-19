import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  ExternalLink, 
  Award, 
  HeartPulse, 
  Users, 
  Building2,
  Stethoscope
} from 'lucide-react';
import { schemes, Scheme } from '../data/govtSchemesData';

export default function GovtSchemes() {
  const [activeTab, setActiveTab] = useState<'benefits' | 'process' | 'apply' | 'claim'>('benefits');
  const [selectedScheme, setSelectedScheme] = useState<Scheme>(schemes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-[#0c111d]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">National & State Initiatives</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Healthcare <span className="text-transparent bg-clip-text bg-brand-grad">For Every Indian</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Demystifying government healthcare schemes. Find eligibility, application guides, and claim processes in one place.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-focus-within:bg-primary/30 transition-all" />
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
              <Search className="w-5 h-5 text-gray-500 ml-4" />
              <input 
                type="text"
                placeholder="Search schemes (e.g., HIMCARE, Ayushman)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar: Scheme List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="sticky top-28">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Available Schemes
                </h2>
                <div className="space-y-3">
                  {filteredSchemes.map((scheme) => (
                    <motion.button
                      key={scheme.id}
                      onClick={() => setSelectedScheme(scheme)}
                      whileHover={{ x: 5 }}
                      className={`w-full text-left p-5 rounded-2xl border transition-all relative group cursor-pointer ${
                        selectedScheme.id === scheme.id 
                          ? 'bg-white border-primary shadow-xl shadow-primary/5' 
                          : 'bg-white border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all ${
                        selectedScheme.id === scheme.id ? 'bg-primary' : 'bg-transparent'
                      }`} />
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          scheme.category === 'Himachal Pradesh' ? 'text-secondary' : 'text-primary'
                        }`}>
                          {scheme.category}
                        </span>
                        {selectedScheme.id === scheme.id && (
                          <ArrowRight className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {scheme.name}
                      </h3>
                    </motion.button>
                  ))}
                  {filteredSchemes.length === 0 && (
                    <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No schemes found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content: Scheme Details */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScheme.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                >
                  {/* Scheme Header */}
                  <div className={`p-8 md:p-12 bg-gradient-to-br ${selectedScheme.color} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10">
                      <span className="px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                        {selectedScheme.category} Initiative
                      </span>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        {selectedScheme.name}
                      </h2>
                      <p className="text-white/80 text-lg font-medium max-w-xl">
                        {selectedScheme.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
                    {(['benefits', 'process', 'apply', 'claim'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 min-w-[120px] py-6 px-4 font-bold text-sm transition-all relative cursor-pointer ${
                          activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {activeTab === tab && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                      >
                        {activeTab === 'benefits' && (
                          <div className="grid md:grid-cols-2 gap-6">
                            {selectedScheme.benefits.map((benefit, i) => (
                              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all group">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                  <Award className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-gray-700 font-semibold text-sm leading-relaxed">{benefit}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'process' && (
                          <div className="space-y-4">
                            {selectedScheme.process.map((step, i) => (
                              <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 relative group">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center font-black text-primary text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                  {i + 1}
                                </div>
                                <p className="text-gray-700 font-bold leading-relaxed">{step}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'apply' && (
                          <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                              <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
                              <p className="text-sm text-blue-700 font-medium">
                                Keep your Aadhaar Card, Ration Card, and Bank Account details ready before starting the application.
                              </p>
                            </div>
                            <div className="space-y-4">
                              {selectedScheme.application.map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                  <div className="mt-1 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                                  </div>
                                  <p className="text-gray-700 font-medium">{item}</p>
                                </div>
                              ))}
                            </div>
                            <a 
                              href={selectedScheme.officialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all mt-4 cursor-pointer"
                            >
                              Official Portal
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        )}

                        {activeTab === 'claim' && (
                          <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                  <Building2 className="w-5 h-5 text-primary" />
                                  At the Hospital
                                </h4>
                                <ul className="space-y-3">
                                  {selectedScheme.claims.slice(0, 2).map((item, i) => (
                                    <li key={i} className="text-sm text-gray-600 font-medium flex gap-3">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-primary" />
                                  Documentation
                                </h4>
                                <ul className="space-y-3">
                                  {selectedScheme.claims.slice(2).map((item, i) => (
                                    <li key={i} className="text-sm text-gray-600 font-medium flex gap-3">
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-900 text-white flex items-center justify-between group overflow-hidden relative">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/40 transition-all" />
                              <div className="relative z-10">
                                <h4 className="font-bold mb-1">Need assistance with claims?</h4>
                                <p className="text-white/60 text-xs font-medium italic">Our community volunteers can help you with the process.</p>
                              </div>
                              <button className="relative z-10 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all cursor-pointer">
                                Get Help
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Quick Healthcare Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: HeartPulse, name: 'Financial Aid', count: '12+ Schemes', color: 'text-red-500' },
              { icon: Users, name: 'Family Health', count: '8+ Schemes', color: 'text-blue-500' },
              { icon: Stethoscope, name: 'Special Care', count: '15+ Schemes', color: 'text-success' },
              { icon: Building2, name: 'State Support', count: 'Himachal Focus', color: 'text-secondary' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all group"
              >
                <div className={`w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{stat.name}</h4>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">{stat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
