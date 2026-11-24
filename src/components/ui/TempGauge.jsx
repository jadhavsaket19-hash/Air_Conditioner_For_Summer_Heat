import React from 'react';
import { Thermometer } from 'lucide-react';

export default function TempGauge({ temperature = 26 }) {
  const min = 15;
  const max = 45;
  const pct = Math.min(100, Math.max(0, ((temperature - min) / (max - min)) * 100));

  const getColor = () => {
    if (temperature < 25) return { from: '#06b6d4', to: '#10b981', text: '#10b981' };
    if (temperature < 30) return { from: '#f59e0b', to: '#f97316', text: '#f59e0b' };
    return { from: '#ef4444', to: '#dc2626', text: '#ef4444' };
  };

  const colors = getColor();

  // Gauge arc
  const radius = 70;
  const cx = 90;
  const cy = 90;
  const startAngle = -210;
  const endAngle = 30;
  const totalAngle = endAngle - startAngle; // 240 degrees
  const currentAngle = startAngle + (pct / 100) * totalAngle;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (r, startDeg, endDeg) => {
    const sx = cx + r * Math.cos(toRad(startDeg));
    const sy = cy + r * Math.sin(toRad(startDeg));
    const ex = cx + r * Math.cos(toRad(endDeg));
    const ey = cy + r * Math.sin(toRad(endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  // Needle
  const needleX = cx + (radius - 15) * Math.cos(toRad(currentAngle));
  const needleY = cy + (radius - 15) * Math.sin(toRad(currentAngle));

  return (
    <div className="flex flex-col items-center">
      <svg width={180} height={130} viewBox="0 0 180 130">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={arcPath(radius, startAngle, endAngle)}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Filled arc */}
        <path
          d={arcPath(radius, startAngle, currentAngle)}
          fill="none"
          stroke={`url(#gaugeGrad)`}
          strokeWidth="12"
          strokeLinecap="round"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map(p => {
          const angle = startAngle + (p / 100) * totalAngle;
          const ix = cx + (radius + 2) * Math.cos(toRad(angle));
          const iy = cy + (radius + 2) * Math.sin(toRad(angle));
          const ox = cx + (radius + 10) * Math.cos(toRad(angle));
          const oy = cy + (radius + 10) * Math.sin(toRad(angle));
          return <line key={p} x1={ix} y1={iy} x2={ox} y2={oy} stroke="#334155" strokeWidth="2" />;
        })}

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={needleX} y2={needleY}
          stroke={colors.text}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transition: 'all 0.5s ease' }}
        />
        <circle cx={cx} cy={cy} r="5" fill={colors.text} />

        {/* Labels */}
        <text x="20" y={cy + 10} fill="#64748b" fontSize="10">15°</text>
        <text x="145" y={cy + 10} fill="#64748b" fontSize="10">45°</text>

        {/* Center temp */}
        <text x={cx} y={cy + 30} textAnchor="middle" fill={colors.text} fontSize="20" fontWeight="bold" fontFamily="monospace">
          {temperature.toFixed(1)}°C
        </text>
      </svg>
    </div>
  );
}
