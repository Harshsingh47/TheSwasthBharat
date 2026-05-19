import api from '../../../lib/axios';

export const fetchAdminStats = async () => {
  const res = await api.get('/api/admin/stats');
  return res.data;
};

export const fetchUnverifiedDoctors = async () => {
  const res = await api.get('/api/admin/doctors/unverified');
  return res.data.doctors;
};

export const verifyDoctor = async (doctorId: string) => {
  const res = await api.put(`/api/admin/doctors/${doctorId}/verify`);
  return res.data;
};

export const rejectDoctor = async (doctorId: string) => {
  const res = await api.delete(`/api/admin/doctors/${doctorId}/reject`);
  return res.data;
};
