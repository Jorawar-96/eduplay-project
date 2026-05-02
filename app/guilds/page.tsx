"use client";

import { motion } from "framer-motion";
import { Shield, Users, Plus, Sword } from "lucide-react";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";

const mockGuilds = [
  { id: 1, name: "Code Wizards", members: 4, xp: 15400, open: true },
  { id: 2, name: "Data Dragons", members: 5, xp: 21000, open: false },
  { id: 3, name: "React Rangers", members: 2, xp: 5200, open: true },
];

export default function GuildsPage() {
  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20">
      <StarBackground />
      
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-3 mb-2">
              <Shield className="w-10 h-10 text-indigo-400" /> Alliances & Guilds
            </h1>
            <p className="text-white/50">Team up with classmates to multiply your rewards.</p>
          </div>
          <button className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <Plus className="w-5 h-5" /> Create Guild
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGuilds.map((guild) => (
            <GlowCard key={guild.id} className="p-6 flex flex-col h-full border-indigo-500/20 bg-indigo-950/10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30">
                  <Sword className="text-indigo-400" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${guild.open ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {guild.open ? 'OPEN' : 'FULL'}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-1">{guild.name}</h3>
              
              <div className="flex items-center gap-4 mt-4 text-sm font-semibold text-white/60 mb-6">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {guild.members}/5</span>
                <span className="text-[#f59e0b]">{guild.xp.toLocaleString()} Guild XP</span>
              </div>
              
              <div className="mt-auto">
                <button disabled={!guild.open} className={`w-full py-3 rounded-lg font-bold transition-colors ${guild.open ? 'bg-white/10 hover:bg-indigo-600 border border-white/10 hover:border-indigo-400' : 'bg-black/20 text-white/30 cursor-not-allowed'}`}>
                  {guild.open ? 'Join Alliance' : 'No Slots Available'}
                </button>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}
