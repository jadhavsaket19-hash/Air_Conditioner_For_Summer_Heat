import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, AreaChart, Area
} from 'recharts';
import { Activity, Wind, Battery, Power, Play, Pause, RefreshCw, Thermometer, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import FanIcon from '../components/ui/FanIcon';
import BatteryIndicator from '../components/ui/BatteryIndicator';
import TempGauge from '../components/ui/TempGauge';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <div className="text-slate-400 mb-1">{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }} className="font-mono font-bold">
            {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}{p.name === 'temp' ? '°C' : '%'}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function LiveMonitoring() {
  const {
    isRunning, startSimulation, stopSimulation, resetSimulation,
    temperature, battery, fan1On, fan2On, fan1Speed, fan2Speed,
    systemOn, tempHistory, batteryHistory, getTempStatus, getBatteryStatus,
    activityLog
  } = useSimulation();

  const tempStatus = getTempStatus();
  const batteryStatus = getBatteryStatus();

  const cleanTempHistory = tempHistory.filter(d => d.temp !== null);
  const cleanBatteryHistory = batteryHistory.filter(d => d.battery !== null);

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Activity className="text-cyan-400" size={28} />
            Live Monitoring Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Real-time simulated sensor data · <span className="text-amber-400 text-xs">⚠ Simulated demonstration data, not actual hardware readings</span></p>
        </div>
        <div className="flex gap-2">
          {!isRunning ? (
            <button onClick={startSimulation} className="btn-primary flex items-center gap-2 text-sm py-2.5">
              <Play size={16} />Start Simulation
            </button>
          ) : (
            <button onClick={stopSimulation} className="btn-secondary flex items-center gap-2 text-sm py-2.5">
              <Pause size={16} />Pause
            </button>
          )}
          <button onClick={resetSimulation} className="glass-card-hover p-2.5 rounded-xl text-slate-400 hover:text-white">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Top Status Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: Thermometer, label: 'Temperature', value: `${temperature.toFixed(1)}°C`,
            status: tempStatus.label, statusClass: tempStatus.bg,
            color: '#f97316',
          },
          {
            icon: Wind, label: 'Fan 1', value: fan1On ? `${fan1Speed.toFixed(0)}%` : 'OFF',
            status: fan1On ? 'Running' : 'Stopped', statusClass: fan1On ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400',
            color: '#1d9bf0',
          },
          {
            icon: Wind, label: 'Fan 2', value: fan2On ? `${fan2Speed.toFixed(0)}%` : 'OFF',
            status: fan2On ? 'Running' : 'Stopped', statusClass: fan2On ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400',
            color: '#00d4ff',
          },
          {
            icon: Battery, label: 'Battery', value: `${battery.toFixed(0)}%`,
            status: batteryStatus.label, statusClass: battery > 60 ? 'bg-emerald-500/20 text-emerald-400' : battery > 20 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400',
            color: batteryStatus.color,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} style={{ color: item.color }} />
                <span className="text-xs text-slate-400">{item.label}</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white mb-1">{item.value}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.statusClass}`}>{item.status}</span>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Temperature Chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Thermometer size={18} className="text-orange-400" />
              Temperature History
            </h3>
            <div className={`text-xs px-2 py-1 rounded-full ${tempStatus.bg}`}>
              {tempStatus.label}
            </div>
          </div>

          {cleanTempHistory.length < 2 ? (
            <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
              <div className="text-center">
                <Play size={32} className="mx-auto mb-2 opacity-30" />
                <div>Start simulation to see live data</div>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={cleanTempHistory}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis domain={[15, 45]} tick={{ fill: '#64748b', fontSize: 10 }} unit="°C" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Hot', fill: '#ef4444', fontSize: 10 }} />
                <ReferenceLine y={25} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warm', fill: '#f59e0b', fontSize: 10 }} />
                <Area type="monotone" dataKey="temp" name="temp" stroke="#f97316" strokeWidth={2} fill="url(#tempGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Temperature Gauge */}
        <div className="glass-card p-5 flex flex-col items-center justify-center">
          <h3 className="font-bold text-white mb-4 self-start">Live Temperature</h3>
          <TempGauge temperature={temperature} />
          <div className="mt-2 w-full grid grid-cols-3 gap-2 text-center text-xs">
            <div className="glass-card p-2">
              <div className="text-emerald-400 font-bold">Normal</div>
              <div className="text-slate-500">&lt;25°C</div>
            </div>
            <div className="glass-card p-2">
              <div className="text-amber-400 font-bold">Warm</div>
              <div className="text-slate-500">25-30°C</div>
            </div>
            <div className="glass-card p-2">
              <div className="text-red-400 font-bold">Hot</div>
              <div className="text-slate-500">&gt;30°C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fan + Battery Row */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Fan 1 */}
        <div className="glass-card p-5 flex flex-col items-center">
          <h3 className="font-bold text-white mb-4 self-start flex items-center gap-2">
            <Wind size={16} className="text-blue-400" />Fan 1
          </h3>
          <FanIcon isOn={fan1On} speed={fan1Speed} size={80} />
          <div className="mt-4 w-full">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Speed</span>
              <span className="font-mono text-white">{fan1On ? fan1Speed.toFixed(0) : 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: `${fan1On ? fan1Speed : 0}%` }}
              />
            </div>
            <div className={`mt-2 text-center text-sm font-semibold ${fan1On ? 'text-emerald-400' : 'text-slate-500'}`}>
              {fan1On ? '● RUNNING' : '○ STOPPED'}
            </div>
          </div>
        </div>

        {/* Fan 2 */}
        <div className="glass-card p-5 flex flex-col items-center">
          <h3 className="font-bold text-white mb-4 self-start flex items-center gap-2">
            <Wind size={16} className="text-cyan-400" />Fan 2
          </h3>
          <FanIcon isOn={fan2On} speed={fan2Speed} size={80} />
          <div className="mt-4 w-full">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Speed</span>
              <span className="font-mono text-white">{fan2On ? fan2Speed.toFixed(0) : 0}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-cyan-500 to-teal-400"
                style={{ width: `${fan2On ? fan2Speed : 0}%` }}
              />
            </div>
            <div className={`mt-2 text-center text-sm font-semibold ${fan2On ? 'text-emerald-400' : 'text-slate-500'}`}>
              {fan2On ? '● RUNNING' : '○ STOPPED'}
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Battery size={16} className="text-emerald-400" />Battery Status
          </h3>
          <BatteryIndicator percentage={battery} voltage={3.7} />
          {cleanBatteryHistory.length >= 2 && (
            <div className="mt-4">
              <div className="text-xs text-slate-400 mb-2">Discharge History</div>
              <ResponsiveContainer width="100%" height={70}>
                <AreaChart data={cleanBatteryHistory}>
                  <defs>
                    <linearGradient id="battGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 100]} hide />
                  <Area type="monotone" dataKey="battery" stroke="#10b981" strokeWidth={1.5} fill="url(#battGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Activity size={16} className="text-purple-400" />System Activity Log
          <span className="text-xs text-slate-500 font-normal ml-2">Recent events</span>
        </h3>
        <div className="activity-log overflow-y-auto max-h-48 space-y-1.5">
          {activityLog.length === 0 ? (
            <div className="text-slate-500 text-sm text-center py-4">No activity yet. Start the simulation.</div>
          ) : (
            activityLog.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 text-xs py-1.5 border-b border-white/5 last:border-0">
                <span className="text-slate-500 font-mono whitespace-nowrap">{entry.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                  entry.type === 'success' ? 'bg-emerald-400' :
                  entry.type === 'warning' ? 'bg-amber-400' :
                  entry.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                }`} />
                <span className="text-slate-300">{entry.msg}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
