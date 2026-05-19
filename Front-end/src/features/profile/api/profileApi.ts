import { useAuthStore } from '../../../store/authStore';
import api from '../../../lib/axios';

export const updateProfile = async (payload: any) => {
  const { token, role } = useAuthStore.getState();
  if (!token) throw new Error("No token found");

  const endpoint = role === 'DOCTOR' ? '/api/doctor/profile' : '/api/patient/profile';
  
  const formattedPayload = role === 'DOCTOR' ? {
    ...payload,
    experience: payload.experience ? parseInt(payload.experience) : undefined,
    consultationFee: payload.consultationFee ? parseInt(payload.consultationFee) : undefined,
  } : {
    ...payload,
    age: payload.age ? parseInt(payload.age) : undefined,
  };

  try {
    const res = await api.put(endpoint, formattedPayload);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};
