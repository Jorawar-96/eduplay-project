"use client";

import { Flame } from "lucide-react";

export function GameNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-[rgba(255,255,255,0.03)] backdrop-blur-md border-b border-[rgba(255,255,255,0.07)]">
      <div className="text-2xl font-black tracking-tighter">
        <span className="text-white">Edu</span><span className="text-[#f59e0b]">Play</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Streak Pill */}
        <div className="flex items-center gap-2 bg-linear-to-r from-[#f59e0b]/20 to-[#ef4444]/20 px-4 py-1.5 rounded-full border border-[#f59e0b]/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          <Flame className="text-[#f59e0b] w-4 h-4" />
          <span className="font-bold text-sm text-[#f59e0b]">7 Days</span>
        </div>
        {/* Avatar Circle with gradient border */}
        <div className="w-10 h-10 rounded-full border-2 border-transparent bg-linear-to-r from-[#7c3aed] to-[#f59e0b] p-0.5 cursor-pointer hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-[#0a0015] flex items-center justify-center">
             <span className="text-sm font-bold text-white">H</span>
          </div>
        </div>
      </div>
    </nav>
  );
}