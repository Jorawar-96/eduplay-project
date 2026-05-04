"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Topic configurations mapping
const topicStyles: Record<string, any> = {
  "python-basics": {
    gradient: "from-red-500 to-orange-500",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.3)",
    glow: "rgba(239,68,68,0.15)",
    solid: "#ef4444",
    icon: "🐍",
    name: "PYTHON BASICS"
  },
  "data-structures": {
    gradient: "from-purple-500 to-indigo-500",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.3)",
    glow: "rgba(124,58,237,0.15)",
    solid: "#7c3aed",
    icon: "🌲",
    name: "DATA STRUCTURES"
  },
  "web-development": {
    gradient: "from-blue-500 to-cyan-500",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.3)",
    glow: "rgba(59,130,246,0.15)",
    solid: "#3b82f6",
    icon: "🌐",
    name: "WEB DEVELOPMENT"
  },
  "databases": {
    gradient: "from-green-500 to-teal-500",
    bg: "rgba(20,184,166,0.08)",
    border: "rgba(20,184,166,0.3)",
    glow: "rgba(20,184,166,0.15)",
    solid: "#14b8a6",
    icon: "🗄️",
    name: "DATABASES"
  },
  "computer-networks": {
    gradient: "from-amber-500 to-yellow-500",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.3)",
    glow: "rgba(245,158,11,0.15)",
    solid: "#f59e0b",
    icon: "🔗",
    name: "COMPUTER NETWORKS"
  },
};

const getDifficultyPill = (diff: string) => {
  switch (diff?.toLowerCase()) {
    case 'easy': return <span className="bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full text-xs font-bold border border-teal-500/30 shadow-[0_0_10px_rgba(20,184,166,0.2)]">Easy</span>;
    case 'medium': return <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">Medium</span>;
    case 'hard': return <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">Hard</span>;
    default: return null;
  }
};

export default function BossFightSelection() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${API}/api/teacher/assignments`);
        setAssignments(res.data || []);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      }
    };
    fetchAssignments();
  }, []);

  const regularTopics = Object.keys(topicStyles).map(key => ({
    id: key,
    name: topicStyles[key].name,
    icon: topicStyles[key].icon,
    gradient: topicStyles[key].gradient
  }));

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20 overflow-x-hidden selection:bg-purple-500/30 scroll-smooth">
      <StarBackground />

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* --- REGULAR TOPICS SECTION --- */}
        <section>
          <div className="relative mb-10">
            <h2 className="text-3xl font-black text-white inline-block tracking-tight">
              🗺️ Training Grounds
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-3 opacity-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTopics.map((topic, i) => (
              <GlowCard 
                key={topic.id}
                className="p-8 cursor-pointer group hover:-translate-y-2 transition-all duration-300 border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
                onClick={() => router.push(`/boss-fight/${topic.id}`)}
              >
                <div className="text-[40px] mb-5">{topic.icon}</div>
                <h3 className="text-xl font-bold mb-3">{topic.name}</h3>
                <p className="text-white/40 text-sm mb-8 font-medium leading-relaxed">Select a difficulty and challenge the master of this realm to earn XP.</p>
                
                <div className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${topic.gradient} flex items-center gap-2`}>
                  Enter Realm <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "40px 0" }} />

        {/* --- ACTIVE CLASS ASSIGNMENTS SECTION --- */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="relative mb-10">
            <h2 className="text-3xl font-black text-white inline-block tracking-tight">
              📢 Class Battlegrounds
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-3 opacity-80" />
          </div>

          {assignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment, i) => {
                const style = topicStyles[assignment.topic] || topicStyles["python-basics"];
                return (
                  <motion.div
                    key={assignment.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-full"
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      whileHover={{ y: -6, boxShadow: `0 0 35px ${style.glow}`, scale: 1.01 }}
                      className="relative rounded-[20px] p-6 overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col h-full"
                      style={{
                        backgroundColor: style.bg,
                        border: `1px solid ${style.border}`,
                        borderLeft: `3px solid ${style.solid}`,
                        boxShadow: `0 0 20px ${style.glow}`
                      }}
                    >
                      {/* Top gradient accent */}
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${style.gradient}`} />
                      
                      {/* Top row */}
                      <div className="flex justify-between items-start mb-6">
                        <span 
                          className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full bg-black/60 border backdrop-blur-sm"
                          style={{ color: style.solid, borderColor: style.border }}
                        >
                          📢 CLASS ASSIGNMENT
                        </span>
                        {getDifficultyPill(assignment.difficulty)}
                      </div>

                      {/* Middle content */}
                      <div className="flex flex-col items-center text-center flex-grow mb-8 mt-2">
                        <span className="text-[40px] mb-4 drop-shadow-xl">{style.icon}</span>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{style.name}</h3>
                        <p className="text-sm text-white/50 mt-3 font-medium">Deployed by Teacher • Just now</p>
                      </div>

                      {/* Bottom button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push(`/boss-fight/${assignment.topic}?mode=assignment&difficulty=${assignment.difficulty}`)}
                        className={`w-full py-4 rounded-xl font-black text-white relative overflow-hidden group bg-gradient-to-r ${style.gradient} shadow-lg`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-[15px]">
                          ⚔️ Fight Now
                        </span>
                        {/* Shimmer sweep effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div 
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.1)",
                padding: "40px",
                textAlign: "center",
                borderRadius: "20px"
              }}
            >
              <h3 className="text-xl font-bold text-white mb-2">⚔️ No active assignments</h3>
              <p className="text-white/50 text-sm">Your teacher hasn't deployed any battles yet. Check back soon!</p>
            </div>
          )}
        </motion.section>

      </div>

      {/* Global styles for the shimmer effect */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
