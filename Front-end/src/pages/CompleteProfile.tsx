import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    const storedRole = localStorage.getItem('role');
    if (!storedRole) {
      navigate('/login');
    } else {
      setRole(storedRole);
    }
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
    setLoading(true);

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

      const data = await res.json();
      if (res.ok) {
        alert('Profile completed successfully!');
        navigate('/dashboard');
      } else {
        alert(`Failed to save profile: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Profile save error:', error);
      alert('An error occurred while saving your profile.');
    } finally {
      setLoading(false);
    }
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={patientData.age}
                    onChange={handlePatientChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <select
                    name="gender"
                    value={patientData.gender}
                    onChange={handlePatientChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={patientData.bloodGroup}
                    onChange={handlePatientChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., O+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={patientData.location}
                    onChange={handlePatientChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Allergies</label>
                <textarea
                  name="allergies"
                  value={patientData.allergies}
                  onChange={handlePatientChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                  placeholder="Any known allergies?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Existing Conditions</label>
                <textarea
                  name="existingConditions"
                  value={patientData.existingConditions}
                  onChange={handlePatientChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                  placeholder="Any pre-existing medical conditions?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={patientData.emergencyContactName}
                    onChange={handlePatientChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={patientData.emergencyContactPhone}
                    onChange={handlePatientChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="volunteerInterest"
                  name="volunteerInterest"
                  checked={patientData.volunteerInterest}
                  onChange={handlePatientChange}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="volunteerInterest" className="ml-2 text-sm text-gray-700">
                  I am interested in volunteering for health camps.
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Specialty</label>
                  <input
                    type="text"
                    name="specialty"
                    value={doctorData.specialty}
                    onChange={handleDoctorChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Cardiologist"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={doctorData.experience}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={doctorData.consultationFee}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Consultation Mode</label>
                  <select
                    name="consultationMode"
                    value={doctorData.consultationMode}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location / City</label>
                  <input
                    type="text"
                    name="location"
                    value={doctorData.location}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Languages Spoken</label>
                  <input
                    type="text"
                    name="languagesSpoken"
                    value={doctorData.languagesSpoken}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., English, Hindi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={doctorData.qualification}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., MBBS, MD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">University</label>
                  <input
                    type="text"
                    name="university"
                    value={doctorData.university}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={doctorData.registrationNumber}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hospital Affiliation</label>
                  <input
                    type="text"
                    name="hospitalAffiliation"
                    value={doctorData.hospitalAffiliation}
                    onChange={handleDoctorChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={doctorData.bio}
                  onChange={handleDoctorChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Tell patients about your expertise..."
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
