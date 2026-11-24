import React, { useState } from 'react';
import {
  X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw,
  Wind, Battery, Thermometer, Power, Users, Cpu, Package, BarChart3, Lightbulb
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import FanIcon from '../components/ui/FanIcon';
import TempGauge from '../components/ui/TempGauge';
import BatteryIndicator from '../components/ui/BatteryIndicator';

const slides = [
  {
    id: 'title',
    title: 'Smart Wearable Air Cooling Jacket',
    type: 'title',
  },
  {
    id: 'overview',
    title: 'Project Overview',
    type: 'overview',
  },
  {
    id: 'components',
    title: 'System Components',
    type: 'components',
  },
  {
    id: 'working',
    title: 'Working Principle',
    type: 'working',
  },
  {
    id: 'simulation',
    title: 'Live Simulation Demo',
    type: 'simulation',
  },
  {
    id: 'advantages',
    title: 'Advantages & Applications',
    type: 'advantages',
  },
  {
    id: 'team',
    title: 'Team & Guide',
    type: 'team',
  },
  {
    id: 'thankyou',
    title: 'Thank You',
    type: 'thankyou',
  },
];

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="mb-6 animate-float">
        <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/40">
          <Wind size={64} className="text-white" />
        </div>
      </div>
      <div className="inline-flex items-center gap-2 glass-card px-5 py-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-sm text-emerald-400 font-semibold">Makerspace Project 2024</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
        Smart Wearable<br />
        <span className="gradient-text">Air Cooling Jacket</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-8">
        An IoT-enabled personal cooling solution using DC fans, temperature sensing, and intelligent control circuits
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="glass-card px-4 py-2 text-cyan-400">First Year Mechanical Engineering</div>
        <div className="glass-card px-4 py-2 text-purple-400">Makerspace Course</div>
        <div className="glass-card px-4 py-2 text-emerald-400">Guide: Kiran Wakchaure Sir</div>
      </div>
    </div>
  );
}

