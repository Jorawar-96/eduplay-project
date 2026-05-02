"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";
import { UserPlus } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${API}/api/auth/register`, { name, email, password, role });
      alert("Account created successfully! Please login.");
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <StarBackground />
      
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-black tracking-tighter mb-6 z-10">
        <span className="text-white">Edu</span><span className="text-[#f59e0b]">Play</span>
      </motion.div>

      <GlowCard className="w-full max-w-lg p-8 relative z-10 bg-black/40 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        
        {error && <div className="p-3 mb-4 text-sm font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button type="button" onClick={() => setRole("student")} className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${role === "student" ? "bg-purple-900/30 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]" : "bg-white/5 border-white/10 opacity-60 hover:opacity-100"}`}>
              <span className="text-3xl">⚔️</span>
              <span className="font-bold text-sm">Student</span>
            </button>
            <button type="button" onClick={() => setRole("teacher")} className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${role === "teacher" ? "bg-purple-900/30 border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]" : "bg-white/5 border-white/10 opacity-60 hover:opacity-100"}`}>
              <span className="text-3xl">👨‍🏫</span>
              <span className="font-bold text-sm">Teacher</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Full Name</label>
            <input 
              type="text" required
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" required
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" required minLength={6}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-linear-to-r from-[#7c3aed] to-[#4f46e5] rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-4">
            <UserPlus className="w-5 h-5" /> Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/50">
          Already have an account? <Link href="/login" className="text-purple-400 font-bold hover:underline">Log in</Link>
        </div>
      </GlowCard>
    </div>
  );
}
