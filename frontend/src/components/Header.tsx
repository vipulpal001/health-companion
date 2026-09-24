import React, { useState } from 'react';
import { User, ChevronDown, Moon, Sun, HeartPulse, LogOut } from 'lucide-react';
import type { HealthProfile } from '../types';

interface HeaderProps {
  profile: HealthProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenProfile: () => void;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  darkMode,
  onToggleDarkMode,
  onOpenProfile,
  onMenuToggle
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 z-20">
      {/* Mobile hamburger button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl border border-[#E5E7EB] dark:border-[#272C29] bg-white dark:bg-[#1B1E1C] text-[#1F2937] dark:text-[#F3F4F6]"
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Right controls: Theme toggle & Avatar dropdown */}
      <div className="flex items-center gap-3 ml-auto relative">
        <button
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-full text-[#6B7280] dark:text-[#9CA3AF] hover:bg-black/5 dark:hover:bg-white/5 transition"
          title={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User avatar and dropdown matching reference image */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-[#4F6F52]/20 transition"
            aria-expanded={dropdownOpen}
          >
            <div className="w-9 h-9 rounded-full bg-[#E5E7EB] dark:bg-[#272C29] flex items-center justify-center text-[#1F2937] dark:text-[#F3F4F6] font-medium text-sm">
              <User className="w-5 h-5 text-[#4F6F52] dark:text-[#719F75]" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#9CA3AF]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] shadow-lg py-2 z-50 text-sm">
              <div className="px-4 py-2 border-b border-[#E5E7EB] dark:border-[#272C29]">
                <p className="font-semibold text-[#1F2937] dark:text-[#F3F4F6] truncate">
                  {profile.name || "Guest Patient"}
                </p>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] truncate">
                  {profile.bloodGroup ? `Blood: ${profile.bloodGroup}` : "Health profile active"}
                </p>
              </div>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onOpenProfile();
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] text-[#1F2937] dark:text-[#F3F4F6] flex items-center gap-2.5 transition"
              >
                <HeartPulse className="w-4 h-4 text-[#4F6F52]" />
                <span>Health Profile</span>
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onToggleDarkMode();
                }}
                className="w-full text-left px-4 py-2 hover:bg-[#EBF2EC] dark:hover:bg-[#1D2A20] text-[#1F2937] dark:text-[#F3F4F6] flex items-center gap-2.5 transition"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
                <span>{darkMode ? "Light Theme" : "Dark Theme"}</span>
              </button>

              <div className="border-t border-[#E5E7EB] dark:border-[#272C29] mt-1 pt-1">
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 text-[#6B7280] text-xs flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Session Protected</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
