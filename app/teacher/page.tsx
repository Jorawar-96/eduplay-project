"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Swords, PlusCircle } from "lucide-react";
import axios from "axios";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const mockStudents = [
  { id: 1, name: "Alice J.", level: 5, xp: 2400, completed: 12 },
  { id: 2, name: "Bob S.", level: 3, xp: 850, completed: 4 },
];

const CustomDropdown = ({ options, value, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o: any) => o.value === value);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-xl py-3 px-4 text-white text-left focus:outline-none hover:bg-[rgba(255,255,255,0.1)] transition-colors"
      >
        <div className="flex items-center gap-3">
          {selected ? (
            <>
              {selected.icon && <span>{selected.icon}</span>}
              {selected.color && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selected.color }} />}
              <span className="font-bold">{selected.label}</span>
            </>
          ) : (
            <span className="text-white/50">{placeholder}</span>
          )}
        </div>
        <span className="text-xs text-white/50">{isOpen ? "▲" : "▼"}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#120a22] border border-[rgba(255,255,255,0.15)] rounded-xl overflow-hidden z-50 shadow-2xl">
          {options.map((opt: any) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[rgba(124,58,237,0.2)] ${
                value === opt.value ? 'border-l-4 border-purple-500 text-purple-400 bg-[rgba(124,58,237,0.1)]' : 'text-white border-l-4 border-transparent'
              }`}
            >
              {opt.icon && <span>{opt.icon}</span>}
              {opt.color && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: opt.color }} />}
              <span className="font-bold">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function TeacherDashboard() {
  const [topic, setTopic] = useState("python-basics");
  const [difficulty, setDifficulty] = useState("easy");
  const [isDeploying, setIsDeploying] = useState(false);

  const topics = [
    { value: "python-basics", label: "🐍 Python Basics", icon: "🐍" },
    { value: "data-structures", label: "🌲 Data Structures", icon: "🌲" },
    { value: "web-development", label: "🌐 Web Development", icon: "🌐" },
    { value: "databases", label: "🗄️ Databases", icon: "🗄️" },
    { value: "computer-networks", label: "🔗 Computer Networks", icon: "🔗" }
  ];

  const difficulties = [
    { value: "easy", label: "⚔️ Easy (Grunt)", color: "#14b8a6" },
    { value: "medium", label: "🔥 Medium (Captain)", color: "#f59e0b" },
    { value: "hard", label: "💀 Hard (Boss Lord)", color: "#ef4444" }
  ];

  const handleDeployAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    try {
      const res = await axios.post(`${API}/api/teacher/deploy-assignment`, {
        topic,
        difficulty,
        teacherId: 'teacher_123',
        className: "Class Assignment"
      });
      alert(`Assignment deployed successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to deploy assignment.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20">
      <StarBackground />
      
      <div className="max-w-6xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Students Roster */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-black flex items-center gap-3 mb-6"><BookOpen className="text-[#14b8a6]"/> Professor's Command Center</h1>
          
          <GlowCard className="p-6 bg-black/40">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> Student Roster</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/10">
                    <th className="p-3">Name</th>
                    <th className="p-3 text-center">Level</th>
                    <th className="p-3 text-center">Quests Done</th>
                    <th className="p-3 text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map(s => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 cursor-pointer">
                      <td className="p-3 font-bold">{s.name}</td>
                      <td className="p-3 text-center text-purple-300">{s.level}</td>
                      <td className="p-3 text-center">{s.completed}</td>
                      <td className="p-3 text-right font-bold text-yellow-400">{s.xp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlowCard>
        </div>

        {/* Sidebar: Assignment Generator */}
        <div className="space-y-6">
          <GlowCard className="p-6 border-[#ef4444]/30 bg-red-950/10">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-red-400"><Swords className="w-5 h-5" /> Deploy Boss Fight</h2>
            <p className="text-sm text-white/50 mb-6">Create a custom Class Boss Fight pulling from the databanks.</p>
            
            <form onSubmit={handleDeployAssignment} className="space-y-4 flex flex-col">
              <label className="text-sm font-bold text-white/70">Topic Realm</label>
              <CustomDropdown options={topics} value={topic} onChange={setTopic} placeholder="Select a topic..." />

              <label className="text-sm font-bold text-white/70 mt-2">Threat Level</label>
              <CustomDropdown options={difficulties} value={difficulty} onChange={setDifficulty} placeholder="Select threat level..." />

              <button type="submit" disabled={isDeploying} className="w-full mt-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-bold flex justify-center items-center gap-2 hover:scale-[1.02] shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-transform disabled:opacity-50 disabled:scale-100">
                <PlusCircle className="w-5 h-5" /> {isDeploying ? "Deploying..." : "Deploy Assignment"}
              </button>
            </form>
          </GlowCard>
        </div>
        
      </div>
    </div>
  );
}
