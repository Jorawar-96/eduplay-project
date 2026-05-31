import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { SidebarWrapper } from "./component/SidebarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduPlay – Gamified Learning Platform",
  description: "Turn boring studies into epic Boss Fights. Earn XP, unlock badges, climb the leaderboard!",
  icons: {
    icon: "/favicon.ico",
  }
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Replace with your actual implementation of collapse state (e.g. from Context/Zustand/Redux)
  const isCollapsed = false; 

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SidebarWrapper />
          <main style={{ 
            marginLeft: isCollapsed ? '70px' : '240px',
            minHeight: '100vh',
            transition: 'margin-left 0.3s ease'
          }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
