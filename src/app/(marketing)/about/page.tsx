import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Palette, Music } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export default function AboutPage() {
  return (
    <div>
      {/* Hero with visual */}
      <div className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
        {/* Background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(113 113 122) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Analytics-First.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Built for Outcomes.</span>
              </h1>
              <p className="mt-6 text-lg text-zinc-400">
                Cephei Media is a growth partner that combines performance marketing
                and premium design execution — backed by data your team can actually
                see and understand.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/cephei-logo-transparent.png"
                alt="Cephei Media"
                width={500}
                height={143}
                className="h-36 w-auto md:h-48 opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Story */}
        <div className="grid gap-16 md:grid-cols-2">
          <AnimateIn>
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
                We operate through three integrated arms: DTM handles the performance
                engine, DDM handles the brand layer, and DPM builds artist careers
                in the nightlife space.
              </p>
            </div>
          </div>
          </AnimateIn>

          <AnimateIn delay={200}>
          <div>
            <h2 className="text-2xl font-semibold">Our Partners</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Our DDM capabilities are powered through partnerships with Haus of
                BH — a premium design studio specializing in brand systems, visual
                identity, and creative direction — and Digital Wave Productions, delivering
                cinematic video production and commercial photography.
              </p>
              <p>
                These partnerships give Cephei clients access to enterprise-grade
                design and production without the overhead of separate agency relationships.
                One team, one strategy, one system.
              </p>
            </div>
            {/* Partner logos */}
            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-lg bg-[#f6e9cf] px-3 py-2">
                <Image
                  src="/images/hausofbh-logo-dark.png"
                  alt="Haus of BH"
                  width={80}
                  height={26}
                  className="h-6 w-auto"
                />
              </div>
              <div className="rounded-lg bg-white p-2">
                <Image
                  src="/images/partners/cognilly-logo.png"
                  alt="Cognilly"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="rounded-lg bg-white p-2">
                <Image
                  src="/images/partners/digital-wave-logo.jpg"
                  alt="Digital Wave Productions"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
            </div>
          </div>
          </AnimateIn>
        </div>

        {/* Founder */}
        <div className="mt-24">
          <AnimateIn>
          <div className="relative mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card/50 overflow-hidden transition-all hover:border-border hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.15)]">
            <div className="grid md:grid-cols-[240px_1fr]">
              {/* Photo */}
              <div className="relative aspect-square md:aspect-auto bg-muted">
                <Image
                  src="/images/founder-alan.jpg"
                  alt="Alan Birbrayer"
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Info */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Founder & CEO</p>
                <h3 className="mt-2 text-2xl font-semibold">Alan Birbrayer</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;We built Cephei because agencies shouldn&apos;t be black boxes. Every dollar, every decision, every result — visible to the client. That&apos;s the standard.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/alanbernal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="mailto:alan@cepheimedia.com"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    alan@cepheimedia.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          </AnimateIn>
        </div>

        {/* Three Arms */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold">What We Do</h2>
          <p className="mt-2 text-muted-foreground">Three integrated arms. One unified strategy.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: BarChart3, title: "DTM", subtitle: "Growth Marketing", color: "text-blue-400 bg-blue-500/10", desc: "Meta Ads, Google Ads, SEO/SEM, analytics, and conversion optimization." },
              { icon: Palette, title: "DDM", subtitle: "Brand & Design", color: "text-amber-400 bg-amber-500/10", desc: "Brand identity, content systems, web design, and creative direction." },
              { icon: Music, title: "DPM", subtitle: "Artist Growth", color: "text-purple-400 bg-purple-500/10", desc: "Booking leverage, content velocity, and event placement for artists." },
            ].map((arm, i) => (
              <AnimateIn key={arm.title} delay={i * 150}>
              <div className="rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.1)] hover:border-border">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${arm.color}`}>
                  <arm.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">{arm.title} <span className="font-normal text-muted-foreground">— {arm.subtitle}</span></h3>
                <p className="mt-2 text-sm text-muted-foreground">{arm.desc}</p>
              </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <h2 className="text-2xl font-semibold">What We Believe</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Transparency Over Trust",
                desc: "Don\u2019t ask clients to trust you \u2014 show them the data. Every decision, every spend, every result.",
              },
              {
                title: "Systems Over Tactics",
                desc: "Tactics expire. Systems compound. We build infrastructure that scales with your business.",
              },
              {
                title: "Measurement Over Assumptions",
                desc: "If we can\u2019t measure it, we flag it. ROI projections are clearly labeled as assumptions until actuals prove them.",
              },
            ].map((value, i) => (
              <AnimateIn key={value.title} delay={i * 150}>
              <div
                className="rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.1)] hover:border-border"
              >
                <h3 className="font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
              </div>
              </AnimateIn>
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
            <a href="https://calendly.com/alan-cepheimedia/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
