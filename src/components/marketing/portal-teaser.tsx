import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";

export function PortalTeaser() {
  return (
    <section className="border-y border-border/40 bg-card/20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              <Monitor className="h-3 w-3" />
              Client Portal
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Full Visibility.
              <br />
              <span className="text-muted-foreground">Zero Guesswork.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every client gets a login. Track spend, CPL, CPC, campaigns
              running, deliverables completed, ROI modeling, and growth
              projections — all in one place.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                Real-time campaign performance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                ROI calculations with transparent assumptions
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                Budget projection scenarios
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-foreground" />
                Deliverables tracker
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">See How the Portal Works</Button>
              </Link>
            </div>
          </div>

          {/* Mock dashboard */}
          <div className="rounded-xl border border-border/60 bg-card p-6">
            <div className="space-y-4">
              {/* Mock header */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Dashboard Overview</div>
                <div className="text-xs text-muted-foreground">
                  Last 30 days
                </div>
              </div>

              {/* Mock KPI row */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Spend", value: "$12,400" },
                  { label: "Leads", value: "284" },
                  { label: "CPL", value: "$43.66" },
                  { label: "ROAS", value: "3.2x" },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-lg border border-border/40 bg-background p-3"
                  >
                    <div className="text-xs text-muted-foreground">
                      {kpi.label}
                    </div>
                    <div className="mt-1 text-xl font-bold tabular-nums">
                      {kpi.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock chart area */}
              <div className="flex h-32 items-end gap-1 rounded-lg border border-border/40 bg-background p-3">
                {[40, 55, 35, 65, 80, 60, 75, 90, 70, 85, 95, 88].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-muted-foreground/20"
                      style={{ height: `${h}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
