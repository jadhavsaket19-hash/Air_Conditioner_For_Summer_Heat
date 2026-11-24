import React, { useState } from 'react';
import {
  BarChart3, Thermometer, Wind, Battery, Power, AlertTriangle,
  CheckCircle, XCircle, Play
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend, ReferenceLine, AreaChart, Area
} from 'recharts';

const scenarios = [
  {
    id: 'normal',
    name: 'Normal Temperature',
    emoji: '😊',
    temp: 22,
    fan1: false,
    fan2: false,
    battery: 90,
    status: 'pass',
    desc: 'At 22°C, the system is in standby. Both fans remain OFF as temperature is below the 25°C threshold.',
    colorClass: 'text-emerald-400',
  },
  {
    id: 'warm',
    name: 'Warm Condition',
    emoji: '🌤️',
    temp: 28,
    fan1: false,
    fan2: false,
    battery: 87,
    status: 'info',
    desc: 'At 28°C (between 25-30°C), the system maintains its previous state. Fan activation depends on prior conditions.',
    colorClass: 'text-amber-400',
  },
  {
    id: 'hot',
    name: 'High Temperature',
    emoji: '🔥',
    temp: 35,
    fan1: true,
    fan2: true,
    battery: 78,
    status: 'pass',
    desc: 'At 35°C, Auto mode activates both fans immediately. Full cooling operation begins to reduce ambient temperature.',
    colorClass: 'text-red-400',
  },
  {
    id: 'both_fans',
    name: 'Dual Fan Operation',
    emoji: '💨',
    temp: 32,
    fan1: true,
    fan2: true,
    battery: 72,
    status: 'pass',
    desc: 'Both fans running simultaneously provides maximum cooling airflow across the torso area.',
    colorClass: 'text-blue-400',
  },
  {
    id: 'low_battery',
    name: 'Low Battery',
    emoji: '⚠️',
    temp: 29,
    fan1: true,
    fan2: false,
    battery: 15,
    status: 'warn',
    desc: 'With battery at 15%, the system may limit fan operation to extend runtime. Low battery warning is triggered.',
    colorClass: 'text-yellow-400',
  },
  {
    id: 'system_off',
    name: 'System OFF',
    emoji: '⏸️',
    temp: 30,
    fan1: false,
    fan2: false,
    battery: 85,
    status: 'pass',
    desc: 'When the push-button switch is pressed OFF, all fans stop immediately regardless of temperature. Safe shutdown.',
    colorClass: 'text-slate-400',
  },
];

// Generate simulated test data
const generateTestData = () => {
  const data = [];
  const points = 30;
  for (let i = 0; i < points; i++) {
    const t = i / points;
    const temp = 24 + 12 * Math.sin(t * Math.PI * 2) + Math.random() * 1.5;
    const fan = temp > 30 ? 70 + Math.random() * 20 : temp > 25 ? 30 : 0;
    const batt = 90 - i * 0.5 - (fan > 0 ? 0.5 : 0);
    data.push({
      t: i,
      temp: parseFloat(temp.toFixed(1)),
      fan: parseFloat(fan.toFixed(0)),
      battery: parseFloat(batt.toFixed(1)),
    });
  }
  return data;
};

const testData = generateTestData();

