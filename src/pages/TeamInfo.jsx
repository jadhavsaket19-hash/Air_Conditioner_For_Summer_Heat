import React from 'react';
import { Users, GraduationCap, BookOpen, Award } from 'lucide-react';

const teamMembers = [
  {
    name: 'Saket Jadhav',
    initials: 'SJ',
    color: 'from-blue-500 to-cyan-500',
    emoji: '👨‍🔬',
  },
  {
    name: 'Vivek Adhav',
    initials: 'VA',
    color: 'from-purple-500 to-pink-500',
    emoji: '👨‍💻',
  },
  {
    name: 'Shubham Khatane',
    initials: 'SK',
    color: 'from-orange-500 to-red-500',
    emoji: '👨‍🔧',
  },
  {
    name: 'Om Rindhe',
    initials: 'OR',
    color: 'from-emerald-500 to-teal-500',
    emoji: '👨‍🎓',
  },
];

export default function TeamInfo() {
  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="section-title flex items-center justify-center gap-3">
          <Users className="text-purple-400" size={32} />
          Team & Project Information
        </h1>
        <p className="section-subtitle">The people behind the Smart Wearable Air Cooling Jacket</p>
      </div>

      {/* Project Info Card */}
      <div className="glass-card p-6 md:p-8 mb-10">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
            <div className="text-4xl mb-3">🏛️</div>
            <div className="text-sm text-slate-400 mb-1">Department</div>
            <div className="text-base font-bold text-white">First Year Mechanical</div>
            <div className="text-sm text-cyan-400">Engineering</div>
          </div>
          <div className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
            <div className="text-4xl mb-3">📚</div>
            <div className="text-sm text-slate-400 mb-1">Course</div>
            <div className="text-base font-bold text-white">Makerspace</div>
            <div className="text-sm text-purple-400">Project Course 2024</div>
          </div>
          <div className="p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20">
            <div className="text-4xl mb-3">🎓</div>
            <div className="text-sm text-slate-400 mb-1">Project Guide</div>
            <div className="text-base font-bold text-white">Kiran Wakchaure Sir</div>
            <div className="text-sm text-emerald-400">Faculty Mentor</div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Team Members</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="glass-card-hover text-center p-6 group">
              {/* Avatar */}
              <div className="relative mx-auto mb-4 w-24 h-24">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300`}>
                  {member.emoji}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#020818] border-2 border-cyan-500/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-cyan-400">{i + 1}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{member.name}</h3>
              <div className="text-xs text-slate-400 mb-3">Team Member</div>

              {/* Avatar initials badge */}
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r ${member.color} bg-opacity-20 text-xs text-white font-mono`}>
                {member.initials}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Card */}
      <div className="glass-card p-6 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-500 flex items-center justify-center text-5xl flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500">
            👨‍🏫
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Project Guide</div>
            <h3 className="text-2xl font-bold text-white mb-1">Kiran Wakchaure Sir</h3>
            <div className="text-cyan-400 font-medium mb-2">Faculty Mentor · Makerspace Course</div>
            <p className="text-sm text-slate-400">
              Providing guidance, technical mentorship, and project oversight for the Smart Wearable Air Cooling Jacket development as part of the Makerspace curriculum.
            </p>
          </div>
        </div>
      </div>

      {/* Project summary */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Award size={20} className="text-yellow-400" />
          Project Summary
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold text-cyan-400 mb-3">About the Project</div>
            <p className="text-sm text-slate-300 leading-relaxed">
              The Smart Wearable Air Cooling Jacket is a Makerspace project designed to provide personal cooling to the human body during hot summer conditions. The system integrates dual DC fans, a 3.7V lithium battery, temperature sensing, and intelligent control electronics within a wearable jacket structure.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-cyan-400 mb-3">Key Objectives</div>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                'Design a wearable cooling system using DC fans',
                'Implement temperature-based automatic control',
                'Create a portable, battery-powered solution',
                'Demonstrate IoT sensing and control concepts',
                'Provide practical cooling relief in hot conditions',
              ].map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">→</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
