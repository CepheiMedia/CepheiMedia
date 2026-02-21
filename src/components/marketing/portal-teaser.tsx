"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  BarChart3,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Calendar,
  BrainCircuit,
} from "lucide-react";

// ─── Tab Data ───

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "campaigns", label: "Campaigns", icon: Zap },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "ai", label: "AI", icon: BrainCircuit },
] as const;

type TabId = (typeof tabs)[number]["id"];

const overviewKpis = [
  { label: "Total Spend", value: "$12,400", icon: DollarSign, change: "+12%", up: true, sparkline: [60, 65, 58, 70, 75, 80, 88] },
  { label: "Leads", value: "284", icon: Users, change: "+23%", up: true, sparkline: [30, 35, 42, 38, 50, 55, 64] },
  { label: "CPL", value: "$43.66", icon: Target, change: "-8%", up: false, sparkline: [55, 52, 48, 50, 46, 44, 43] },
  { label: "ROAS", value: "3.2x", icon: TrendingUp, change: "+15%", up: true, sparkline: [40, 42, 48, 52, 55, 58, 64] },
];

const campaigns = [
  { name: "Spring Lead Gen", platform: "Meta", status: "active", spend: "$820", leads: 58, roas: "4.2x" },
  { name: "Brand Awareness Q1", platform: "Google", status: "active", spend: "$540", leads: 34, roas: "3.1x" },
  { name: "Retargeting", platform: "Meta", status: "paused", spend: "$310", leads: 22, roas: "5.8x" },
];

const reports = [
  { name: "January Performance Report", date: "Feb 3, 2026", type: "Monthly" },
  { name: "Q4 2025 Summary", date: "Jan 8, 2026", type: "Quarterly" },
  { name: "Campaign Deep Dive: Meta", date: "Jan 22, 2026", type: "Custom" },
];

const aiInsights = [
  { tag: "Anomaly", text: "CPL trending +18% on Meta — audiences showing fatigue. Recommend creative swap.", color: "text-amber-400", border: "border-amber-500/20" },
  { tag: "Opportunity", text: "ROAS on Spring Lead Gen: 4.2x — Budget reallocation flagged: +$200/day to this campaign.", color: "text-emerald-400", border: "border-emerald-500/20" },
  { tag: "Report", text: "January Performance report generated automatically. 3 key actions identified.", color: "text-blue-400", border: "border-blue-500/20" },
];

const platformColors: Record<string, string> = {
  Meta: "text-blue-400",
  Google: "text-red-400",
};

const statusColors: Record<string, { dot: string; text: string }> = {
  active: { dot: "bg-emerald-400", text: "text-emerald-400" },
  paused: { dot: "bg-amber-400", text: "text-amber-400" },
};

// ─── Mini Sparkline ───

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 48;
  const h = 18;
  const padding = 1;

  const points = data.map((v, i) => ({
    x: padding + (i / (data.length - 1)) * (w - padding * 2),
    y: padding + (1 - (v - min) / range) * (h - padding * 2),
  }));

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    d += ` C ${cpx},${points[i - 1].y} ${cpx},${points[i].y} ${points[i].x},${points[i].y}`;
  }

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={d} fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={1.5} fill={color} />
    </svg>
  );
}

// ─── Component ───

