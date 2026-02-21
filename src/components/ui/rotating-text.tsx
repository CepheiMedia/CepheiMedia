"use client";

import { useState, useEffect, useCallback } from "react";

interface RotatingTextProps {
  phrases: string[];
  interval?: number;
}

export function RotatingText({
  phrases,
  interval = 3200,
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState<"visible" | "exiting" | "entering">("visible");

  const cycle = useCallback(() => {
    setAnimState("exiting");

    const exitTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      setAnimState("entering");
    }, 300);

    const enterTimer = setTimeout(() => {
      setAnimState("visible");
    }, 350);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(enterTimer);
    };
  }, [phrases.length]);

  useEffect(() => {
    const id = setInterval(cycle, interval);
    return () => clearInterval(id);
  }, [cycle, interval]);

  const style: React.CSSProperties = {
    display: "inline-block",
    transition: "all 300ms ease",
    ...(animState === "exiting"
      ? { opacity: 0, transform: "translateY(14px)", filter: "blur(8px)" }
      : animState === "entering"
        ? { opacity: 0, transform: "translateY(-14px)", filter: "blur(8px)" }
        : { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }),
  };

  return <span style={style}>{phrases[currentIndex]}</span>;
}
