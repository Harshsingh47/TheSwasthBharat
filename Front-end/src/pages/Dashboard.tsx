import { useState, useEffect } from 'react';
import { Calendar, Heart, User, Clock, Star, MapPin, Loader2, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'saved'>('upcoming');
  const [userData, setUserData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        
        // Fetch Profile
        const profileEndpoint = role === 'DOCTOR' ? '/api/doctor/profile' : '/api/patient/profile';
        const profileRes = await fetch(`${baseUrl}${profileEndpoint}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const profileData = await profileRes.json();
        if (profileRes.ok) {
          setUserData(profileData.profile);
        }

        // Fetch Appointments (only for patients for now)
        if (role === 'PATIENT') {
          const apptRes = await fetch(`${baseUrl}/api/appointments/my`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const apptData = await apptRes.json();
          if (apptRes.ok) {
            setAppointments(apptData.appointments || []);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED');
  const pastAppointments = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED');
  const savedDoctors: any[] = []; // Still static or coming from profile if implemented

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {userData?.user?.name || 'User'}</h1>
              <p className="text-gray-600">{userData?.user?.email || 'User Account'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                <p className="text-gray-600">Upcoming</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pastAppointments.length}</p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{savedDoctors.length}</p>
                <p className="text-gray-600">Saved Doctors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'upcoming'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'past'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Past Appointments
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'saved'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Saved Doctors
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Upcoming Appointments */}
            {activeTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center flex-shrink-0">
                          {appointment.doctor?.image ? (
                            <ImageWithFallback
                              src={appointment.doctor.image}
                              alt={appointment.doctor.user?.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor?.user?.name || 'Doctor'}</h3>
                          <p className="text-gray-600">{appointment.doctor?.specialty || 'Healthcare Provider'}</p>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })} at {new Date(appointment.date).toLocaleTimeString('en-IN', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appointment.doctor?.location || 'Clinic Location'}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                  <div className="py-8">
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mb-8">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800">No upcoming appointments</h3>
                      <p className="text-gray-500 mt-1">You don't have any scheduled visits at the moment.</p>
                      <Link
                        to="/find-doctors"
                        className="inline-block mt-6 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md"
                      >
                        Find a Doctor
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white">
                          <Heart className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-green-900 mb-2">Daily Health Tip</h4>
                        <p className="text-green-800 text-sm italic">"Staying hydrated is key to maintaining energy levels and healthy skin. Aim for 8 glasses of water a day."</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 text-white">
                          <Activity className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-blue-900 mb-2">Quick Checkup</h4>
                        <p className="text-blue-800 text-sm">Review your health profile regularly to keep your information up to date for your doctors.</p>
                        <Link to="/profile" className="text-blue-600 text-sm font-bold mt-2 inline-block hover:underline">Update Profile →</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Past Appointments */}
            {activeTab === 'past' && (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                          {appointment.doctor?.image ? (
                            <ImageWithFallback
                              src={appointment.doctor.image}
                              alt={appointment.doctor.user?.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor?.user?.name || 'Doctor'}</h3>
                          <p className="text-gray-600">{appointment.doctor?.specialty}</p>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!appointment.reviewed && (
                          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Write Review
                          </button>
                        )}
                        <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                          Book Again
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Saved Doctors */}
            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{doctor.rating}</span>
                          <span className="text-sm text-gray-600 ml-1">({doctor.reviews})</span>
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-600">
                        <Heart className="w-6 h-6 fill-current" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold text-primary">₹{doctor.fee}</p>
                      <Link
                        to={`/book-appointment/${doctor.id}`}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
                {savedDoctors.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No saved doctors yet</p>
                    <Link
                      to="/find-doctors"
                      className="inline-block mt-4 text-primary hover:underline"
                    >
                      Find doctors to save
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
