"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { StarBackground } from "./component/StarBackground";
import { Swords, Map as MapIcon, Trophy, Users, Shield, BrainCircuit, ArrowRight } from "lucide-react";

// --- Animated Counter Hook Component ---
const AnimatedCounter = ({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, suffix]);

  return <span ref={nodeRef} className="font-black text-3xl text-white">{from}{suffix}</span>;
};

// --- Main Page Component ---
export default function LandingPage() {
  const router = useRouter();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative overflow-x-hidden selection:bg-purple-500/30">
      {/* Background Animation */}
      <StarBackground />

      {/* --- SECTION 1: NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0015]/70 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-3xl font-black tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-white">Edu</span><span className="text-[#f59e0b]">Play</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-semibold text-white/60">
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollTo('leaderboard')} className="hover:text-white transition-colors">Leaderboard</button>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">How it Works</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/login')} className="hidden sm:block px-5 py-2.5 rounded-full font-bold text-sm border border-white/20 hover:bg-white/10 transition-all">
              Login
            </button>
            <button onClick={() => router.push('/register')} className="px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 transition-all">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* --- SECTION 2: HERO --- */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-8">
          <span className="px-4 py-2 rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            🎮 Learning just became a game
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-[64px] font-black tracking-[-2px] leading-tight md:leading-none mb-6"
        >
          Study Less. <br />
          <span className="bg-gradient-to-r from-[#f59e0b] via-[#ef4444] to-[#a855f7] text-transparent bg-clip-text">Level Up More.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-white/60 mb-10 font-medium leading-relaxed"
        >
          Turn boring textbooks into epic Boss Fights. Earn XP, unlock badges, climb the leaderboard — and actually learn.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.button 
            onClick={() => router.push('/register')}
            animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_50px_rgba(124,58,237,0.7)] transition-all flex items-center justify-center gap-2"
          >
            ⚔️ Start Your Quest
          </motion.button>
          <button onClick={() => scrollTo('features')} className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border-2 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            Watch Demo <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-20 pt-10 border-t border-white/5 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center"><AnimatedCounter from={0} to={500} suffix="+" /><span className="text-sm font-semibold text-white/50 uppercase tracking-widest mt-1">Students</span></div>
          <div className="flex flex-col items-center"><AnimatedCounter from={0} to={50} suffix="K+" /><span className="text-sm font-semibold text-white/50 uppercase tracking-widest mt-1">XP Earned</span></div>
          <div className="flex flex-col items-center"><AnimatedCounter from={0} to={1200} suffix="+" /><span className="text-sm font-semibold text-white/50 uppercase tracking-widest mt-1">Boss Fights</span></div>
          <div className="flex flex-col items-center"><AnimatedCounter from={0} to={98} suffix="%" /><span className="text-sm font-semibold text-white/50 uppercase tracking-widest mt-1">Love It</span></div>
        </motion.div>
      </section>

      {/* --- SECTION 3: FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Master Your Destiny</h2>
            <p className="text-white/50 text-lg">Everything you need to conquer your syllabus.</p>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <motion.div variants={staggerItem} className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform"><Swords size={28} /></div>
              <h3 className="text-2xl font-bold mb-3">Boss Fight Quizzes</h3>
              <p className="text-white/60 font-medium">Answer questions to deal damage. Defeat the boss to win XP!</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={staggerItem} className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform"><MapIcon size={28} /></div>
              <h3 className="text-2xl font-bold mb-3">Knowledge Map</h3>
              <p className="text-white/60 font-medium">Unlock topics as you master previous ones.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={staggerItem} className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: 'rgba(20,184,166,0.08)', borderColor: 'rgba(20,184,166,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 transition-transform"><Trophy size={28} /></div>
              <h3 className="text-2xl font-bold mb-3">Live Leaderboard</h3>
              <p className="text-white/60 font-medium">Compete with classmates in real-time.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={staggerItem} className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 text-red-400 group-hover:scale-110 transition-transform"><Users size={28} /></div>
              <h3 className="text-2xl font-bold mb-3">Guild System</h3>
              <p className="text-white/60 font-medium">Form squads. Complete co-op missions together.</p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={staggerItem} className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: 'rgba(236,72,153,0.08)', borderColor: 'rgba(236,72,153,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform"><Shield size={28} /></div>
              <h3 className="text-2xl font-bold mb-3">Power-Up Shop</h3>
              <p className="text-white/60 font-medium">Spend coins on shields, time freezers, avatar skins.</p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div variants={staggerItem} className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: 'rgba(59,130,246,0.08)', borderColor: 'rgba(59,130,246,0.2)' }}>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform"><BrainCircuit size={28} /></div>
              <h3 className="text-2xl font-bold mb-3">AI Oracle</h3>
              <p className="text-white/60 font-medium">Smart suggestions based on your weak areas.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: LEADERBOARD PREVIEW --- */}
      <section id="leaderboard" className="py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-4xl font-black mb-4 flex items-center gap-3">🏆 Live Leaderboard</h2>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-white/50 tracking-widest uppercase">LIVE UPDATES</span>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-3xl p-2 md:p-6 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {[
                { rank: "👑", name: "Jorawar", title: "Legend Lv.6", xp: "4820 XP", gradient: "from-yellow-400 to-amber-600" },
                { rank: "🥈", name: "Himanshu", title: "Master Lv.5", xp: "3210 XP", gradient: "from-purple-500 to-indigo-600" },
                { rank: "🥉", name: "Prakash", title: "Expert Lv.4", xp: "2750 XP", gradient: "from-teal-400 to-emerald-500" },
                { rank: "4", name: "Aryan", title: "Scholar Lv.3", xp: "1890 XP", gradient: "from-pink-400 to-rose-500", textRank: true }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className={`text-2xl md:text-3xl font-black w-8 text-center ${user.textRank ? "text-white/20" : ""}`}>{user.rank}</span>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center shadow-lg font-bold text-lg`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{user.name}</span>
                      <span className="text-xs font-bold text-white/50">{user.title}</span>
                    </div>
                  </div>
                  <span className="font-black text-[#f59e0b] text-lg md:text-xl">{user.xp}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button onClick={() => router.push('/leaderboard')} className="text-sm font-bold text-white/40 hover:text-white transition-colors underline underline-offset-4">
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 px-6 relative z-10 bg-black/20 border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16">The Journey to Greatness</h2>
          
          <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4">
            
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center text-center relative w-full">
              <div className="w-8 h-8 rounded-full bg-purple-600 font-bold flex items-center justify-center mb-6 absolute -top-4 left-1/2 -translate-x-1/2 border-4 border-[#0a0015] z-10">1</div>
              <div className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-3xl p-8 pt-10 relative overflow-hidden">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-2">Register & Choose Topics</h3>
                <p className="text-white/50 text-sm leading-relaxed">Create an account and select your learning path.</p>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div className="hidden md:flex flex-col justify-center h-48 w-12 text-white/20"><ArrowRight size={32} /></div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center text-center relative w-full">
              <div className="w-8 h-8 rounded-full bg-red-600 font-bold flex items-center justify-center mb-6 absolute -top-4 left-1/2 -translate-x-1/2 border-4 border-[#0a0015] z-10">2</div>
              <div className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-3xl p-8 pt-10 relative overflow-hidden">
                <div className="text-6xl mb-4">⚔️</div>
                <h3 className="text-xl font-bold mb-2">Fight Bosses & Earn XP</h3>
                <p className="text-white/50 text-sm leading-relaxed">Answer questions to defeat monsters and level up.</p>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div className="hidden md:flex flex-col justify-center h-48 w-12 text-white/20"><ArrowRight size={32} /></div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center text-center relative w-full">
              <div className="w-8 h-8 rounded-full bg-amber-500 font-bold flex items-center justify-center mb-6 absolute -top-4 left-1/2 -translate-x-1/2 border-4 border-[#0a0015] z-10">3</div>
              <div className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-3xl p-8 pt-10 relative overflow-hidden">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Climb the Leaderboard</h3>
                <p className="text-white/50 text-sm leading-relaxed">Compete with friends and become the ultimate Legend.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 6: CTA --- */}
      <section className="py-32 px-6 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          Ready to Become a <span className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-transparent bg-clip-text">Legend?</span>
        </h2>
        <p className="text-xl text-white/60 mb-10 max-w-2xl">
          Join hundreds of students who turned study time into game time.
        </p>
        
        <motion.button 
          onClick={() => router.push('/register')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 rounded-full font-black text-xl bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] shadow-[0_0_40px_rgba(124,58,237,0.5)] flex items-center gap-3"
        >
          ⚔️ Create Free Account
        </motion.button>
        <p className="text-sm font-semibold text-white/30 mt-6 tracking-wider uppercase">Free forever · No credit card</p>
      </section>

      {/* --- SECTION 7: FOOTER --- */}
      <footer className="border-t border-white/5 py-12 px-6 relative z-10 bg-[#0a0015]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-black tracking-tighter mb-2">
              <span className="text-white">Edu</span><span className="text-[#f59e0b]">Play</span>
            </div>
            <p className="text-sm text-white/40 font-semibold">Making education an adventure.</p>
          </div>
          
          <div className="flex gap-6 text-sm font-bold text-white/50">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => router.push('/login')} className="hover:text-white transition-colors">Login</button>
            <button onClick={() => router.push('/register')} className="hover:text-white transition-colors">Register</button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center text-xs font-semibold text-white/30">
          © 2025 EduPlay — BCA Final Year Project
        </div>
      </footer>
    </div>
  );
}
