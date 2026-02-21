"use client";

import { useState, useEffect } from "react";
import { Sparkles, ChevronRight, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target, Zap } from "lucide-react";

interface Insight {
  id: string;
  type: "positive" | "warning" | "suggestion" | "milestone";
  title: string;
  description: string;
  metric?: string;
  change?: string;
  icon: typeof TrendingUp;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "positive",
    title: "CPL dropped 12% this week",
    description: "Your Meta retargeting campaign is outperforming — cost per lead went from $24.50 to $21.54. Consider allocating more budget here.",
    metric: "$21.54",
    change: "-12%",
    icon: TrendingDown,
  },
  {
    id: "2",
    type: "suggestion",
    title: "Scale Spring Lead Gen campaign",
    description: "ROAS is holding at 4.2x with room to grow. Increasing daily budget by 20% is projected to add ~15 leads/mo without impacting efficiency.",
    metric: "4.2x ROAS",
    icon: Target,
  },
  {
    id: "3",
    type: "milestone",
    title: "143 leads this quarter",
    description: "You've already hit 143 leads this quarter, surpassing last quarter's total of 118. You're tracking 21% ahead of pace.",
    metric: "143",
    change: "+21%",
    icon: Zap,
  },
  {
    id: "4",
    type: "warning",
    title: "Google Ads CTR declining",
    description: "Click-through rate on Brand Awareness Q1 dropped from 3.2% to 2.6% over the past 2 weeks. Consider refreshing ad copy or testing new headlines.",
    metric: "2.6% CTR",
    change: "-19%",
    icon: AlertTriangle,
  },
  {
    id: "5",
    type: "suggestion",
    title: "Try video creatives on Meta",
    description: "Accounts in your vertical see 35% higher engagement with video ads. Your current mix is 100% static — testing 2-3 video creatives could improve results.",
    icon: Lightbulb,
  },
  {
    id: "6",
    type: "positive",
    title: "Best performing week in 3 months",
    description: "This week generated 18 leads at $19.20 CPL — your most efficient week since November. The landing page changes from last sprint are paying off.",
    metric: "$19.20",
    change: "-22%",
    icon: TrendingUp,
  },
];

const typeStyles: Record<string, { border: string; bg: string; text: string; glow: string; dot: string }> = {
  positive: {
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.06]",
    text: "text-emerald-400",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.08)]",
    dot: "bg-emerald-400",
  },
  warning: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.06]",
    text: "text-amber-400",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.08)]",
    dot: "bg-amber-400",
  },
  suggestion: {
    border: "border-blue-500/20",
    bg: "bg-blue-500/[0.06]",
    text: "text-blue-400",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.08)]",
    dot: "bg-blue-400",
  },
  milestone: {
    border: "border-purple-500/20",
    bg: "bg-purple-500/[0.06]",
    text: "text-purple-400",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.08)]",
    dot: "bg-purple-400",
  },
};

export function AIInsights() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate insights
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % insights.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const active = insights[activeIndex];
  const style = typeStyles[active.type];
  const Icon = active.icon;

  return (
    <div
      className="glass-card glow-hover rounded-xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
          </div>
          <div>
            <h2 className="font-semibold text-white">AI Insights</h2>
            <p className="text-xs text-zinc-500">Auto-generated performance analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-[10px] font-medium text-zinc-400">
            {insights.length} insights
          </span>
        </div>
      </div>

      {/* Active Insight */}
      <div className="p-6">
        <div
          className={`rounded-xl border p-5 transition-all duration-300 ${style.border} ${style.bg} ${style.glow} ${
            isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`rounded-lg p-2 ${style.bg} ${style.text}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{active.title}</h3>
                {active.change && (
                  <span className={`text-xs font-bold ${style.text}`}>
                    {active.change}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                {active.description}
              </p>
              {active.metric && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1">
                  <span className="text-xs text-zinc-500">Key metric:</span>
                  <span className="font-mono text-sm font-bold text-white">{active.metric}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insight navigation dots */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {insights.map((insight, i) => {
              const dotStyle = typeStyles[insight.type];
              return (
                <button
                  key={insight.id}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setActiveIndex(i);
                      setIsTransitioning(false);
                    }, 200);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? `w-6 ${dotStyle.dot}`
                      : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              );
            })}
          </div>
          <button className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-blue-400">
            View all insights
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
