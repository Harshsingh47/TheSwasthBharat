import { useState } from 'react';
import { Search } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cardiology', 'Pediatrics', 'Mental Health', 'Nutrition', 'Fitness', 'General Health'];

  const blogs = [
    {
      id: 1,
      title: '10 Tips for a Healthy Heart',
      description: 'Learn essential practices to maintain cardiovascular health and prevent heart disease. From diet to exercise, discover what keeps your heart strong.',
      category: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1546553836-33b20490e87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBibG9nJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzc2NDA1MDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Amit Sharma',
      date: 'April 15, 2026',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Understanding Diabetes Management',
      description: 'A comprehensive guide to managing diabetes through diet, exercise, and medication. Expert advice for better blood sugar control.',
      category: 'General Health',
      image: 'https://images.unsplash.com/photo-1655313719494-1d700d4aedd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZSUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc2Mzg5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Priya Patel',
      date: 'April 14, 2026',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Mental Health in Modern Times',
      description: 'Addressing the importance of mental health and strategies for emotional well-being in today\'s fast-paced world.',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY29uc3VsdGF0aW9uJTIwY2xpbmljfGVufDF8fHx8MTc3NjQwNTAxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Sneha Reddy',
      date: 'April 12, 2026',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Nutrition Guide for Kids',
      description: 'Essential nutrition tips for growing children. What parents need to know about balanced diets and healthy eating habits.',
      category: 'Pediatrics',
      image: 'https://images.unsplash.com/photo-1659352790848-b6455e5a2129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYW1pbHklMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3NjQwNTAxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Rajesh Kumar',
      date: 'April 10, 2026',
      readTime: '5 min read',
    },
    {
      id: 5,
      title: 'Exercise and Bone Health',
      description: 'How regular physical activity strengthens bones and prevents osteoporosis. A guide to exercises for better bone health.',
      category: 'Fitness',
      image: 'https://images.unsplash.com/photo-1546553836-33b20490e87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBibG9nJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzc2NDA1MDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Vikram Singh',
      date: 'April 8, 2026',
      readTime: '4 min read',
    },
    {
      id: 6,
      title: 'Sleep and Heart Health Connection',
      description: 'Discover the vital link between quality sleep and cardiovascular health. Tips for better sleep hygiene.',
      category: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1655313719494-1d700d4aedd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZSUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc2Mzg5MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Dr. Ananya Desai',
      date: 'April 6, 2026',
      readTime: '6 min read',
    },
  ];

  const trendingTopics = [
    'Heart Health',
    'Diabetes Care',
    'Mental Wellness',
    'Child Nutrition',
    'Exercise Tips',
    'Preventive Care',
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Health & Wellness Blog
          </h1>
          <p className="text-xl text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Expert advice and insights for a healthier life
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
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
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{blog.author}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{blog.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-36">
              <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
