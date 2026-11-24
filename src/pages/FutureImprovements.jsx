import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

const improvements = [
  {
    icon: '🧠',
    title: 'Smart Temperature Control',
    phase: 'V2.0',
    color: 'from-blue-500 to-cyan-500',
    current: 'Basic threshold-based ON/OFF control',
    improved: 'AI/ML-based predictive temperature management with PID control for precise fan speed adjustment based on body heat patterns',
    benefit: 'More efficient cooling with less battery consumption',
  },
  {
    icon: '🔋',
    title: 'Improved Battery Capacity',
    phase: 'V2.0',
    color: 'from-emerald-500 to-teal-500',
    current: 'Single 3.7V lithium battery with limited capacity',
    improved: 'High-capacity lithium polymer battery pack with solar charging panel integration on the jacket shoulders',
    benefit: 'Extended operation time throughout the day',
  },
  {
    icon: '❄️',
    title: 'Better Cooling Efficiency',
    phase: 'V2.0',
    color: 'from-sky-500 to-blue-500',
    current: 'Convective airflow cooling only',
    improved: 'Peltier thermoelectric module integration for active cooling, combined with optimized fan placement and airflow channels',
    benefit: 'Significantly lower perceived temperature',
  },
  {
    icon: '🪶',
    title: 'Lightweight Materials',
    phase: 'V3.0',
    color: 'from-purple-500 to-indigo-500',
    current: 'Standard jacket fabric with added electronics weight',
    improved: 'Ultra-lightweight carbon fiber composite housing, flexible PCBs, and high-performance technical fabrics designed for minimal weight',
    benefit: 'Improved wearability and comfort',
  },
  {
    icon: '📱',
    title: 'Mobile App & Connectivity',
    phase: 'V2.5',
    color: 'from-orange-500 to-red-500',
    current: 'Push-button physical control only',
    improved: 'Bluetooth/Wi-Fi connectivity with smartphone app for remote monitoring, scheduling, and control. Health data integration',
    benefit: 'Convenient wireless control and monitoring',
  },
  {
    icon: '📊',
    title: 'Advanced Monitoring',
    phase: 'V2.5',
    color: 'from-pink-500 to-rose-500',
    current: 'Basic ambient temperature monitoring',
    improved: 'Multi-point body temperature sensors, humidity sensing, UV index monitoring, and real-time health analytics dashboard',
    benefit: 'Comprehensive environmental awareness',
  },
  {
    icon: '🏃',
    title: 'Improved Ergonomics',
    phase: 'V3.0',
    color: 'from-indigo-500 to-purple-500',
    current: 'Single size prototype design',
    improved: 'Adjustable modular design with multiple size variants, flexible electronics placement, and sports-performance fit',
    benefit: 'Universal fit for all body types',
  },
  {
    icon: '🛡️',
    title: 'Weather Resistance',
    phase: 'V2.0',
    color: 'from-slate-500 to-gray-500',
    current: 'No waterproofing — indoor use only',
    improved: 'IP65-rated waterproof electronics enclosures, water-resistant fabric coating, and sealed connectors for outdoor use',
    benefit: 'All-weather reliable operation',
  },
];

const roadmapPhases = [
  { phase: 'V1.0', label: 'Current Prototype', color: 'bg-blue-500', items: ['Basic DC fans', '3.7V battery', 'Push button control', 'Temperature sensor'] },
  { phase: 'V2.0', label: 'Near Future', color: 'bg-cyan-500', items: ['Smart control', 'Better battery', 'Waterproofing', 'Peltier cooling'] },
  { phase: 'V2.5', label: 'Mid Future', color: 'bg-purple-500', items: ['Mobile app', 'Bluetooth', 'Advanced sensors', 'Health monitoring'] },
  { phase: 'V3.0', label: 'Long Term', color: 'bg-pink-500', items: ['Lightweight materials', 'AI control', 'Multi-size', 'Solar charging'] },
];

export default function FutureImprovements() {
  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <Lightbulb className="text-yellow-400" size={32} />
          Future Improvements
        </h1>
        <p className="section-subtitle">Vision for the next generation of smart cooling technology</p>
      </div>

      {/* Roadmap */}
      <div className="glass-card p-6 mb-10">
        <h3 className="text-lg font-bold text-white mb-5">Development Roadmap</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {roadmapPhases.map((p, i) => (
            <div key={p.phase} className="relative">
              {i < roadmapPhases.length - 1 && (
                <div className="absolute top-6 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden md:block" style={{ right: '-50%', width: '100%', zIndex: 0 }} />
              )}
              <div className="relative z-10 text-center">
                <div className={`w-12 h-12 ${p.color} rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2`}>
                  {p.phase}
                </div>
                <div className="text-sm font-bold text-white mb-3">{p.label}</div>
                <div className="space-y-1">
                  {p.items.map((item, j) => (
                    <div key={j} className="text-xs text-slate-400 glass-card py-1 px-2 rounded-lg">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {improvements.map((item, i) => (
          <div key={i} className="glass-card-hover p-5 group">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20 text-white/80 font-mono`}>
                    {item.phase}
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="text-xs">
                    <span className="text-slate-500 font-medium">Current: </span>
                    <span className="text-slate-400">{item.current}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <ArrowRight size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <span className="text-cyan-300 font-medium">Improved: </span>
                      <span className="text-slate-300">{item.improved}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <span className="text-xs text-emerald-400">✅ Benefit: {item.benefit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
