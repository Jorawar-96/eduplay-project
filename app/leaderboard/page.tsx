"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { Trophy, Crown, Medal } from "lucide-react";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface UserRank {
  id: string;
  username: string;
  total_xp: number;
  current_level: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<UserRank[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const currentUserId = "demo-user"; // Replace with auth state later

  useEffect(() => {
    // Connect to your node server
    const socket = io(API);

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join_leaderboard"); // Request initial data
    });

    socket.on("leaderboard_update", (data: UserRank[]) => {
      setLeaderboard(data);
    });

    return () => { socket.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20">
      <StarBackground />
      
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-5xl font-black text-[#f59e0b] flex items-center gap-4 mb-4">
            <Trophy className="w-12 h-12" /> Global Rankings
          </h1>
          <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-xs font-bold text-white/50 tracking-widest uppercase">{isConnected ? 'LIVE UPDATES' : 'CONNECTING...'}</span>
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
                {leaderboard.map((user, index) => {
                  const isMe = user.id === currentUserId;
                  return (
                    <motion.tr 
                      layout // Framer motion will automatically animate row position changes!
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`border-b border-white/5 transition-colors ${isMe ? 'bg-purple-900/30 border-purple-500/30' : 'hover:bg-white/[0.02]'}`}
                    >
                      <td className="p-4 text-center text-2xl font-black font-serif">
                        {index === 0 ? "👑" : index === 1 ? "🥈" : index === 2 ? "🥉" : <span className="text-white/20">{index + 1}</span>}
                      </td>
                      <td className="p-4 font-bold text-lg flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs">{user.username.charAt(0).toUpperCase()}</div>
                        {user.username} {isMe && <span className="text-xs font-normal text-purple-400 px-2 py-0.5 bg-purple-900/50 rounded ml-2">YOU</span>}
                      </td>
                      <td className="p-4 text-center text-white/60 font-semibold">{user.current_level}</td>
                      <td className="p-4 text-right font-black text-[#f59e0b]">{user.total_xp.toLocaleString()} XP</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            {leaderboard.length === 0 && <div className="p-10 text-center text-white/30">Awaiting data from server...</div>}
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
