import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Wind, Menu, Presentation, Clock, Activity,
  ChevronRight, Zap
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/monitoring', label: 'Live Monitor' },
  { path: '/control', label: 'Control Panel' },
  { path: '/working-principle', label: 'Working Principle' },
  { path: '/components', label: 'Components' },
  { path: '/performance', label: 'Performance' },
  { path: '/team', label: 'Team' },
];

export default function Navbar({ onMenuClick, onPresentationMode }) {
  const location = useLocation();
  const { temperature, battery, systemOn, isRunning, getTempStatus } = useSimulation();
  const [time, setTime] = useState(new Date());
  const tempStatus = getTempStatus();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="navbar-glass fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all lg:hidden"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/40 transition-all">
              <Wind size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white leading-tight">CoolJacket</div>
              <div className="text-[10px] text-cyan-400 leading-tight">Smart Cooling System</div>
            </div>
          </Link>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-blue-600/20 text-cyan-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Status + Presentation */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Live indicators */}
          <div className="hidden md:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 glass-card px-3 py-1.5">
              <span style={{ color: tempStatus.color }} className="font-mono font-bold">
                {temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="flex items-center gap-1.5 glass-card px-3 py-1.5">
              <Zap size={12} className={battery > 20 ? 'text-emerald-400' : 'text-red-400'} />
              <span className="text-slate-300 font-mono">{battery.toFixed(0)}%</span>
            </div>
            {isRunning && (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">LIVE</span>
              </div>
            )}
          </div>

          {/* Clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={12} />
            <span className="font-mono">{time.toLocaleTimeString()}</span>
          </div>

          {/* Presentation Mode */}
          <button
            onClick={onPresentationMode}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
          >
            <Presentation size={14} />
            <span className="hidden sm:inline">Present</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
