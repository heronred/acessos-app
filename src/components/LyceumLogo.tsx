import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
}

export const LyceumLogo: React.FC<LogoProps> = ({ className = '', size = 'md', showBackground = true }) => {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.3 : 1;
  const width = 220 * scale;
  const height = 70 * scale;

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl overflow-hidden shadow-lg"
      >
        <defs>
          <linearGradient id="lyceum-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d243f" />
            <stop offset="100%" stopColor="#143459" />
          </linearGradient>

          <linearGradient id="gold-bird-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="gold-bird-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="yellow-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {showBackground && (
          <rect width="240" height="80" rx="12" fill="url(#lyceum-bg)" />
        )}

        {/* Golden Origami Bird Above Text */}
        <g transform="translate(138, 12) scale(0.75)">
          {/* Main body triangle */}
          <polygon points="12,28 32,22 28,34" fill="url(#gold-bird-1)" />
          {/* Main wing pointing up */}
          <polygon points="20,24 0,8 14,24" fill="url(#gold-bird-2)" />
          {/* Head & Beak */}
          <polygon points="32,22 42,20 35,26" fill="#fef08a" />
          {/* Tail fold */}
          <polygon points="12,28 4,32 16,31" fill="#b45309" />
        </g>

        {/* Swooping Golden Ribbon 'y' Tail */}
        <path
          d="M 28 60 C 45 68 85 68 115 54 C 130 47 135 40 138 35 C 120 44 90 58 60 56 C 42 55 30 50 28 60 Z"
          fill="url(#yellow-ribbon)"
        />

        {/* "Lyceum" Text */}
        {/* L */}
        <text
          x="28"
          y="52"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="38"
          fill="#ffffff"
        >
          L
        </text>

        {/* y (Golden top stem integrated) */}
        <text
          x="50"
          y="52"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="38"
          fill="#facc15"
        >
          y
        </text>

        {/* ceum */}
        <text
          x="69"
          y="52"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="38"
          fill="#ffffff"
          letterSpacing="-0.5px"
        >
          ceum
        </text>
      </svg>
    </div>
  );
};
