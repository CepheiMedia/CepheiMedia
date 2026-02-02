import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Palette, Zap } from "lucide-react";

const services = [
  {
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
  },
  {
    icon: Palette,
    title: "DDM — Brand & Design Systems",
    description:
      "Brand identity, content systems, web design, and creative direction through our premium partner, Haus of BH.",
    href: "/services/ddm",
    features: [
      "Brand identity & guidelines",
      "Social & content design systems",
      "Web design & landing pages",
      "Creative direction",
      "Template systems for scale",
      "Integrated with DTM strategy",
    ],
  },
  {
    icon: Zap,
    title: "Automation Layer",
    description:
      "Lead routing, SMS follow-up, scheduling automation, and workflow systems that eliminate manual bottlenecks and accelerate speed-to-lead.",
    href: "/contact",
    features: [
      "Lead routing & distribution",
      "SMS/email follow-up sequences",
      "Scheduling automation",
      "CRM integration",
      "Workflow optimization",
      "Custom automation builds",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Services
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Two integrated arms — performance marketing and premium design —
          backed by automation and full client visibility.
        </p>
      </div>

      <div className="mt-16 space-y-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-xl border border-border/60 bg-card/50 p-8"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <service.icon className="h-8 w-8 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-semibold">{service.title}</h2>
                <p className="mt-3 text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Link href={service.href}>
                    <Button variant="outline" className="gap-2">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Includes
                </h3>
                <ul className="mt-3 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">Not sure where to start?</h2>
        <p className="mt-3 text-muted-foreground">
          Tell us about your goals and we&apos;ll recommend the right combination
          of services.
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
