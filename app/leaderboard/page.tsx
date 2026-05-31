"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";

const leaderboardData = [
  { rank: 1, name: "Jorawar", level: 6, title: "Legend", total_xp: 4820, avatar: "J", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", badges: 12 },
  { rank: 2, name: "Himanshu", level: 5, title: "Master", total_xp: 3210, avatar: "H", gradient: "linear-gradient(135deg, #7c3aed, #4f46e5)", badges: 9 },
  { rank: 3, name: "Prakash", level: 4, title: "Expert", total_xp: 2750, avatar: "P", gradient: "linear-gradient(135deg, #14b8a6, #0891b2)", badges: 7 },
  { rank: 4, name: "Aryan", level: 3, title: "Scholar", total_xp: 1890, avatar: "A", gradient: "linear-gradient(135deg, #ec4899, #a855f7)", badges: 5 },
  { rank: 5, name: "Rahul", level: 3, title: "Scholar", total_xp: 1650, avatar: "R", gradient: "linear-gradient(135deg, #3b82f6, #6366f1)", badges: 4 },
  { rank: 6, name: "Priya", level: 2, title: "Apprentice", total_xp: 1200, avatar: "P", gradient: "linear-gradient(135deg, #22c55e, #14b8a6)", badges: 3 },
  { rank: 7, name: "Vikram", level: 2, title: "Apprentice", total_xp: 980, avatar: "V", gradient: "linear-gradient(135deg, #f97316, #ef4444)", badges: 2 },
  { rank: 8, name: "Sneha", level: 1, title: "Rookie", total_xp: 750, avatar: "S", gradient: "linear-gradient(135deg, #a855f7, #ec4899)", badges: 1 },
  { rank: 9, name: "Amit", level: 1, title: "Rookie", total_xp: 520, avatar: "A", gradient: "linear-gradient(135deg, #60a5fa, #22d3ee)", badges: 1 },
  { rank: 10, name: "Kavya", level: 1, title: "Rookie", total_xp: 310, avatar: "K", gradient: "linear-gradient(135deg, #f87171, #f472b6)", badges: 0 }
];

export default function LeaderboardPage() {
  const currentUser = "Jorawar";

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20">
      <StarBackground />
      
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-5xl font-black text-[#f59e0b] flex items-center gap-4 mb-4">
            <Trophy className="w-12 h-12" /> Global Rankings
          </h1>
          <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-white/50 tracking-widest uppercase">LIVE UPDATES</span>
          </div>
        </div>

        <GlowCard className="p-1 overflow-hidden">
          <div className="bg-[#0a0015]/80 rounded-xl overflow-hidden backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-white/40 text-xs uppercase tracking-widest border-b border-white/5">
                  <th className="p-4 w-20 text-center">Rank</th>
                  <th className="p-4">Hero</th>
                  <th className="p-4 text-center">Level</th>
                  <th className="p-4 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => {
                  const isMe = user.name === currentUser;
                  return (
                    <motion.tr 
                      layout // Framer motion will automatically animate row position changes!
                      key={user.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`border-b border-white/5 transition-colors ${isMe ? 'bg-purple-900/30 border-purple-500/30' : 'hover:bg-white/[0.02]'}`}
                    >
                      <td className="p-4 text-center text-2xl font-black font-serif">
                        {user.rank === 1 ? "👑" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : <span className="text-white/20">{user.rank}</span>}
                      </td>
                      <td className="p-4 font-bold text-lg flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-lg"
                          style={{ background: user.gradient }}
                        >
                          {user.avatar}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            {user.name}
                            {isMe && <span className="text-[10px] font-bold text-purple-300 px-2 py-0.5 bg-purple-600/30 rounded-full border border-purple-500/30">YOU</span>}
                          </div>
                          <span className="text-xs font-semibold text-white/40">{user.title} • {user.badges} Badges</span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-white/60 font-semibold">Level {user.level} - {user.title}</td>
                      <td className="p-4 text-right font-black text-[#f59e0b]">{user.total_xp.toLocaleString()} XP</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
