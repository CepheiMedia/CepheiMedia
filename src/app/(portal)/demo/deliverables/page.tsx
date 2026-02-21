import { Badge } from "@/components/ui/badge";
import {
  Palette,
  BarChart3,
  Lightbulb,
  FileText,
  Download,
  ExternalLink,
  Calendar,
} from "lucide-react";

const categories = [
  { id: "reports", name: "Performance Reports", icon: BarChart3, count: 2 },
  { id: "creative", name: "Ad Creatives", icon: Palette, count: 3 },
  { id: "strategy", name: "Strategy Documents", icon: Lightbulb, count: 1 },
];

const deliverables = [
  {
    title: "January 2026 Performance Report",
    description: "143 leads generated across 3 campaigns. $21.54 CPL achieved with 4.1x ROAS.",
    category: "Performance Reports",
    status: "delivered",
    date: "Feb 5, 2026",
    hasFile: true,
    hasLink: false,
  },
  {
    title: "December 2025 Performance Report",
    description: "First full month results - 71 leads at $21.69 CPL. Campaign optimization insights.",
    category: "Performance Reports",
    status: "delivered",
    date: "Jan 5, 2026",
    hasFile: true,
    hasLink: false,
  },
  {
    title: "Financial Planning Lead Gen Creatives",
    description: "Static images and video ads for primary lead generation campaign. 57 leads generated.",
    category: "Ad Creatives",
    status: "delivered",
    date: "Nov 20, 2025",
    hasFile: true,
    hasLink: false,
  },
  {
    title: "Investment Services Retargeting Ads",
    description: "Retargeting creative set for warm audiences. Carousel and single image formats.",
    category: "Ad Creatives",
    status: "delivered",
    date: "Dec 1, 2025",
    hasFile: true,
    hasLink: false,
  },
  {
    title: "Wealth Advisory Awareness Campaign",
    description: "Brand awareness video and carousel ads. 58 leads from awareness-to-conversion funnel.",
    category: "Ad Creatives",
    status: "delivered",
    date: "Dec 15, 2025",
    hasFile: true,
    hasLink: false,
  },
  {
    title: "Q1 2026 Strategy Recommendations",
    description: "Scaling recommendations based on 2-month performance. Budget optimization and new audience segments.",
    category: "Strategy Documents",
    status: "delivered",
    date: "Jan 15, 2026",
    hasFile: true,
    hasLink: false,
  },
];

function getCategoryIcon(categoryName: string) {
  const category = categories.find((c) => c.name === categoryName);
  if (!category) return FileText;
  return category.icon;
}

export default function DemoDeliverablesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deliverables</h1>
        <p className="mt-1 text-muted-foreground">
          Assets and reports from your agency team.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="rounded-xl border border-border/60 bg-card/50 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="mt-1 text-2xl font-bold">{category.count}</p>
                  <p className="text-sm text-muted-foreground">items</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deliverables List */}
      <div className="rounded-xl border border-border/60 bg-card/50">
        <div className="border-b border-border/60 p-6">
          <h2 className="font-semibold">All Deliverables</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Files, reports, and assets from your campaigns
          </p>
        </div>

        <div className="divide-y divide-border/40">
          {deliverables.map((deliverable, i) => {
            const Icon = getCategoryIcon(deliverable.category);

            return (
              <div key={i} className="flex items-start gap-4 p-6">
                <div className="rounded-lg bg-muted/50 p-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{deliverable.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {deliverable.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {deliverable.category}
                        </Badge>
                        <Badge variant="default">Delivered</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {deliverable.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {deliverable.hasFile && (
                        <button className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted/50">
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      )}
                      {deliverable.hasLink && (
                        <button className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted/50">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
