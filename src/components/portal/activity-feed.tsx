"use client";

import {
  Receipt,
  FileCheck,
  TrendingUp,
  Users,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: "payment" | "lead" | "deliverable" | "campaign" | "milestone";
  title: string;
  description: string;
  time: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "payment",
    title: "Invoice #1042 paid",
    description: "$2,200 — February retainer",
    time: "2h ago",
  },
  {
    id: "a2",
    type: "lead",
    title: "3 new leads from Meta Ads",
    description: "Financial Planning campaign",
    time: "4h ago",
  },
  {
    id: "a3",
    type: "deliverable",
    title: "Deliverable uploaded",
    description: "Q1 Brand Guide — ready for review",
    time: "6h ago",
  },
  {
    id: "a4",
    type: "campaign",
    title: "Campaign budget optimized",
    description: "Retirement Planning — CPL reduced 12%",
    time: "8h ago",
  },
  {
    id: "a5",
    type: "milestone",
    title: "100 leads milestone",
    description: "Financial Planning campaign hit 100 total leads",
    time: "1d ago",
  },
  {
    id: "a6",
    type: "lead",
    title: "5 new leads from Google Ads",
    description: "Estate Planning campaign",
    time: "1d ago",
  },
  {
    id: "a7",
    type: "payment",
    title: "Invoice #1041 generated",
    description: "$2,200 — January retainer",
    time: "2d ago",
  },
];

const typeConfig: Record<
  ActivityItem["type"],
  { bg: string; text: string; icon: typeof Receipt }
> = {
  payment: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: Receipt },
  lead: { bg: "bg-blue-500/10", text: "text-blue-400", icon: Users },
  deliverable: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    icon: FileCheck,
  },
  campaign: { bg: "bg-amber-500/10", text: "text-amber-400", icon: Megaphone },
  milestone: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    icon: TrendingUp,
  },
};

interface ActivityFeedProps {
  maxItems?: number;
}

export function ActivityFeed({ maxItems = 6 }: ActivityFeedProps) {
  const items = mockActivity.slice(0, maxItems);

  return (
    <div className="glass-card glow-hover rounded-xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <h2 className="font-semibold text-white">Activity Feed</h2>
        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
          Live
        </span>
      </div>

      <div className="divide-y divide-white/[0.04]">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 px-6 py-3.5 transition-colors hover:bg-white/[0.02]"
            >
              {/* Timeline dot + line */}
              <div className="relative flex flex-col items-center">
                <div className={`rounded-lg ${config.bg} p-2`}>
                  <Icon className={`h-3.5 w-3.5 ${config.text}`} />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-200">{item.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {item.description}
                </p>
              </div>

              {/* Timestamp */}
              <span className="shrink-0 text-[11px] tabular-nums text-zinc-600">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-6 py-3">
        <Link
          href="/app"
          className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-blue-400"
        >
          View all activity
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
