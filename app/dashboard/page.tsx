"use client"; // Required for framer-motion in Next.js App Router

import { motion } from "framer-motion";
import { Flame, Trophy, Star, Medal, Crown } from "lucide-react";

export default function Dashboard() {
  // Animation variants for framer-motion to create a staggered entrance effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }, // Snappier delays for AAA feel
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    // Main container with Cosmic Gaming dark background
    <div className="min-h-screen bg-[#0a0015] text-white font-sans selection:bg-[#7c3aed] selection:text-white pb-12">
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-10">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
            Welcome back, <span className="bg-linear-to-r from-[#f59e0b] to-[#ef4444] text-transparent bg-clip-text">Hero</span> ⚔️
          </h1>
          <p className="text-white/60 text-lg">You're 62.5% to Level 6 — keep fighting!</p>
        </motion.div>

        {/* XP Progress Bar (Full Width Card) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-6 border border-[rgba(255,255,255,0.07)] mb-10 shadow-xl"
        >
          <div className="flex items-center gap-5 mb-4">
            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#7c3aed] to-[#4c1d95] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-[#7c3aed]/50 shrink-0">
              <span className="text-2xl font-black text-white">5</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-xl font-bold text-white truncate pr-4">Scholar</h2>
                <div className="text-sm font-medium whitespace-nowrap"><span className="text-[#f59e0b]">1250</span> <span className="text-white/40">/ 2000 XP</span></div>
              </div>
              {/* Animated Progress Bar */}
              <div className="w-full h-3 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden border border-[rgba(255,255,255,0.05)]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "62.5%" }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-linear-to-r from-[#7c3aed] to-[#f59e0b] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] relative"
                >
                  {/* Shine effect on progress bar */}
                  <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-white/20 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {/* XP Points Card */}
          <motion.div variants={itemVariants} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[rgba(255,255,255,0.07)] flex flex-col items-center justify-center group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300">
            <Star className="text-[#f59e0b] w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <h2 className="text-white/50 text-xs uppercase tracking-widest font-bold">Total XP</h2>
            <p className="text-3xl font-black text-white mt-1">1250 <span className="text-[#f59e0b] text-lg">XP</span></p>
          </motion.div>

          {/* Current Level Card */}
          <motion.div variants={itemVariants} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[#f59e0b]/30 shadow-[0_0_15px_rgba(245,158,11,0.05)] flex flex-col items-center justify-center relative overflow-hidden group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300">
            <div className="absolute top-0 w-full h-1 bg-linear-to-r from-[#f59e0b] to-[#ef4444]"></div>
            <Crown className="text-[#f59e0b] w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <h2 className="text-white/50 text-xs uppercase tracking-widest font-bold">Current Level</h2>
            <p className="text-2xl font-black text-white mt-1 text-center leading-tight">Level 5 <br/><span className="text-[#f59e0b]">Scholar</span></p>
          </motion.div>

          {/* Leaderboard Rank Card */}
          <motion.div variants={itemVariants} className="bg-[rgba(255,255,255,0.03)] rounded-xl p-6 border border-[rgba(255,255,255,0.07)] flex flex-col items-center justify-center group hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300">
            <Trophy className="text-[#f59e0b] w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <h2 className="text-white/50 text-xs uppercase tracking-widest font-bold">Global Rank</h2>
            <p className="text-3xl font-bold text-white mt-1">#3</p>
            <p className="text-white/40 text-xs font-medium mt-1 uppercase tracking-wider">On Leaderboard</p>
          </motion.div>
        </motion.div>

        {/* Badges Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-8 border border-[rgba(255,255,255,0.07)]"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Medal className="text-[#f59e0b] w-7 h-7" /> Earned Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            
            {/* Badge 1 */}
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-5 flex flex-col items-center text-center border border-[rgba(255,255,255,0.05)] hover:border-[#f59e0b]/50 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-linear-to-br from-[#f59e0b]/20 to-[#ef4444]/20 rounded-full flex items-center justify-center mb-4 border border-[#f59e0b]/20 group-hover:scale-110 transition-transform">
                <span className="text-3xl drop-shadow-md">🎯</span>
              </div>
              <h3 className="font-bold text-white tracking-wide">First Blood</h3>
              <p className="text-xs text-white/50 mt-1">Defeated the first Boss</p>
            </div>

            {/* Badge 2 */}
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-5 flex flex-col items-center text-center border border-[rgba(255,255,255,0.05)] hover:border-[#14b8a6]/50 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-linear-to-br from-[#14b8a6]/20 to-[#0f766e]/20 rounded-full flex items-center justify-center mb-4 border border-[#14b8a6]/20 group-hover:scale-110 transition-transform">
                <span className="text-3xl drop-shadow-md">⚡</span>
              </div>
              <h3 className="font-bold text-white tracking-wide">Speed Demon</h3>
              <p className="text-xs text-white/50 mt-1">Answered 5 questions in 10s</p>
            </div>

            {/* Badge 3 */}
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-5 flex flex-col items-center text-center border border-[rgba(255,255,255,0.05)] hover:border-[#7c3aed]/50 hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-linear-to-br from-[#7c3aed]/20 to-[#4c1d95]/20 rounded-full flex items-center justify-center mb-4 border border-[#7c3aed]/20 group-hover:scale-110 transition-transform">
                <span className="text-3xl drop-shadow-md">🧠</span>
              </div>
              <h3 className="font-bold text-white tracking-wide">Flawless</h3>
              <p className="text-xs text-white/50 mt-1">100% accuracy on a quiz</p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
