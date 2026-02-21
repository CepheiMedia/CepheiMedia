import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  Palette,
  BarChart3,
  Lightbulb,
  FileText,
  Download,
  ExternalLink,
  Folder,
  Calendar,
} from "lucide-react";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type DeliverableStatus = "delivered" | "in_review" | "draft" | "archived";

interface DeliverableCategory {
  id: string;
  name: string;
  icon: string;
  sort_order: number;
}

interface Deliverable {
  id: string;
  title: string;
  description?: string;
  status: DeliverableStatus;
  category_id: string;
  category: DeliverableCategory;
  delivered_at?: string;
  file_url?: string;
  external_url?: string;
}

function getCategoryIcon(iconName: string) {
  const icons: Record<string, typeof FileText> = {
    palette: Palette,
    chart: BarChart3,
    lightbulb: Lightbulb,
    file: FileText,
  };
  return icons[iconName] ?? FileText;
}

function getStatusBadge(status: DeliverableStatus) {
  switch (status) {
    case "delivered":
      return (
        <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          Delivered
        </Badge>
      );
    case "in_review":
      return (
        <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-400">
          In Review
        </Badge>
      );
    case "draft":
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-500">
          Draft
        </Badge>
      );
    case "archived":
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-500">
          Archived
        </Badge>
      );
    default:
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-500">
          {status}
        </Badge>
      );
  }
}

const categoryColors: Record<string, string> = {
  palette: "bg-purple-500/10 text-purple-400",
  chart: "bg-blue-500/10 text-blue-400",
  lightbulb: "bg-amber-500/10 text-amber-400",
  file: "bg-zinc-500/10 text-zinc-400",
};

interface CategoryCardProps {
  category: DeliverableCategory;
  count: number;
  index: number;
}

function CategoryCard({ category, count, index }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.icon);
  const colorClass = categoryColors[category.icon] ?? "bg-zinc-500/10 text-zinc-400";

  return (
    <AnimateIn delay={100 + index * 50}>
      <div className="glass-card glow-hover rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white">{category.name}</h3>
            <p className="mt-1 text-2xl font-bold text-white">{count}</p>
            <p className="text-sm text-zinc-500">
              {count === 1 ? "item" : "items"}
            </p>
          </div>
          <div className={`rounded-lg p-2.5 ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}

// Mock data
const categories: DeliverableCategory[] = [
  { id: "cat1", name: "Creative Assets", icon: "palette", sort_order: 1 },
  { id: "cat2", name: "Reports", icon: "chart", sort_order: 2 },
  { id: "cat3", name: "Strategy", icon: "lightbulb", sort_order: 3 },
  { id: "cat4", name: "Documents", icon: "file", sort_order: 4 },
];

const deliverables: Deliverable[] = [
  { id: "d1", title: "Q1 Brand Guide", description: "Updated brand guidelines with new color palette and typography", status: "delivered", category_id: "cat1", category: categories[0], delivered_at: "2026-01-15", file_url: "#" },
  { id: "d2", title: "January Performance Report", description: "Monthly campaign performance analysis with recommendations", status: "delivered", category_id: "cat2", category: categories[1], delivered_at: "2026-02-03", file_url: "#" },
  { id: "d3", title: "Q2 Campaign Strategy", description: "Proposed campaign strategy and budget allocation for Q2", status: "in_review", category_id: "cat3", category: categories[2], delivered_at: "2026-02-10" },
  { id: "d4", title: "Ad Creative Set — Spring Launch", description: "15 static + 3 video creatives for spring campaign", status: "delivered", category_id: "cat1", category: categories[0], delivered_at: "2026-01-28", file_url: "#" },
  { id: "d5", title: "Competitor Analysis", description: "Deep dive into competitor ad strategies and positioning", status: "delivered", category_id: "cat3", category: categories[2], delivered_at: "2025-12-20", external_url: "#" },
];

const categoryCounts: Record<string, number> = {};
for (const category of categories) {
  categoryCounts[category.id] = deliverables.filter(
    (d) => d.category_id === category.id
  ).length;
}

export default function DeliverablesPage() {
  return (
    <div className="space-y-8">
      <AnimateIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Deliverables</h1>
          <p className="mt-1 text-zinc-500">
            Assets and reports delivered by your agency team.
          </p>
        </div>
      </AnimateIn>

      {/* Category Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => (
          <CategoryCard
            key={category.id}
            category={category}
            count={categoryCounts[category.id] ?? 0}
            index={i}
          />
        ))}
      </div>

      {/* Deliverables List */}
      <AnimateIn delay={300}>
        <div className="glass-card rounded-xl">
          <div className="border-b border-white/[0.06] p-6">
            <h2 className="font-semibold text-white">All Deliverables</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Files, reports, and assets from your campaigns
            </p>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {deliverables.map((deliverable) => {
              const Icon = getCategoryIcon(deliverable.category.icon);
              const colorClass = categoryColors[deliverable.category.icon] ?? "bg-zinc-500/10 text-zinc-400";

              return (
                <div
                  key={deliverable.id}
                  className="table-row-glow flex items-start gap-4 p-6"
                >
                  <div className={`rounded-lg p-3 ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-white">{deliverable.title}</h3>
                        {deliverable.description && (
                          <p className="mt-1 text-sm text-zinc-500">
                            {deliverable.description}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Badge className="border-zinc-700 bg-zinc-800 text-zinc-400 text-xs">
                            {deliverable.category.name}
                          </Badge>
                          {getStatusBadge(deliverable.status)}
                          {deliverable.delivered_at && (
                            <span className="flex items-center gap-1 text-xs text-zinc-600">
                              <Calendar className="h-3 w-3" />
                              {formatDate(deliverable.delivered_at)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {deliverable.file_url && (
                          <a
                            href={deliverable.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-white transition-all hover:border-blue-500/30 hover:bg-blue-500/10"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        )}
                        {deliverable.external_url && (
                          <a
                            href={deliverable.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-white transition-all hover:border-blue-500/30 hover:bg-blue-500/10"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View
                          </a>
                        )}
                        {!deliverable.file_url && !deliverable.external_url && (
                          <span className="text-sm text-zinc-600">
                            No file attached
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimateIn>

      {/* Info Section */}
      <AnimateIn delay={400}>
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-semibold text-white">About Deliverables</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Deliverables include creative assets, performance reports, strategy
            documents, and other work products created by your agency team. Files
            are uploaded as they are completed and approved. Contact your account
            manager if you need additional formats or have questions about any
            deliverable.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
