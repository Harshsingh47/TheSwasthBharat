import { Calendar, Activity, MapPin } from 'lucide-react';

interface PatientProfileFormProps {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function PatientProfileForm({ data, onChange }: PatientProfileFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          target: { name: 'profilePicture', value: reader.result as string }
        } as any);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            Profile Picture <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <div className="flex items-center gap-4">
          {data.profilePicture && (
            <img 
              src={data.profilePicture} 
              alt="Profile Preview" 
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          )}
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" /> Age
        </label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            Gender
        </label>
        <select
          name="gender"
          value={data.gender}
          onChange={onChange}
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
          value={data.bloodGroup}
          onChange={onChange}
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
          value={data.location}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-bold text-gray-700">Allergies</label>
        <textarea
          name="allergies"
          value={data.allergies}
          onChange={onChange}
          rows={2}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-bold text-gray-700">Existing Conditions</label>
        <textarea
          name="existingConditions"
          value={data.existingConditions}
          onChange={onChange}
          rows={2}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Emergency Contact Name</label>
        <input
          type="text"
          name="emergencyContactName"
          value={data.emergencyContactName}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Emergency Contact Phone</label>
        <input
          type="tel"
          name="emergencyContactPhone"
          value={data.emergencyContactPhone}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="flex items-center gap-3 py-2">
        <input
          type="checkbox"
          id="volunteerInterest"
          name="volunteerInterest"
          checked={data.volunteerInterest}
          onChange={onChange}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
        />
        <label htmlFor="volunteerInterest" className="text-sm font-medium text-gray-700">
          Interested in volunteering for health camps
        </label>
      </div>
    </div>
  );
}
