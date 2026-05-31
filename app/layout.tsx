import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { SidebarWrapper } from "./component/SidebarWrapper";
import { MainWrapper } from "./component/MainWrapper";

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
  return (
    <html lang="en">
      <body style={{ 
        display: 'flex', 
        background: '#0a0015',
        margin: 0,
        padding: 0
      }}>
        <AuthProvider>
          <SidebarWrapper />
          <MainWrapper>
            {children}
          </MainWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
