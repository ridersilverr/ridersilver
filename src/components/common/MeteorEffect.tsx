"use client";

import React, { useEffect, useState } from "react";

interface MeteorEffectProps {
  count?: number;
  sparkleCount?: number;
  className?: string;
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
  sparkleCount = 20,
  className = "",
}: MeteorEffectProps) {
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  useEffect(() => {
    // Sabit parıldayan mikro altın ve gümüş yıldız ışıltıları
    const generatedSparkles: SparkleItem[] = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      top: `${Math.floor(Math.random() * 88) + 5}%`,
      left: `${Math.floor(Math.random() * 92) + 4}%`,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(Math.random() * 2.5 + 2.2).toFixed(2)}s`,
      size: Math.random() > 0.6 ? 3 : 2,
    }));

    setSparkles(generatedSparkles);
  }, [sparkleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Parıldayan Zarif Altın & Gümüş Mücevher Yıldız Işıltıları */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-gradient-to-r from-gold-300 via-amber-200 to-white shadow-[0_0_8px_1.5px_rgba(212,175,55,0.7)] animate-sparkle-pulse pointer-events-none"
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

