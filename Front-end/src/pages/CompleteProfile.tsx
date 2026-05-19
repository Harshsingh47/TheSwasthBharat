import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { updateProfile } from '../features/profile/api/profileApi';
import { PatientProfileForm } from '../features/profile/components/PatientProfileForm';
import { DoctorProfileForm } from '../features/profile/components/DoctorProfileForm';
import { toast } from 'sonner';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const { role, isAuthenticated } = useAuthStore();

  const [patientData, setPatientData] = useState<any>({
    profilePicture: '', age: '', gender: 'Male', bloodGroup: '', location: '', allergies: '',
    existingConditions: '', emergencyContactName: '', emergencyContactPhone: '', volunteerInterest: false,
  });

  const [doctorData, setDoctorData] = useState<any>({
    profilePicture: '', specialty: '', experience: '', location: '', bio: '', consultationFee: '',
    qualification: '', university: '', registrationNumber: '', hospitalAffiliation: '',
    languagesSpoken: '', consultationMode: 'BOTH', workingHours: '', availability: '',
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Profile completed successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(`Failed to save profile: ${error.message}`);
    }
  });

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setPatientData({
      ...patientData,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = role === 'DOCTOR' ? doctorData : patientData;
    mutation.mutate(payload);
  };

  if (!role) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="text-gray-600 mt-2">
            Please provide some additional information to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === 'PATIENT' ? (
            <PatientProfileForm data={patientData} onChange={handlePatientChange} />
          ) : (
            <DoctorProfileForm data={doctorData} onChange={handleDoctorChange} />
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-400"
          >
            {mutation.isPending ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
