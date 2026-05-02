"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";

const navItems = [
  { icon: "🗺️", label: "Knowledge Map", href: "/map" },
  { icon: "⚔️", label: "Boss Fight", href: "/boss-fight" },
  { icon: "🏆", label: "Leaderboard", href: "/leaderboard" },
  { icon: "👥", label: "Guild", href: "/guilds" },
  { icon: "🛒", label: "Shop", href: "/shop" },
  { icon: "🔮", label: "AI Oracle", href: "/oracle" },
  { icon: "👨‍🏫", label: "Teacher Panel", href: "/teacher", onlyFor: "teacher" }
];

export default function GameSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const pathname = usePathname();
  const { user, logout, isTeacher } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide sidebar entirely on auth pages or root
  if (pathname === '/login' || pathname === '/register' || pathname === '/') return null;

  return (
    <>
      {/* Mobile Hamburger Button */}
      {!isMobileOpen && (
        <button 
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white shadow-lg backdrop-blur-md"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed && !isMobile ? 70 : 240,
          x: isMobile ? (isMobileOpen ? 0 : -240) : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed md:sticky top-0 left-0 h-screen bg-[rgba(255,255,255,0.03)] border-r border-[rgba(255,255,255,0.07)] z-[70] flex flex-col backdrop-blur-xl whitespace-nowrap"
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4 h-20 border-b border-[rgba(255,255,255,0.05)] relative">
          <div className="font-black tracking-tighter text-2xl flex-shrink-0 flex items-center justify-center w-full">
            {isCollapsed && !isMobile ? (
              <span className="text-white">EP</span>
            ) : (
              <><span className="text-white">Edu</span><span className="text-[#f59e0b]">Play</span></>
            )}
          </div>
          
          {/* Collapse Toggle Button (Desktop only) */}
          {!isMobile && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3.5 top-6 w-7 h-7 rounded-full bg-[#7c3aed] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-50 text-[10px]"
            >
              <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
                ◀
              </motion.div>
            </button>
          )}
        </div>

        {/* User Info Card */}
        {user && (
          <div className={`p-4 my-4 mx-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex items-center ${isCollapsed && !isMobile ? 'justify-center mx-1 p-2' : 'gap-3'} transition-all`}>
             <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#7c3aed] to-[#f59e0b] p-0.5 shrink-0">
               <div className="w-full h-full rounded-full bg-[#0a0015] flex items-center justify-center text-sm font-bold text-white">
                 {user.name?.charAt(0).toUpperCase() || 'U'}
               </div>
             </div>
             {(!isCollapsed || isMobile) && (
               <div className="flex flex-col overflow-hidden">
                 <span className="font-bold text-sm text-white truncate">{user.name}</span>
                 <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] font-bold text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-full">Lv.{user.current_level || 1} Scholar</span>
                 </div>
                 <span className="text-xs font-bold text-[#f59e0b] mt-1">{user.total_xp || 0} XP</span>
               </div>
             )}
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-2 no-scrollbar">
          {navItems.map((item, i) => {
            if (item.onlyFor === 'teacher' && !isTeacher()) return null;
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative flex items-center ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start'} gap-3 p-3 rounded-xl cursor-pointer group transition-all duration-200 ${isActive ? 'bg-[rgba(124,58,237,0.25)]' : 'hover:bg-[rgba(124,58,237,0.2)]'}`}
                  style={{ borderLeft: isActive ? '2px solid #f59e0b' : '2px solid transparent' }}
                >
                  {!isActive && <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-[#7c3aed] scale-y-0 group-hover:scale-y-100 transition-transform origin-center" />}
                  
                  <span className="text-xl shrink-0">{item.icon}</span>
                  
                  {(!isCollapsed || isMobile) && (
                    <span className={`font-semibold text-sm ${isActive ? 'text-[#f59e0b]' : 'text-white/70 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  )}

                  {(isCollapsed && !isMobile) && (
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-black border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.05)] space-y-3">
          <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center p-2' : 'gap-3 p-3'} bg-linear-to-r from-[#f59e0b]/20 to-[#ef4444]/20 rounded-xl border border-[#f59e0b]/30`}>
            <span className="text-lg shrink-0">🔥</span>
            {(!isCollapsed || isMobile) && <span className="font-bold text-xs text-[#f59e0b]">7 Day Streak</span>}
          </div>
          
          <button 
            onClick={logout}
            className={`w-full flex items-center ${isCollapsed && !isMobile ? 'justify-center p-2' : 'gap-3 p-3'} rounded-xl text-red-400 hover:bg-red-500/10 transition-colors`}
          >
            <span className="text-xl shrink-0">🚪</span>
            {(!isCollapsed || isMobile) && <span className="font-semibold text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
