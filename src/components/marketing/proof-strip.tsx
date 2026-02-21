import { AnimateIn } from "@/components/ui/animate-in";

const metrics = [
  { value: "$2.4M+", label: "Ad Spend Managed" },
  { value: "3.2x", label: "Avg. ROAS" },
  { value: "12K+", label: "Leads Generated" },
  { value: "-38%", label: "Avg. CPL Reduction" },
];

export function ProofStrip() {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-900">
      <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, i) => (
            <AnimateIn key={metric.label} delay={i * 100}>
              <div className="text-center">
                <div className="text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100 md:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {metric.label}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
