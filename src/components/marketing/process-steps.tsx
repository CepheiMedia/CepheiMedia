import { Search, Wrench, RefreshCw, TrendingUp } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Audit & Alignment",
    description:
      "We map your current setup, define the right KPIs, and set benchmarks that reflect your business goals.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Build System",
    description:
      "Tracking, funnels, creative, and campaign architecture — assembled as infrastructure, not one-off campaigns.",
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
    <section className="bg-zinc-100 dark:bg-zinc-900">
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Left - Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
              How We Build Your System
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              The same four-step framework behind every client launch. Here&apos;s
              how it runs.
            </p>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-zinc-600 dark:text-zinc-400">Avg. 45-day full launch</span>
              </div>
            </div>
          </div>

          {/* Right - Steps */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {steps.map((step, i) => (
                <AnimateIn key={step.number} delay={i * 150}>
                  <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 font-mono text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-400">
                        {step.number}
                      </div>
                      <step.icon className="h-5 w-5 text-zinc-400" />
                    </div>
                    <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
