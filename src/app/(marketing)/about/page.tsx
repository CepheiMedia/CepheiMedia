import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      {/* Hero */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Analytics-First.
          <br />
          <span className="text-muted-foreground">Built for Outcomes.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Cephei Media is a growth partner that combines performance marketing
          and premium design execution — backed by data your team can actually
          see and understand.
        </p>
      </div>

      {/* Story */}
      <div className="mt-20 grid gap-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Our Approach</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Most agencies hand you a monthly PDF and call it reporting. We
              built something different: a system where every dollar of ad spend,
              every campaign test, and every deliverable is tracked and visible
              in real time.
            </p>
            <p>
              Our clients don&apos;t wonder if their investment is working. They
              log in and see it. That&apos;s the standard we hold ourselves to.
            </p>
            <p>
              We operate through two integrated arms: DTM (Digital Tech
              Marketing) handles the performance engine — Meta Ads, Google Ads,
              SEO/SEM, analytics, and conversion optimization. DDM (Digital
              Design Marketing) handles the brand layer — identity, content
              systems, web, and creative direction.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Haus of BH</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Our DDM capabilities are powered through a partnership with Haus of
              BH — a premium design studio specializing in brand systems, visual
              identity, and creative direction.
            </p>
            <p>
              This partnership gives Cephei clients access to enterprise-grade
              design without the overhead of a separate agency relationship. One
              team, one strategy, one system.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mt-24">
        <h2 className="text-2xl font-semibold">What We Believe</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Transparency Over Trust",
              desc: "Don't ask clients to trust you — show them the data. Every decision, every spend, every result.",
            },
            {
              title: "Systems Over Tactics",
              desc: "Tactics expire. Systems compound. We build infrastructure that scales with your business.",
            },
            {
              title: "Measurement Over Assumptions",
              desc: "If we can't measure it, we flag it. ROI projections are clearly labeled as assumptions until actuals prove them.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-semibold">Ready to see the difference?</h2>
        <p className="mt-3 text-muted-foreground">
          Let&apos;s build a growth system you can actually measure.
        </p>
        <div className="mt-6">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
