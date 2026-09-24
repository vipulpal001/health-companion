import React, { useState } from 'react';
import { Settings, Shield, Bell, Moon, Sun, Trash2, AlertTriangle } from 'lucide-react';
import type { HealthProfile } from '../types';

interface SettingsViewProps {
  profile?: HealthProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onClearHistory: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  darkMode,
  onToggleDarkMode,
  onClearHistory
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSharingNotice, setDataSharingNotice] = useState(false);
  const [clearedMessage, setClearedMessage] = useState(false);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your local chat history? This cannot be undone.")) {
      onClearHistory();
      setClearedMessage(true);
      setTimeout(() => setClearedMessage(false), 2500);
    }
  };

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-8 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#1F2937] dark:text-[#F3F4F6] flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#4F6F52] dark:text-[#719F75]" />
          <span>Settings & Privacy</span>
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
          Manage your interface preferences, privacy safeguards, and medical compliance disclaimers.
        </p>
      </div>

      <div className="space-y-5">
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-[#1B1E1C] rounded-2xl border border-[#E5E7EB] dark:border-[#272C29] p-5 shadow-2xs">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-3 flex items-center gap-2">
            {darkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Interface Theme</span>
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Switch between Calm Light mode (#FAFAF8) and Organic Dark mode.
            </span>
            <button
              onClick={onToggleDarkMode}
              className="px-3.5 py-1.5 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] text-xs font-medium bg-[#FAFAF8] dark:bg-[#131514] text-[#1F2937] dark:text-[#F3F4F6] hover:border-[#4F6F52]"
            >
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        </div>

        {/* Notifications & Reminders */}
        <div className="bg-white dark:bg-[#1B1E1C] rounded-2xl border border-[#E5E7EB] dark:border-[#272C29] p-5 shadow-2xs">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#4F6F52]" />
            <span>Health & Medication Alerts</span>
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Receive browser notifications for follow-up reminders and symptom checks.
            </span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#4F6F52] cursor-pointer"
            />
          </div>
        </div>

        {/* Privacy & Data Ownership */}
        <div className="bg-white dark:bg-[#1B1E1C] rounded-2xl border border-[#E5E7EB] dark:border-[#272C29] p-5 shadow-2xs">
          <h3 className="text-sm font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#4F6F52]" />
            <span>Health Data Isolation & Privacy</span>
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-4">
            Your conversational questions and profile inputs are evaluated securely. We do not sell or monetize personal health identifiers.
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] dark:border-[#272C29]">
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Anonymize diagnostic queries</span>
            <input
              type="checkbox"
              checked={dataSharingNotice}
              onChange={(e) => setDataSharingNotice(e.target.checked)}
              className="w-4 h-4 accent-[#4F6F52] cursor-pointer"
            />
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="bg-[#FAFAF8] dark:bg-[#131514] rounded-2xl border border-[#E5E7EB] dark:border-[#272C29] p-5">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-xs mb-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Official Medical Safety Disclaimer</span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
            Health Companion is an AI-powered conversational health information assistant. It is designed to assist users in understanding medical terminology, lab reports, and symptom nuances. 
            <strong> It is not a licensed physician and does not formulate definitive diagnoses, prescribe regulated pharmaceuticals, or replace clinical consultations.</strong> In the event of a medical emergency (e.g., severe chest tightness, sudden neurological deficits, difficulty breathing), immediately contact local emergency services.
          </p>
        </div>

        {/* Danger Zone: Clear History */}
        <div className="bg-white dark:bg-[#1B1E1C] rounded-2xl border border-red-200 dark:border-red-900/40 p-5 shadow-2xs">
          <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>Manage Chat Data</span>
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              Erase all current conversation history and cached session context from this browser.
            </span>
            <button
              onClick={handleClearHistory}
              className="px-3.5 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 text-xs font-medium transition"
            >
              {clearedMessage ? "Cleared!" : "Clear Chat History"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
