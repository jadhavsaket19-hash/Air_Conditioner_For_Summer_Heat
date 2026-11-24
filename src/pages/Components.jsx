import React, { useState } from 'react';
import { Package, Info, ChevronDown, ChevronUp } from 'lucide-react';

const components = [
  {
    id: 1,
    name: 'DC Cooling Fan',
    emoji: '🌀',
    count: '× 2 units',
    color: 'from-blue-500 to-cyan-500',
    purpose: 'Provide continuous airflow to cool the wearer\'s body.',
    specs: [
      { label: 'Type', value: 'DC Brushless Fan' },
      { label: 'Quantity', value: '2 (Dual-fan system)' },
      { label: 'Voltage', value: 'TBC (To Be Confirmed)' },
      { label: 'Current', value: 'TBC' },
      { label: 'Size', value: 'TBC' },
    ],
    working: 'The DC fans are powered by the control circuit when cooling is required. They draw ambient air and force it through the jacket structure, creating a cooling airflow across the wearer\'s body. Having two fans ensures even air distribution and redundancy.',
    role: 'Primary cooling actuator',
  },
  {
    id: 2,
    name: '3.7V Lithium Battery',
    emoji: '🔋',
    count: 'Power Source',
    color: 'from-emerald-500 to-teal-500',
    purpose: 'Provides portable, rechargeable electrical power to the entire system.',
    specs: [
      { label: 'Voltage', value: '3.7V (Nominal)' },
      { label: 'Chemistry', value: 'Lithium Ion (Li-Ion)' },
      { label: 'Capacity', value: 'TBC (mAh)' },
      { label: 'Recharge', value: 'Yes (Rechargeable)' },
      { label: 'Weight', value: 'Lightweight' },
    ],
    working: 'The lithium battery serves as the portable power source, allowing the jacket to operate without external power. It supplies stable 3.7V to the control circuit, which distributes power to the fans and sensor. Battery level depletes during operation, particularly when both fans are running.',
    role: 'Energy storage and power supply',
  },
  {
    id: 3,
    name: 'Temperature Sensor',
    emoji: '🌡️',
    count: '× 1 unit',
    color: 'from-orange-500 to-red-500',
    purpose: 'Continuously measures surrounding ambient temperature.',
    specs: [
      { label: 'Type', value: 'TBC (NTC/DHT/LM35)' },
      { label: 'Range', value: 'TBC °C' },
      { label: 'Interface', value: 'Analog/Digital (TBC)' },
      { label: 'Accuracy', value: 'TBC' },
      { label: 'Response', value: 'Real-time' },
    ],
    working: 'The temperature sensor is placed on the jacket to monitor ambient heat conditions. It continuously sends temperature data to the control circuit. When the temperature crosses defined thresholds (25°C and 30°C), the control circuit responds by activating or deactivating the fans.',
    role: 'Environmental sensing and feedback',
  },
  {
    id: 4,
    name: 'Push Button Switch',
    emoji: '🔘',
    count: '× 1 unit',
    color: 'from-purple-500 to-indigo-500',
    purpose: 'Provides manual ON/OFF control for the entire system.',
    specs: [
      { label: 'Type', value: 'Momentary Push Button' },
      { label: 'Function', value: 'System Power Toggle' },
      { label: 'Rating', value: 'TBC (V/A)' },
      { label: 'Mount', value: 'Jacket exterior panel' },
      { label: 'Feedback', value: 'TBC (LED indicator)' },
    ],
    working: 'The push button allows the wearer to quickly turn the entire system ON or OFF. When pressed, it signals the control circuit to either start or stop all operations. This includes cutting power to both fans when switched OFF, ensuring safety and battery conservation.',
    role: 'User interface and system control',
  },
  {
    id: 5,
    name: 'Cooling Component',
    emoji: '❄️',
    count: 'Support Unit',
    color: 'from-sky-500 to-blue-500',
    purpose: 'Supports the cooling process for enhanced temperature reduction.',
    specs: [
      { label: 'Type', value: 'TBC (Peltier/Heatsink)' },
      { label: 'Function', value: 'Active/Passive Cooling' },
      { label: 'Voltage', value: 'TBC' },
      { label: 'Efficiency', value: 'TBC' },
      { label: 'Placement', value: 'TBC (jacket interior)' },
    ],
    working: 'The cooling component works alongside the DC fans to enhance the overall cooling effect. It may work passively (as a heat sink to dissipate heat) or actively (using thermoelectric cooling). The exact specifications and type are to be confirmed during the final prototype development.',
    role: 'Enhanced cooling support',
  },
  {
    id: 6,
    name: 'Jacket Fabric',
    emoji: '👕',
    count: 'Structural Base',
    color: 'from-slate-500 to-gray-500',
    purpose: 'Provides a lightweight, breathable wearable structure for all components.',
    specs: [
      { label: 'Material', value: 'TBC (Mesh/Nylon blend)' },
      { label: 'Weight', value: 'Lightweight' },
      { label: 'Breathability', value: 'High' },
      { label: 'Size', value: 'Standard (adjustable)' },
      { label: 'Durability', value: 'TBC' },
    ],
    working: 'The jacket fabric serves as the mounting platform and enclosure for all electronic and mechanical components. It is designed to be lightweight and breathable to allow maximum airflow while securely holding the fans, battery, sensor, and control electronics in designated pockets and mounts.',
    role: 'Wearable housing and structure',
  },
];

