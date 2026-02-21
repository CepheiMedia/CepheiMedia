"use client";

import { useState, useEffect, useCallback } from "react";
import { PortalHeader } from "./portal-header";
import { CommandPalette } from "./command-palette";
import { AIChatbot } from "./ai-chatbot";
import { DashboardContext } from "@/lib/dashboard/dashboard-context";

export function PortalShell({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const openCommandPalette = useCallback(() => {
    setCommandPaletteOpen(true);
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <DashboardContext.Provider value={{ isEditMode, onToggleEditMode: toggleEditMode }}>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <PortalHeader
          onOpenCommandPalette={openCommandPalette}
          isEditMode={isEditMode}
          onToggleEditMode={toggleEditMode}
        />
        <div className="portal-grid-bg relative flex-1 overflow-y-auto">
          {/* Subtle gradient mesh overlay */}
          <div
            className="pointer-events-none fixed inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-6 py-8">{children}</div>
        </div>

        {/* Global overlays */}
        <CommandPalette
          open={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
        <AIChatbot />
      </div>
    </DashboardContext.Provider>
  );
}
