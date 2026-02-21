import { KPICard } from "@/components/portal/kpi-card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  DollarSign,
  Users,
  TrendingUp,
  Play,
  Pause,
  CheckCircle,
} from "lucide-react";

const campaigns = [
  {
    name: "Financial Planning - Lead Gen",
    platform: "meta",
    status: "active",
    objective: "Lead Generation",
    spend: 892,
    impressions: 8520,
    clicks: 5345,
    conversions: 57,
    roas: 4.5,
  },
  {
    name: "Investment Services - Retargeting",
    platform: "meta",
    status: "active",
    objective: "Conversions",
    spend: 324,
    impressions: 3187,
    clicks: 2077,
    conversions: 28,
    roas: 3.8,
  },
  {
    name: "Wealth Advisory - Awareness",
    platform: "meta",
    status: "active",
    objective: "Lead Generation",
    spend: 324,
    impressions: 5578,
    clicks: 2667,
    conversions: 58,
    roas: 4.1,
  },
];

const summary = {
  activeCampaigns: campaigns.filter((c) => c.status === "active").length,
  totalSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
  totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
  avgRoas: 4.1,
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

function getPlatformBadge(platform: string) {
  const styles: Record<string, string> = {
    meta: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    google: "bg-red-500/10 text-red-500 border-red-500/30",
  };
  return (
    <Badge variant="outline" className={styles[platform]}>
      {platform === "meta" ? "Meta" : "Google"}
    </Badge>
  );
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge variant="default" className="gap-1">
          <Play className="h-3 w-3" />
          Active
        </Badge>
      );
    case "paused":
      return (
        <Badge variant="secondary" className="gap-1">
          <Pause className="h-3 w-3" />
          Paused
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function DemoCampaignsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
        <p className="mt-1 text-muted-foreground">
          Performance across all advertising campaigns.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Active Campaigns"
          value={summary.activeCampaigns}
          subtext={`${campaigns.length} total campaigns`}
          icon={<Megaphone className="h-5 w-5" />}
        />
        <KPICard
          label="Total Spend (MTD)"
          value={formatCurrency(summary.totalSpend)}
          subtext="Across all campaigns"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KPICard
          label="Total Conversions"
          value={formatNumber(summary.totalConversions)}
          subtext="Leads generated"
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          label="Avg. ROAS"
          value={`${summary.avgRoas}x`}
          subtext="Return on ad spend"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Campaigns Table */}
      <div className="rounded-xl border border-border/60 bg-card/50">
        <div className="border-b border-border/60 p-6">
          <h2 className="font-semibold">All Campaigns</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Campaign performance across all platforms
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Platform</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Spend</th>
                <th className="px-6 py-3 font-medium text-right">Impressions</th>
                <th className="px-6 py-3 font-medium text-right">Clicks</th>
                <th className="px-6 py-3 font-medium text-right">Conv.</th>
                <th className="px-6 py-3 font-medium text-right">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.name}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {campaign.objective}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getPlatformBadge(campaign.platform)}</td>
                  <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {formatCurrency(campaign.spend)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {formatNumber(campaign.impressions)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {formatNumber(campaign.clicks)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {campaign.conversions}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    {campaign.roas}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
