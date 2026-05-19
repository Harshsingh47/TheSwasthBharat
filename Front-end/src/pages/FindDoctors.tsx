import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import { DoctorCard } from '../features/find-doctors/components/DoctorCard';
import { SearchBar } from '../features/find-doctors/components/SearchBar';
import { FilterSidebar } from '../features/find-doctors/components/FilterSidebar';
import { getDoctors } from '../features/find-doctors/api/getDoctors';

export default function FindDoctors() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  // Fetch data using React Query
  // When filters change, React Query automatically refetches or serves cached data!
  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ['doctors', selectedSpecialty, selectedExperience, selectedRating, location, searchQuery],
    queryFn: () => getDoctors({ 
      search: searchQuery, 
      location: location, 
      minRating: selectedRating ? parseInt(selectedRating) : undefined,
      specialty: selectedSpecialty
    }),
  });

  const handleBookAppointment = (doctorId: string | number) => {
    if (!isAuthenticated) {
      toast('Authentication Required', {
        description: 'Please Login or Signup first to book an appointment.',
        action: {
          label: 'Login',
          onClick: () => navigate('/login')
        },
      });
      return;
    }
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar 
        location={location} 
        setLocation={setLocation} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        isFilterOpen={isFilterOpen} 
        setIsFilterOpen={setIsFilterOpen} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <FilterSidebar 
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          {/* Doctor Results */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{doctors.length}</span> doctors
              </p>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : doctors.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No doctors found matching your criteria.
                </div>
              ) : (
                doctors.map((doctor) => (
                  <DoctorCard 
                    key={doctor.id} 
                    doctor={doctor} 
                    onBookAppointment={handleBookAppointment} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
