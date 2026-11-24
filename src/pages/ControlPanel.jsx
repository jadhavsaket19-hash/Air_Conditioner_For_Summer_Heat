import React from 'react';
import { Settings2, Power, Wind, Thermometer, AlertTriangle, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import FanIcon from '../components/ui/FanIcon';

const ToggleSwitch = ({ isOn, onToggle, disabled = false, label, description }) => (
  <div className={`flex items-center justify-between p-4 glass-card-hover rounded-xl cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={!disabled ? onToggle : undefined}>
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isOn ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
        {isOn ? <ToggleRight size={18} className="text-emerald-400" /> : <ToggleLeft size={18} className="text-slate-400" />}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        {description && <div className="text-xs text-slate-400">{description}</div>}
      </div>
    </div>
    <div className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-300 ${isOn ? 'bg-emerald-500' : 'bg-slate-600'}`}>
      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  </div>
);

export default function ControlPanel() {
  const {
    systemOn, fan1On, fan2On, fan1Speed, fan2Speed,
    mode, targetTemp, manualFanSpeed,
    toggleSystem, toggleFan1, toggleFan2,
    setMode, setTargetTemp, setManualFanSpeed,
    isRunning, startSimulation, temperature,
  } = useSimulation();

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings2 className="text-purple-400" size={28} />
          Interactive Control Panel
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <AlertTriangle size={14} className="text-amber-400" />
          <p className="text-amber-400 text-sm">Simulated demonstration only — not connected to actual hardware</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Power + Mode */}
        <div className="space-y-4">
          {/* Main Power */}
          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
              <Power size={18} className="text-cyan-400" />Main System Control
            </h3>
            <div className="flex flex-col items-center gap-4">
              {/* Big power button */}
              <button
                onClick={toggleSystem}
                className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                  systemOn
                    ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30 scale-105'
                    : 'border-slate-600 bg-slate-700/30 hover:border-blue-500 hover:bg-blue-500/10'
                }`}
              >
                <Power
                  size={36}
                  className={`transition-colors duration-300 ${systemOn ? 'text-emerald-400' : 'text-slate-400'}`}
                />
              </button>
              <div className="text-center">
                <div className={`text-lg font-bold ${systemOn ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {systemOn ? 'SYSTEM ON' : 'SYSTEM OFF'}
                </div>
                <div className="text-xs text-slate-500">Press to toggle power</div>
              </div>
            </div>

            {!isRunning && (
              <button onClick={startSimulation} className="w-full mt-4 btn-primary text-sm py-2.5">
                Start Simulation First
              </button>
            )}
          </div>

          {/* Mode Selection */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={18} className="text-yellow-400" />Operating Mode
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('auto')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-semibold ${
                  mode === 'auto'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-400'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div className="text-2xl mb-1">🤖</div>
                <div>Automatic</div>
                <div className="text-xs font-normal text-slate-500 mt-1">Temp-based control</div>
              </button>
              <button
                onClick={() => setMode('manual')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-semibold ${
                  mode === 'manual'
                    ? 'border-purple-500 bg-purple-500/15 text-purple-400'
                    : 'border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <div className="text-2xl mb-1">🕹️</div>
                <div>Manual</div>
                <div className="text-xs font-normal text-slate-500 mt-1">Direct fan control</div>
              </button>
            </div>

            {mode === 'auto' && (
              <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs text-cyan-300">
                <div className="font-semibold mb-1">Auto Mode Logic:</div>
                <div className="space-y-1 text-slate-400">
                  <div>• Temp &gt; 30°C → Both fans ON</div>
                  <div>• Temp &lt; 25°C → Both fans OFF</div>
                  <div>• 25–30°C → Maintain current state</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fan Controls */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
              <Wind size={18} className="text-blue-400" />Fan Controls
            </h3>

            {/* Fan 1 */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FanIcon isOn={fan1On} speed={fan1Speed} size={48} />
                  <div>
                    <div className="text-sm font-bold text-white">Fan 1</div>
                    <div className={`text-xs ${fan1On ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {fan1On ? `Running at ${fan1Speed.toFixed(0)}%` : 'Stopped'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleFan1}
                  disabled={!systemOn || mode === 'auto'}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    fan1On
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'border-slate-600 text-slate-400 hover:border-blue-500'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {fan1On ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${fan1On ? fan1Speed : 0}%` }} />
              </div>
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Fan 2 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FanIcon isOn={fan2On} speed={fan2Speed} size={48} />
                  <div>
                    <div className="text-sm font-bold text-white">Fan 2</div>
                    <div className={`text-xs ${fan2On ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {fan2On ? `Running at ${fan2Speed.toFixed(0)}%` : 'Stopped'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleFan2}
                  disabled={!systemOn || mode === 'auto'}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    fan2On
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'border-slate-600 text-slate-400 hover:border-blue-500'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {fan2On ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${fan2On ? fan2Speed : 0}%` }} />
              </div>
            </div>

            {mode === 'auto' && (
              <div className="mt-4 text-xs text-amber-400 text-center">
                Fan buttons disabled in Auto mode
              </div>
            )}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          {/* Temperature Slider */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Thermometer size={18} className="text-orange-400" />Temperature Simulation
            </h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold font-mono text-orange-400">{targetTemp}°C</div>
              <div className="text-xs text-slate-400">Simulated ambient temperature target</div>
              <div className="text-xs text-slate-500 mt-1">Actual: <span className="text-white font-mono">{temperature.toFixed(1)}°C</span></div>
            </div>
            <input
              type="range"
              min="18"
              max="42"
              value={targetTemp}
              onChange={e => setTargetTemp(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #f97316 ${((targetTemp-18)/(42-18))*100}%, #1e293b ${((targetTemp-18)/(42-18))*100}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>18°C</span>
              <span>42°C</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[22, 28, 35].map(t => (
                <button
                  key={t}
                  onClick={() => setTargetTemp(t)}
                  className={`text-xs py-2 rounded-lg border transition-all ${
                    targetTemp === t ? 'border-orange-500 bg-orange-500/20 text-orange-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {t}°C {t < 25 ? '❄️' : t < 30 ? '🌤' : '🔥'}
                </button>
              ))}
            </div>
          </div>

          {/* Fan Speed Slider */}
          <div className="glass-card p-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Wind size={18} className="text-cyan-400" />Manual Fan Speed
              {mode === 'auto' && <span className="text-xs text-slate-500">(Auto mode active)</span>}
            </h3>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold font-mono text-cyan-400">{manualFanSpeed}%</div>
              <div className="text-xs text-slate-400">Fan speed when in Manual mode</div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={manualFanSpeed}
              onChange={e => setManualFanSpeed(Number(e.target.value))}
              disabled={mode === 'auto'}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #1d9bf0 ${manualFanSpeed}%, #1e293b ${manualFanSpeed}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[25, 50, 100].map(s => (
                <button
                  key={s}
                  onClick={() => setManualFanSpeed(s)}
                  disabled={mode === 'auto'}
                  className={`text-xs py-2 rounded-lg border transition-all disabled:opacity-40 ${
                    manualFanSpeed === s ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {s}% {s <= 25 ? '🌬' : s <= 50 ? '💨' : '🌪'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logic description */}
      <div className="mt-6 glass-card p-5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />Control Logic Summary
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-emerald-400 font-semibold mb-1">Auto Mode — Cool</div>
            <div className="text-slate-400 text-xs">When temp &lt; 25°C, both fans automatically stop to conserve battery.</div>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="text-amber-400 font-semibold mb-1">Auto Mode — Maintain</div>
            <div className="text-slate-400 text-xs">When temp is 25–30°C, fans maintain their previous ON/OFF state.</div>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="text-red-400 font-semibold mb-1">Auto Mode — Hot</div>
            <div className="text-slate-400 text-xs">When temp &gt; 30°C, both fans activate automatically for maximum cooling.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
