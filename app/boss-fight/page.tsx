"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";
import { Swords } from "lucide-react";

const topics = [
  { id: "python-basics", name: "Python Basics", 
    icon: "🐍", difficulty: "Easy", xp: 500, 
    color: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)" },
  { id: "data-structures", name: "Data Structures", 
    icon: "🌲", difficulty: "Medium", xp: 700,
    color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" },
  { id: "web-development", name: "Web Development", 
    icon: "🌐", difficulty: "Medium", xp: 700,
    color: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)" },
  { id: "databases", name: "Databases", 
    icon: "🗄️", difficulty: "Hard", xp: 900,
    color: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" },
  { id: "computer-networks", name: "Computer Networks", 
    icon: "🔗", difficulty: "Hard", xp: 900,
    color: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.3)" }
];

const filters = ["All", "Easy", "Medium", "Hard"];

export default function BossFightSelection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();

  const filteredTopics = activeFilter === "All" 
    ? topics 
    : topics.filter(t => t.difficulty === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (diff === "Medium") return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20 pt-10 px-6">
      <StarBackground />
      
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 flex items-center justify-center gap-3">
            ⚔️ Choose Your Battle
          </h1>
          <p className="text-white/60 text-lg">Select a topic to begin the Boss Fight</p>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 border ${
                activeFilter === filter 
                  ? "bg-linear-to-r from-[#7c3aed] to-[#4f46e5] text-white border-transparent shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                  : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Topic Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic) => (
              <motion.div 
                key={topic.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <GlowCard 
                  onClick={() => router.push(`/boss-fight/${topic.id}`)}
                  className="p-6 cursor-pointer flex flex-col h-full group relative overflow-hidden transition-all duration-300"
                  style={{ backgroundColor: topic.color, borderColor: topic.border }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider ${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{topic.name}</h3>
                  <p className="text-[#f59e0b] font-bold text-sm mb-6">+{topic.xp} XP</p>
                  
                  <button className="w-full mt-auto py-3 bg-linear-to-r from-[#7c3aed] to-[#4f46e5] rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg overflow-hidden relative group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all">
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
                    Fight Now <Swords className="w-4 h-4 ml-1" />
                  </button>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}