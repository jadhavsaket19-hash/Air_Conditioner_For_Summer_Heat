import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Activity, Settings2, Cpu, Package, Wrench,
  BarChart3, ThumbsUp, Lightbulb, Users, X, Wind
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home Dashboard', icon: Home },
  { path: '/monitoring', label: 'Live Monitoring', icon: Activity },
  { path: '/control', label: 'Control Panel', icon: Settings2 },
  { path: '/working-principle', label: 'Working Principle', icon: Cpu },
  { path: '/components', label: 'Components', icon: Package },
  { path: '/assembly', label: 'Assembly Process', icon: Wrench },
  { path: '/performance', label: 'Performance Testing', icon: BarChart3 },
  { path: '/advantages', label: 'Advantages & Limits', icon: ThumbsUp },
  { path: '/future', label: 'Future Improvements', icon: Lightbulb },
  { path: '/team', label: 'Team & Info', icon: Users },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar-glass fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Wind size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">CoolJacket</div>
              <div className="text-[10px] text-cyan-400">Makerspace Project</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-full pb-20">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-cyan-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-cyan-400' : ''} />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="text-xs text-slate-500 text-center">
            First Year Mechanical Engineering<br />
            <span className="text-cyan-500">Makerspace 2024</span>
          </div>
        </div>
      </aside>
    </>
  );
}
