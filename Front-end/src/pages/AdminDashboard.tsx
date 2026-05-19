import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminStats, fetchUnverifiedDoctors, verifyDoctor, rejectDoctor } from '../features/dashboard/api/adminApi';
import { Users, Activity, CheckCircle, ShieldCheck, ChevronDown, ChevronUp, FileText, MapPin, Stethoscope, GraduationCap, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats,
  });

  const { data: doctors = [], isLoading: doctorsLoading } = useQuery({
    queryKey: ['unverifiedDoctors'],
    queryFn: fetchUnverifiedDoctors,
  });

  const verifyMutation = useMutation({
    mutationFn: verifyDoctor,
    onSuccess: () => {
      toast.success("Doctor successfully verified!");
      queryClient.invalidateQueries({ queryKey: ['unverifiedDoctors'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: () => {
      toast.error("Failed to verify doctor.");
    }
  });

  const rejectMutation = useMutation({
    mutationFn: rejectDoctor,
    onSuccess: () => {
      toast.success("Doctor application successfully rejected.");
      queryClient.invalidateQueries({ queryKey: ['unverifiedDoctors'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
    },
    onError: () => {
      toast.error("Failed to reject doctor.");
    }
  });

  if (statsLoading || doctorsLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center gap-4 border-l-4 border-primary">
          <ShieldCheck className="w-10 h-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
            <p className="text-gray-600">Platform overview and verification queue.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Patients</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats?.totalPatients || 0}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
              <Activity className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Doctors</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats?.totalDoctors || 0}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Appointments Booked</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats?.totalAppointments || 0}</h3>
            </div>
          </div>
        </div>

        {/* Verification Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Doctor Verification Queue</h2>
            <p className="text-sm text-gray-500 mt-1">Review and approve doctors to appear in public search.</p>
          </div>
          
          <div className="p-6">
            {doctors.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                <p className="text-gray-500">There are no pending doctor verification requests.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {doctors.map((doctor: any) => {
                  const isExpanded = expandedId === doctor.id;
                  
                  return (
                    <div key={doctor.id} className="border border-gray-200 rounded-lg bg-white hover:border-primary/30 transition-colors overflow-hidden">
                      <div className="flex flex-col md:flex-row items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : doctor.id)}>
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {doctor.user.avatarUrl ? (
                              <img src={doctor.user.avatarUrl} alt={doctor.user.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{doctor.user.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty || 'General Practitioner'} • {doctor.experience || 0} yrs experience</p>
                            <p className="text-xs text-gray-500 mt-1">{doctor.user.email} • {doctor.user.phone || 'No phone'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Are you sure you want to reject this doctor's application? This will permanently delete their account.")) {
                                rejectMutation.mutate(doctor.id);
                              }
                            }}
                            disabled={rejectMutation.isPending || verifyMutation.isPending}
                            className="w-full md:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 text-sm"
                          >
                            {rejectMutation.isPending ? 'Rejecting...' : 'Reject'}
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              verifyMutation.mutate(doctor.id);
                            }}
                            disabled={rejectMutation.isPending || verifyMutation.isPending}
                            className="w-full md:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 text-sm"
                          >
                            {verifyMutation.isPending ? 'Verifying...' : 'Approve'}
                          </button>
                          
                          <div className="text-gray-400 pl-2">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details Section */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 bg-gray-50/50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                              <Stethoscope className="w-4 h-4 text-primary" /> Professional Details
                            </h5>
                            <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm">
                              <p className="mb-2"><span className="text-gray-500 font-medium">Registration No:</span> {doctor.registrationNumber || 'Not provided'}</p>
                              <p className="mb-2"><span className="text-gray-500 font-medium">Consultation Fee:</span> ₹{doctor.consultationFee || 0}</p>
                              <p><span className="text-gray-500 font-medium">Bio:</span> {doctor.bio || 'No biography provided'}</p>
                            </div>
                            
                            <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary" /> Location & Affiliations
                            </h5>
                            <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm">
                              <p className="mb-2"><span className="text-gray-500 font-medium">Location:</span> {doctor.location || 'Not provided'}</p>
                              <p><span className="text-gray-500 font-medium">Hospital:</span> {doctor.hospitalAffiliation || 'None'}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-primary" /> Education
                            </h5>
                            <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm">
                              <p className="mb-2"><span className="text-gray-500 font-medium">Qualification:</span> {doctor.qualification || 'Not provided'}</p>
                              <p><span className="text-gray-500 font-medium">University:</span> {doctor.university || 'Not provided'}</p>
                            </div>

                            <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-primary" /> Uploaded Documents
                            </h5>
                            <div className="bg-white p-4 rounded-lg border border-gray-100 text-sm space-y-3">
                              {doctor.degreeCertificateUrl ? (
                                <a href={doctor.degreeCertificateUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                                  <LinkIcon className="w-4 h-4" /> View Degree Certificate
                                </a>
                              ) : (
                                <p className="text-gray-400 italic">No Degree Certificate Uploaded</p>
                              )}
                              
                              {doctor.idProofUrl ? (
                                <a href={doctor.idProofUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                                  <LinkIcon className="w-4 h-4" /> View ID Proof
                                </a>
                              ) : (
                                <p className="text-gray-400 italic">No ID Proof Uploaded</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
