import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Palette,
  PenTool,
  Globe,
  Camera,
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Branding Systems",
    desc: "Complete brand identity design — logo, typography, color systems, brand guidelines, and asset libraries built for consistency at scale.",
  },
  {
    icon: Camera,
    title: "Social & Content Design",
    desc: "Templated content systems for social media, email, and marketing collateral that maintain brand consistency while enabling rapid production.",
  },
  {
    icon: Globe,
    title: "Web Design & Landing Pages",
    desc: "Conversion-optimized web design and landing pages that align brand aesthetics with performance marketing goals.",
  },
  {
    icon: PenTool,
    title: "Creative Direction",
    desc: "Strategic creative oversight across campaigns, content, and brand touchpoints — ensuring everything looks and feels cohesive.",
  },
];

const deliverables = [
  "Brand identity & guidelines",
  "Logo suite & variations",
  "Social media template systems",
  "Web design & development",
  "Landing page design",
  "Content design systems",
  "Creative direction & art direction",
  "Ongoing design support",
];

export default function DDMPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      {/* Hero */}
      <div className="max-w-3xl">
        <Badge variant="secondary" className="mb-4">
          DDM
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Brand & Design Systems
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Premium brand and design execution through our partnership with Haus
          of BH. Enterprise-grade creative without the agency overhead.
        </p>
      </div>

      {/* Haus of BH */}
      <div className="mt-16 rounded-xl border border-border/60 bg-card/50 p-8">
        <h2 className="text-2xl font-semibold">Powered by Haus of BH</h2>
        <p className="mt-3 text-muted-foreground">
          Haus of BH is a premium design studio that serves as Cephei&apos;s
          dedicated DDM partner. This partnership means our clients get
          top-tier brand and creative work fully integrated with their
          performance marketing strategy — one team, one vision, one system.
        </p>
      </div>

      {/* Services */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">What We Build</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <service.icon className="h-6 w-6 text-muted-foreground" />
              <h3 className="mt-3 font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold">Deliverables</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {deliverables.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/30 px-4 py-3 text-sm"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">
          Ready for a brand that performs?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Let&apos;s discuss how DDM and Haus of BH can elevate your brand
          alongside your growth strategy.
        </p>
        <div className="mt-6">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
