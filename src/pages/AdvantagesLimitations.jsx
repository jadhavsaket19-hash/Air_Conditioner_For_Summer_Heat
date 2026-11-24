import React from 'react';
import { ThumbsUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const advantages = [
  {
    icon: '🎒',
    title: 'Portable Cooling Solution',
    desc: 'The jacket provides personal cooling on the go. Unlike fixed AC units, it moves with the wearer and provides cooling wherever needed — perfect for outdoor activities, fieldwork, or commuting in hot conditions.',
  },
  {
    icon: '🎛️',
    title: 'Simple & User-Friendly',
    desc: 'The intuitive push-button ON/OFF control and automatic temperature-based operation make it extremely easy to use. No technical expertise required from the wearer.',
  },
  {
    icon: '💰',
    title: 'Low-Cost Construction',
    desc: 'Uses readily available, affordable components like DC fans, a standard lithium battery, and a basic temperature sensor. This makes the project accessible as a Makerspace build.',
  },
  {
    icon: '🔧',
    title: 'Easy to Operate & Maintain',
    desc: 'The system has minimal moving parts (only the fans). The rechargeable battery can be replaced easily, and individual components can be repaired or upgraded independently.',
  },
  {
    icon: '🏫',
    title: 'Practical Engineering Application',
    desc: 'This project demonstrates real-world application of electronics, IoT sensing, and wearable technology — providing valuable hands-on engineering learning experience.',
  },
  {
    icon: '♻️',
    title: 'Rechargeable Battery',
    desc: 'The 3.7V lithium ion battery is rechargeable, reducing operating costs and environmental impact compared to disposable battery solutions.',
  },
];

const limitations = [
  {
    icon: '🔋',
    title: 'Limited Battery Capacity',
    desc: 'The 3.7V lithium battery has limited capacity, restricting continuous operation time. High fan speeds drain the battery faster, limiting long-duration use.',
    severity: 'medium',
  },
  {
    icon: '🌡️',
    title: 'Cooling Requires Further Testing',
    desc: 'The actual cooling performance (temperature reduction achieved) has not been fully measured. The effectiveness may vary based on environmental conditions and jacket design.',
    severity: 'medium',
  },
  {
    icon: '💸',
    title: 'Limited Project Budget',
    desc: 'As a student Makerspace project, the available budget constrains component selection. Higher-quality components could improve performance but increase cost.',
    severity: 'low',
  },
  {
    icon: '🔨',
    title: 'Prototype Design Improvements',
    desc: 'The initial prototype may have ergonomic or structural issues that need refinement. Fan noise, vibration, and weight distribution may require improvement.',
    severity: 'medium',
  },
  {
    icon: '🌊',
    title: 'Limited Weather Resistance',
    desc: 'The electronics are not waterproofed in the prototype stage. Use in rain or high-humidity environments could damage components.',
    severity: 'high',
  },
  {
    icon: '📏',
    title: 'Single Size Prototype',
    desc: 'The current prototype is built to a fixed size. Adaptation for different body sizes and shapes requires additional design work.',
    severity: 'low',
  },
];

export default function AdvantagesLimitations() {
  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <ThumbsUp className="text-emerald-400" size={32} />
          Advantages & Limitations
        </h1>
        <p className="section-subtitle">Honest evaluation of the smart cooling jacket prototype</p>
      </div>

      {/* Advantages */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-emerald-500/20">
            <CheckCircle size={24} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Project Advantages</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((item, i) => (
            <div key={i} className="glass-card-hover p-5 group">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              <div className="mt-3 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Limitations */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-amber-500/20">
            <AlertCircle size={24} className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Current Limitations</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {limitations.map((item, i) => (
            <div key={i} className="glass-card-hover p-5 group border border-transparent hover:border-amber-500/20">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{item.icon}</div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                  item.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.severity === 'high' ? 'High Priority' :
                   item.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">Project Evaluation Summary</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="text-3xl font-bold text-emerald-400 mb-1">6</div>
            <div className="text-sm text-emerald-300 font-medium">Key Advantages</div>
            <div className="text-xs text-slate-400 mt-1">Strong foundation for a practical solution</div>
          </div>
          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <div className="text-3xl font-bold text-amber-400 mb-1">6</div>
            <div className="text-sm text-amber-300 font-medium">Known Limitations</div>
            <div className="text-xs text-slate-400 mt-1">Areas identified for future improvement</div>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="text-3xl font-bold text-blue-400 mb-1">V1</div>
            <div className="text-sm text-blue-300 font-medium">Prototype Stage</div>
            <div className="text-xs text-slate-400 mt-1">First iteration — room to grow</div>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-5 leading-relaxed">
          The Smart Wearable Air Cooling Jacket prototype demonstrates successful integration of electronics, IoT sensing, and wearable design. 
          While limitations exist as expected in a first prototype, the advantages make it a promising foundation for further development. 
          Identified limitations are well understood and can be addressed in subsequent versions.
        </p>
      </div>
    </div>
  );
}
