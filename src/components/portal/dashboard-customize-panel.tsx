"use client";

import { X, RotateCcw } from "lucide-react";
import { getWidgets } from "@/lib/dashboard/widget-registry";

interface DashboardCustomizePanelProps {
  isOpen: boolean;
  hiddenWidgets: Set<string>;
  onToggleWidget: (id: string) => void;
  onReset: () => void;
  onClose: () => void;
}

export function DashboardCustomizePanel({
  isOpen,
  hiddenWidgets,
  onToggleWidget,
  onReset,
  onClose,
}: DashboardCustomizePanelProps) {
  const widgets = getWidgets();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-white/[0.08] bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h2 className="text-sm font-semibold text-white">Customize Dashboard</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Widget list */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-4 text-xs text-zinc-500">
            Toggle widgets to show or hide them on your dashboard.
          </p>
          <div className="space-y-1">
            {widgets.map((widget) => {
              const isVisible = !hiddenWidgets.has(widget.id);
              return (
                <label
                  key={widget.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                >
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => onToggleWidget(widget.id)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/[0.06] accent-blue-500"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-200">
                      {widget.label}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {widget.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-5 py-4 space-y-2">
          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/[0.08]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Default
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
