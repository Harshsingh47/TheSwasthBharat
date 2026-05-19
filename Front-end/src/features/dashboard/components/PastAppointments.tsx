import { Calendar, User } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface PastAppointmentsProps {
  appointments: any[];
}

export function PastAppointments({ appointments }: PastAppointmentsProps) {
  if (appointments.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        You have no past appointments.
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
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                {(appointment.doctor?.user?.avatarUrl || appointment.patient?.avatarUrl) ? (
                  <ImageWithFallback
                    src={appointment.doctor?.user?.avatarUrl || appointment.patient?.avatarUrl}
                    alt={appointment.doctor?.user?.name || appointment.patient?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {appointment.doctor ? (appointment.doctor.user?.name || 'Doctor') : (appointment.patient?.name || 'Patient')}
                </h3>
                {appointment.doctor && (
                  <p className="text-gray-600">{appointment.doctor.specialty}</p>
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
  );
}
