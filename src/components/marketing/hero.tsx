"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RotatingText } from "@/components/ui/rotating-text";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4?v=2" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/60" />

      {/* Gradient fade at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-6 pb-24 pt-32 md:pb-32 md:pt-44 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          {/* Credibility strip */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Performance-first. Data-backed. Built for scale.
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
            Predictable Growth.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              <RotatingText
                phrases={[
                  "Measured ROI.",
                  "Full Visibility.",
                  "Scalable Systems.",
                  "Data-Driven Results.",
                ]}
                interval={3200}
              />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Cephei Media builds performance systems across Meta, Google,
            SEO/SEM, and automation — backed by analytics your team can actually
            understand.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 text-base">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-base">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
