"use client";

import { useState, useEffect } from "react";
import { X, Trophy, TrendingUp, AlertCircle, ChevronLeft, ChevronRight, Zap } from "lucide-react";

export interface Alert {
  id: string;
  type: "milestone" | "performance" | "action" | "info";
  title: string;
  message: string;
  dismissible: boolean;
}

const alertStyles: Record<Alert["type"], { bg: string; icon: string; title: string }> = {
  milestone: {
    bg: "border-emerald-500/20 bg-emerald-500/[0.06]",
    icon: "text-emerald-400",
    title: "text-emerald-400",
  },
  performance: {
    bg: "border-blue-500/20 bg-blue-500/[0.06]",
    icon: "text-blue-400",
    title: "text-blue-400",
  },
  action: {
    bg: "border-amber-500/20 bg-amber-500/[0.06]",
    icon: "text-amber-400",
    title: "text-amber-400",
  },
  info: {
    bg: "border-zinc-500/20 bg-zinc-500/[0.06]",
    icon: "text-zinc-400",
    title: "text-zinc-400",
  },
};

const alertIcons: Record<Alert["type"], typeof Trophy> = {
  milestone: Trophy,
  performance: TrendingUp,
  action: AlertCircle,
  info: Zap,
};

// Default demo alerts (used when no alerts are passed)
const defaultAlerts: Alert[] = [
  {
    id: "1",
    type: "milestone",
    title: "New Record!",
    message: "You've generated 143 leads in 2 months - your best period yet!",
    dismissible: true,
  },
  {
    id: "2",
    type: "performance",
    title: "CPL Improving",
    message: "Your cost per lead dropped 8% this week to $19.85 - excellent optimization!",
    dismissible: true,
  },
  {
    id: "3",
    type: "action",
    title: "New Leads",
    message: "12 new leads awaiting follow-up this week",
    dismissible: false,
  },
];

interface PerformanceAlertsProps {
  alerts?: Alert[];
}

export function PerformanceAlerts({ alerts: propAlerts }: PerformanceAlertsProps) {
  const alerts = propAlerts ?? defaultAlerts;
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("dismissedAlerts");
    if (stored) {
      setDismissedIds(JSON.parse(stored));
    }
  }, []);

  const visibleAlerts = alerts.filter((alert) => !dismissedIds.includes(alert.id));

  const dismissAlert = (id: string) => {
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem("dismissedAlerts", JSON.stringify(newDismissed));
    if (currentIndex >= visibleAlerts.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const nextAlert = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleAlerts.length);
  };

  const prevAlert = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleAlerts.length) % visibleAlerts.length);
  };

  if (visibleAlerts.length === 0) return null;

  const currentAlert = visibleAlerts[currentIndex];
  const styles = alertStyles[currentAlert.type];
  const Icon = alertIcons[currentAlert.type];

  return (
    <div className={`rounded-xl border ${styles.bg} p-4`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${styles.icon}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`font-semibold ${styles.title}`}>{currentAlert.title}</p>
              <p className="mt-0.5 text-sm text-zinc-400">{currentAlert.message}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {visibleAlerts.length > 1 && (
                <>
                  <button
                    onClick={prevAlert}
                    className="rounded p-1 transition-colors hover:bg-white/[0.06]"
                  >
                    <ChevronLeft className="h-4 w-4 text-zinc-500" />
                  </button>
                  <span className="px-1 text-xs text-zinc-500">
                    {currentIndex + 1}/{visibleAlerts.length}
                  </span>
                  <button
                    onClick={nextAlert}
                    className="rounded p-1 transition-colors hover:bg-white/[0.06]"
                  >
                    <ChevronRight className="h-4 w-4 text-zinc-500" />
                  </button>
                </>
              )}

              {currentAlert.dismissible && (
                <button
                  onClick={() => dismissAlert(currentAlert.id)}
                  className="ml-2 rounded p-1 transition-colors hover:bg-white/[0.06]"
                >
                  <X className="h-4 w-4 text-zinc-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
