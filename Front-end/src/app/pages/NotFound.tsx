import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <Link
            to="/find-doctors"
            className="inline-flex items-center justify-center border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Find Doctors
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-gray-600 mb-4">You might be interested in:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/about" className="text-primary hover:underline">
              About Us
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/blogs" className="text-primary hover:underline">
              Health Blogs
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/donations" className="text-primary hover:underline">
              Make a Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
