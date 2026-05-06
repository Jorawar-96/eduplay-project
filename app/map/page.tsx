"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play, Map as MapIcon } from "lucide-react";
import { StarBackground } from "../component/StarBackground";
import { StatPill } from "../component/StatPill";
import { GlowCard } from "../component/GlowCard";
import { XPBadge } from "../component/XPBadge"

const mapNodes = [
  { id: 1, title: "JavaScript Basics", emoji: "🟨", status: "completed", questionsTotal: 10, questionsDone: 10, xpReward: 500 },
  { id: 2, title: "Data Types", emoji: "🏷️", status: "completed", questionsTotal: 10, questionsDone: 10, xpReward: 500 },
  { id: 3, title: "Functions", emoji: "⚙️", status: "unlocked", questionsTotal: 10, questionsDone: 3, xpReward: 750 },
  { id: 4, title: "Arrays & Loops", emoji: "🔄", status: "locked", questionsTotal: 10, questionsDone: 0, xpReward: 800 },
  { id: 5, title: "DOM Manipulation", emoji: "📄", status: "locked", questionsTotal: 10, questionsDone: 0, xpReward: 1000 },
  { id: 6, title: "Mini Boss: JS Ninja", emoji: "🥷", status: "locked", isBoss: true, questionsTotal: 15, questionsDone: 0, xpReward: 2000 },
];

// Alternating layout offsets for the snake-like path
const getLayoutOffset = (index: number) => {
  if (index === 1) return -120; 
  if (index === 3) return 120;  // Right
  return 0;                     // Center
};

export default function KnowledgeMap() {
  // Variants for staggered node entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans selection:bg-[#7c3aed] selection:text-white pb-20 relative">
      <StarBackground />
      
      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        {/* PAGE HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <MapIcon className="w-10 h-10 text-[#7c3aed]" /> Knowledge Map
          </h1>
          <p className="text-white/60 text-lg mb-2">Choose your next battle — unlock new realms</p>
          <p className="text-[#14b8a6] font-semibold text-sm">3 of 6 topics unlocked</p>
        </motion.div>

        {/* TOP STATS BAR */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-16 relative z-10"
        >
          <StatPill icon="⭐" text="1,250 XP earned" />
          <StatPill icon="✅" text="2 Topics done" />
          <StatPill icon="🔒" text="3 Locked" />
        </motion.div>

        {/* SVG DEFINITIONS FOR ARROWS */}
        <svg className="hidden">
          <defs>
            <marker id="arrow-completed" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#7c3aed" />
            </marker>
            <marker id="arrow-locked" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="rgba(255,255,255,0.2)" />
            </marker>
          </defs>
        </svg>

        {/* THE MAP PATH CONTAINER */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full flex flex-col items-center z-10"
        >
          {mapNodes.map((node, index) => {
            const currentX = getLayoutOffset(index);
            const nextX = index < mapNodes.length - 1 ? getLayoutOffset(index + 1) : 0;
            
            return (
              <div key={node.id} className="relative w-full flex flex-col items-center">
                
                {/* THE NODE CARD */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  style={{ x: currentX }}
                  className="z-10"
                >
                  {node.status === "locked" ? (
                    
                    /* LOCKED NODE */
                    <GlowCard className="w-72 p-6 flex flex-col items-center text-center opacity-75 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] !hover:border-[rgba(255,255,255,0.05)] !hover:translate-y-0 cursor-not-allowed">
                      <motion.div whileHover={{ x: [-2, 2, -2, 2, 0] }} transition={{ duration: 0.3 }}>
                        <Lock className="w-10 h-10 text-white/30 mb-4" />
                      </motion.div>
                      <h3 className="font-bold text-white/40 text-xl mb-2">{node.title}</h3>
                      <p className="text-xs text-white/30">Complete previous topic to unlock</p>
                    </GlowCard>

                  ) : (
                    
                    /* UNLOCKED / COMPLETED NODE */
                    <Link href={`/lesson/${node.id}`} className="block group">
                      <div className="w-72 p-6 flex flex-col items-center text-center rounded-2xl bg-[rgba(124,58,237,0.15)] border border-[rgba(167,139,250,0.4)] relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#a78bfa] shadow-[0_0_20px_rgba(124,58,237,0.1)]">
                        
                        {/* Top Glow Line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-linear-to-r from-transparent via-[#a78bfa] to-transparent" />
                        
                        {/* Pulsing Border Effect for actively unlocked (not completed) */}
                        {node.status === "unlocked" && (
                          <div className="absolute inset-0 border border-[#a78bfa] rounded-2xl animate-pulse opacity-50 pointer-events-none" />
                        )}

                        <div className="text-4xl mb-3 drop-shadow-md">{node.emoji}</div>
                        <h3 className="font-bold text-white text-xl mb-1">{node.title}</h3>
                        
                        <p className="text-sm text-white/50 font-medium mb-3">
                          {node.questionsDone} / {node.questionsTotal} questions
                        </p>
                        
                        <div className="mb-5">
                          <XPBadge amount={node.xpReward} />
                        </div>

                        {node.status === "completed" ? (
                          <div className="w-full py-2.5 rounded-xl bg-[#14b8a6]/20 text-[#14b8a6] font-bold flex items-center justify-center gap-2 border border-[#14b8a6]/30">
                            <CheckCircle2 className="w-5 h-5" /> Completed
                          </div>
                        ) : (
                          <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-2.5 rounded-xl bg-linear-to-br from-[#7c3aed] to-[#4f46e5] text-white font-bold flex items-center justify-center gap-2 shadow-lg overflow-hidden relative"
                          >
                            {/* Shimmer overlay */}
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
                            <Play className="w-4 h-4 fill-white" /> Start Quest
                          </motion.button>
                        )}
                      </div>
                    </Link>
                  )}
                </motion.div>

                {/* CONNECTION LINE TO NEXT NODE */}
                {index < mapNodes.length - 1 && (
                  <div className="w-full h-16 relative flex justify-center z-0">
                    <svg className="absolute w-75 h-full overflow-visible pointer-events-none">
                      <path 
                        d={`M ${150 + currentX} 0 L ${150 + (currentX + nextX) / 2} 32 L ${150 + nextX} 64`}
                        fill="none"
                        stroke={node.status === "completed" ? "#7c3aed" : "rgba(255,255,255,0.15)"}
                        strokeWidth="3"
                        strokeDasharray="8 8"
                        markerMid={`url(#arrow-${node.status === "completed" ? "completed" : "locked"})`}
                        className={node.status === "completed" ? "opacity-100" : "opacity-50"}
                      />
                    </svg>
                  </div>
                )}

              </div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Shimmer animation keyframes injected globally for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(12deg); }
        }
      `}} />
    </div>
  );
}
