"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Settings2 } from "lucide-react";
import { DashboardGrid } from "@/components/portal/dashboard-grid";
import { DashboardCustomizePanel } from "@/components/portal/dashboard-customize-panel";
import { useDashboardLayout } from "@/lib/dashboard/use-dashboard-layout";
import { useDashboardContext } from "@/lib/dashboard/dashboard-context";

export default function DashboardPage() {
  const { layouts, hiddenWidgets, onLayoutChange, toggleWidget, resetLayout } =
    useDashboardLayout();
  const { isEditMode } = useDashboardContext();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Dashboard title + contract badge */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <div className="flex items-center gap-3">
          {isEditMode && (
            <button
              onClick={() => setPanelOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08]"
            >
              <Settings2 className="h-3.5 w-3.5" />
              Toggle Widgets
            </button>
          )}
          <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-400">
            Growth Plan
          </Badge>
        </div>
      </div>

      {/* Draggable grid */}
      <DashboardGrid
        layouts={layouts}
        hiddenWidgets={hiddenWidgets}
        isEditMode={isEditMode}
        onLayoutChange={onLayoutChange}
      />

      {/* Customize panel */}
      <DashboardCustomizePanel
        isOpen={panelOpen}
        hiddenWidgets={hiddenWidgets}
        onToggleWidget={toggleWidget}
        onReset={resetLayout}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
