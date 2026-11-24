import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: '🌡️',
    title: 'Temperature Sensor',
    color: 'from-orange-500 to-red-500',
    desc: 'The temperature sensor continuously monitors the ambient temperature around the wearer. It detects heat levels and converts them into an electrical signal.',
    detail: 'The sensor provides real-time temperature readings to the control circuit, enabling intelligent decision-making about when to activate the cooling system.',
  },
  {
    id: 2,
    icon: '📊',
    title: 'Temperature Detection',
    color: 'from-yellow-500 to-orange-500',
    desc: 'The control circuit reads and processes the temperature signal. It compares the measured temperature against preset threshold values.',
    detail: 'Thresholds: Below 25°C = Normal, 25–30°C = Moderate, Above 30°C = Activate cooling.',
  },
  {
    id: 3,
    icon: '⚡',
    title: 'Control Circuit',
    color: 'from-blue-500 to-purple-500',
    desc: 'The control electronics process sensor data and make decisions based on the operating mode (Auto or Manual). It manages power distribution to the fans.',
    detail: 'The circuit receives power from the 3.7V lithium battery and distributes it to the cooling fans based on temperature conditions or user input.',
  },
  {
    id: 4,
    icon: '🌀',
    title: 'Fan Activation',
    color: 'from-cyan-500 to-blue-500',
    desc: 'When cooling is required, the control circuit activates one or both DC cooling fans. Fan speed may be adjusted based on the intensity of heat detected.',
    detail: 'Two DC fans provide redundant cooling capability and distribute airflow across the torso area of the jacket.',
  },
  {
    id: 5,
    icon: '💨',
    title: 'Air Circulation',
    color: 'from-teal-500 to-cyan-500',
    desc: 'The fans draw in ambient air and circulate it through the jacket structure. The airflow moves across the wearer\'s body, carrying heat away.',
    detail: 'The jacket\'s design includes ventilation channels that direct air movement for maximum cooling effectiveness.',
  },
  {
    id: 6,
    icon: '❄️',
    title: 'Cooling Effect',
    color: 'from-emerald-500 to-teal-500',
    desc: 'The continuous airflow creates a cooling effect through convection and evaporative cooling. Body temperature decreases as heat is carried away.',
    detail: 'The cooling component (if active) further enhances the temperature reduction, providing additional comfort in extreme heat conditions.',
  },
];

const FlowArrow = () => (
  <div className="flex justify-center my-1">
    <div className="flex flex-col items-center">
      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 opacity-60" />
      <ArrowDown size={16} className="text-cyan-400 opacity-60" />
    </div>
  </div>
);

