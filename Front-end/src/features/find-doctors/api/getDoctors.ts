import { Doctor } from '../components/DoctorCard';
import axiosInstance from '../../../lib/axios';

interface GetDoctorsParams {
  search?: string;
  location?: string;
  minRating?: number;
  specialty?: string;
}

export const getDoctors = async (params?: GetDoctorsParams): Promise<Doctor[]> => {
  try {
    // Construct search string. Backend searches `name` and `specialty` via the `search` param.
    // So if the user selected a specialty but no search query, we send specialty as the search.
    const query = new URLSearchParams();
    
    if (params?.search || params?.specialty) {
      query.append('search', params.search || params.specialty || '');
    }
    if (params?.location) {
      query.append('location', params.location);
    }
    if (params?.minRating) {
      query.append('minRating', params.minRating.toString());
    }

    const { data } = await axiosInstance.get(`/api/doctor?${query.toString()}`);
    
    // Map backend response to frontend Doctor format
    return data.data.map((item: any) => ({
      id: item.id,
      name: item.user.name,
      specialty: item.specialty || 'General Physician',
      experience: item.experience || 0,
      rating: item.rating || 0,
      reviews: item.totalReviews || 0,
      fee: item.consultationFee || 0,
      distance: item.location || 'Unknown',
      image: item.user.avatarUrl || 'https://images.unsplash.com/photo-1678940805950-73f2127f9d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc3NjMyNzk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      verified: item.isVerified,
      available: true, // we could calculate this based on doctor availability slots later
    }));
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
};

export const getDoctorDetails = async (id: string | number) => {
  const { data } = await axiosInstance.get(`/api/doctor/${id}`);
  return data.doctor;
};

export const getDoctorSlots = async (id: string | number, date: string) => {
  const { data } = await axiosInstance.get(`/api/doctor/${id}/slots?date=${date}`);
  // data.slots is array of { start: '09:00', end: '09:30' }
  return data.slots;
};
