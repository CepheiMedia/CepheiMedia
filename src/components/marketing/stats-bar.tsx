"use client";

import { CountUp } from "@/components/ui/count-up";
import { AnimateIn } from "@/components/ui/animate-in";

const stats = [
  { value: 50, suffix: "+", label: "Campaigns Launched" },
  { value: 2.1, suffix: "M+", label: "Ad Spend Managed", prefix: "$", decimals: 1 },
  { value: 12, suffix: "+", label: "Brands Served" },
  { value: 3, suffix: "x", label: "Avg. Client ROI" },
];

export function StatsBar() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-zinc-950">
      {/* Subtle gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-purple-950/20" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-16 md:py-20 lg:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 120}>
              <div className="text-center">
                <div className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    decimals={stat.decimals}
                    duration={2000 + i * 300}
                  />
                </div>
                <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
