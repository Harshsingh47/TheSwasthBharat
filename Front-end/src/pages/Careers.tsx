import { useState } from 'react';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Building, 
  Search, 
  ChevronRight, 
  Star, 
  Heart, 
  Zap, 
  Users, 
  Globe, 
  Rocket,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jobs, hospitalJobs } from '../data/careersData';

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = !selectedDepartment || job.department.toLowerCase() === selectedDepartment.toLowerCase();
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Cinematic Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <Star className="w-3 h-3" /> Join the Revolution
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] mb-8 font-montserrat tracking-tight"
            >
              BUILD THE FUTURE <br />
              <span className="text-transparent bg-clip-text bg-brand-grad">OF HEALTHCARE</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              We're looking for passionate dreamers and builders to help us make quality healthcare accessible to every corner of India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <a href="#openings" className="btn-primary group px-10 py-4 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                View Openings
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="px-10 py-4 rounded-2xl border-2 border-primary/20 text-primary font-black uppercase tracking-widest text-xs hover:bg-primary/5 transition-all">
                Our Culture
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-surface/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Active Users', value: '1M+', icon: Users },
              { label: 'Partner Hospitals', value: '500+', icon: Building },
              { label: 'Cities Covered', value: '50+', icon: Globe },
              { label: 'Lives Impacted', value: '10M+', icon: Heart },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xl border border-border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-4xl font-black text-foreground mb-1 font-montserrat tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-montserrat tracking-tight">WHY WORK WITH US?</h2>
            <div className="w-20 h-1.5 bg-cta-grad mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto font-bold text-lg">We offer more than just a job; we offer a mission-driven environment where you can grow and make a real difference.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Meaningful Impact',
                desc: 'Every line of code you write and every strategy you build helps someone access better healthcare in underserved regions.',
                icon: Rocket,
                color: 'bg-primary'
              },
              {
                title: 'Innovation First',
                desc: 'We use the latest technology stacks to solve complex problems in the healthcare ecosystem, from AI to IoT.',
                icon: Zap,
                color: 'bg-cta'
              },
              {
                title: 'Growth Mindset',
                desc: 'We value continuous learning and provide mentorship, workshops, and courses to help you stay ahead.',
                icon: Heart,
                color: 'bg-success'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="glass p-10 rounded-[2.5rem] border-white/40 relative group overflow-hidden shadow-2xl"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 font-montserrat tracking-tight uppercase">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-bold text-sm opacity-80">{feature.desc}</p>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Job Search Section */}
      <section id="openings" className="py-32 px-4 bg-surface/50 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 font-montserrat tracking-tighter">CURRENT OPENINGS</h2>
              <p className="text-muted-foreground font-bold text-lg">Find your next big challenge at Swasth Bharat. We're hiring across all departments.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <div className="relative group flex-1 sm:w-80">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search roles, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-border rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all font-black text-sm shadow-sm"
                />
              </div>
              
              <div className="relative sm:w-64">
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-border rounded-2xl py-4 pl-14 pr-12 focus:outline-none focus:border-primary/50 transition-all font-black text-sm cursor-pointer shadow-sm"
                >
                  <option value="">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-4 h-4 rotate-90 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  layout
                  key={job.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ x: 10 }}
                  className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                          {job.department}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {job.posted}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors font-montserrat tracking-tight uppercase">{job.title}</h3>
                      <p className="text-muted-foreground font-bold mb-8 max-w-3xl text-base opacity-70 leading-relaxed">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-muted-foreground">
                          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-secondary" />
                          </div>
                          {job.location}
                        </div>
                        <div className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-muted-foreground">
                          <div className="w-8 h-8 rounded-lg bg-cta/10 flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-cta" />
                          </div>
                          {job.type}
                        </div>
                        <div className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-success">
                          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                            <Award className="w-4 h-4 text-success" />
                          </div>
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn-primary flex items-center justify-center gap-3 px-10 py-5 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group-hover:scale-105 transition-transform whitespace-nowrap">
                      Apply Now
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Subtle Gradient Accent */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-border/50">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-black mb-2 font-montserrat">NO MATCHING ROLES</h3>
                <p className="text-muted-foreground font-bold mb-8">Try adjusting your search or filters to see more opportunities.</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedDepartment('');}}
                  className="px-8 py-3 bg-primary/10 text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary/20 transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partner Jobs Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-20">
            <h2 className="text-3xl md:text-4xl font-black font-montserrat tracking-tight uppercase whitespace-nowrap">PARTNER OPPORTUNITIES</h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-border via-primary/20 to-transparent" />
            <p className="text-muted-foreground font-bold text-sm max-w-sm">Join our network of prestigious partner hospitals and clinics across India.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {hospitalJobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border-2 border-border hover:shadow-2xl hover:border-secondary/20 transition-all group relative"
              >
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-border group-hover:scale-110 transition-transform">
                    <img src={job.logo} alt={job.hospital} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">{job.hospital}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      {job.location}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-6 font-montserrat tracking-tight leading-tight uppercase group-hover:text-secondary transition-colors">{job.role}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-surface p-4 rounded-2xl">
                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Experience</div>
                    <div className="text-sm font-black">{job.experience}</div>
                  </div>
                  <div className="bg-surface p-4 rounded-2xl">
                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Type</div>
                    <div className="text-sm font-black">{job.type}</div>
                  </div>
                </div>
                
                <button className="w-full py-4 rounded-2xl border-2 border-secondary/20 text-secondary font-black uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-white transition-all">
                  View Opportunity
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#0A0F1E] rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white border border-white/10 shadow-3xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cta/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-inner"
              >
                <Heart className="w-12 h-12 text-cta fill-cta" />
              </motion.div>
              
              <h2 className="text-4xl md:text-7xl font-black mb-8 font-montserrat tracking-tighter leading-none">
                DON'T SEE A <br /> PERFECT FIT?
              </h2>
              
              <p className="text-white/50 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-bold opacity-80 leading-relaxed">
                We're always looking for exceptional talent to join our mission. Send us your resume and we'll keep you in mind for future roles.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-12 py-5 bg-white text-[#0A0F1E] rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 hover:shadow-2xl transition-all">
                  Join Talent Pool
                </button>
                <button className="px-12 py-5 bg-white/5 border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  Contact Recruitment
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
