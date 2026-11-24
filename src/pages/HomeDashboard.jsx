import React from 'react';
import { Link } from 'react-router-dom';
import {
  Thermometer, Wind, Battery, Power, ChevronRight,
  Play, Presentation, Zap, Users, BookOpen, ArrowRight,
  Activity, Cpu
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const SummaryCard = ({ icon: Icon, label, value, sub, color, to }) => (
  <Link to={to} className="glass-card-hover p-5 group cursor-pointer block">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2.5 rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
    </div>
    <div className="text-2xl font-bold text-white font-mono mb-1">{value}</div>
    <div className="text-sm text-slate-400">{label}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </Link>
);

const TeamMemberBadge = ({ name, role }) => (
  <div className="flex items-center gap-2 glass-card px-3 py-2">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
      {name[0]}
    </div>
    <div>
      <div className="text-sm text-white font-medium">{name}</div>
      <div className="text-[10px] text-slate-400">{role}</div>
    </div>
  </div>
);

export default function HomeDashboard({ onPresentationMode }) {
  const { temperature, battery, fan1On, fan2On, systemOn, getTempStatus, startSimulation, isRunning } = useSimulation();
  const tempStatus = getTempStatus();

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-semibold">Makerspace Project 2024</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400">First Year Mechanical Engineering</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Smart Wearable<br />
                <span className="gradient-text">Air Cooling</span><br />
                Jacket
              </h1>

              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
                An IoT-enabled wearable cooling system using DC fans, temperature sensing, and intelligent control circuits — engineered for comfort in hot conditions.
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3 mb-8 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Cpu size={14} className="text-cyan-400" />
                  <span>Guide: <span className="text-cyan-400">Kiran Wakchaure Sir</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-cyan-400" />
                  <span><span className="text-cyan-400">4</span> Team Members</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-cyan-400" />
                  <span>3.7V Li-Ion Battery</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link to="/monitoring" className="btn-primary flex items-center gap-2">
                  <Activity size={18} />
                  Explore Project
                </Link>
                <button
                  onClick={() => { startSimulation(); window.location.hash = '/monitoring'; }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Play size={18} />
                  Launch Live Simulation
                </button>
                <Link to="/working-principle" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-medium transition-colors px-2">
                  <BookOpen size={16} />
                  Working Principle
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Jacket Illustration */}
            <div className="flex justify-center relative">
              <div className="relative animate-float">
                {/* Jacket SVG Illustration */}
                <div className="w-72 h-80 relative">
                  <svg viewBox="0 0 300 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d2447" />
                        <stop offset="100%" stopColor="#163060" />
                      </linearGradient>
                      <linearGradient id="fanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1d9bf0" />
                        <stop offset="100%" stopColor="#00d4ff" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>

                    {/* Jacket body */}
                    <path d="M60 60 L60 280 Q60 300 80 300 L220 300 Q240 300 240 280 L240 60" fill="url(#jacketGrad)" stroke="#1d9bf0" strokeWidth="1.5" strokeOpacity="0.4" />
                    {/* Collar */}
                    <path d="M60 60 Q80 20 120 30 L150 60 L180 30 Q220 20 240 60" fill="#0a1628" stroke="#1d9bf0" strokeWidth="1" strokeOpacity="0.5" />
                    {/* Left sleeve */}
                    <path d="M60 60 L10 160 Q5 190 25 200 L60 180 L60 60" fill="url(#jacketGrad)" stroke="#1d9bf0" strokeWidth="1" strokeOpacity="0.3" />
                    {/* Right sleeve */}
                    <path d="M240 60 L290 160 Q295 190 275 200 L240 180 L240 60" fill="url(#jacketGrad)" stroke="#1d9bf0" strokeWidth="1" strokeOpacity="0.3" />

                    {/* Center zip line */}
                    <line x1="150" y1="60" x2="150" y2="300" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="6 4" />

                    {/* Fan 1 - Left chest */}
                    <circle cx="105" cy="140" r="35" fill="#0a1628" stroke="#1d9bf0" strokeWidth="2" strokeOpacity="0.6" />
                    <g transform="rotate(0 105 140)" style={{ transformOrigin: '105px 140px', animation: 'spin 1.5s linear infinite' }}>
                      {[0,90,180,270].map((a,i) => (
                        <path key={i} d={`M105 140 Q${105+25*Math.cos((a-20)*Math.PI/180)} ${140+25*Math.sin((a-20)*Math.PI/180)} ${105+30*Math.cos(a*Math.PI/180)} ${140+30*Math.sin(a*Math.PI/180)} Q${105+25*Math.cos((a+20)*Math.PI/180)} ${140+25*Math.sin((a+20)*Math.PI/180)} 105 140 Z`}
                          fill="url(#fanGrad)" opacity="0.8" />
                      ))}
                    </g>
                    <circle cx="105" cy="140" r="8" fill="#1d9bf0" />
                    <circle cx="105" cy="140" r="4" fill="#00d4ff" />
                    <text x="105" y="190" textAnchor="middle" fill="#64748b" fontSize="9">FAN 1</text>

                    {/* Fan 2 - Right chest */}
                    <circle cx="195" cy="140" r="35" fill="#0a1628" stroke="#1d9bf0" strokeWidth="2" strokeOpacity="0.6" />
                    <g transform="rotate(0 195 140)" style={{ transformOrigin: '195px 140px', animation: 'spin 2s linear infinite' }}>
                      {[0,90,180,270].map((a,i) => (
                        <path key={i} d={`M195 140 Q${195+25*Math.cos((a-20)*Math.PI/180)} ${140+25*Math.sin((a-20)*Math.PI/180)} ${195+30*Math.cos(a*Math.PI/180)} ${140+30*Math.sin(a*Math.PI/180)} Q${195+25*Math.cos((a+20)*Math.PI/180)} ${140+25*Math.sin((a+20)*Math.PI/180)} 195 140 Z`}
                          fill="url(#fanGrad)" opacity="0.8" />
                      ))}
                    </g>
                    <circle cx="195" cy="140" r="8" fill="#1d9bf0" />
                    <circle cx="195" cy="140" r="4" fill="#00d4ff" />
                    <text x="195" y="190" textAnchor="middle" fill="#64748b" fontSize="9">FAN 2</text>

                    {/* Temperature sensor */}
                    <rect x="135" y="210" width="30" height="15" rx="3" fill="#0a1628" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="150" y="221" textAnchor="middle" fill="#f59e0b" fontSize="6">TEMP</text>
                    <line x1="150" y1="225" x2="150" y2="260" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" />

                    {/* Battery indicator */}
                    <rect x="60" y="250" width="40" height="22" rx="3" fill="#0a1628" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="100" y="257" width="4" height="8" rx="1" fill="#10b981" />
                    <rect x="63" y="253" width="30" height="16" rx="2" fill="#10b981" opacity="0.6" />
                    <text x="80" y="265" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">3.7V</text>

                    {/* Power button */}
                    <circle cx="210" cy="260" r="12" fill="#0a1628" stroke="#1d9bf0" strokeWidth="1.5" />
                    <path d="M210 251 L210 260" stroke="#1d9bf0" strokeWidth="2" strokeLinecap="round" />
                    <path d="M205 254 Q200 260 205 266 Q210 270 215 266 Q220 260 215 254" fill="none" stroke="#1d9bf0" strokeWidth="1.5" />

                    {/* Glow effects */}
                    <circle cx="105" cy="140" r="38" fill="none" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" filter="url(#glow)" />
                    <circle cx="195" cy="140" r="38" fill="none" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" filter="url(#glow)" />

                    {/* Air flow arrows */}
                    {[-30,0,30].map((offset, i) => (
                      <g key={i} opacity="0.4">
                        <path d={`M${105+offset} ${95+i*5} L${105+offset} ${75+i*5}`} stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        <path d={`M${195+offset} ${95+i*5} L${195+offset} ${75+i*5}`} stroke="#00d4ff" strokeWidth="1.5" />
                      </g>
                    ))}
                  </svg>

                  {/* Floating labels */}
                  <div className="absolute top-2 right-0 glass-card px-2 py-1 text-xs text-cyan-400 font-semibold">
                    DC Fan System
                  </div>
                  <div className="absolute bottom-10 left-0 glass-card px-2 py-1 text-xs text-emerald-400 font-semibold">
                    Li-Ion Battery
                  </div>
                  <div className="absolute bottom-10 right-0 glass-card px-2 py-1 text-xs text-blue-400 font-semibold">
                    Push Button
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">System Overview</h2>
          <p className="section-subtitle">Real-time status of the smart cooling jacket components</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <SummaryCard
            icon={Thermometer}
            label="Ambient Temperature"
            value={`${temperature.toFixed(1)}°C`}
            sub={getTempStatus().label + ' condition'}
            color="bg-gradient-to-br from-orange-500 to-red-500"
            to="/monitoring"
          />
          <SummaryCard
            icon={Wind}
            label="Fan Status"
            value={fan1On || fan2On ? (fan1On && fan2On ? 'Both ON' : 'One ON') : 'Standby'}
            sub={`Fan1: ${fan1On ? '●' : '○'} Fan2: ${fan2On ? '●' : '○'}`}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            to="/control"
          />
          <SummaryCard
            icon={Battery}
            label="Battery Level"
            value={`${battery.toFixed(0)}%`}
            sub="3.7V Lithium Ion"
            color="bg-gradient-to-br from-emerald-500 to-teal-500"
            to="/monitoring"
          />
          <SummaryCard
            icon={Power}
            label="Cooling System"
            value={systemOn ? 'ACTIVE' : 'STANDBY'}
            sub={systemOn ? 'System operational' : 'Press power to start'}
            color={systemOn ? "bg-gradient-to-br from-emerald-500 to-green-600" : "bg-gradient-to-br from-slate-600 to-slate-700"}
            to="/control"
          />
        </div>

        {/* Team Cards */}
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Project Team</h3>
              <p className="text-sm text-slate-400">First Year Mechanical Engineering · Makerspace</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {['Saket Jadhav', 'Vivek Adhav', 'Shubham Khatane', 'Om Rindhe'].map((name, i) => (
              <TeamMemberBadge key={i} name={name} role="Team Member" />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400 pt-4 border-t border-white/5">
            <span>🎓 Guide: <span className="text-cyan-400 font-medium">Kiran Wakchaure Sir</span></span>
            <span>🏛️ Dept: <span className="text-cyan-400 font-medium">First Year Mechanical Engineering</span></span>
            <span>📚 Course: <span className="text-cyan-400 font-medium">Makerspace</span></span>
          </div>
        </div>
      </section>

      {/* Quick Nav Sections */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="section-title text-center mb-10">Explore the Project</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { to: '/monitoring', icon: Activity, title: 'Live Monitoring', desc: 'Real-time temperature, fan speed, and battery monitoring with live charts.', color: 'from-blue-500 to-cyan-500' },
            { to: '/control', icon: Cpu, title: 'Control Panel', desc: 'Interactive controls for fans, cooling modes, and system settings.', color: 'from-purple-500 to-blue-500' },
            { to: '/working-principle', icon: BookOpen, title: 'Working Principle', desc: 'Animated flow diagrams showing how the cooling system works.', color: 'from-emerald-500 to-teal-500' },
            { to: '/components', icon: Zap, title: 'Components', desc: 'Detailed specifications of all hardware components used.', color: 'from-orange-500 to-red-500' },
            { to: '/performance', icon: Activity, title: 'Performance Testing', desc: 'Simulated test scenarios and performance evaluation graphs.', color: 'from-pink-500 to-rose-500' },
            { to: '/team', icon: Users, title: 'Team & Guide', desc: 'Meet the team and project guide information.', color: 'from-indigo-500 to-purple-500' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="glass-card-hover p-6 group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{item.desc}</p>
                <div className="flex items-center gap-1 text-cyan-400 text-sm font-medium">
                  <span>Explore</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
