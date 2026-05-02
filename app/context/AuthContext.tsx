"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  total_xp: number;
  current_level: number;
  coins: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isTeacher: () => boolean;
  isStudent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // On initial load, check if we have a token in localStorage
    const storedToken = localStorage.getItem("eduplay_token");
    if (storedToken) {
      verifyToken(storedToken);
    }
  }, []);

  const verifyToken = async (storedToken: string) => {
    try {
      const res = await axios.get(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      setToken(storedToken);
      setUser(res.data.user);
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    }
  };

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("eduplay_token", newToken);
    // Set cookie for Next.js middleware to read
    document.cookie = `token=${newToken}; path=/`;
    document.cookie = `role=${newUser.role}; path=/`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("eduplay_token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  const isTeacher = () => user?.role === "teacher";
  const isStudent = () => user?.role === "student";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isTeacher, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
