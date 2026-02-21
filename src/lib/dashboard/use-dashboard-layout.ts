"use client";

import { useState, useCallback, useEffect } from "react";
import type { LayoutItem } from "react-grid-layout";
import { getDefaultLayouts } from "./widget-registry";

const STORAGE_KEY = "cephei-dashboard-v1";

interface DashboardState {
  layouts: LayoutItem[];
  hiddenWidgets: string[];
}

function loadState(): DashboardState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DashboardState;
  } catch {
    return null;
  }
}

function saveState(state: DashboardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — ignore
  }
}

export function useDashboardLayout() {
  const [layouts, setLayouts] = useState<LayoutItem[]>(() => {
    const saved = loadState();
    return saved?.layouts ?? getDefaultLayouts();
  });

  const [hiddenWidgets, setHiddenWidgets] = useState<Set<string>>(() => {
    const saved = loadState();
    return new Set(saved?.hiddenWidgets ?? []);
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Persist on every change
  useEffect(() => {
    saveState({
      layouts,
      hiddenWidgets: Array.from(hiddenWidgets),
    });
  }, [layouts, hiddenWidgets]);

  const onLayoutChange = useCallback((newLayout: LayoutItem[]) => {
    setLayouts(newLayout);
  }, []);

  const toggleWidget = useCallback((widgetId: string) => {
    setHiddenWidgets((prev) => {
      const next = new Set(prev);
      if (next.has(widgetId)) {
        next.delete(widgetId);
      } else {
        next.add(widgetId);
      }
      return next;
    });
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const resetLayout = useCallback(() => {
    setLayouts(getDefaultLayouts());
    setHiddenWidgets(new Set());
  }, []);

  return {
    layouts,
    hiddenWidgets,
    isEditMode,
    onLayoutChange,
    toggleWidget,
    toggleEditMode,
    resetLayout,
  };
}
