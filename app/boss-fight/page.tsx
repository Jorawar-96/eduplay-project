"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { StarBackground } from "../component/StarBackground";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BossFightTopicSelect() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${API}/api/teacher/assignments`);
        setAssignments(res.data.assignments);
      } catch (err) {
        console.error("Failed to load assignments", err);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0015] text-white p-8 relative">
      <StarBackground />
      
      {/* ⚔️ Class Assignments Section */}
      {assignments.length > 0 && (
        <div className="max-w-5xl mx-auto mb-12 relative z-10">
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
            ⚔️ Active Class Assignments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment: any) => (
              <div 
                key={assignment.id} 
                className="relative p-6 rounded-2xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.4)] animate-[pulse_3s_ease-in-out_infinite] hover:animate-none transition-all overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500" />
                
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-black rounded-full mb-4 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    📢 CLASS ASSIGNMENT
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-wider">{assignment.topic.replace('-', ' ')}</h3>
                  <p className="text-red-300 text-sm font-bold capitalize mt-1 border border-red-500/30 bg-red-500/10 inline-block px-2 py-0.5 rounded-md">
                    Threat Level: {assignment.difficulty}
                  </p>
                </div>

                <button 
                  onClick={() => router.push(`/boss-fight/${assignment.topic}?difficulty=${assignment.difficulty}&isAssignment=true`)}
                  className="mt-auto w-full py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl font-black text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-transform"
                >
                  ⚔️ Fight Now
                </button>
                <p className="text-center text-xs text-white/50 mt-3 font-semibold uppercase tracking-wider">
                  Deployed by Teacher
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* --- Put your standard Topic Cards below here --- */}
      
    </div>
  );
}