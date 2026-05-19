import { X } from 'lucide-react';

export const specialties = [
  'All Specialties',
  'General Physician',
  'Cardiologist',
  'Pediatrician',
  'Dermatologist',
  'Orthopedic Surgeon',
  'Neurologist',
  'Ophthalmologist',
];

interface FilterSidebarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (val: boolean) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (val: string) => void;
  selectedExperience: string;
  setSelectedExperience: (val: string) => void;
  selectedRating: string;
  setSelectedRating: (val: string) => void;
}

export function FilterSidebar({
  isFilterOpen, setIsFilterOpen, selectedSpecialty, setSelectedSpecialty,
  selectedExperience, setSelectedExperience, selectedRating, setSelectedRating
}: FilterSidebarProps) {
  
  const FilterContent = () => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Specialty</label>
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Experience</label>
        <select
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All</option>
          <option value="0-5">0-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10-15">10-15 years</option>
          <option value="15+">15+ years</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Ratings</option>
          <option value="4.5+">4.5+ Stars</option>
          <option value="4.0+">4.0+ Stars</option>
          <option value="3.5+">3.5+ Stars</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="ml-2 text-sm">Available Today</span>
        </label>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-36">
          <h3 className="font-semibold text-lg mb-4">Filters</h3>
          <FilterContent />
          <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Clear All Filters
          </button>
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <FilterContent />

            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors mb-3">
              Clear All Filters
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
