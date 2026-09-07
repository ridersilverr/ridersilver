"use client";

import React, { useEffect, useState } from "react";

interface MeteorEffectProps {
  count?: number;
  sparkleCount?: number;
  className?: string;
}

interface MeteorItem {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  size: number;
}

interface SparkleItem {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  size: number;
}

export function MeteorEffect({
  count = 14,
  sparkleCount = 16,
  className = "",
}: MeteorEffectProps) {
  const [meteors, setMeteors] = useState<MeteorItem[]>([]);
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  useEffect(() => {
    // Rastgele pozisyon ve zamanlamayla kayan meteorlar
    const generatedMeteors: MeteorItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 75) - 15}%`,
      left: `${Math.floor(Math.random() * 110) - 5}%`,
      delay: `${(Math.random() * 5 + 0.2).toFixed(2)}s`,
      duration: `${(Math.random() * 2 + 2.5).toFixed(2)}s`,
      size: Math.random() > 0.5 ? 130 : 90,
    }));

    // Sabit parildayan mikro altin isiltilar
    const generatedSparkles: SparkleItem[] = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 85) + 5}%`,
      left: `${Math.floor(Math.random() * 90) + 5}%`,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(Math.random() * 2 + 2).toFixed(2)}s`,
      size: Math.random() > 0.5 ? 3 : 2,
    }));

    setMeteors(generatedMeteors);
    setSparkles(generatedSparkles);
  }, [count, sparkleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* 1. Kayan Altin/Gumus Meteorlar */}
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-1 w-1 rounded-full bg-gold-300 shadow-[0_0_12px_2px_rgba(212,175,55,0.9)] animate-meteor pointer-events-none"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        >
          {/* Meteor Isik Kuyrugu */}
          <span
            className="absolute top-1/2 -translate-y-1/2 transform bg-gradient-to-r from-gold-400 via-amber-200/70 to-transparent"
            style={{
              width: `${m.size}px`,
              height: "1.5px",
            }}
          />
        </span>
      ))}

      {/* 2. Parildayan Altin Mucevher Isiltilari */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gradient-to-r from-gold-300 to-amber-200 shadow-[0_0_8px_1px_rgba(212,175,55,0.7)] animate-sparkle-pulse pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}
