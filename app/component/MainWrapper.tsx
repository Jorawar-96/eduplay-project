"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(pathname);
  
  return (
    <main style={{
      marginLeft: isPublic ? "0px" : "240px",
      minHeight: "100vh",
      width: isPublic ? "100%" : "calc(100% - 240px)",
      transition: "margin-left 0.3s ease"
    }}>
      {children}
    </main>
  );
}