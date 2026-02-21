import Image from "next/image";
import { LineChart, Eye, FlaskConical, Layers } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { MouseGlow } from "@/components/ui/mouse-glow";
import { TiltCard } from "@/components/ui/tilt-card";

const cards = [
  {
    icon: LineChart,
    title: "Analytics-First Decisions",
    description:
      "Every recommendation is backed by data. No guesswork, no vanity metrics — just clear signals that drive action.",
  },
  {
    icon: Eye,
    title: "Full Visibility via Client Portal",
    description:
      "Log in anytime to see what's running, what was spent, and whether the investment produced ROI.",
  },
  {
    icon: FlaskConical,
    title: "Structured Testing & Iteration",
    description:
      "Weekly optimization cycles with documented changes, A/B tests, and measurable improvements.",
  },
  {
    icon: Layers,
    title: "DTM + DDM Execution",
    description:
      "Performance marketing and premium design under one roof. Haus of BH handles brand; we handle growth.",
  },
];

export function Differentiators() {
  return (
    <MouseGlow glowColor="rgba(255,255,255,0.04)" glowSize={700}>
    <section className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left side - Text */}
          <AnimateIn>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
              Why Cephei
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-lg">
              Built different from traditional agencies. We combine performance marketing with premium design — and give you full visibility into everything.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-950">
                  <Image
                    src="/images/partners/cognilly-logo.png"
                    alt="Cognilly"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-950">
                  <Image
                    src="/images/partners/bbq-craft-logo.jpg"
                    alt="BBQ & Craft"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-zinc-950">
                  <Image
                    src="/images/cephei-logo.png"
                    alt="Cephei Media"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Trusted by growing brands
              </p>
            </div>
          </div>
          </AnimateIn>

          {/* Right side - Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 100}>
                <TiltCard className="rounded-xl" tiltAmount={10}>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 transition-colors hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:border-zinc-600">
                  <card.icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  <h3 className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{card.title}</h3>
                  <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
    </MouseGlow>
  );
}
