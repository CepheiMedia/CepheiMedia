import Link from "next/link";
import Image from "next/image";
import { BarChart3, Palette, Music, LucideIcon } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { MouseGlow } from "@/components/ui/mouse-glow";
import { TiltCard } from "@/components/ui/tilt-card";

interface Partner {
  src: string;
  alt: string;
  type: "square" | "wide";
  bg?: string;
}

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  partners: Partner[];
}

const pillars: Pillar[] = [
  {
    icon: BarChart3,
    title: "DTM — Growth Marketing Systems",
    description:
      "Meta Ads, Google Ads, SEM, CRO, and analytics infrastructure. We build and optimize the systems that drive measurable growth.",
    href: "/services/dtm",
    partners: [
      { src: "/images/partners/cognilly-logo.png", alt: "Cognilly", type: "square" },
    ],
  },
  {
    icon: Palette,
    title: "DDM — Brand & Design Systems",
    description:
      "Brand identity, content systems, web design, and creative direction through our premium creative partners.",
    href: "/services/ddm",
    partners: [
      { src: "/images/hausofbh-logo-dark.png", alt: "Haus of BH", type: "wide", bg: "#f6e9cf" },
      { src: "/images/partners/digital-wave-logo.jpg", alt: "Digital Wave", type: "square", bg: "white" },
    ],
  },
  {
    icon: Music,
    title: "DPM — Artist Growth & Booking",
    description:
      "Brand positioning, booking leverage, content velocity, and event placement for DJs, producers, and nightlife artists.",
    href: "/services/dpm",
    partners: [],
  },
];

export function ServicePillars() {
  return (
    <MouseGlow glowColor="rgba(255,255,255,0.04)" glowSize={700}>
    <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left - Heading */}
        <div className="lg:col-span-4">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three integrated arms — performance marketing, premium design,
            and artist promotion — built for scale.
          </p>
          <div className="mt-6">
            <Link href="/services" className="text-sm font-medium hover:underline">
              View all services →
            </Link>
          </div>
        </div>

        {/* Right - Cards */}
        <div className="lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <AnimateIn key={pillar.title} delay={i * 100}>
                <TiltCard className="h-full rounded-xl">
                <Link
                  href={pillar.href}
                  className="group flex h-full flex-col rounded-xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card"
                >
                  <pillar.icon className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <h3 className="mt-4 font-semibold leading-tight">{pillar.title}</h3>
                  <p className="mt-2 flex-grow text-sm text-muted-foreground">
                    {pillar.description}
                  </p>
                  {pillar.partners.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 pt-4 border-t border-border/40">
                      <span className="text-xs text-muted-foreground">Powered by</span>
                      <div className="flex items-center gap-1.5">
                        {pillar.partners.map((partner) => (
                          <div
                            key={partner.alt}
                            className="rounded-md overflow-hidden p-1"
                            style={{ backgroundColor: partner.bg || "transparent" }}
                          >
                            <Image
                              src={partner.src}
                              alt={partner.alt}
                              width={partner.type === "wide" ? 60 : 24}
                              height={24}
                              className={partner.type === "wide" ? "h-4 w-auto" : "h-6 w-6 object-contain"}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Link>
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
