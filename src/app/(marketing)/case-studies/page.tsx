import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    client: "E-Commerce Brand",
    industry: "Retail",
    services: ["DTM"],
    metric: "-42%",
    metricLabel: "CPL Reduction",
    challenge:
      "High cost-per-lead from poorly structured Meta campaigns with no conversion tracking.",
    solution:
      "Rebuilt account architecture, implemented server-side tracking, launched structured creative tests, and optimized landing pages for conversion.",
    results: [
      "42% reduction in CPL within 60 days",
      "3x increase in qualified leads",
      "Full conversion attribution pipeline",
    ],
  },
  {
    client: "SaaS Startup",
    industry: "Technology",
    services: ["DTM", "DDM"],
    metric: "3.1x",
    metricLabel: "ROAS Improvement",
    challenge:
      "Weak brand presence and generic Google Ads strategy producing diminishing returns.",
    solution:
      "Full rebrand through Haus of BH paired with restructured Google Ads campaigns, new landing page system, and conversion tracking overhaul.",
    results: [
      "3.1x return on ad spend",
      "Brand consistency across all touchpoints",
      "40% improvement in landing page conversion rate",
    ],
  },
  {
    client: "Professional Services Firm",
    industry: "B2B Services",
    services: ["DTM"],
    metric: "+180%",
    metricLabel: "Lead Volume",
    challenge:
      "No digital presence beyond a basic website. Zero tracking or attribution in place.",
    solution:
      "Built SEO/SEM strategy from scratch, deployed GA4 + conversion API, launched Meta and Google campaigns with structured testing.",
    results: [
      "180% increase in qualified leads",
      "First-ever attribution model",
      "Predictable monthly lead flow established",
    ],
  },
  {
    client: "Health & Wellness Brand",
    industry: "DTC",
    services: ["DDM"],
    metric: "Complete",
    metricLabel: "Brand Overhaul",
    challenge:
      "Inconsistent brand identity limiting premium positioning and confusing customers.",
    solution:
      "Haus of BH delivered a complete brand system: new visual identity, packaging design, social content templates, and web redesign.",
    results: [
      "Unified brand across all channels",
      "35% increase in average order value",
      "Content production velocity doubled",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Case Studies
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real results from real partnerships. Every project here was measured,
          documented, and validated through our analytics systems.
        </p>
      </div>

      <div className="mt-16 space-y-8">
        {caseStudies.map((study) => (
          <div
            key={study.client}
            className="rounded-xl border border-border/60 bg-card/50 p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">{study.client}</h2>
              <span className="text-sm text-muted-foreground">
                {study.industry}
              </span>
              <div className="flex gap-1">
                {study.services.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-3xl font-bold tabular-nums">
                  {study.metric}
                </div>
                <div className="text-sm text-muted-foreground">
                  {study.metricLabel}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Challenge
                    </h3>
                    <p className="mt-1 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Solution
                    </h3>
                    <p className="mt-1 text-sm">{study.solution}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Results
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {study.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="h-1 w-1 rounded-full bg-foreground" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">Want results like these?</h2>
        <p className="mt-3 text-muted-foreground">
          Let&apos;s discuss what measurable growth looks like for your business.
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
