import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GVCollegeLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1;
  const width = 220 * scale;
  const height = 70 * scale;

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 260 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <defs>
          <linearGradient id="gv-teal-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a2a22" />
            <stop offset="60%" stopColor="#115e50" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>

          <linearGradient id="gv-cyan-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          
          <linearGradient id="college-text-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f382c" />
            <stop offset="100%" stopColor="#092019" />
          </linearGradient>
        </defs>

        {/* 'g' letter - dark teal smooth curve */}
        <path
          d="M 52 28 C 42 28 32 36 32 48 C 32 60 42 68 52 68 C 62 68 70 60 70 48 L 70 45 L 54 45 L 54 52 L 62 52 L 62 53 C 60 59 56 62 52 62 C 45 62 39 56 39 48 C 39 40 45 34 52 34 C 57 34 61 37 63 41 L 70 37 C 66 31 60 28 52 28 Z"
          fill="url(#gv-teal-grad)"
        />

        {/* 'v' letter - left arm dark teal */}
        <path
          d="M 72 30 L 86 68 L 94 68 L 80 30 Z"
          fill="#0d4237"
        />

        {/* 'v' letter - right arm with top cyan/emerald glow accent */}
        <path
          d="M 80 68 L 102 30 L 93 30 L 76 60 Z"
          fill="url(#gv-teal-grad)"
        />
        <path
          d="M 92 30 L 102 30 L 96 42 L 90 40 Z"
          fill="url(#gv-cyan-bright)"
        />

        {/* 'college' text stylized typography */}
        <text
          x="108"
          y="58"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="36"
          letterSpacing="-1.5px"
          fill="url(#college-text-grad)"
        >
          college
        </text>
      </svg>
    </div>
  );
};
