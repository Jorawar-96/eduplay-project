"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Snowflake, HelpCircle, ArrowLeft, RotateCcw, Swords } from "lucide-react";
import axios from "axios";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { StarBackground } from "../../component/StarBackground";
import { GlowCard } from "../../component/GlowCard";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// TypeScript interfaces for our Question data
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  correctText?: string;
  explanation: string;
}

const fallbackQuestions = [
  {
    id: 1,
    question: "What is the output of print(2**3)?",
    options: ["6", "8", "9", "5"],
    correct: "B",
    explanation: "** is power operator, 2^3 = 8"
  },
  {
    id: 2, 
    question: "Which keyword defines a function in Python?",
    options: ["func", "def", "function", "define"],
    correct: "B",
    explanation: "def keyword is used to define functions"
  },
  {
    id: 3,
    question: "What data type is [1,2,3] in Python?",
    options: ["tuple", "dict", "list", "array"],
    correct: "C",
    explanation: "Square brackets create a list"
  },
  {
    id: 4,
    question: "How do you take user input in Python?",
    options: ["scan()", "input()", "read()", "get()"],
    correct: "B",
    explanation: "input() function reads user input"
  },
  {
    id: 5,
    question: "What does len('hello') return?",
    options: ["4", "5", "6", "error"],
    correct: "B",
    explanation: "len() counts characters, 'hello' has 5"
  }
];

