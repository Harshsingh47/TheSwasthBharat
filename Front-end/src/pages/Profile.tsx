import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Calendar, Activity, Heart, BadgeCheck, Loader2 } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Patient Fields
  const [patientData, setPatientData] = useState({
    age: '',
    gender: 'Male',
    bloodGroup: '',
    location: '',
    allergies: '',
    existingConditions: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    volunteerInterest: false,
  });

  // Doctor Fields
  const [doctorData, setDoctorData] = useState({
    specialty: '',
    experience: '',
    location: '',
    bio: '',
    consultationFee: '',
    qualification: '',
    university: '',
    registrationNumber: '',
    hospitalAffiliation: '',
    languagesSpoken: '',
    consultationMode: 'BOTH',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      
      if (!token || !storedRole) {
        navigate('/login');
        return;
      }
      
      setRole(storedRole);

      try {
        const endpoint = storedRole === 'DOCTOR' ? '/api/doctor/profile' : '/api/patient/profile';
        const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (res.ok) {
          const profile = data.profile;
          setUserData(profile.user);
          
          if (storedRole === 'DOCTOR') {
            setDoctorData({
              specialty: profile.specialty || '',
              experience: profile.experience?.toString() || '',
              location: profile.location || '',
              bio: profile.bio || '',
              consultationFee: profile.consultationFee?.toString() || '',
              qualification: profile.qualification || '',
              university: profile.university || '',
              registrationNumber: profile.registrationNumber || '',
              hospitalAffiliation: profile.hospitalAffiliation || '',
              languagesSpoken: profile.languagesSpoken || '',
              consultationMode: profile.consultationMode || 'BOTH',
            });
          } else {
            setPatientData({
              age: profile.age?.toString() || '',
              gender: profile.gender || 'Male',
              bloodGroup: profile.bloodGroup || '',
              location: profile.location || '',
              allergies: profile.allergies || '',
              existingConditions: profile.existingConditions || '',
              emergencyContactName: profile.emergencyContactName || '',
              emergencyContactPhone: profile.emergencyContactPhone || '',
              volunteerInterest: !!profile.volunteerInterest,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    setPatientData({
      ...patientData,
      [e.target.name]: target.type === 'checkbox' ? target.checked : e.target.value,
    });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      const endpoint = role === 'DOCTOR' ? '/api/doctor/profile' : '/api/patient/profile';
      
      const payload = role === 'DOCTOR' ? {
        ...doctorData,
        experience: doctorData.experience ? parseInt(doctorData.experience) : undefined,
        consultationFee: doctorData.consultationFee ? parseInt(doctorData.consultationFee) : undefined,
      } : {
        ...patientData,
        age: patientData.age ? parseInt(patientData.age) : undefined,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Profile updated successfully!');
      } else {
        const data = await res.json();
        alert(`Failed to update profile: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('An error occurred while updating your profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-3xl font-bold">{userData?.name}</h1>
                  <BadgeCheck className="w-6 h-6 text-blue-200" />
                </div>
                <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" /> {userData?.email}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" /> Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={patientData.age}
                      onChange={handlePatientChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                       Gender
                    </label>
                    <select
                      name="gender"
                      value={patientData.gender}
                      onChange={handlePatientChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" /> Blood Group
                    </label>
                    <input
                      type="text"
                      name="bloodGroup"
                      value={patientData.bloodGroup}
                      onChange={handlePatientChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder="e.g., O+"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" /> Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={patientData.location}
                      onChange={handlePatientChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700">Allergies</label>
                    <textarea
                      name="allergies"
                      value={patientData.allergies}
                      onChange={handlePatientChange}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700">Existing Conditions</label>
                    <textarea
                      name="existingConditions"
                      value={patientData.existingConditions}
                      onChange={handlePatientChange}
                      rows={2}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={patientData.emergencyContactName}
                      onChange={handlePatientChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={patientData.emergencyContactPhone}
                      onChange={handlePatientChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <input
                      type="checkbox"
                      id="volunteerInterest"
                      name="volunteerInterest"
                      checked={patientData.volunteerInterest}
                      onChange={handlePatientChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                    />
                    <label htmlFor="volunteerInterest" className="text-sm font-medium text-gray-700">
                      Interested in volunteering for health camps
                    </label>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                       Specialty
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      value={doctorData.specialty}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                       Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={doctorData.experience}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                       Consultation Fee (₹)
                    </label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={doctorData.consultationFee}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" /> Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={doctorData.location}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Consultation Mode</label>
                    <select
                      name="consultationMode"
                      value={doctorData.consultationMode}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">Offline</option>
                      <option value="BOTH">Both</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={doctorData.qualification}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">University</label>
                    <input
                      type="text"
                      name="university"
                      value={doctorData.university}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Registration Number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={doctorData.registrationNumber}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Hospital Affiliation</label>
                    <input
                      type="text"
                      name="hospitalAffiliation"
                      value={doctorData.hospitalAffiliation}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Languages Spoken</label>
                    <input
                      type="text"
                      name="languagesSpoken"
                      value={doctorData.languagesSpoken}
                      onChange={handleDoctorChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={doctorData.bio}
                      onChange={handleDoctorChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:bg-blue-400 flex items-center gap-2"
                >
                  {saving ? (
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
