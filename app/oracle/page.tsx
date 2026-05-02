"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Target, AlertTriangle } from "lucide-react";
import axios from "axios";
import { StarBackground } from "../component/StarBackground";
import { GlowCard } from "../component/GlowCard";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function OraclePage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fetchAnalysis = async () => {
    setIsTyping(true);
    setTypewriterText("");
    
    // Mock data for the student's recent performance to send to the engine
    const mockResults = [
      { topic: "python-basics", score: 2, totalQuestions: 5, wrongAnswers: [] },
      { topic: "databases", score: 5, totalQuestions: 5, wrongAnswers: [] }
    ];

    try {
      const res = await axios.post(`${API}/api/oracle/suggest`, { recentQuizResults: mockResults });
      setAnalysis(res.data);
      
      // Typewriter Effect
      let i = 0;
      const fullText = res.data.studyTip;
      const interval = setInterval(() => {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30); // 30ms per character
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans relative pb-20">
      <StarBackground />
      
      <div className="max-w-4xl mx-auto px-6 pt-10 flex flex-col items-center">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 mb-2 flex items-center justify-center gap-3">
            <BrainCircuit className="w-12 h-12 text-cyan-400" /> Smart Oracle
          </h1>
          <p className="text-white/60">Let the logic engine analyze your battle history.</p>
        </motion.div>

        {!analysis ? (
          <button onClick={fetchAnalysis} className="px-8 py-4 bg-linear-to-r from-[#7c3aed] to-[#4f46e5] rounded-full font-bold text-xl flex items-center gap-3 shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-105 transition-transform mt-10">
            <Sparkles /> Consult the Oracle
          </button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Oracle Message & Weak Topics */}
            <div className="space-y-6">
              <GlowCard className="p-6 border-cyan-500/30 bg-cyan-950/10 min-h-[150px]">
                <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5"/> The Oracle Speaks...</h3>
                <p className="text-xl text-white/90 leading-relaxed font-serif italic">"{typewriterText}"</p>
                {isTyping && <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1" />}
              </GlowCard>

              <GlowCard className="p-6 border-red-500/30 bg-red-950/10">
                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/> Identified Weaknesses</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.weakTopics.map((topic: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-sm font-semibold capitalize">
                      {topic.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </div>

            {/* Right Column: Suggested Quest & Practice */}
            <div className="space-y-6">
              <GlowCard className="p-6 border-yellow-500/50 bg-linear-to-br from-yellow-950/30 to-orange-900/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
                <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2"><Target className="w-5 h-5"/> Recommended Next Quest</h3>
                <p className="text-3xl font-black text-white capitalize">{analysis.nextSuggestedTopic.replace('-', ' ')}</p>
              </GlowCard>

              <GlowCard className="p-6 border-purple-500/30">
                <h3 className="text-purple-400 font-bold mb-4">Quick Practice Run</h3>
                <div className="space-y-4">
                  {analysis.practiceQuestions.map((q: any, i: number) => (
                    <div key={i} className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <p className="text-sm font-semibold text-white/80 mb-2">Q: {q.question}</p>
                      <p className="text-xs text-[#14b8a6] bg-[#14b8a6]/10 inline-block px-2 py-1 rounded">A: {q.answer}</p>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}
