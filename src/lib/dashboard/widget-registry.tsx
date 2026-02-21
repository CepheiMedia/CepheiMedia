"use client";

import type { ComponentType } from "react";
import type { LayoutItem } from "react-grid-layout";

import { KPIGroupWidget } from "@/components/portal/kpi-group-widget";
import { CampaignAnalyticsWidget } from "@/components/portal/campaign-analytics-widget";
import { ContractSummaryWidget } from "@/components/portal/contract-summary-widget";
import { LeadMap } from "@/components/portal/lead-map";
import { AIInsights } from "@/components/portal/ai-insights";
import { ActivityFeed } from "@/components/portal/activity-feed";
import { ROITeaserWidget } from "@/components/portal/roi-teaser-widget";
import { QuickActions } from "@/components/portal/quick-actions";
import { ReportGenerator } from "@/components/portal/report-generator";

export interface WidgetDefinition {
  id: string;
  label: string;
  description: string;
  component: ComponentType;
  defaultLayout: LayoutItem;
}

// y values stack widgets vertically: each row is rowHeight (30px)
const WIDGETS: WidgetDefinition[] = [
  {
    id: "kpi-group",
    label: "KPI Summary",
    description: "Monthly budget, billing, cost per lead, and ROAS at a glance",
    component: KPIGroupWidget,
    defaultLayout: { i: "kpi-group", x: 0, y: 0, w: 12, h: 5, minW: 6, minH: 4 },
  },
  {
    id: "campaign-analytics",
    label: "Campaign Analytics",
    description: "Live performance across connected ad platforms",
    component: CampaignAnalyticsWidget,
    defaultLayout: { i: "campaign-analytics", x: 0, y: 5, w: 8, h: 7, minW: 4, minH: 5 },
  },
  {
    id: "contract-summary",
    label: "Contract Summary",
    description: "Current package, ad spend, and contract details",
    component: ContractSummaryWidget,
    defaultLayout: { i: "contract-summary", x: 8, y: 5, w: 4, h: 7, minW: 3, minH: 5 },
  },
  {
    id: "lead-map",
    label: "Lead Origins Map",
    description: "Geographic visualization of incoming leads",
    component: LeadMap,
    defaultLayout: { i: "lead-map", x: 0, y: 12, w: 6, h: 11, minW: 4, minH: 6 },
  },
  {
    id: "ai-insights",
    label: "AI Insights",
    description: "AI-powered recommendations and performance insights",
    component: AIInsights,
    defaultLayout: { i: "ai-insights", x: 6, y: 12, w: 6, h: 11, minW: 4, minH: 6 },
  },
  {
    id: "activity-feed",
    label: "Activity Feed",
    description: "Recent account activity and events",
    component: () => <ActivityFeed maxItems={5} />,
    defaultLayout: { i: "activity-feed", x: 0, y: 23, w: 4, h: 10, minW: 3, minH: 6 },
  },
  {
    id: "roi-teaser",
    label: "ROI Projections",
    description: "Projected leads, ROAS, and revenue over 6 months",
    component: ROITeaserWidget,
    defaultLayout: { i: "roi-teaser", x: 4, y: 23, w: 8, h: 5, minW: 4, minH: 4 },
  },
  {
    id: "quick-actions",
    label: "Quick Actions",
    description: "Common actions and shortcuts",
    component: QuickActions,
    defaultLayout: { i: "quick-actions", x: 0, y: 33, w: 12, h: 6, minW: 4, minH: 4 },
  },
  {
    id: "report-generator",
    label: "Report Generator",
    description: "Generate and download custom reports",
    component: ReportGenerator,
    defaultLayout: { i: "report-generator", x: 0, y: 39, w: 12, h: 10, minW: 6, minH: 6 },
  },
];

export function getWidgets(): WidgetDefinition[] {
  return WIDGETS;
}

export function getDefaultLayouts(): LayoutItem[] {
  return WIDGETS.map((w) => w.defaultLayout);
}

export function getWidgetById(id: string): WidgetDefinition | undefined {
  return WIDGETS.find((w) => w.id === id);
}
