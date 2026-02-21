"use client";

import { useState, useEffect } from "react";
import { KPICard } from "@/components/portal/kpi-card";
import { ReportGenerator } from "@/components/portal/report-generator";
import { PerformanceAlerts } from "@/components/portal/performance-alerts";
import { QuickActions } from "@/components/portal/quick-actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DollarSign,
  Target,
  TrendingUp,
  Users,
  MousePointer,
  Eye,
  Megaphone,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  FileCheck,
  BarChart3,
} from "lucide-react";

// 2-month totals (Nov + Dec)
const kpiData = {
  totalLeads: 143,
  cpl: 21.54,
  roas: 4.1,
  impressions: 17285,
  clicks: 10089,
  activeCampaigns: 3,
};

const campaigns = [
  {
    name: "Financial Planning - Lead Gen",
    platform: "meta",
    status: "active",
    spend: 892,
    leads: 57,
    roas: 4.5,
  },
  {
    name: "Investment Services - Retargeting",
    platform: "meta",
    status: "active",
    spend: 324,
    leads: 28,
    roas: 3.8,
  },
  {
    name: "Wealth Advisory - Awareness",
    platform: "meta",
    status: "active",
    spend: 324,
    leads: 58,
    roas: 4.1,
  },
];

const recentActivity = [
  {
    type: "deliverable",
    title: "January 2026 Performance Report",
    date: "2 days ago",
  },
  {
    type: "campaign",
    title: "New ad creative launched for Financial Planning",
    date: "5 days ago",
  },
  {
    type: "milestone",
    title: "143 leads generated in past 2 months",
    date: "1 week ago",
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

function getPlatformBadge(platform: string) {
  const styles: Record<string, string> = {
    meta: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    google: "bg-red-500/10 text-red-500 border-red-500/30",
  };
  return (
    <Badge variant="outline" className={styles[platform]}>
      {platform === "meta" ? "Meta" : "Google"}
    </Badge>
  );
}

export default function DemoPage() {
  const [companyName, setCompanyName] = useState("Demo Company");

  useEffect(() => {
    const stored = sessionStorage.getItem("demo-company-name");
    if (stored) setCompanyName(stored);
  }, []);

  const initials = companyName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Performance Alerts */}
      <PerformanceAlerts />

      {/* Company Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary sm:h-12 sm:w-12 sm:text-xl">
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
              {companyName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Growth Client
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
          <Badge variant="default">
            Growth Plan
          </Badge>
          <p className="text-xs text-muted-foreground">
            Demo Preview
          </p>
        </div>
      </div>

      {/* Primary KPIs */}
      <div>
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Performance Overview — Past 2 Months
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label="Total Leads"
            value={formatNumber(kpiData.totalLeads)}
            subtext={
              <span className="flex items-center gap-1 text-green-500">
                <ArrowUpRight className="h-3 w-3" />
                Strong performance
              </span>
            }
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            label="Cost per Lead"
            value={`$${kpiData.cpl.toFixed(2)}`}
            subtext={
              <span className="flex items-center gap-1 text-green-500">
                <ArrowDownRight className="h-3 w-3" />
                Below industry avg
              </span>
            }
            icon={<Target className="h-5 w-5" />}
          />
          <KPICard
            label="ROAS"
            value={`${kpiData.roas}x`}
            subtext="Return on ad spend"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            label="Active Campaigns"
            value={kpiData.activeCampaigns}
            subtext="Currently running"
            icon={<Megaphone className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Secondary KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          label="Impressions"
          value={formatNumber(kpiData.impressions)}
          subtext="Total ad views"
          icon={<Eye className="h-5 w-5" />}
        />
        <KPICard
          label="Clicks"
          value={formatNumber(kpiData.clicks)}
          subtext="Total ad clicks"
          icon={<MousePointer className="h-5 w-5" />}
        />
        <KPICard
          label="Click-Through Rate"
          value="58.4%"
          subtext="Excellent engagement"
          icon={<BarChart3 className="h-5 w-5" />}
        />
      </div>

      {/* Campaign Performance */}
      <div className="rounded-xl border border-border/60 bg-card/50">
        <div className="flex items-center justify-between border-b border-border/60 p-4 sm:p-6">
          <div>
            <h2 className="font-semibold">Active Campaigns</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Performance by campaign
            </p>
          </div>
          <Link
            href="/demo/campaigns"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Platform</th>
                <th className="px-6 py-3 font-medium text-right">Spend</th>
                <th className="px-6 py-3 font-medium text-right">Leads</th>
                <th className="px-6 py-3 font-medium text-right">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.name}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-6 py-4 font-medium">{campaign.name}</td>
                  <td className="px-6 py-4">
                    {getPlatformBadge(campaign.platform)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {formatCurrency(campaign.spend)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {campaign.leads}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-green-500">
                    {campaign.roas}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 p-4 sm:hidden">
          {campaigns.map((campaign) => (
            <div
              key={campaign.name}
              className="rounded-lg border border-border/40 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">{campaign.name}</p>
                {getPlatformBadge(campaign.platform)}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Spend</p>
                  <p className="text-sm font-medium">{formatCurrency(campaign.spend)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Leads</p>
                  <p className="text-sm font-medium">{campaign.leads}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROAS</p>
                  <p className="text-sm font-medium text-green-500">{campaign.roas}x</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-border/60 bg-card/50 p-6">
          <h2 className="font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {activity.type === "deliverable" && (
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                  )}
                  {activity.type === "campaign" && (
                    <Megaphone className="h-4 w-4 text-muted-foreground" />
                  )}
                  {activity.type === "milestone" && (
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contract Summary */}
        <div className="rounded-xl border border-border/60 bg-card/50 p-6">
          <div className="flex items-start justify-between">
            <h2 className="font-semibold">Contract Summary</h2>
            <Badge variant="default">Active</Badge>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Package</span>
              <span className="text-sm font-medium">Growth</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Monthly Investment
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(2200)}/mo
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Active Since
              </span>
              <span className="text-sm font-medium">
                November 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Custom Report Generator */}
      <ReportGenerator />

      {/* ROI Projection Teaser */}
      <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">ROI Projections</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on current performance, you&apos;re projected to generate{" "}
              <span className="font-medium text-foreground">75+ leads</span> next
              month at a CPL of{" "}
              <span className="font-medium text-foreground">$20.53</span>.
            </p>
          </div>
          <Link
            href="/demo/roi"
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto"
          >
            View Projections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