export function PortalTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-y border-border/40 bg-card/20">
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Copy */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground">
                <Monitor className="h-3 w-3" />
                Client Portal
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                <BrainCircuit className="h-3 w-3" />
                AI-Powered
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Your Dashboard. Your Numbers.
              <br />
              <span className="text-muted-foreground">Powered by AI.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every client gets a dedicated login. See spend, CPL, CPC, active
              campaigns, completed deliverables, ROI models, and growth
              projections — updated in real time.
            </p>

            {/* AI callout */}
            <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <BrainCircuit className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Built-In Intelligence</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An AI layer runs across every dashboard — detecting anomalies,
                flagging budget opportunities, generating reports automatically,
                and answering performance questions in plain English. You don&apos;t
                dig for insights. They come to you.
              </p>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                Real-time campaign performance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                ROI calculations with transparent assumptions
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                Budget projection scenarios
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                Deliverables tracker
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-emerald-400/80">Predictive spend optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-emerald-400/80">Anomaly detection & smart alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-emerald-400/80">Natural language insights</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/demo-login">
                <Button size="lg">Try the Live Demo</Button>
              </Link>
            </div>
          </div>

          {/* Interactive Dashboard */}
          <div
            ref={containerRef}
            className="rounded-xl border border-border/60 bg-zinc-950 shadow-2xl shadow-blue-500/[0.03] overflow-hidden"
          >
            {/* Mock window chrome */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-900/80 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <div className="hidden items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 sm:flex">
                <div className="h-2.5 w-2.5 rounded-sm bg-blue-500/40" />
                <span className="font-mono text-[10px] text-zinc-500">app.cepheimedia.com/dashboard</span>
              </div>
              <div className="hidden w-[52px] sm:block" /> {/* Spacer */}
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-white/[0.06] bg-zinc-900/40">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-xs font-medium transition-all ${
                      activeTab === tab.id
                        ? tab.id === "ai"
                          ? "border-emerald-500 text-emerald-400"
                          : "border-blue-500 text-blue-400"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {tab.label}
                    {tab.id === "ai" && (
                      <span className="relative ml-0.5 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-3">
                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {overviewKpis.map((kpi, i) => {
                      const Icon = kpi.icon;
                      return (
                        <div
                          key={kpi.label}
                          className={`group cursor-default rounded-lg border p-3 transition-all duration-500 ${
                            hoveredKpi === i
                              ? "border-blue-500/30 bg-blue-500/[0.04] shadow-[0_0_20px_rgba(59,130,246,0.06)]"
                              : "border-white/[0.06] bg-white/[0.02]"
                          }`}
                          onMouseEnter={() => setHoveredKpi(i)}
                          onMouseLeave={() => setHoveredKpi(null)}
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(12px)",
                            transition: `all 0.6s ease ${i * 100 + 200}ms`,
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[10px] text-zinc-500">{kpi.label}</p>
                              <p className="mt-0.5 text-lg font-bold tabular-nums text-white">
                                {kpi.value}
                              </p>
                            </div>
                            <div className="rounded-md bg-white/[0.04] p-1.5 text-zinc-500">
                              <Icon className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span
                              className={`flex items-center gap-0.5 text-[10px] font-semibold ${
                                kpi.up ? "text-emerald-400" : "text-red-400"
                              }`}
                            >
                              {kpi.up ? (
                                <ArrowUpRight className="h-2.5 w-2.5" />
                              ) : (
                                <ArrowDownRight className="h-2.5 w-2.5" />
                              )}
                              {kpi.change}
                            </span>
                            <MiniSparkline
                              data={kpi.sparkline}
                              color={kpi.up ? "#10b981" : "#ef4444"}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mini chart area */}
                  <div
                    className="flex h-24 items-end gap-[3px] rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 0.8s ease 0.8s",
                    }}
                  >
                    {[40, 55, 35, 65, 80, 60, 75, 90, 70, 85, 95, 88, 72, 92, 68, 78].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-[2px] transition-all duration-700 ease-out"
                          style={{
                            height: isVisible ? `${h}%` : "0%",
                            transitionDelay: `${i * 40 + 600}ms`,
                            background: `linear-gradient(to top, rgba(59,130,246,0.4), rgba(59,130,246,0.15))`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Campaigns Tab */}
              {activeTab === "campaigns" && (
                <div className="space-y-2">
                  {campaigns.map((c, i) => {
                    const statusStyle = statusColors[c.status];
                    return (
                      <div
                        key={c.name}
                        className="group flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.1] hover:bg-white/[0.04]"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateX(0)" : "translateX(-12px)",
                          transition: `all 0.5s ease ${i * 80 + 100}ms`,
                        }}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-medium text-white">{c.name}</p>
                            <span className={`text-[10px] font-medium ${platformColors[c.platform]}`}>
                              {c.platform}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                            <span className={`text-[10px] capitalize ${statusStyle.text}`}>{c.status}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 text-right sm:gap-4">
                          <div>
                            <p className="text-[10px] text-zinc-500">Spend</p>
                            <p className="text-xs font-medium tabular-nums text-white">{c.spend}</p>
                          </div>
                          <div className="hidden sm:block">
                            <p className="text-[10px] text-zinc-500">Leads</p>
                            <p className="text-xs font-medium tabular-nums text-white">{c.leads}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500">ROAS</p>
                            <p className="text-xs font-medium tabular-nums text-emerald-400">{c.roas}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-1 text-center">
                    <span className="text-[10px] text-zinc-600">+ 4 more campaigns</span>
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === "reports" && (
                <div className="space-y-2">
                  {reports.map((r, i) => (
                    <div
                      key={r.name}
                      className="group flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.1] hover:bg-white/[0.04] cursor-pointer"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateX(0)" : "translateX(-12px)",
                        transition: `all 0.5s ease ${i * 80 + 100}ms`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-white/[0.04] p-2">
                          <FileText className="h-3.5 w-3.5 text-zinc-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">{r.name}</p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                              <Calendar className="h-2.5 w-2.5" />
                              {r.date}
                            </span>
                            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[9px] text-zinc-500">
                              {r.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                        View →
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* AI Tab */}
              {activeTab === "ai" && (
                <div className="space-y-3">
                  {/* AI status bar */}
                  <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-medium text-emerald-400">Intelligence Engine Active</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">3 campaigns monitored</span>
                  </div>

                  {/* AI insight cards */}
                  {aiInsights.map((insight, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border ${insight.border} bg-white/[0.02] p-3 transition-all hover:bg-white/[0.04]`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(8px)",
                        transition: `all 0.5s ease ${i * 150 + 200}ms`,
                      }}
                    >
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <BrainCircuit className={`h-3 w-3 ${insight.color}`} />
                        <span className={`text-[10px] font-semibold ${insight.color}`}>{insight.tag}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-300">{insight.text}</p>
                    </div>
                  ))}

                  {/* AI ask bar */}
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                    <BrainCircuit className="h-3.5 w-3.5 text-zinc-600" />
                    <span className="text-[11px] text-zinc-600 italic">Ask anything about your performance...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
