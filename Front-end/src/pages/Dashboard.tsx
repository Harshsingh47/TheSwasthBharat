import { useState, useEffect } from 'react';
import { Calendar, Heart, User, Clock, Loader2, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile, fetchAppointments } from '../features/dashboard/api/dashboardApi';
import { UpcomingAppointments } from '../features/dashboard/components/UpcomingAppointments';
import { PastAppointments } from '../features/dashboard/components/PastAppointments';
import { SavedDoctors } from '../features/dashboard/components/SavedDoctors';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'saved'>('upcoming');

  const { data: userData, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });

  const loading = profileLoading || appointmentsLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const upcomingAppointments = appointments.filter((a: any) => a.status === 'PENDING' || a.status === 'CONFIRMED');
  const pastAppointments = appointments.filter((a: any) => a.status === 'COMPLETED' || a.status === 'CANCELLED');
  const savedDoctors: any[] = []; // Still static or coming from profile if implemented
  const isUnverifiedDoctor = role === 'DOCTOR' && userData && !userData.isVerified;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center overflow-hidden">
              {userData?.user?.avatarUrl ? (
                <img 
                  src={userData.user.avatarUrl} 
                  alt={userData?.user?.name || userData?.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
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
        {isUnverifiedDoctor && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-4 animate-pulse mb-8">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-6 h-6 animate-bounce" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-amber-900 text-lg">Account Pending Admin Verification</h3>
              <p className="text-amber-800 text-sm mt-0.5">
                Your medical credentials are currently being reviewed by our administration team. 
                Patients cannot search or view your profile until you are fully approved.
              </p>
            </div>
            <button 
              onClick={() => navigate('/profile')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 flex-shrink-0"
            >
              Review Profile Details
            </button>
          </div>
        )}
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
          {role !== 'DOCTOR' && (
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
          )}
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
              {role !== 'DOCTOR' && (
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
              )}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'upcoming' && <UpcomingAppointments appointments={upcomingAppointments} />}
            {activeTab === 'past' && <PastAppointments appointments={pastAppointments} />}
            {activeTab === 'saved' && role !== 'DOCTOR' && <SavedDoctors doctors={savedDoctors} />}
          </div>
        </div>
      </div>
    </div>
  );
}
