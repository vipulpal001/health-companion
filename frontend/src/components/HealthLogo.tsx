import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  centerPlus?: boolean;
}

export const HealthLogo: React.FC<LogoProps> = ({ className = "w-9 h-9", size = 36, centerPlus = false }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
      >
        {/* Soft elegant twin organic leaves */}
        <path
          d="M24 40C24 40 10 33 10 19C10 11.5 16 6 23.5 6C24 6 24 16 24 40Z"
          fill="#4F6F52"
          fillOpacity="0.9"
        />
        <path
          d="M24 40C24 40 38 33 38 19C38 11.5 32 6 24.5 6C24 6 24 16 24 40Z"
          fill="#3E5A41"
        />
        <path
          d="M24 12V39"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </svg>
      {centerPlus && (
        <div className="absolute -top-1.5 bg-[#4F6F52] text-white p-0.5 rounded-full shadow-sm flex items-center justify-center">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      )}
    </div>
  );
};

export const CenterBadgeLogo: React.FC<{ size?: number }> = ({ size = 96 }) => {
  return (
    <div 
      className="relative flex items-center justify-center rounded-full bg-[#EBF2EC] dark:bg-[#1D2A20] shadow-xs"
      style={{ width: size, height: size }}
    >
      {/* Central Medical Cross icon above leaves */}
      <div className="absolute top-4 text-[#4F6F52] dark:text-[#719F75]">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          <line x1="12" y1="4" x2="12" y2="20"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
        </svg>
      </div>
      
      {/* Central Organic Medical Leaves matching image */}
      <div className="mt-2.5">
        <svg
          width={size * 0.55}
          height={size * 0.55}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 42C24 42 11 34 11 18C11 10.5 17 5 24 5C24 5 24 16 24 42Z"
            fill="#5E8562"
          />
          <path
            d="M24 42C24 42 37 34 37 18C37 10.5 31 5 24 5C24 5 24 16 24 42Z"
            fill="#4F6F52"
          />
          <path
            d="M24 12V40"
            stroke="#FAFAF8"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
};
