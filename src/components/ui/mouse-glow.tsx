"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface MouseGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
}

export function MouseGlow({
  children,
  className,
  glowColor = "rgba(255,255,255,0.06)",
  glowSize = 600,
  glowOpacity = 1,
}: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Glow element */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500"
        style={{
          left: position.x,
          top: position.y,
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          opacity: isHovering ? glowOpacity : 0,
        }}
      />
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
