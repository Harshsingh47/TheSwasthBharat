import { useAuthStore } from '../../../store/authStore';
import api from '../../../lib/axios';

export const fetchProfile = async () => {
  const { token, role } = useAuthStore.getState();
  
  if (!token) throw new Error("No token found");

  const profileEndpoint = role === 'DOCTOR' ? '/api/doctor/profile' : '/api/patient/profile';
  const res = await api.get(profileEndpoint);
  
  return res.data.profile;
};

export const fetchAppointments = async () => {
  const { token, role } = useAuthStore.getState();
  
  if (!token) throw new Error("No token found");

  const res = await api.get('/api/appointments/my');
  
  return res.data.appointments || [];
};
