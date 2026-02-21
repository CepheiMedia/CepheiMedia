"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 8,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * tiltAmount;
      const rotateY = (x - 0.5) * tiltAmount;

      setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
      setGlarePos({ x: x * 100, y: y * 100 });
    },
    [tiltAmount]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn("relative", className)}
      style={{
        transform: transform || "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovering ? "transform 100ms ease-out" : "transform 400ms ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      {/* Glare overlay */}
      {glareEnabled && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: "opacity 400ms ease-out",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
