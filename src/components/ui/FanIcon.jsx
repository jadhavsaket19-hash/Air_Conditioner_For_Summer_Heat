import React from 'react';
import { Wind } from 'lucide-react';

export default function FanIcon({ isOn, speed = 0, size = 48 }) {
  const getSpinClass = () => {
    if (!isOn) return '';
    if (speed < 30) return 'fan-spin-low';
    if (speed < 70) return 'fan-spin-medium';
    return 'fan-spin-high';
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow ring */}
      {isOn && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)`,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}

      {/* Fan body */}
      <div
        className={`${getSpinClass()} transition-all duration-500`}
        style={{ width: size * 0.85, height: size * 0.85 }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Center hub */}
          <circle cx="50" cy="50" r="8" fill={isOn ? '#00d4ff' : '#334155'} />
          <circle cx="50" cy="50" r="4" fill={isOn ? '#1d9bf0' : '#1e293b'} />

          {/* Blades */}
          {[0, 90, 180, 270].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <path
                d="M50 50 Q40 20 50 10 Q70 15 65 35 Z"
                fill={isOn ? '#1d9bf0' : '#334155'}
                opacity={isOn ? 0.9 : 0.5}
              />
            </g>
          ))}

          {/* Outer ring */}
          <circle
            cx="50" cy="50" r="47"
            fill="none"
            stroke={isOn ? '#00d4ff' : '#334155'}
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Status dot */}
      <div
        className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-[#020818] ${
          isOn ? 'bg-emerald-400' : 'bg-slate-600'
        }`}
        style={{ top: size * 0.05, right: size * 0.05 }}
      />
    </div>
  );
}
