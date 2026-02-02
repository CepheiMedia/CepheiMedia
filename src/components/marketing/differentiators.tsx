import { LineChart, Eye, FlaskConical, Layers } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

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
    <section className="border-y border-border/40 bg-card/20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Why Cephei
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Built different from traditional agencies. Here&apos;s what sets us apart.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <AnimateIn key={card.title} delay={i * 100}>
              <div className="rounded-xl border border-border/60 bg-background p-6 transition-all hover:border-border">
                <card.icon className="h-6 w-6 text-muted-foreground" />
                <h3 className="mt-4 font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
