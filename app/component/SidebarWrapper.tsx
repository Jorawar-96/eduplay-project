"use client";

import { usePathname } from "next/navigation";
import { GameSidebar } from "./GameSidebar";
import { useAuth } from "../context/AuthContext";

export function SidebarWrapper() {
  const pathname = usePathname();
  const publicRoutes = ["/", "/login", "/register"];
  
  if (publicRoutes.includes(pathname)) return null;
  
  return <GameSidebar />;
}