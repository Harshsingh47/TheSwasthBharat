import { Link } from 'react-router';
import { Stethoscope, Heart, Brain, Eye, Bone, Baby, Activity, Pill } from 'lucide-react';
import { motion } from 'motion/react';

const specialties = [
  { icon: Stethoscope, name: 'General Physician', count: 2500, color: 'from-blue-500 to-cyan-400' },
  { icon: Heart, name: 'Cardiologist', count: 850, color: 'from-red-500 to-pink-400' },
  { icon: Brain, name: 'Neurologist', count: 420, color: 'from-purple-500 to-indigo-400' },
  { icon: Eye, name: 'Ophthalmologist', count: 650, color: 'from-amber-500 to-yellow-400' },
  { icon: Bone, name: 'Orthopedic', count: 730, color: 'from-gray-500 to-slate-400' },
  { icon: Baby, name: 'Pediatrician', count: 920, color: 'from-pink-500 to-rose-400' },
  { icon: Activity, name: 'Dermatologist', count: 560, color: 'from-teal-500 to-emerald-400' },
  { icon: Pill, name: 'Dentist', count: 1200, color: 'from-indigo-500 to-blue-400' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Specialties() {
  return (
    <section className="py-24 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-secondary/10 rounded-full text-secondary text-sm tracking-wide mb-4">
              MEDICAL SPECIALTIES
            </span>
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-900">
              Find Experts in Every Field
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our network of verified specialists and book appointments instantly
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <motion.div key={index} variants={item}>
                <Link
                  to="/find-doctors"
                  className="group block bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${specialty.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-center mb-2 text-gray-900">
                    {specialty.name}
                  </h3>
                  <p className="text-center text-sm text-gray-500">
                    {specialty.count}+ doctors
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
