import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 48 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Shape - Premium Rounded Square */}
      <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#logo_grad)" />
      
      {/* Technology Pulse / Circuit Element */}
      <path 
        d="M30 50L45 50L50 35L60 65L65 50L75 50" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="animate-pulse"
      />
      
      {/* Heart Integration */}
      <path 
        d="M50 75C50 75 25 60 25 42C25 32 33 25 42 25C46 25 50 28 50 28C50 28 54 25 58 25C67 25 75 32 75 42C75 60 50 75 50 75Z" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeOpacity="0.3"
      />

      <defs>
        <linearGradient id="logo_grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7E4AA8" /> {/* Deep Purple */}
          <stop offset="1" stopColor="#4F6DB8" /> {/* Royal Blue */}
        </linearGradient>
      </defs>
    </svg>
  );
};
