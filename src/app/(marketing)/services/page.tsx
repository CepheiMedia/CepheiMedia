import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Palette, Music } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const dtmService = {
  icon: BarChart3,
  title: "DTM — Growth Marketing Systems",
  description:
    "Meta Ads, Google Ads, SEO/SEM, CRO, and analytics infrastructure. Performance marketing that drives measurable, predictable growth.",
  href: "/services/dtm",
  features: [
    "Meta & Google Ads management",
    "SEO/SEM strategy",
    "Conversion rate optimization",
    "Analytics & tracking setup",
    "Weekly optimization cycles",
    "Client portal with live data",
  ],
};

const ddmService = {
  icon: Palette,
  title: "DDM — Brand & Design Systems",
  description:
    "Brand identity, content systems, web design, and creative direction through our premium design studio.",
  href: "/services/ddm",
  features: [
    "Brand identity & guidelines",
    "Social & content design systems",
    "Web design & landing pages",
    "Creative direction",
    "Template systems for scale",
    "Integrated with DTM strategy",
  ],
};

const dpmService = {
  icon: Music,
  title: "DPM — Artist Growth & Booking",
  description:
    "Brand positioning, booking leverage, content velocity, and event placement for DJs, producers, and nightlife artists who want structured growth.",
  href: "/services/dpm",
  features: [
    "Booking & gig expansion",
    "Digital brand positioning",
    "Live event content coverage",
    "Venue & promoter introductions",
    "Cross-promotion & takeovers",
    "Strategic growth planning",
  ],
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Three integrated arms — performance marketing, premium design, and
          artist promotion — backed by full client visibility.
        </p>
      </div>

      <div className="mt-16 space-y-8">
        {/* DTM Service */}
        <AnimateIn>
        <div className="relative rounded-xl border border-border/60 bg-card/50 p-8 overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] hover:border-blue-500/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <dtmService.icon className="h-8 w-8 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">{dtmService.title}</h2>
              <p className="mt-3 text-muted-foreground">{dtmService.description}</p>
              {/* Partner logo */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Powered by</span>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/partners/cognilly-logo.png"
                    alt="Cognilly"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Link href={dtmService.href}>
                  <Button variant="outline" className="gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Includes</h3>
              <ul className="mt-3 space-y-2">
                {dtmService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="h-1 w-1 rounded-full bg-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </AnimateIn>

        {/* DDM Service */}
        <AnimateIn delay={150}>
        <div className="relative rounded-xl border border-border/60 bg-card/50 p-8 overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)] hover:border-amber-500/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <ddmService.icon className="h-8 w-8 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">{ddmService.title}</h2>
              <p className="mt-3 text-muted-foreground">{ddmService.description}</p>
              {/* Partner logos */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Powered by</span>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#f6e9cf] px-2.5 py-1.5">
                    <Image
                      src="/images/hausofbh-logo-dark.png"
                      alt="Haus of BH"
                      width={80}
                      height={26}
                      className="h-6 w-auto"
                    />
                  </div>
                  <div className="rounded-lg bg-white p-1.5">
                    <Image
                      src="/images/partners/digital-wave-logo.jpg"
                      alt="Digital Wave"
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href={ddmService.href}>
                  <Button variant="outline" className="gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Includes</h3>
              <ul className="mt-3 space-y-2">
                {ddmService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="h-1 w-1 rounded-full bg-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </AnimateIn>

        {/* DPM Service */}
        <AnimateIn delay={300}>
        <div className="relative rounded-xl border border-border/60 bg-card/50 p-8 overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)] hover:border-purple-500/30">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <dpmService.icon className="h-8 w-8 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">{dpmService.title}</h2>
              <p className="mt-3 text-muted-foreground">{dpmService.description}</p>
              {/* DPM logo */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-muted-foreground">Powered by</span>
                <Image
                  src="/images/dpm-logo.png"
                  alt="Cephei Media Promotions"
                  width={160}
                  height={46}
                  className="h-12 w-auto"
                />
              </div>
              <div className="mt-6">
                <Link href={dpmService.href}>
                  <Button variant="outline" className="gap-2">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Includes</h3>
              <ul className="mt-3 space-y-2">
                {dpmService.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="h-1 w-1 rounded-full bg-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </AnimateIn>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">Not sure where to start?</h2>
        <p className="mt-3 text-muted-foreground">
          Tell us about your goals and we&apos;ll recommend the right combination
          of services.
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
  );
}
