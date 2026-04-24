import { Link } from 'react-router';
import { ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

const blogs = [
  {
    id: 1,
    title: '10 Tips for a Healthy Heart',
    description: 'Learn essential practices to maintain cardiovascular health and prevent heart disease.',
    category: 'Cardiology',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1546553836-33b20490e87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBibG9nJTIwd2VsbmVzc3xlbmwxfHx8fDE3NzY0MDUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Understanding Diabetes Management',
    description: 'A comprehensive guide to managing diabetes through diet, exercise, and medication.',
    category: 'Endocrinology',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1655313719494-1d700d4aedd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZSUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc2Mzg5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Mental Health in Modern Times',
    description: 'Addressing the importance of mental health and strategies for emotional well-being.',
    category: 'Psychology',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9uJTIwY2xpbmljfGVufDF8fHx8MTc3NjQwNTAxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export function BlogPreview() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-[#FAF8F3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm tracking-wide mb-4">
              HEALTH INSIGHTS
            </span>
            <h2 className="text-4xl md:text-5xl text-gray-900">
              Health & Wellness Blog
            </h2>
          </div>
          <Link
            to="/blogs"
            className="group flex items-center gap-2 text-primary hover:gap-3 transition-all"
          >
            <span className="text-lg">View All Articles</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.div key={blog.id} variants={item}>
              <Link
                to="/blogs"
                className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm">Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
