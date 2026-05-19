import { Calendar, User, Heart, Activity, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useAuthStore } from '../../../store/authStore';

interface UpcomingAppointmentsProps {
  appointments: any[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const { role } = useAuthStore();

  if (appointments.length === 0) {
    const isDoctor = role === 'DOCTOR';

    return (
      <div className="py-8">
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mb-8">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">
            {isDoctor ? "No appointments booked" : "No upcoming appointments"}
          </h3>
          <p className="text-gray-500 mt-1">
            {isDoctor 
              ? "You don't have any appointments scheduled with patients at the moment." 
              : "You don't have any scheduled visits at the moment."}
          </p>
          {!isDoctor ? (
            <Link
              to="/find-doctors"
              className="inline-block mt-6 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md"
            >
              Find a Doctor
            </Link>
          ) : (
            <Link
              to="/profile"
              className="inline-block mt-6 bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-md"
            >
              Update Availability & Profile
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-green-900 mb-2">
              {isDoctor ? "Doctor Excellence" : "Daily Health Tip"}
            </h4>
            <p className="text-green-800 text-sm italic">
              {isDoctor 
                ? '"Clear communication and empathy are the heart of quality medical care. Always verify patient history before prescribing."' 
                : '"Staying hydrated is key to maintaining energy levels and healthy skin. Aim for 8 glasses of water a day."'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 text-white">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-blue-900 mb-2">
              {isDoctor ? "Manage Profile" : "Quick Checkup"}
            </h4>
            <p className="text-blue-800 text-sm">
              {isDoctor 
                ? "Keep your professional details, university qualifications, and hospital affiliations up to date." 
                : "Review your health profile regularly to keep your information up to date for your doctors."}
            </p>
            <Link to="/profile" className="text-blue-600 text-sm font-bold mt-2 inline-block hover:underline">
              Update Profile →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center flex-shrink-0">
                {(appointment.doctor?.user?.avatarUrl || appointment.patient?.avatarUrl) ? (
                  <ImageWithFallback
                    src={appointment.doctor?.user?.avatarUrl || appointment.patient?.avatarUrl}
                    alt={appointment.doctor?.user?.name || appointment.patient?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.doctor ? (appointment.doctor.user?.name || 'Doctor') : (appointment.patient?.name || 'Patient')}
                </h3>
                {appointment.doctor && (
                  <p className="text-gray-600">{appointment.doctor.specialty || 'Healthcare Provider'}</p>
                )}
                {appointment.reason && (
                  <p className="text-gray-500 text-sm">Reason: {appointment.reason}</p>
                )}
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
                {appointment.doctor?.location && (
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {appointment.doctor.location}
                  </div>
                )}
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
    </div>
  );
}
