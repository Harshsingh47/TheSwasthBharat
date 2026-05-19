import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  location: string;
  setLocation: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (val: boolean) => void;
}

export function SearchBar({
  location, setLocation, searchQuery, setSearchQuery, isFilterOpen, setIsFilterOpen
}: SearchBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Search className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Search</span>
          </button>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
}
