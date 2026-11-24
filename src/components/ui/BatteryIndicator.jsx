import React from 'react';
import { Zap } from 'lucide-react';

export default function BatteryIndicator({ percentage = 85, voltage = 3.7 }) {
  const getColor = () => {
    if (percentage > 60) return '#10b981'; // green
    if (percentage > 20) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const color = getColor();
  const segments = 5;
  const filledSegments = Math.round((percentage / 100) * segments);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Battery icon */}
      <div className="relative">
        <div className="flex items-center gap-1">
          <div
            className="relative border-2 rounded-md p-1 flex items-center gap-0.5"
            style={{ borderColor: color, width: 80, height: 36 }}
          >
            {Array.from({ length: segments }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full rounded-sm transition-all duration-500"
                style={{
                  backgroundColor: i < filledSegments ? color : 'transparent',
                  border: `1px solid ${i < filledSegments ? 'transparent' : color}`,
                  opacity: i < filledSegments ? 1 : 0.2,
                }}
              />
            ))}
            {/* Charging indicator if low */}
            {percentage < 20 && (
              <Zap
                size={12}
                className="absolute inset-0 m-auto text-red-400 animate-pulse"
              />
            )}
          </div>
          {/* Terminal */}
          <div
            className="w-2 h-4 rounded-r-sm"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      {/* Percentage */}
      <div className="text-center">
        <div className="text-2xl font-bold font-mono" style={{ color }}>
          {percentage.toFixed(0)}%
        </div>
        <div className="text-xs text-slate-400">{voltage}V Li-Ion</div>
      </div>

      {/* Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className="h-2 rounded-full battery-fill transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
