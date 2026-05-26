"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Adjust import path based on your setup

const studentNavItems = [
  { icon: "🗺️", label: "Knowledge Map", href: "/map" },
  { icon: "⚔️", label: "Boss Fight", href: "/boss-fight" },
  { icon: "🏆", label: "Leaderboard", href: "/leaderboard" },
  { icon: "👥", label: "Guild", href: "/guilds" },
  { icon: "🛒", label: "Shop", href: "/shop" },
  { icon: "🔮", label: "AI Oracle", href: "/oracle" },
];

const teacherNavItems = [
  { icon: "👨‍🏫", label: "Teacher Panel", href: "/teacher" },
  { icon: "🏆", label: "Leaderboard", href: "/leaderboard" },
  { icon: "🔮", label: "AI Oracle", href: "/oracle" },
  { icon: "🛒", label: "Shop", href: "/shop" },
];

export function GameSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isTeacher = user?.role === 'teacher';

  const navItems = isTeacher ? teacherNavItems : studentNavItems;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen bg-[#0a0015] border-r border-[rgba(255,255,255,0.05)] flex flex-col relative z-20">
      {/* Profile Section */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#7c3aed]/20 border border-[#7c3aed]/40 rounded-full flex items-center justify-center text-2xl">
            {isTeacher ? "👨‍🏫" : "👤"}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{user?.name || "Player"}</h3>
            <p className="text-[#14b8a6] text-sm font-semibold">
              {isTeacher ? "👨‍🏫 Teacher" : "Lv.1 Scholar"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                isActive 
                  ? "bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                  : "text-white/60 hover:text-white hover:bg-[rgba(255,255,255,0.05)]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-red-400 hover:bg-[rgba(239,68,68,0.1)]"
        >
          <span className="text-xl">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}