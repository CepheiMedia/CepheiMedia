"use client";

import { useState } from "react";
import {
  Palette,
  Calendar,
  DollarSign,
  Download,
  MessageCircle,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function QuickActions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleAction = (actionId: string) => {
    if (actionId === "download") {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted("download");
        setTimeout(() => setSubmitted(null), 2000);
      }, 1000);
    } else if (actionId === "support") {
      setSubmitted("support");
      setTimeout(() => setSubmitted(null), 2000);
    } else {
      setActiveModal(actionId);
    }
  };

  const submitRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(activeModal);
      setActiveModal(null);
      setTimeout(() => setSubmitted(null), 3000);
    }, 1500);
  };

  const actions: QuickAction[] = [
    {
      id: "creative",
      label: "Request Creative",
      description: "Request new ad creatives or refresh existing ones",
      icon: Palette,
      action: () => handleAction("creative"),
    },
    {
      id: "call",
      label: "Schedule Call",
      description: "Book a strategy call with your account manager",
      icon: Calendar,
      action: () => handleAction("call"),
    },
    {
      id: "budget",
      label: "Adjust Budget",
      description: "Request a change to your monthly ad spend",
      icon: DollarSign,
      action: () => handleAction("budget"),
    },
    {
      id: "download",
      label: "Download Report",
      description: "Export current month performance report",
      icon: Download,
      action: () => handleAction("download"),
    },
    {
      id: "support",
      label: "Contact Support",
      description: "Get help from your account team",
      icon: MessageCircle,
      action: () => handleAction("support"),
    },
  ];

  return (
    <>
      <div className="glass-card rounded-xl p-6">
        <h2 className="mb-4 font-semibold text-white">Quick Actions</h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {actions.map((action) => {
            const Icon = action.icon;
            const isSuccess = submitted === action.id;

            return (
              <button
                key={action.id}
                onClick={action.action}
                disabled={isSubmitting}
                className="glow-hover flex flex-col items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-center transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.04] disabled:opacity-50"
              >
                <div className={`rounded-lg p-2 ${isSuccess ? "bg-emerald-500/10" : "bg-white/[0.04]"}`}>
                  {isSuccess ? (
                    <Check className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Icon className="h-5 w-5 text-zinc-400" />
                  )}
                </div>
                <span className="text-xs font-medium text-zinc-300">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative mx-4 w-full max-w-md rounded-xl border border-white/[0.08] bg-zinc-900 p-6 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 rounded p-1 text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300"
            >
              <X className="h-4 w-4" />
            </button>

            {activeModal === "creative" && (
              <>
                <h3 className="text-lg font-semibold text-white">Request Creative Refresh</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Describe what creative assets you need or what changes you&apos;d like.
                </p>
                <textarea
                  placeholder="e.g., New video ad for Financial Planning campaign, updated carousel images..."
                  className="mt-4 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 min-h-[100px]"
                />
              </>
            )}

            {activeModal === "call" && (
              <>
                <h3 className="text-lg font-semibold text-white">Schedule Strategy Call</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Select your preferred time for a call with your account manager.
                </p>
                <div className="mt-4 space-y-2">
                  {["Tomorrow 10:00 AM", "Tomorrow 2:00 PM", "Friday 10:00 AM", "Friday 3:00 PM"].map(
                    (time) => (
                      <button
                        key={time}
                        className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-left text-sm text-zinc-300 hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
                      >
                        {time}
                      </button>
                    )
                  )}
                </div>
              </>
            )}

            {activeModal === "budget" && (
              <>
                <h3 className="text-lg font-semibold text-white">Request Budget Adjustment</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Current monthly investment: $2,200
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-zinc-300">New Monthly Amount</label>
                    <input
                      type="text"
                      placeholder="$3,000"
                      className="mt-1 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300">Reason (optional)</label>
                    <textarea
                      placeholder="e.g., Want to scale based on current results..."
                      className="mt-1 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 min-h-[80px]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
                className="flex-1 border-white/[0.08] bg-transparent text-zinc-300 hover:bg-white/[0.04]"
              >
                Cancel
              </Button>
              <Button onClick={submitRequest} disabled={isSubmitting} className="flex-1 bg-blue-600 text-white hover:bg-blue-500">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {submitted && !activeModal && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 shadow-lg backdrop-blur-sm">
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              {submitted === "download" && "Report downloaded!"}
              {submitted === "support" && "Support chat opened!"}
              {submitted === "creative" && "Creative request submitted!"}
              {submitted === "call" && "Call scheduled!"}
              {submitted === "budget" && "Budget request submitted!"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
