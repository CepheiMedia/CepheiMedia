import { Search, Wrench, RefreshCw, TrendingUp } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Audit & Targets",
    description:
      "We analyze your current setup, define KPIs, and set clear benchmarks for success.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Build System",
    description:
      "Tracking, funnels, creative, and campaign architecture — built from the ground up.",
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "Optimize Weekly",
    description:
      "Structured tests, documented actions, and measurable improvements every week.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Scale With Projections",
    description:
      "Budget scenarios, ROI modeling, and data-driven scaling decisions.",
  },
];

export function ProcessSteps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          A proven four-step process that turns ad spend into predictable
          revenue.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-4">
        {steps.map((step, i) => (
          <AnimateIn key={step.number} delay={i * 150}>
            <div className="relative">
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-border/40 md:block" />
              )}

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-card font-mono text-sm text-muted-foreground">
                  {step.number}
                </div>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
