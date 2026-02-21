"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BarChart3,
  Search,
  Target,
  LineChart,
  MousePointerClick,
  Check,
  X,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

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

// Portfolio projects for DTM
const portfolioProjects = [
  {
    id: "cognilly-crm",
    client: "CRM Dashboard",
    handle: "Lead Management",
    category: "CRM Integration",
    partner: "cognilly",
    description: "Centralized lead tracking with real-time pipeline visibility, activity logs, and automated follow-up scheduling.",
    type: "video" as const,
    media: "/videos/dtm-work-1.mp4",
  },
  {
    id: "cognilly-ai",
    client: "AI Lead Scoring",
    handle: "Qualification Engine",
    category: "AI Automation",
    partner: "cognilly",
    description: "Machine learning-powered lead scoring that automatically qualifies prospects based on engagement, fit, and intent signals.",
    type: "video" as const,
    media: "/videos/dtm-work-2.mp4",
  },
  {
    id: "cognilly-reporting",
    client: "Analytics Suite",
    handle: "Performance Reports",
    category: "Reporting",
    partner: "cognilly",
    description: "Automated reporting with custom KPI dashboards, trend analysis, and actionable insights delivered to your inbox.",
    type: "video" as const,
    media: "/videos/dtm-work-3.mp4",
  },
];

type Project = typeof portfolioProjects[number];

export default function DTMPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      {/* Video Hero */}
      <section className="relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/dtm-hero-1.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/65" />

        {/* Blue tint overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/35 via-transparent to-indigo-950/25" />

        {/* Gradient fade at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {/* Data grid accent lines */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-[60%] left-0 w-full h-[2px] opacity-[0.16]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 15%, rgba(59,130,246,0.9) 50%, rgba(59,130,246,0.5) 85%, transparent 100%)",
              boxShadow: "0 0 15px 3px rgba(59,130,246,0.4), 0 0 50px 8px rgba(59,130,246,0.15)",
            }}
          />
          <div
            className="absolute top-[22%] left-0 w-[140%] h-[2px] origin-left -rotate-[18deg] opacity-[0.10]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 10%, rgba(99,102,241,0.8) 50%, rgba(99,102,241,0.4) 90%, transparent 100%)",
              boxShadow: "0 0 12px 2px rgba(99,102,241,0.35), 0 0 40px 6px rgba(99,102,241,0.12)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                DTM
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Growth{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Marketing Systems
                </span>
              </h1>
              <p className="mt-4 text-lg text-zinc-300">
                Performance marketing infrastructure that turns ad spend into
                measurable revenue. We build, optimize, and scale the systems that
                drive predictable growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#work">
                  <Button size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600 text-white">
                    See It In Action
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10">
                    Book a Call
                  </Button>
                </a>
              </div>
            </div>

            {/* Second video on the right */}
            <div className="hidden md:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/dtm-hero-2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

    <div className="mx-auto max-w-7xl px-6 py-24">

      {/* Technology Partner Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4">Our Technology Partner</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Powered by cutting-edge AI and CRM technology to maximize your marketing ROI.
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Cognilly Card */}
          <a
            href="https://cognilly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-3xl bg-[#f8f7f4] p-8 md:p-12 text-center hover:scale-[1.02] transition-transform border border-border/30"
          >
            {/* Logo */}
            <div className="h-20 md:h-24 flex items-center justify-center mb-6">
              <Image
                src="/images/partners/cognilly-logo.png"
                alt="Cognilly"
                width={120}
                height={120}
                className="h-20 md:h-24 w-20 md:w-24 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-zinc-900">
              AI-Powered Lead Intelligence
            </h3>
            <p className="text-sm mb-6 text-zinc-600 max-w-lg mx-auto">
              Smart CRM integration, AI-qualified lead screening, and automated reporting systems that turn raw leads into qualified opportunities.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["CRM Integration", "AI Lead Scoring", "Automated Reporting", "Pipeline Analytics"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        </div>

        {/* View Work Button */}
        <div className="mt-8 text-center">
          <a href="#work">
            <Button variant="outline" size="lg" className="gap-2">
              View Our Work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Channels */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">Channel Coverage</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel, i) => (
            <AnimateIn key={channel.title} delay={i * 100}>
            <div
              className="rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.2)] hover:border-blue-500/30"
            >
              <channel.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{channel.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {channel.desc}
              </p>
            </div>
            </AnimateIn>
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
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Work Section */}
      <div id="work" className="mt-20 scroll-mt-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Technology in Action</h2>
            <p className="mt-2 text-muted-foreground">
              Click to explore how our technology partner powers your growth.
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-card/50 transition-all hover:border-primary/50 hover:shadow-xl hover:scale-[1.02]"
            >
              {/* Media */}
              <div className="relative aspect-[9/16] overflow-hidden bg-muted">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                >
                  <source src={project.media} type="video/mp4" />
                </video>

                {/* Partner logo */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="rounded-xl bg-white/95 backdrop-blur-sm p-2 shadow-lg">
                    <Image
                      src="/images/partners/cognilly-logo.png"
                      alt="Cognilly"
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                  </div>
                </div>

                {/* View overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full px-4 py-2 text-sm font-medium text-black">
                    View Details
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{project.client}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.handle}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs">
                    {project.category}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
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
          <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Content */}
            <div className="bg-card rounded-2xl overflow-hidden">
              {/* Video area */}
              <div className="relative aspect-[9/16] max-h-[60vh] bg-black">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-contain"
                >
                  <source src={selectedProject.media} type="video/mp4" />
                </video>

                {/* Partner logo in modal */}
                <div className="absolute top-4 left-4">
                  <div className="rounded-xl bg-white p-3 shadow-lg">
                    <Image
                      src="/images/partners/cognilly-logo.png"
                      alt="Cognilly"
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Info area */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedProject.client}</h3>
                    <p className="text-muted-foreground">{selectedProject.handle}</p>
                  </div>
                  <Badge variant="secondary">{selectedProject.category}</Badge>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