function OverviewSlide() {
  return (
    <div className="px-8 py-6 h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Project Overview</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">🎯 Problem Statement</h3>
          <p className="text-slate-300 leading-relaxed">
            Hot summer conditions cause discomfort and heat stress. Traditional cooling solutions (AC, fans) are fixed and not portable. Workers, athletes, and outdoor enthusiasts need a mobile personal cooling solution.
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">💡 Our Solution</h3>
          <p className="text-slate-300 leading-relaxed">
            A smart wearable jacket with integrated DC cooling fans, temperature sensing, and automatic/manual control — providing personalized cooling wherever you go.
          </p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">⚙️ Key Features</h3>
          <ul className="space-y-2 text-slate-300">
            {['Dual DC cooling fans', 'Temperature-based auto control', '3.7V rechargeable battery', 'Manual override mode', 'Lightweight wearable design'].map((f, i) => (
              <li key={i} className="flex items-center gap-2"><span className="text-cyan-400">→</span>{f}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">📊 Project Scope</h3>
          <div className="space-y-3">
            {[
              { label: 'Type', val: 'Wearable IoT Device' },
              { label: 'Stage', val: 'Working Prototype' },
              { label: 'Power', val: '3.7V Li-Ion Battery' },
              { label: 'Fans', val: '2× DC Cooling Fans' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-slate-400">{item.label}</span>
                <span className="text-white font-medium">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentsSlide() {
  const comps = [
    { emoji: '🌀', name: 'DC Fans', desc: '2× cooling fans for airflow', color: 'from-blue-500 to-cyan-500' },
    { emoji: '🔋', name: '3.7V Battery', desc: 'Li-Ion portable power', color: 'from-emerald-500 to-teal-500' },
    { emoji: '🌡️', name: 'Temp Sensor', desc: 'Ambient temperature monitoring', color: 'from-orange-500 to-red-500' },
    { emoji: '🔘', name: 'Push Button', desc: 'ON/OFF system control', color: 'from-purple-500 to-indigo-500' },
    { emoji: '❄️', name: 'Cooling Unit', desc: 'Enhanced cooling support', color: 'from-sky-500 to-blue-500' },
    { emoji: '👕', name: 'Jacket', desc: 'Wearable structure', color: 'from-slate-500 to-gray-600' },
  ];
  return (
    <div className="px-8 py-6 h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">System Components</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {comps.map((c, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-4xl mb-3`}>
              {c.emoji}
            </div>
            <div className="text-base font-bold text-white mb-1">{c.name}</div>
            <div className="text-sm text-slate-400">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkingSlide() {
  const steps = [
    { icon: '🌡️', label: 'Temperature Sensor' },
    { icon: '📊', label: 'Detection' },
    { icon: '⚡', label: 'Control Circuit' },
    { icon: '🌀', label: 'Fan Activation' },
    { icon: '💨', label: 'Air Circulation' },
    { icon: '❄️', label: 'Cooling Effect' },
  ];
  return (
    <div className="px-8 py-6 h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Working Principle</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="glass-card p-4 text-center min-w-[100px]">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-xs text-white font-medium">{s.label}</div>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight size={20} className="text-cyan-400 flex-shrink-0 rotate-0 md:rotate-0 my-1" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Below 25°C', desc: 'Fans remain OFF. Normal condition, no cooling needed.', color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' },
          { title: '25°C – 30°C', desc: 'Fans maintain previous state. Moderate condition.', color: 'bg-amber-500/20 border-amber-500/30 text-amber-400' },
          { title: 'Above 30°C', desc: 'Both fans activate automatically. Full cooling mode.', color: 'bg-red-500/20 border-red-500/30 text-red-400' },
        ].map((item, i) => (
          <div key={i} className={`p-4 rounded-xl border ${item.color}`}>
            <div className="font-bold mb-1">{item.title}</div>
            <div className="text-sm text-slate-300">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulationSlide() {
  const { temperature, fan1On, fan2On, fan1Speed, fan2Speed, battery, systemOn,
    toggleSystem, toggleFan1, toggleFan2, startSimulation, stopSimulation, isRunning, getTempStatus } = useSimulation();
  const tempStatus = getTempStatus();

  return (
    <div className="px-8 py-6 h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-6 text-center">Live Simulation Demo</h2>
      <div className="text-center text-xs text-amber-400 mb-5">⚠ Simulated demonstration — not actual hardware</div>

      <div className="grid md:grid-cols-3 gap-6 items-center">
        {/* Temp */}
        <div className="glass-card p-5 text-center">
          <Thermometer className="mx-auto mb-2 text-orange-400" size={24} />
          <TempGauge temperature={temperature} />
          <div className={`mt-2 text-sm px-3 py-1 rounded-full inline-block ${tempStatus.bg}`}>{tempStatus.label}</div>
        </div>

        {/* Fans + Controls */}
        <div className="glass-card p-5 text-center">
          <div className="flex justify-around mb-4">
            <div>
              <FanIcon isOn={fan1On} speed={fan1Speed} size={64} />
              <div className="text-xs text-slate-400 mt-1">Fan 1</div>
              <button onClick={toggleFan1} disabled={!systemOn}
                className={`mt-1 text-xs px-3 py-1 rounded-lg border ${fan1On ? 'border-emerald-500 text-emerald-400' : 'border-slate-600 text-slate-400'} disabled:opacity-40`}>
                {fan1On ? 'ON' : 'OFF'}
              </button>
            </div>
            <div>
              <FanIcon isOn={fan2On} speed={fan2Speed} size={64} />
              <div className="text-xs text-slate-400 mt-1">Fan 2</div>
              <button onClick={toggleFan2} disabled={!systemOn}
                className={`mt-1 text-xs px-3 py-1 rounded-lg border ${fan2On ? 'border-emerald-500 text-emerald-400' : 'border-slate-600 text-slate-400'} disabled:opacity-40`}>
                {fan2On ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={toggleSystem}
              className={`w-full py-2 rounded-xl border-2 font-bold text-sm transition-all ${systemOn ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 'border-slate-600 text-slate-400'}`}>
              <Power size={14} className="inline mr-1" />System {systemOn ? 'ON' : 'OFF'}
            </button>
            {!isRunning
              ? <button onClick={startSimulation} className="btn-primary text-sm py-2"><Play size={14} className="inline mr-1" />Start Simulation</button>
              : <button onClick={stopSimulation} className="btn-secondary text-sm py-2"><Pause size={14} className="inline mr-1" />Pause</button>
            }
          </div>
        </div>

        {/* Battery */}
        <div className="glass-card p-5">
          <Battery className="mx-auto mb-2 text-emerald-400" size={24} />
          <BatteryIndicator percentage={battery} voltage={3.7} />
        </div>
      </div>
    </div>
  );
}

function AdvantagesSlide() {
  const items = [
    { icon: '🎒', title: 'Portable', desc: 'Cooling anywhere, anytime' },
    { icon: '💰', title: 'Low Cost', desc: 'Affordable components' },
    { icon: '🎛️', title: 'Simple', desc: 'Easy to operate' },
    { icon: '🔧', title: 'Maintainable', desc: 'Easy to repair' },
    { icon: '🏫', title: 'Educational', desc: 'Real engineering application' },
    { icon: '♻️', title: 'Rechargeable', desc: 'Eco-friendly power' },
  ];
  return (
    <div className="px-8 py-6 h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Advantages & Applications</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {items.map((item, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-sm font-bold text-white mb-1">{item.title}</div>
            <div className="text-xs text-slate-400">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-5">
        <h3 className="font-bold text-cyan-400 mb-3">Potential Applications</h3>
        <div className="flex flex-wrap gap-2">
          {['Outdoor Workers', 'Athletes & Sports', 'Farmers', 'Construction Sites', 'Delivery Personnel', 'Military Personnel', 'Hikers & Trekkers', 'Industrial Workers'].map((app, i) => (
            <span key={i} className="text-xs bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full">{app}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSlide() {
  const members = ['Saket Jadhav', 'Vivek Adhav', 'Shubham Khatane', 'Om Rindhe'];
  const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500', 'from-emerald-500 to-teal-500'];
  const emojis = ['👨‍🔬', '👨‍💻', '👨‍🔧', '👨‍🎓'];
  return (
    <div className="px-8 py-6 h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Our Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
        {members.map((name, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${colors[i]} flex items-center justify-center text-5xl mb-3`}>
              {emojis[i]}
            </div>
            <div className="text-sm font-bold text-white">{name}</div>
            <div className="text-xs text-slate-400 mt-1">Team Member</div>
          </div>
        ))}
      </div>
      <div className="glass-card p-5 text-center">
        <div className="text-5xl mb-3">👨‍🏫</div>
        <div className="text-xl font-bold text-white">Kiran Wakchaure Sir</div>
        <div className="text-cyan-400">Project Guide · Makerspace Course</div>
        <div className="text-slate-400 text-sm mt-2">First Year Mechanical Engineering</div>
      </div>
    </div>
  );
}

function ThankYouSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="text-8xl mb-6 animate-bounce">🙏</div>
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Thank You!</h1>
      <div className="gradient-text text-3xl font-bold mb-8">Smart Wearable Air Cooling Jacket</div>
      <p className="text-xl text-slate-400 max-w-2xl mb-8">
        We hope this project demonstrates the potential of wearable IoT technology for personal cooling solutions.
      </p>
      <div className="grid grid-cols-3 gap-6 max-w-lg">
        {[
          { emoji: '❓', label: 'Questions?' },
          { emoji: '💬', label: 'Feedback?' },
          { emoji: '🤝', label: 'Collaborate?' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-sm text-slate-300">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-sm text-slate-500">
        First Year Mechanical Engineering · Makerspace 2024 · Guide: Kiran Wakchaure Sir
      </div>
    </div>
  );
}

const slideComponents = {
  title: TitleSlide,
  overview: OverviewSlide,
  components: ComponentsSlide,
  working: WorkingSlide,
  simulation: SimulationSlide,
  advantages: AdvantagesSlide,
  team: TeamSlide,
  thankyou: ThankYouSlide,
};

export default function PresentationMode({ onExit }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(Math.max(0, current - 1));
  const next = () => setCurrent(Math.min(slides.length - 1, current + 1));

  const slide = slides[current];
  const SlideComponent = slideComponents[slide.type];

  return (
    <div className="fixed inset-0 bg-[#020818] z-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Wind size={20} className="text-cyan-400" />
          <span className="text-sm font-bold text-white">CoolJacket · Presentation Mode</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Slide dots */}
          <div className="hidden sm:flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2 bg-cyan-400' : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-mono">{current + 1}/{slides.length}</span>
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="presentation-slide h-full overflow-y-auto">
          <SlideComponent />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 flex-shrink-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 btn-secondary text-sm py-2 px-4 disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="text-center">
          <div className="text-sm font-bold text-white">{slide.title}</div>
          <div className="text-xs text-slate-500">Slide {current + 1} of {slides.length}</div>
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 btn-primary text-sm py-2 px-4 disabled:opacity-30"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