export default function PerformanceTesting() {
  const [activeScenario, setActiveScenario] = useState('hot');
  const scenario = scenarios.find(s => s.id === activeScenario);

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <BarChart3 className="text-pink-400" size={32} />
          Performance Testing
        </h1>
        <p className="section-subtitle">Simulated test scenarios and performance evaluation</p>
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-amber-400">
          <AlertTriangle size={14} />
          All data shown is simulated demonstration — not actual measured hardware results
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="glass-card p-5 mb-6">
        <h3 className="font-bold text-white mb-4">Select Test Scenario</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                activeScenario === s.id
                  ? 'border-cyan-500 bg-cyan-500/15'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-xs text-white font-medium leading-tight">{s.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Detail */}
      {scenario && (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{scenario.emoji}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{scenario.name}</h3>
                <div className={`text-sm ${scenario.colorClass} font-medium`}>
                  {scenario.status === 'pass' ? '✅ Test Passed' :
                   scenario.status === 'warn' ? '⚠️ Warning State' : 'ℹ️ Informational'}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-5">{scenario.desc}</p>

            {/* Readings */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Thermometer, label: 'Temperature', value: `${scenario.temp}°C`, color: 'text-orange-400' },
                { icon: Wind, label: 'Fan 1', value: scenario.fan1 ? 'Running' : 'Stopped', color: scenario.fan1 ? 'text-emerald-400' : 'text-slate-500' },
                { icon: Wind, label: 'Fan 2', value: scenario.fan2 ? 'Running' : 'Stopped', color: scenario.fan2 ? 'text-emerald-400' : 'text-slate-500' },
                { icon: Battery, label: 'Battery', value: `${scenario.battery}%`, color: scenario.battery > 50 ? 'text-emerald-400' : scenario.battery > 20 ? 'text-amber-400' : 'text-red-400' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="glass-card p-3 text-center">
                    <Icon size={18} className={`${item.color} mx-auto mb-1`} />
                    <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-white mb-4">Scenario Comparison</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={scenarios.map(s => ({ name: s.name.split(' ')[0], temp: s.temp, battery: s.battery }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: '8px', color: '#e2e8f0', fontSize: 12 }} />
                <Bar dataKey="temp" name="Temp °C" fill="#f97316" radius={[4,4,0,0]} />
                <Bar dataKey="battery" name="Battery %" fill="#10b981" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Performance Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Temperature vs Fan Response */}
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Temperature vs Fan Response</h3>
          <div className="text-xs text-amber-400 mb-3">⚠ Simulated data</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={testData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="t" tick={{ fill: '#64748b', fontSize: 10 }} label={{ value: 'Time (s)', fill: '#64748b', fontSize: 10, position: 'bottom' }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: '8px', color: '#e2e8f0', fontSize: 12 }} />
              <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" />
              <ReferenceLine y={25} stroke="#f59e0b" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="temp" name="Temp °C" stroke="#f97316" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="fan" name="Fan %" stroke="#1d9bf0" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Battery Consumption */}
        <div className="glass-card p-5">
          <h3 className="font-bold text-white mb-4">Battery Consumption</h3>
          <div className="text-xs text-amber-400 mb-3">⚠ Simulated data</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={testData}>
              <defs>
                <linearGradient id="battAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="t" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 10 }} unit="%" />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: '8px', color: '#e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="battery" name="Battery %" stroke="#10b981" strokeWidth={2} fill="url(#battAreaGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Results Cards */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-white mb-4">Test Results Summary</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Fan Response Time', result: 'TBC', status: 'info', desc: 'Time from temperature threshold to fan activation' },
            { title: 'Battery Life (Both Fans)', result: 'TBC', status: 'info', desc: 'Estimated runtime with both DC fans at full speed' },
            { title: 'Temperature Reduction', result: 'TBC °C', status: 'info', desc: 'Measured drop in perceived temperature from airflow' },
            { title: 'Auto Mode Logic', result: 'Working', status: 'pass', desc: 'Temperature-based fan activation at 25°C and 30°C thresholds' },
            { title: 'Manual Override', result: 'Working', status: 'pass', desc: 'User can control fans independently in manual mode' },
            { title: 'Safety Shutdown', result: 'Working', status: 'pass', desc: 'All fans stop when system is switched OFF' },
          ].map((item, i) => (
            <div key={i} className="p-4 glass-card">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-white">{item.title}</div>
                {item.status === 'pass' && <CheckCircle size={16} className="text-emerald-400" />}
                {item.status === 'info' && <AlertTriangle size={16} className="text-amber-400" />}
                {item.status === 'fail' && <XCircle size={16} className="text-red-400" />}
              </div>
              <div className={`text-lg font-bold font-mono mb-1 ${
                item.status === 'pass' ? 'text-emerald-400' :
                item.status === 'info' ? 'text-amber-400' : 'text-red-400'
              }`}>{item.result}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
