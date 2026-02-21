"use client";

import { createContext, useContext } from "react";

interface DashboardContextValue {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export const DashboardContext = createContext<DashboardContextValue>({
  isEditMode: false,
  onToggleEditMode: () => {},
});

export function useDashboardContext() {
  return useContext(DashboardContext);
}
