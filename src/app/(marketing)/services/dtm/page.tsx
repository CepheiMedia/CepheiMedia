import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  Search,
  Target,
  LineChart,
  MousePointerClick,
} from "lucide-react";

const channels = [
  {
    icon: Target,
    title: "Meta Ads",
    desc: "Full-funnel campaign architecture on Facebook and Instagram with audience testing, creative iteration, and conversion optimization.",
  },
  {
    icon: Search,
    title: "Google Ads",
    desc: "Search, display, and YouTube campaigns built on keyword strategy, bid management, and quality score optimization.",
  },
  {
    icon: BarChart3,
    title: "SEO / SEM",
    desc: "Technical SEO audits, content strategy, link building, and organic search visibility paired with paid search integration.",
  },
  {
    icon: MousePointerClick,
    title: "CRO",
    desc: "Landing page optimization, A/B testing, funnel analysis, and conversion rate improvements across all touchpoints.",
  },
  {
    icon: LineChart,
    title: "Analytics & Tracking",
    desc: "GA4, server-side tagging, conversion API setup, attribution modeling, and custom dashboard reporting.",
  },
];

const deliverables = [
  "Campaign strategy & account architecture",
  "Creative briefs & ad copy",
  "Tracking & conversion setup",
  "Weekly optimization reports",
  "Monthly ROI analysis",
  "A/B testing documentation",
  "Budget allocation recommendations",
  "Client portal access with real-time data",
];

export default function DTMPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      {/* Hero */}
      <div className="max-w-3xl">
        <Badge variant="secondary" className="mb-4">
          DTM
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Growth Marketing Systems
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Performance marketing infrastructure that turns ad spend into
          measurable revenue. We build, optimize, and scale the systems that
          drive predictable growth.
        </p>
      </div>

      {/* Channels */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">Channel Coverage</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <channel.icon className="h-6 w-6 text-muted-foreground" />
              <h3 className="mt-3 font-semibold">{channel.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {channel.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">What You Get</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {deliverables.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 px-4 py-3 text-sm"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Portal tie-in */}
      <div className="mt-20 rounded-xl border border-border/60 bg-card/50 p-8">
        <h2 className="text-2xl font-semibold">What You&apos;ll See in Your Portal</h2>
        <p className="mt-3 text-muted-foreground">
          Every DTM client gets portal access with live campaign data, spend
          tracking, CPL trends, conversion attribution, and ROI projections. No
          waiting for reports — the data is always there.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">
          Ready to build a growth system?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Let&apos;s audit your current setup and define what predictable growth
          looks like for your business.
        </p>
        <div className="mt-6">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
