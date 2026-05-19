import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, BadgeCheck, Loader2 } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { fetchProfile } from '../features/dashboard/api/dashboardApi';
import { updateProfile } from '../features/profile/api/profileApi';
import { PatientProfileForm } from '../features/profile/components/PatientProfileForm';
import { DoctorProfileForm } from '../features/profile/components/DoctorProfileForm';
import { toast } from 'sonner';

export default function Profile() {
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

  const { data: userData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  // Populate form fields when data loads
  useEffect(() => {
    if (userData) {
      if (role === 'DOCTOR') {
        setDoctorData({
          profilePicture: userData.user?.avatarUrl || '',
          specialty: userData.specialty || '',
          experience: userData.experience?.toString() || '',
          location: userData.location || '',
          bio: userData.bio || '',
          consultationFee: userData.consultationFee?.toString() || '',
          qualification: userData.qualification || '',
          university: userData.university || '',
          registrationNumber: userData.registrationNumber || '',
          hospitalAffiliation: userData.hospitalAffiliation || '',
          languagesSpoken: userData.languagesSpoken || '',
          consultationMode: userData.consultationMode || 'BOTH',
        });
      } else {
        setPatientData({
          profilePicture: userData.user?.avatarUrl || '',
          age: userData.age?.toString() || '',
          gender: userData.gender || 'Male',
          bloodGroup: userData.bloodGroup || '',
          location: userData.location || '',
          allergies: userData.allergies || '',
          existingConditions: userData.existingConditions || '',
          emergencyContactName: userData.emergencyContactName || '',
          emergencyContactPhone: userData.emergencyContactPhone || '',
          volunteerInterest: !!userData.volunteerInterest,
        });
      }
    }
  }, [userData, role]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update profile: ${error.message}`);
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

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl overflow-hidden">
                {userData?.user?.avatarUrl ? (
                  <img 
                    src={userData.user.avatarUrl} 
                    alt={userData?.user?.name || userData?.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-3xl font-bold">{userData?.user?.name || userData?.name}</h1>
                  <BadgeCheck className="w-6 h-6 text-blue-200" />
                </div>
                <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" /> {userData?.user?.email || userData?.email}
                </p>
                <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  {role} Account
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                <p className="text-gray-500 text-sm">Update your basic profile details here</p>
              </div>

              {role === 'PATIENT' ? (
                <PatientProfileForm data={patientData} onChange={handlePatientChange} />
              ) : (
                <DoctorProfileForm data={doctorData} onChange={handleDoctorChange} />
              )}

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:bg-blue-400 flex items-center gap-2"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
