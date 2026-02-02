import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface CaseStudy {
  client: string;
  industry: string;
  services: string[];
  metric: string;
  metricLabel: string;
  description: string;
}

const caseStudies: CaseStudy[] = [
  {
    client: "E-Commerce Brand",
    industry: "Retail",
    services: ["DTM"],
    metric: "-42%",
    metricLabel: "CPL Reduction",
    description:
      "Rebuilt Meta Ads account structure and landing pages, resulting in a 42% decrease in cost per lead within 60 days.",
  },
  {
    client: "SaaS Startup",
    industry: "Technology",
    services: ["DTM", "DDM"],
    metric: "3.1x",
    metricLabel: "ROAS Improvement",
    description:
      "Full rebrand through Haus of BH paired with Google Ads optimization delivered a 3.1x return on ad spend.",
  },
  {
    client: "Professional Services Firm",
    industry: "B2B Services",
    services: ["DTM"],
    metric: "+180%",
    metricLabel: "Lead Volume",
    description:
      "SEO/SEM strategy overhaul with conversion tracking implementation drove 180% increase in qualified leads.",
  },
];

export function CaseStudies() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Case Studies
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Real results from real partnerships. Here&apos;s what data-backed
            execution looks like.
          </p>
        </div>
        <Link
          href="/case-studies"
          className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:block"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {caseStudies.map((study) => (
          <Link
            key={study.client}
            href="/case-studies"
            className="group flex flex-col rounded-xl border border-border/60 bg-card/50 p-6 transition-all hover:border-border hover:bg-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {study.services.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="mt-6">
              <div className="text-3xl font-bold tabular-nums">
                {study.metric}
              </div>
              <div className="text-sm text-muted-foreground">
                {study.metricLabel}
              </div>
            </div>

            <p className="mt-4 flex-1 text-sm text-muted-foreground">
              {study.description}
            </p>

            <div className="mt-6 border-t border-border/40 pt-4">
              <div className="text-sm font-medium">{study.client}</div>
              <div className="text-xs text-muted-foreground">
                {study.industry}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/case-studies"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all case studies &rarr;
        </Link>
      </div>
    </section>
  );
}