export default function WorkingPrinciple() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <Cpu className="text-blue-400" size={32} />
          Working Principle
        </h1>
        <p className="section-subtitle">How the Smart Wearable Cooling Jacket operates</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Flow Diagram */}
        <div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6 text-center">System Flow Diagram</h3>
            <div className="max-w-xs mx-auto">
              {steps.map((step, i) => (
                <div key={step.id}>
                  <div
                    className="cursor-pointer"
                    onClick={() => setExpanded(expanded === step.id ? null : step.id)}
                  >
                    <div className={`glass-card-hover p-4 rounded-xl border transition-all duration-300 ${
                      expanded === step.id ? 'border-cyan-500/50 bg-cyan-500/5' : ''
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl`}>
                            {step.icon}
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Step {step.id}</div>
                            <div className="text-sm font-semibold text-white">{step.title}</div>
                          </div>
                        </div>
                        {expanded === step.id ? (
                          <ChevronUp size={16} className="text-cyan-400" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-500" />
                        )}
                      </div>
                      {expanded === step.id && (
                        <div className="mt-3 pt-3 border-t border-white/10 text-sm text-slate-400">
                          {step.detail}
                        </div>
                      )}
                    </div>
                  </div>
                  {i < steps.length - 1 && <FlowArrow />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block Diagram + Description */}
        <div className="space-y-6">
          {/* Block Diagram */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6 text-center">System Block Diagram</h3>
            <div className="relative">
              <svg viewBox="0 0 400 280" width="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#00d4ff" />
                  </marker>
                  <linearGradient id="blockGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d2447" /><stop offset="100%" stopColor="#163060" />
                  </linearGradient>
                </defs>

                {/* Battery */}
                <rect x="20" y="110" width="90" height="50" rx="8" fill="#0d2447" stroke="#10b981" strokeWidth="1.5" />
                <text x="65" y="130" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">3.7V Battery</text>
                <text x="65" y="148" textAnchor="middle" fill="#64748b" fontSize="8">Li-Ion Power</text>

                {/* Control Circuit */}
                <rect x="150" y="95" width="100" height="80" rx="8" fill="#0d2447" stroke="#1d9bf0" strokeWidth="2" />
                <text x="200" y="120" textAnchor="middle" fill="#1d9bf0" fontSize="10" fontWeight="bold">Control</text>
                <text x="200" y="135" textAnchor="middle" fill="#1d9bf0" fontSize="10" fontWeight="bold">Circuit</text>
                <text x="200" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Processing Unit</text>

                {/* Fan 1 */}
                <rect x="295" y="60" width="85" height="45" rx="8" fill="#0d2447" stroke="#00d4ff" strokeWidth="1.5" />
                <text x="337" y="78" textAnchor="middle" fill="#00d4ff" fontSize="10" fontWeight="bold">DC Fan 1</text>
                <text x="337" y="93" textAnchor="middle" fill="#64748b" fontSize="8">Cooling Fan</text>

                {/* Fan 2 */}
                <rect x="295" y="165" width="85" height="45" rx="8" fill="#0d2447" stroke="#00d4ff" strokeWidth="1.5" />
                <text x="337" y="183" textAnchor="middle" fill="#00d4ff" fontSize="10" fontWeight="bold">DC Fan 2</text>
                <text x="337" y="198" textAnchor="middle" fill="#64748b" fontSize="8">Cooling Fan</text>

                {/* Temp Sensor */}
                <rect x="20" y="195" width="90" height="50" rx="8" fill="#0d2447" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="65" y="215" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">Temp Sensor</text>
                <text x="65" y="230" textAnchor="middle" fill="#64748b" fontSize="8">NTC/DHT</text>

                {/* Switch */}
                <rect x="150" y="220" width="80" height="40" rx="8" fill="#0d2447" stroke="#a78bfa" strokeWidth="1.5" />
                <text x="190" y="238" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Push Button</text>
                <text x="190" y="253" textAnchor="middle" fill="#64748b" fontSize="8">ON/OFF Switch</text>

                {/* Arrows */}
                {/* Battery → Control */}
                <line x1="110" y1="135" x2="148" y2="135" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                {/* Control → Fan1 */}
                <line x1="250" y1="115" x2="293" y2="85" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                {/* Control → Fan2 */}
                <line x1="250" y1="155" x2="293" y2="185" stroke="#00d4ff" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                {/* Temp → Control */}
                <line x1="110" y1="215" x2="148" y2="175" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                {/* Switch → Control */}
                <line x1="190" y1="220" x2="200" y2="177" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

                {/* Labels on arrows */}
                <text x="128" y="128" fill="#10b981" fontSize="7">Power</text>
                <text x="260" y="102" fill="#00d4ff" fontSize="7">Control</text>
                <text x="260" y="168" fill="#00d4ff" fontSize="7">Control</text>
                <text x="112" y="198" fill="#f59e0b" fontSize="7">Signal</text>
              </svg>
            </div>
          </div>

          {/* Step explanations */}
          <div className="space-y-3">
            {steps.map(step => (
              <div key={step.id} className="glass-card-hover p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{step.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{step.title}</div>
                    <div className="text-xs text-slate-400">{step.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
