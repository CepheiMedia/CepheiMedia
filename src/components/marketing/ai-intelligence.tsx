"use client";

import { BrainCircuit, Activity, Zap, MessageSquare } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { MouseGlow } from "@/components/ui/mouse-glow";

const capabilities = [
  {
    icon: Activity,
    title: "Predictive Spend Optimization",
    description:
      "Detects budget inefficiencies across campaigns before they impact CPL, flags reallocation opportunities automatically.",
  },
  {
    icon: Zap,
    title: "Anomaly Detection & Alerts",
    description:
      "Unusual drops in CTR, ROAS spikes, or audience fatigue surfaced as prioritized alerts — not buried in a report.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Insights",
    description:
      "Ask anything about your performance in plain English. The AI translates data into answers your team can act on.",
  },
];

const insights = [
  "CPL trending +18% on Meta — audiences showing fatigue. Recommend creative swap.",
  "ROAS on Spring Lead Gen: 4.2x — Budget reallocation flagged: +$200/day to this campaign.",
  "Report ready: January Performance — Generated automatically. 3 key actions identified.",
];

export function AiIntelligence() {
  return (
    <MouseGlow>
      <section className="border-y border-border/40 bg-zinc-950">
        <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12">
          <div className="grid items-start gap-12 md:grid-cols-2">
            {/* Left — Copy + Capabilities */}
            <div>
              <AnimateIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground">
                  <BrainCircuit className="h-3 w-3" />
                  AI-Powered Intelligence
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Your Data Has a Brain Now.
                </h2>
                <p className="mt-4 text-zinc-400">
                  Every campaign, every dollar, every decision — processed through
                  an intelligence layer that surfaces what matters before you have
                  to ask.
                </p>
              </AnimateIn>

              <div className="mt-8 space-y-6">
                {capabilities.map((cap, i) => (
                  <AnimateIn key={cap.title} delay={i * 150}>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                        <cap.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{cap.title}</h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>

            {/* Right — Mock AI Console */}
            <AnimateIn delay={200}>
              <div className="rounded-xl border border-border/60 bg-zinc-950 shadow-2xl shadow-blue-500/[0.03] overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-900/80 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1">
                    <div className="h-2.5 w-2.5 rounded-sm bg-blue-500/40" />
                    <span className="font-mono text-[10px] text-zinc-500">
                      Cephei AI · Live Analysis
                    </span>
                  </div>
                  <div className="w-[52px]" />
                </div>

                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-white/[0.06] bg-zinc-900/40 px-4 py-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    Intelligence Engine Active
                  </span>
                </div>

                {/* Insight cards */}
                <div className="space-y-3 p-4">
                  {insights.map((insight, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-zinc-300 leading-relaxed animate-in fade-in slide-in-from-bottom-2"
                      style={{
                        animationDelay: `${i * 300 + 500}ms`,
                        animationFillMode: "backwards",
                        animationDuration: "600ms",
                      }}
                    >
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <BrainCircuit className="h-3 w-3 text-blue-400" />
                        <span className="text-[10px] font-medium text-blue-400">
                          AI Insight
                        </span>
                      </div>
                      {insight}
                    </div>
                  ))}
                </div>

                {/* Bottom status */}
                <div className="border-t border-white/[0.06] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      Monitoring 3 active campaigns...
                    </span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </MouseGlow>
  );
}
