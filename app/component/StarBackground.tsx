"use client";

import { useEffect, useState } from "react";

export function StarBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 75 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1, // 1px to 3px
        delay: Math.random() * 5,    // 0s to 5s delay
      }));
    };
    setStars(generateStars());
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0015] pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white/70 animate-pulse"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, animationDelay: `${star.delay}s`, animationDuration: `${Math.random() * 3 + 2}s` }}
        />
      ))}
    </div>
  );
}