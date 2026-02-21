"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ReactNode, useRef, useState, useEffect } from "react";
import { Sparkline } from "./sparkline";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: ReactNode;
  icon: ReactNode;
  unavailable?: boolean;
  unavailableMessage?: string;
  className?: string;
  trend?: { direction: "up" | "down"; value: string };
  sparklineData?: number[];
  sparklineColor?: string;
}

function AnimatedValue({ value }: { value: string | number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayed, setDisplayed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Try to extract a number for animation
  const strValue = String(value);
  const numMatch = strValue.match(/([\d,]+\.?\d*)/);

  if (!numMatch || !displayed) {
    return (
      <p
        ref={ref}
        className={cn(
          "text-2xl font-bold tracking-tight text-white transition-all duration-700",
          displayed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {displayed ? value : "\u00A0"}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      className="text-2xl font-bold tracking-tight text-white"
    >
      {value}
    </p>
  );
}

export function KPICard({
  label,
  value,
  subtext,
  icon,
  unavailable = false,
  unavailableMessage = "Connect ads for data",
  className,
  trend,
  sparklineData,
  sparklineColor = "#3b82f6",
}: KPICardProps) {
  return (
    <div
      className={cn(
        "glow-border glow-hover group relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-6 transition-all duration-300",
        unavailable && "opacity-60",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-medium text-zinc-400">{label}</p>
          {unavailable ? (
            <div className="space-y-1">
              <p className="text-2xl font-bold text-zinc-600">--</p>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{unavailableMessage}</span>
              </div>
            </div>
          ) : (
            <>
              <AnimatedValue value={value} />
              <div className="flex items-center gap-2">
                {trend && (
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      trend.direction === "up" ? "text-emerald-400" : "text-red-400"
                    )}
                  >
                    {trend.direction === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {trend.value}
                  </span>
                )}
                {subtext && (
                  <p className="text-xs text-zinc-500">{subtext}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className={cn(
              "rounded-lg p-2.5 transition-all duration-300",
              unavailable
                ? "bg-zinc-800 text-zinc-600"
                : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/15 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]"
            )}
          >
            {icon}
          </div>
          {sparklineData && sparklineData.length > 1 && !unavailable && (
            <Sparkline
              data={sparklineData}
              color={sparklineColor}
              width={64}
              height={24}
            />
          )}
        </div>
      </div>
    </div>
  );
}
