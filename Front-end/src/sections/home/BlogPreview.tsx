import { Link } from 'react-router';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';
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
    <section className="py-10 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Latest Health <span className="text-transparent bg-clip-text bg-brand-grad">Insights</span>
            </h2>
            <p className="text-gray-500">Expert health insights and wellness tips for a better life</p>
          </div>
          <Link
            to="/blogs"
            className="hidden md:flex items-center gap-1 text-blue-600 font-bold hover:underline"
          >
            View All Articles <ChevronRight className="w-4 h-4" />
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
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex items-center gap-1 text-blue-600 font-bold text-sm">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <Link
          to="/blogs"
          className="md:hidden flex items-center justify-center gap-1 text-blue-600 font-bold mt-8 border border-blue-600 py-3 rounded-xl"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
}
