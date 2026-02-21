"use client";

import { useMemo } from "react";
import {
  ResponsiveGridLayout,
  useContainerWidth,
  verticalCompactor,
} from "react-grid-layout";
import type { Layout, LayoutItem } from "react-grid-layout";
import { GripVertical } from "lucide-react";
import { getWidgets } from "@/lib/dashboard/widget-registry";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface DashboardGridProps {
  layouts: LayoutItem[];
  hiddenWidgets: Set<string>;
  isEditMode: boolean;
  onLayoutChange: (layout: LayoutItem[]) => void;
}

export function DashboardGrid({
  layouts,
  hiddenWidgets,
  isEditMode,
  onLayoutChange,
}: DashboardGridProps) {
  const widgets = getWidgets();
  const { width, mounted, containerRef } = useContainerWidth();

  const visibleWidgets = useMemo(
    () => widgets.filter((w) => !hiddenWidgets.has(w.id)),
    [widgets, hiddenWidgets]
  );

  const visibleLayouts = useMemo(
    () => layouts.filter((l) => !hiddenWidgets.has(l.i)),
    [layouts, hiddenWidgets]
  );

  // Lock items when not editing
  const adjustedLayouts = useMemo(
    () =>
      visibleLayouts.map((l) => ({
        ...l,
        isDraggable: isEditMode,
        isResizable: isEditMode,
      })),
    [visibleLayouts, isEditMode]
  );

  return (
    <div ref={containerRef} className={`animate-in fade-in duration-500 ${isEditMode ? "dashboard-edit-mode" : ""}`}>
      {mounted && (
        <ResponsiveGridLayout
          className="dashboard-grid"
          width={width}
          layouts={{ lg: adjustedLayouts }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 8, sm: 4, xs: 2 }}
          rowHeight={30}
          margin={[16, 16]}
          compactor={verticalCompactor}
          dragConfig={{ enabled: isEditMode, handle: ".widget-drag-handle" }}
          resizeConfig={{ enabled: isEditMode }}
          onLayoutChange={(layout: Layout) => onLayoutChange([...layout])}
        >
          {visibleWidgets.map((widget) => {
            const Widget = widget.component;
            return (
              <div key={widget.id} className="relative">
                {/* Edit mode overlay */}
                {isEditMode && (
                  <div className="widget-drag-handle absolute inset-x-0 top-0 z-10 flex cursor-grab items-center gap-2 rounded-t-xl border-b border-blue-500/20 bg-blue-500/10 px-3 py-1.5 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-medium text-blue-300">
                      {widget.label}
                    </span>
                  </div>
                )}

                {/* Widget content */}
                <div
                  className={`h-full ${isEditMode ? "pointer-events-none pt-8 opacity-70" : ""}`}
                >
                  <Widget />
                </div>

                {/* Edit mode border */}
                {isEditMode && (
                  <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-dashed border-blue-500/30" />
                )}
              </div>
            );
          })}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}
