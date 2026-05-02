"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";
import { LogIn } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"student" | "teacher">("student");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      
      // Update global auth context and cookies
      login(res.data.token, res.data.user);
      
      // Redirect based on role
      if (res.data.user.role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <StarBackground />
      
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-black tracking-tighter mb-8 z-10">
        <span className="text-white">Edu</span><span className="text-[#f59e0b]">Play</span>
      </motion.div>

      <GlowCard className="w-full max-w-md p-8 relative z-10 bg-black/40 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        
        {/* Tabs */}
        <div className="flex rounded-lg bg-white/5 p-1 mb-6">
          <button 
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === "student" ? "bg-purple-600 text-white shadow-lg" : "text-white/50 hover:text-white"}`}
          >
            Student Login
          </button>
          <button 
            onClick={() => setActiveTab("teacher")}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${activeTab === "teacher" ? "bg-purple-600 text-white shadow-lg" : "text-white/50 hover:text-white"}`}
          >
            Teacher Login
          </button>
        </div>

        {error && <div className="p-3 mb-4 text-sm font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
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
              type="password" required
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500 transition-colors"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3.5 bg-linear-to-r from-[#7c3aed] to-[#4f46e5] rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-6">
            <LogIn className="w-5 h-5" /> Login to Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/50">
          Don't have an account? <Link href="/register" className="text-purple-400 font-bold hover:underline">Register here</Link>
        </div>
      </GlowCard>
    </div>
  );
}