export default function BossFight({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = React.use(params);
  const router = useRouter();
  const topic = topicId; // e.g. "python-basics"

  // Core Game State
  const [gamePhase, setGamePhase] = useState<"loading" | "playing" | "victory" | "defeat">("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Player & Boss Stats
  const [monsterHP, setMonsterHP] = useState(500);
  const [playerEnergy, setPlayerEnergy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  
  // Inventory & Modifiers
  const [inventory, setInventory] = useState({ shield: 1, timeFreezer: 1, hint: 1 });
  const [isTimerFrozen, setIsTimerFrozen] = useState(false);
  const [shieldActive, setShieldActive] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  
  // Visual Feedback State
  const [score, setScore] = useState({ correct: 0, wrong: 0, xpEarned: 0 });
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; color: string }[]>([]);
  const [monsterShake, setMonsterShake] = useState(false);

  // 1. Fetch Questions from our Node.js Backend on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API}/api/quiz/generate?topic=` + topic + '&difficulty=easy');
        
        // Map answer letter (A, B, C, D) to actual text value
        const formattedQuestions = res.data.questions.map((q: any) => {
          const index = ['A', 'B', 'C', 'D'].indexOf(q.correct);
          return {
            ...q,
            correctText: index !== -1 ? q.options[index] : q.correct
          };
        });
        
        setQuestions(formattedQuestions);
        setGamePhase("playing");
      } catch (err) {
        console.error("Quiz fetch failed:", err);
        // Fallback: use hardcoded questions if API fails
        const formattedFallback = fallbackQuestions.map((q: any) => {
          const index = ['A', 'B', 'C', 'D'].indexOf(q.correct);
          return {
            ...q,
            correctText: index !== -1 ? q.options[index] : q.correct
          };
        });
        setQuestions(formattedFallback);
        setGamePhase("playing");
      }
    };
    fetchQuestions();
  }, [topic]);

  // 2. Countdown Timer Logic
  useEffect(() => {
    if (gamePhase !== "playing" || isTimerFrozen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleMiss("Time's up!"); // Run out of time is a miss!
          return 30; // reset for next question
        }
        return prev - 1;
      });
      setTotalTimeTaken(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, isTimerFrozen, currentIndex]);

  // Helper to spawn floating text over characters
  const spawnFloatingText = (text: string, color: string) => {
    const id = Date.now();
    setFloatingTexts(prev => [...prev, { id, text, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 2000);
  };

  // 3. Handle Answer Selection
  const handleAnswer = (selectedOption: string) => {
    const currentQ = questions[currentIndex];
    // compare against the actual text instead of the letter "B", "C"
    const isCorrect = selectedOption === currentQ.correctText;

    let currentMonsterHP = monsterHP;
    let currentPlayerEnergy = playerEnergy;

    if (isCorrect) {
      // CRITICAL HIT! 
      // Base damage 80. Faster answers do more damage!
      const speedBonus = timeLeft > 15 ? 20 : 0; 
      const damage = 80 + speedBonus;
      
      currentMonsterHP = Math.max(0, monsterHP - damage);
      setMonsterHP(currentMonsterHP);
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      spawnFloatingText(`CRITICAL HIT! -${damage} HP`, "text-green-400");
      
      // Trigger Boss Shake Animation
      setMonsterShake(true);
      setTimeout(() => setMonsterShake(false), 500);

    } else {
      setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      
      if (shieldActive) {
        spawnFloatingText("BLOCKED!", "text-blue-400");
        setShieldActive(false); // consume shield
      } else {
        currentPlayerEnergy = Math.max(0, playerEnergy - 20);
        setPlayerEnergy(currentPlayerEnergy);
        spawnFloatingText(`MISS! -20 Energy`, "text-red-500");
      }
    }

    moveToNextQuestion(currentMonsterHP, currentPlayerEnergy);
  };

  const handleMiss = (msg: string) => {
    setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    
    if (shieldActive) {
      spawnFloatingText("BLOCKED!", "text-blue-400");
      setShieldActive(false); // consume shield
    } else {
      setPlayerEnergy(prev => {
        const newEnergy = Math.max(0, prev - 20);
        // Handle defeat immediately if time runs out and brings energy to 0
        if (newEnergy <= 0) setTimeout(() => setGamePhase("defeat"), 1000);
        return newEnergy;
      });
      spawnFloatingText(`${msg} -20 Energy`, "text-red-500");
    }
  };

  const moveToNextQuestion = (currentMonsterHP: number, currentPlayerEnergy: number) => {
    setHiddenOptions([]); // reset hints
    
    setTimeout(() => {
      // Check win/loss immediately after state updates
      if (currentPlayerEnergy <= 0) {
         setGamePhase("defeat");
         return;
      }
      if (currentMonsterHP <= 0) {
         handleVictory();
         return;
      }

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(30); // reset timer
      } else {
        // Out of questions. Did we kill it?
        if (currentMonsterHP <= 0) handleVictory();
        else setGamePhase("defeat");
      }
    }, 1000);
  };

  // 4. Handle Victory & Submit to DB
  const handleVictory = async () => {
    setGamePhase("victory");
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    
    // Submit to backend
    try {
      const res = await axios.post(`${API}/api/quiz/submit`, {
        userId: 'demo-user', // Hardcoded for now
        quizId: 'quiz_123',
        answers: [{ isCorrect: true }], // Simplified for demo
        timeTaken: totalTimeTaken
      });
      setScore(prev => ({ ...prev, xpEarned: res.data.xpEarned }));
    } catch (err) {
      console.log(err);
    }
  };

  // 5. Inventory Handlers
  const useShield = () => {
    if (inventory.shield > 0 && !shieldActive) {
      setShieldActive(true);
      setInventory(prev => ({ ...prev, shield: 0 }));
      spawnFloatingText("Shield Activated!", "text-blue-400");
    }
  };

  const useTimeFreezer = () => {
    if (inventory.timeFreezer > 0) {
      setIsTimerFrozen(true);
      setInventory(prev => ({ ...prev, timeFreezer: 0 }));
      spawnFloatingText("Time Frozen!", "text-cyan-300");
      setTimeout(() => setIsTimerFrozen(false), 10000); // 10 seconds freeze
    }
  };

  const useHint = () => {
    if (inventory.hint > 0) {
      const currentQ = questions[currentIndex];
      const wrongOptions = currentQ.options.filter(opt => opt !== currentQ.correct);
      // Hide 2 wrong options randomly
      setHiddenOptions([wrongOptions[0], wrongOptions[1]]);
      setInventory(prev => ({ ...prev, hint: 0 }));
      spawnFloatingText("Hint Applied!", "text-yellow-400");
    }
  };

  if (gamePhase === "loading") return <div className="min-h-screen bg-[#0a0015] text-white flex items-center justify-center font-black text-3xl">Loading Battle...</div>;

  return (
    <div className="min-h-screen bg-[#0a0015] text-white font-sans overflow-hidden relative">
      <StarBackground />

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-screen">
        
        {/* === BOSS SECTION (TOP) === */}
        <div className="flex flex-col items-center justify-center mb-8 relative">
          {/* Floating Damage Text */}
          <AnimatePresence>
            {floatingTexts.map(ft => (
              <motion.div key={ft.id} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -50 }} transition={{ duration: 1 }} className={`absolute top-0 font-black text-xl z-20 ${ft.color}`}>
                {ft.text}
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div animate={monsterShake ? { x: [-10, 10, -10, 10, 0] } : {}} className="text-8xl mb-4 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
            🐉
          </motion.div>
          
          {/* Boss HP Bar */}
          <div className="w-full max-w-md bg-black/50 rounded-full h-6 border-2 border-red-900 overflow-hidden relative">
            <motion.div className="h-full bg-linear-to-r from-red-600 to-orange-500" initial={{ width: "100%" }} animate={{ width: `${(monsterHP / 500) * 100}%` }} transition={{ duration: 0.5 }} />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black drop-shadow-md">BOSS HP: {monsterHP} / 500</span>
          </div>
        </div>

        {/* === QUESTION SECTION (MIDDLE) === */}
        {gamePhase === "playing" && (
          <GlowCard className="flex-1 flex flex-col p-6 mb-8 relative border-purple-500/30">
            
            {/* Timer Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
               <motion.div className={`h-full ${timeLeft <= 10 ? 'bg-red-500' : 'bg-cyan-400'}`} animate={{ width: `${(timeLeft / 30) * 100}%` }} transition={{ duration: 1, ease: "linear" }} />
            </div>
            <div className={`text-center font-bold text-sm mb-4 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
              {isTimerFrozen ? "❄️ Timer Frozen" : `⏳ ${timeLeft}s`}
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center leading-snug text-white/90">
              {questions[currentIndex].question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              {questions[currentIndex].options.map((option, i) => {
                if (hiddenOptions.includes(option)) return <div key={i} className="opacity-0" />; // Hidden by Hint
                
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500 transition-all font-semibold text-lg text-left"
                  >
                    {["A", "B", "C", "D"][i]}. {option}
                  </motion.button>
                )
              })}
            </div>
          </GlowCard>
        )}

        {/* === PLAYER & INVENTORY SECTION (BOTTOM) === */}
        {gamePhase === "playing" && (
          <div className="flex flex-col gap-4">
             {/* Player Energy Bar */}
             <div className="flex items-center gap-4 w-full">
                <div className="text-4xl relative">
                  ⚔️ {shieldActive && <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping" />}
                </div>
                <div className="flex-1 bg-black/50 rounded-full h-4 border border-green-900 overflow-hidden relative">
                  <motion.div className="h-full bg-linear-to-r from-green-600 to-emerald-400" initial={{ width: "100%" }} animate={{ width: `${playerEnergy}%` }} />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">ENERGY: {playerEnergy}%</span>
                </div>
             </div>

             {/* Inventory Buttons */}
             <div className="flex justify-center gap-4 mt-2">
               <button onClick={useShield} disabled={inventory.shield === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border ${inventory.shield > 0 ? 'bg-blue-900/40 text-blue-400 border-blue-500/50 hover:bg-blue-800/60' : 'bg-gray-800/30 text-gray-500 border-gray-700 cursor-not-allowed'}`}>
                 <Shield className="w-4 h-4" /> Shield {inventory.shield}
               </button>
               <button onClick={useTimeFreezer} disabled={inventory.timeFreezer === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border ${inventory.timeFreezer > 0 ? 'bg-cyan-900/40 text-cyan-400 border-cyan-500/50 hover:bg-cyan-800/60' : 'bg-gray-800/30 text-gray-500 border-gray-700 cursor-not-allowed'}`}>
                 <Snowflake className="w-4 h-4" /> Freeze {inventory.timeFreezer}
               </button>
               <button onClick={useHint} disabled={inventory.hint === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border ${inventory.hint > 0 ? 'bg-yellow-900/40 text-yellow-400 border-yellow-500/50 hover:bg-yellow-800/60' : 'bg-gray-800/30 text-gray-500 border-gray-700 cursor-not-allowed'}`}>
                 <HelpCircle className="w-4 h-4" /> Hint {inventory.hint}
               </button>
             </div>
          </div>
        )}

        {/* === VICTORY SCREEN === */}
        {gamePhase === "victory" && (
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-yellow-300 to-yellow-600 drop-shadow-xl mb-4">VICTORY!</h1>
              <p className="text-xl text-white/70 mb-8">The Boss was defeated in {totalTimeTaken} seconds!</p>
              <GlowCard className="p-8 mb-8 border-yellow-500/50 bg-yellow-900/10 inline-block">
                <div className="text-4xl font-black text-yellow-400">+{score.xpEarned} XP</div>
                <div className="text-sm text-yellow-200/50 mt-2">Includes Speed Bonus</div>
              </GlowCard>
              <button onClick={() => router.push('/map')} className="px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-xl flex items-center gap-3 hover:scale-105 transition-transform">
                 <ArrowLeft className="w-6 h-6" /> Continue Journey
              </button>
           </motion.div>
        )}

        {/* === DEFEAT SCREEN === */}
        {gamePhase === "defeat" && (
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-b from-red-500 to-red-800 drop-shadow-xl mb-4">DEFEATED</h1>
              <p className="text-xl text-white/70 mb-6">You ran out of Energy.</p>
              
              <GlowCard className="p-6 mb-8 w-full text-left max-h-[40vh] overflow-y-auto border-red-500/30">
                 <h3 className="font-bold text-red-400 mb-4 border-b border-red-500/20 pb-2">Study Guide:</h3>
                 {questions.map((q, i) => (
                    <div key={i} className="mb-4">
                      <p className="font-semibold text-white/90 text-sm">{q.question}</p>
                      <p className="text-green-400 text-xs font-bold mt-1">Answer: {q.correct}</p>
                      <p className="text-white/50 text-xs mt-1 italic">{q.explanation}</p>
                    </div>
                 ))}
              </GlowCard>

              <button onClick={() => window.location.reload()} className="px-8 py-4 bg-linear-to-r from-red-600 to-red-900 rounded-xl font-bold text-xl flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                 <RotateCcw className="w-6 h-6" /> Try Again
              </button>
           </motion.div>
        )}
      </div>
    </div>
  );
}
