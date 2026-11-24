import React, { useState } from 'react';
import { Wrench, CheckCircle, Circle, ChevronRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Prepare the Jacket',
    emoji: '📋',
    color: 'from-blue-500 to-cyan-500',
    desc: 'Start with the base jacket fabric. Mark the positions for all components: two fan mounts on the chest area, battery pocket, sensor location, control circuit panel, and wire channels.',
    tips: ['Use washable fabric marker for clean markings', 'Ensure fan positions allow for proper airflow', 'Mark wire routing paths along seams'],
    duration: '~30 min',
  },
  {
    id: 2,
    title: 'Mount Fans & Cooling',
    emoji: '🌀',
    color: 'from-cyan-500 to-teal-500',
    desc: 'Cut fabric openings for the two DC fans at the marked positions. Secure each fan using mounting brackets or stitching. Install the cooling component at its designated location.',
    tips: ['Align fans for optimal airflow direction', 'Ensure fans are securely fastened to prevent vibration', 'Test fan alignment before final mounting'],
    duration: '~45 min',
  },
  {
    id: 3,
    title: 'Install Electronics',
    emoji: '⚡',
    color: 'from-purple-500 to-blue-500',
    desc: 'Place the 3.7V lithium battery in its protective pocket. Mount the temperature sensor at an external position. Install the control electronics in the designated panel. Attach the push button switch to the jacket exterior.',
    tips: ['Use heat-resistant battery pouch', 'Position sensor away from body heat sources', 'Protect control circuit with appropriate housing'],
    duration: '~60 min',
  },
  {
    id: 4,
    title: 'Route & Secure Wiring',
    emoji: '🔌',
    color: 'from-orange-500 to-yellow-500',
    desc: 'Route all connecting wires through pre-marked channels. Connect the battery to the control circuit, fans to their respective outputs, temperature sensor to the input, and button switch to the control board.',
    tips: ['Use wire clips or stitching to secure wires', 'Label wires for easy troubleshooting', 'Leave adequate slack at bending points'],
    duration: '~45 min',
  },
  {
    id: 5,
    title: 'Close & Fit Jacket',
    emoji: '👕',
    color: 'from-indigo-500 to-purple-500',
    desc: 'Close all access panels and secure wire channels. Try on the jacket to verify comfort and fit. Adjust component positions if necessary. Ensure no sharp edges or uncomfortable pressure points.',
    tips: ['Check mobility – arms and shoulders should move freely', 'Verify no pinching or discomfort at component locations', 'Test jacket weight distribution'],
    duration: '~30 min',
  },
  {
    id: 6,
    title: 'Test All Systems',
    emoji: '✅',
    color: 'from-emerald-500 to-green-500',
    desc: 'Power on the system using the push button. Verify both fans spin correctly. Test the temperature sensor readings. Check automatic mode operation. Verify battery level indicator and discharge behavior.',
    tips: ['Test in a controlled environment first', 'Document any issues found during testing', 'Perform multiple ON/OFF cycles to verify switch operation'],
    duration: '~30 min',
  },
];

export default function Assembly() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());

  const toggleComplete = (stepId) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const progress = (completed.size / steps.length) * 100;

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <Wrench className="text-orange-400" size={32} />
          Assembly Process
        </h1>
        <p className="section-subtitle">Step-by-step guide to building the cooling jacket</p>
      </div>

      {/* Progress Bar */}
      <div className="glass-card p-5 mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-white">Assembly Progress</span>
          <span className="text-sm font-mono text-cyan-400">{completed.size}/{steps.length} steps</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {completed.size === steps.length && (
          <div className="mt-3 text-center text-emerald-400 font-semibold animate-pulse">
            🎉 Assembly Complete!
          </div>
        )}
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {steps.map((step, i) => {
          const isCompleted = completed.has(step.id);
          const isActive = currentStep === i;

          return (
            <div
              key={step.id}
              className={`glass-card border-2 p-5 cursor-pointer transition-all duration-300 ${
                isActive ? 'border-cyan-500/60 bg-cyan-500/5' :
                isCompleted ? 'border-emerald-500/40' : 'border-transparent hover:border-white/20'
              }`}
              onClick={() => setCurrentStep(i)}
            >
              {/* Step header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl`}>
                    {step.emoji}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Step {step.id}</div>
                    <div className="text-sm font-bold text-white">{step.title}</div>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); toggleComplete(step.id); }}
                  className="transition-colors"
                >
                  {isCompleted
                    ? <CheckCircle size={22} className="text-emerald-400" />
                    : <Circle size={22} className="text-slate-600 hover:text-cyan-400" />
                  }
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3 line-clamp-3">{step.desc}</p>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">⏱ {step.duration}</span>
                {isActive && (
                  <span className="text-cyan-400 flex items-center gap-1">
                    Active <ChevronRight size={12} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${steps[currentStep].color} flex items-center justify-center text-4xl`}>
            {steps[currentStep].emoji}
          </div>
          <div>
            <div className="text-xs text-slate-400">Step {steps[currentStep].id} of {steps.length}</div>
            <h3 className="text-xl font-bold text-white">{steps[currentStep].title}</h3>
            <div className="text-xs text-slate-500">Estimated time: {steps[currentStep].duration}</div>
          </div>
        </div>

        <p className="text-slate-300 mb-5">{steps[currentStep].desc}</p>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="text-sm font-semibold text-blue-400 mb-3">💡 Assembly Tips:</div>
          <ul className="space-y-2">
            {steps[currentStep].tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <ChevronRight size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="btn-secondary text-sm py-2 px-4 disabled:opacity-40"
          >
            ← Previous
          </button>
          <button
            onClick={() => { toggleComplete(steps[currentStep].id); setCurrentStep(Math.min(steps.length - 1, currentStep + 1)); }}
            className="btn-primary text-sm py-2 px-4"
          >
            Mark Done & Next →
          </button>
        </div>
      </div>
    </div>
  );
}
