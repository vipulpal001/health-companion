import React, { useState } from 'react';
import { User, Shield, AlertCircle, Save, Check } from 'lucide-react';
import type { HealthProfile } from '../types';

interface HealthProfileViewProps {
  profile: HealthProfile;
  onSaveProfile: (profile: HealthProfile) => void;
}

export const HealthProfileView: React.FC<HealthProfileViewProps> = ({ profile, onSaveProfile }) => {
  const [formData, setFormData] = useState<HealthProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 overflow-y-auto">
      {/* Top Banner */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#1F2937] dark:text-[#F3F4F6] flex items-center gap-2.5">
          <User className="w-6 h-6 text-[#4F6F52] dark:text-[#719F75]" />
          <span>My Health Profile</span>
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Personalized health context helps provide relevant, cautious medical information. You are never forced to provide sensitive details.
        </p>
      </div>

      {/* Privacy Notice Box */}
      <div className="mb-6 p-4 rounded-2xl bg-[#EBF2EC] dark:bg-[#1D2A20] border border-[#4F6F52]/20 flex items-start gap-3 text-xs text-[#1F2937] dark:text-[#F3F4F6]">
        <Shield className="w-5 h-5 text-[#4F6F52] dark:text-[#719F75] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block mb-0.5">Confidential & Private</span>
          <span>Your health profile remains protected. It is only referenced locally to assist AI responses and is never sold or shared with third parties.</span>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1B1E1C] rounded-3xl border border-[#E5E7EB] dark:border-[#272C29] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder="e.g. 32"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
            >
              <option value="">Prefer not to say</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
              Blood Group
            </label>
            <input
              type="text"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              placeholder="e.g. O+, A-, B+"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
              Height
            </label>
            <input
              type="text"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              placeholder="e.g. 168 cm or 5 ft 6 in"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
              Weight
            </label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              placeholder="e.g. 62 kg or 136 lbs"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
            />
          </div>
        </div>

        {/* Clinical details */}
        <div>
          <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
            Known Allergies
          </label>
          <input
            type="text"
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            placeholder="e.g. Penicillin, Peanuts, Sulfa drugs, Latex"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
            Existing Health Conditions
          </label>
          <input
            type="text"
            value={formData.conditions}
            onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
            placeholder="e.g. Asthma, Hypertension, Type 2 Diabetes, Migraines"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
            Current Medications & Supplements
          </label>
          <input
            type="text"
            value={formData.medications}
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            placeholder="e.g. Multivitamin daily, Albuterol inhaler as needed"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1.5">
            Emergency Contact Information
          </label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            placeholder="e.g. Dr. Roberts / Spouse: +1 (555) 019-283"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-[#FAFAF8] dark:bg-[#131514] text-sm text-[#1F2937] dark:text-[#F3F4F6] outline-none focus:border-[#4F6F52]"
          />
        </div>

        {/* Action button */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Changes update AI conversational context immediately</span>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F6F52] hover:bg-[#3E5A41] text-white font-medium text-sm transition shadow-xs"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Profile Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