export default function Components() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <Package className="text-orange-400" size={32} />
          Components & Specifications
        </h1>
        <p className="section-subtitle">Detailed overview of all hardware components</p>
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-amber-400">
          <Info size={14} />
          Specifications marked "TBC" are To Be Confirmed during final prototype
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map(comp => (
          <div
            key={comp.id}
            className="glass-card overflow-hidden group hover:border-white/20 border border-white/10 rounded-2xl transition-all duration-300"
          >
            {/* Header */}
            <div className={`bg-gradient-to-br ${comp.color} p-6 relative overflow-hidden`}>
              <div className="absolute top-2 right-2 text-xs bg-black/20 text-white px-2 py-1 rounded-full">
                {comp.count}
              </div>
              <div className="text-5xl mb-3">{comp.emoji}</div>
              <h3 className="text-lg font-bold text-white">{comp.name}</h3>
              <div className="text-sm text-white/80 mt-1">{comp.role}</div>
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-sm text-slate-300 mb-4">{comp.purpose}</p>

              {/* Specs */}
              <div className="space-y-2 mb-4">
                {comp.specs.slice(0, 3).map(spec => (
                  <div key={spec.label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{spec.label}</span>
                    <span className={`font-medium ${spec.value.includes('TBC') ? 'text-amber-400' : 'text-cyan-400'}`}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expandable */}
              <button
                className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-cyan-400 transition-colors mt-2 py-2 border-t border-white/5"
                onClick={() => setExpanded(expanded === comp.id ? null : comp.id)}
              >
                <span>More details</span>
                {expanded === comp.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {expanded === comp.id && (
                <div className="mt-3 space-y-3">
                  {comp.specs.slice(3).map(spec => (
                    <div key={spec.label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{spec.label}</span>
                      <span className={`font-medium ${spec.value.includes('TBC') ? 'text-amber-400' : 'text-cyan-400'}`}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="text-xs font-semibold text-slate-300 mb-1">Working Role:</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{comp.working}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* System summary */}
      <div className="mt-10 glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">System Component Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {components.map(c => (
            <div key={c.id} className="text-center p-3 rounded-xl bg-white/5">
              <div className="text-3xl mb-1">{c.emoji}</div>
              <div className="text-xs text-slate-300 font-medium">{c.name.split(' ').slice(0,2).join(' ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
