import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/20 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-4xl text-center">
          {/* Credibility strip */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Performance-first. Data-backed. Built for scale.
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
            Predictable Growth.
            <br />
            <span className="text-muted-foreground">Measured ROI.</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Cephei Media builds performance systems across Meta, Google,
            SEO/SEM, and automation — backed by analytics your team can actually
            understand.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="gap-2 text-base">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button variant="outline" size="lg" className="text-base">
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
