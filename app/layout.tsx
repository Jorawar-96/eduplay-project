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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', background: '#0a0015' }}>
        <AuthProvider>
          <SidebarWrapper />
          <main style={{ flex: 1, marginLeft: 'auto', minHeight: '100vh', background: '#0a0015' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}