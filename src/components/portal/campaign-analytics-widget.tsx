"use client";

import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export function CampaignAnalyticsWidget() {
  return (
    <div className="glass-card glow-hover h-full rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Campaign Analytics</h2>
            <p className="text-sm text-zinc-500">
              Live performance across connected platforms
            </p>
          </div>
        </div>
        <Link
          href="/app/campaigns"
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { name: "Meta Ads", color: "text-blue-400", status: "Connected", statusColor: "text-emerald-500" },
          { name: "Google Ads", color: "text-red-400", status: "Connected", statusColor: "text-emerald-500" },
          { name: "TikTok Ads", color: "text-pink-400", status: "Not connected", statusColor: "text-zinc-600" },
        ].map((platform) => (
          <div
            key={platform.name}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center"
          >
            <p className={`text-xs font-medium ${platform.color}`}>
              {platform.name}
            </p>
            <p className={`mt-1 text-[10px] ${platform.statusColor}`}>
              {platform.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
