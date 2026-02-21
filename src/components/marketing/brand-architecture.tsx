import Image from "next/image";
import Link from "next/link";
import { BarChart3, Palette, Music } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { TiltCard } from "@/components/ui/tilt-card";

export function BrandArchitecture() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 py-24">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(113 113 122) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Main logo at top */}
        <div className="flex flex-col items-center">
          <Image
            src="/images/cephei-logo-transparent.png"
            alt="Cephei Media"
            width={320}
            height={91}
            className="h-34 w-auto md:h-44"
          />
          <p className="mt-4 text-sm text-zinc-400">Performance Marketing Agency</p>
        </div>

        {/* Connection lines - Desktop */}
        <div className="relative mt-12 hidden md:block">
          {/* Vertical line from logo */}
          <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-zinc-600 to-zinc-500" />

          {/* Horizontal connector — spans from 1/6 to 5/6 */}
          <div className="absolute left-[16.67%] top-16 h-px w-[66.66%] bg-zinc-500" />

          {/* Left vertical line (DTM) */}
          <div className="absolute left-[16.67%] top-16 h-16 w-px bg-gradient-to-b from-zinc-500 to-zinc-400" />

          {/* Center vertical line (DDM) */}
          <div className="absolute left-1/2 top-16 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-zinc-500 to-zinc-400" />

          {/* Right vertical line (DPM) */}
          <div className="absolute left-[83.33%] top-16 h-16 w-px bg-gradient-to-b from-zinc-500 to-zinc-400" />

          {/* Node dots */}
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-500 bg-zinc-900" />
          <div className="absolute left-[16.67%] top-16 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-500 bg-zinc-900" />
          <div className="absolute left-1/2 top-16 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-500 bg-zinc-900" />
          <div className="absolute left-[83.33%] top-16 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-500 bg-zinc-900" />
        </div>

        {/* Service branches */}
        <div className="mt-8 grid gap-6 md:mt-32 md:grid-cols-3 md:gap-8">
          {/* DTM Branch */}
          <AnimateIn delay={0}>
          <TiltCard className="rounded-2xl" tiltAmount={6}>
          <Link
            href="/services/dtm"
            className="group relative block rounded-2xl border border-zinc-700 bg-zinc-800/60 p-8 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
          >
            {/* Glowing accent */}
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">DTM</h3>
                <p className="text-sm text-zinc-400">Digital Tech Marketing</p>
              </div>
            </div>

            {/* Partner */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-zinc-500">Powered by</span>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/images/partners/cognilly-logo.png"
                  alt="Cognilly"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Meta & Google Ads",
                "SEO / SEM",
                "Conversion Optimization",
                "Analytics & Tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="h-1 w-1 rounded-full bg-blue-500" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 transition-colors group-hover:text-blue-400">
              <span>Explore DTM</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
          </TiltCard>
          </AnimateIn>

          {/* DDM Branch */}
          <AnimateIn delay={150}>
          <TiltCard className="rounded-2xl" tiltAmount={6}>
          <Link
            href="/services/ddm"
            className="group relative block rounded-2xl border border-zinc-700 bg-zinc-800/60 p-8 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
          >
            {/* Glowing accent */}
            <div
              className="absolute -top-px left-8 right-8 h-px opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: "linear-gradient(to right, transparent, rgba(246, 233, 207, 0.5), transparent)" }}
            />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">DDM</h3>
                <p className="text-sm text-zinc-400">Digital Design Marketing</p>
              </div>
            </div>

            {/* Partners */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-zinc-500">Powered by</span>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-[#f6e9cf] px-2 py-1">
                  <Image
                    src="/images/hausofbh-logo-dark.png"
                    alt="Haus of BH"
                    width={70}
                    height={22}
                    className="h-5 w-auto"
                  />
                </div>
                <div className="rounded-lg bg-white p-1">
                  <Image
                    src="/images/partners/digital-wave-logo.jpg"
                    alt="Digital Wave"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Brand Identity & Systems",
                "Web Design & Landing Pages",
                "Social & Content Design",
                "Creative Direction",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="h-1 w-1 rounded-full bg-amber-400" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 transition-colors group-hover:text-amber-400">
              <span>Explore DDM</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
          </TiltCard>
          </AnimateIn>

          {/* DPM Branch */}
          <AnimateIn delay={300}>
          <TiltCard className="rounded-2xl" tiltAmount={6}>
          <Link
            href="/services/dpm"
            className="group relative block rounded-2xl border border-zinc-700 bg-zinc-800/60 p-8 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
          >
            {/* Glowing accent */}
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Music className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">DPM</h3>
                <p className="text-sm text-zinc-400">Digital Promotional Marketing</p>
              </div>
            </div>

            {/* DPM logo */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-zinc-500">Powered by</span>
              <Image
                src="/images/dpm-logo.png"
                alt="Cephei Media Promotions"
                width={90}
                height={26}
                className="h-6 w-auto"
              />
            </div>

            <div className="mt-4 space-y-3">
              {[
                "Booking & Gig Expansion",
                "Artist Brand Positioning",
                "Live Content & Coverage",
                "Venue & Promoter Network",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <span className="h-1 w-1 rounded-full bg-purple-400" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 transition-colors group-hover:text-purple-400">
              <span>Explore DPM</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
          </TiltCard>
          </AnimateIn>
        </div>

        {/* Bottom connector text + CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-zinc-500">
            Three integrated arms. One unified strategy.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
          >
            View All Services
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
