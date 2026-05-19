import { motion } from 'framer-motion';

const associates = [
  { name: "Global Health Institute", logo: "🏥" },
  { name: "Himachal Medical Board", logo: "🏔️" },
  { name: "TechCare Solutions", logo: "💻" },
  { name: "Digital India NGO", logo: "🇮🇳" },
  { name: "Wellness Connect", logo: "🌿" },
  { name: "Cloud Health Systems", logo: "☁️" },
  { name: "Rural Care Foundation", logo: "🤝" },
  { name: "InnoMed Labs", logo: "🔬" }
];

export function AssociatesSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3"
          >
            Strategic Partnerships
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-black text-gray-900"
          >
            Our Trusted Associates
          </motion.h2>
        </div>

        {/* Marquee Effect */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-12 animate-marquee-slow hover:pause-animation">
            {/* Double the list for seamless loop */}
            {[...associates, ...associates].map((associate, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 px-8 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 grayscale hover:grayscale-0 hover:bg-white hover:shadow-xl transition-all duration-500 shrink-0 group/logo"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover/logo:scale-110 transition-transform">
                  {associate.logo}
                </div>
                <span className="text-sm font-bold text-gray-400 group-hover/logo:text-gray-900 transition-colors uppercase tracking-wider">
                  {associate.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
          width: fit-content;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
