import Link from "next/link";
import { BarChart3, Palette, Zap } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const pillars = [
  {
    icon: BarChart3,
    title: "DTM — Growth Marketing Systems",
    description:
      "Meta Ads, Google Ads, SEM, CRO, and analytics infrastructure. We build and optimize the systems that drive measurable growth.",
    href: "/services/dtm",
  },
  {
    icon: Palette,
    title: "DDM — Brand & Design Systems",
    description:
      "Brand identity, content systems, web design, and creative direction through our premium design partner, Haus of BH.",
    href: "/services/ddm",
  },
  {
    icon: Zap,
    title: "Automation Layer",
    description:
      "Lead routing, SMS follow-up, scheduling automation, and workflow systems that eliminate manual bottlenecks.",
    href: "/services",
  },
];

export function ServicePillars() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          What We Do
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Two integrated arms — performance marketing and premium design —
          backed by automation that scales.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <AnimateIn key={pillar.title} delay={i * 100}>
            <Link
              href={pillar.href}
              className="group block rounded-xl border border-border/60 bg-card/50 p-8 transition-all hover:border-border hover:bg-card"
            >
              <pillar.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-foreground" />
              <h3 className="mt-4 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </Link>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
