import { MapPin } from 'lucide-react';

interface DoctorProfileFormProps {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export function DoctorProfileForm({ data, onChange }: DoctorProfileFormProps) {
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
            Profile Picture <span className="text-red-500">*</span>
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
            required={!data.profilePicture}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            Specialty
        </label>
        <input
          type="text"
          name="specialty"
          value={data.specialty}
          onChange={onChange}
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
          value={data.experience}
          onChange={onChange}
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
          value={data.consultationFee}
          onChange={onChange}
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
          value={data.location}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Consultation Mode</label>
        <select
          name="consultationMode"
          value={data.consultationMode}
          onChange={onChange}
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
          value={data.qualification}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">University</label>
        <input
          type="text"
          name="university"
          value={data.university}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Registration Number</label>
        <input
          type="text"
          name="registrationNumber"
          value={data.registrationNumber}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Hospital Affiliation</label>
        <input
          type="text"
          name="hospitalAffiliation"
          value={data.hospitalAffiliation}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Languages Spoken</label>
        <input
          type="text"
          name="languagesSpoken"
          value={data.languagesSpoken}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Working Hours</label>
        <select
          name="workingHours"
          value={data.workingHours}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-700"
        >
          <option value="" disabled>Select Working Hours...</option>
          <option value="09:00 AM - 05:00 PM">09:00 AM - 05:00 PM</option>
          <option value="10:00 AM - 06:00 PM">10:00 AM - 06:00 PM</option>
          <option value="08:00 AM - 02:00 PM">08:00 AM - 02:00 PM</option>
          <option value="02:00 PM - 08:00 PM">02:00 PM - 08:00 PM</option>
          <option value="24/7 On Call">24/7 On Call</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Available Days</label>
        <select
          name="availability"
          value={data.availability}
          onChange={onChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-gray-700"
        >
          <option value="" disabled>Select Available Days...</option>
          <option value="Mon - Fri">Monday - Friday</option>
          <option value="Mon - Sat">Monday - Saturday</option>
          <option value="Weekends Only">Weekends Only</option>
          <option value="Everyday">Everyday</option>
          <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
          <option value="Tue, Thu, Sat">Tue, Thu, Sat</option>
        </select>
      </div>
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-bold text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={onChange}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>
    </div>
  );
}
