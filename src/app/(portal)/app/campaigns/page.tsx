import { KPICard } from "@/components/portal/kpi-card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  Megaphone,
  DollarSign,
  Users,
  TrendingUp,
  Plug,
  ExternalLink,
  Pause,
  Play,
  CheckCircle,
} from "lucide-react";

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

type Platform = "meta" | "google" | "tiktok" | "manual";
type CampaignStatus = "active" | "paused" | "completed" | "draft";

interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  objective?: string;
  spend: number;
  clicks: number;
  conversions: number;
  roas: number;
  external_id?: string;
}

function getPlatformBadge(platform: Platform) {
  const platformStyles = {
    meta: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    google: "border-red-500/30 bg-red-500/10 text-red-400",
    tiktok: "border-pink-500/30 bg-pink-500/10 text-pink-400",
    manual: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  };

  const platformNames = {
    meta: "Meta",
    google: "Google",
    tiktok: "TikTok",
    manual: "Manual",
  };

  return (
    <Badge className={platformStyles[platform]}>
      {platformNames[platform]}
    </Badge>
  );
}

function getStatusBadge(status: CampaignStatus) {
  switch (status) {
    case "active":
      return (
        <Badge className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <Play className="h-3 w-3" />
          Active
        </Badge>
      );
    case "paused":
      return (
        <Badge className="gap-1 border-amber-500/30 bg-amber-500/10 text-amber-400">
          <Pause className="h-3 w-3" />
          Paused
        </Badge>
      );
    case "completed":
      return (
        <Badge className="gap-1 border-zinc-500/30 bg-zinc-500/10 text-zinc-400">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      );
    case "draft":
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-500">Draft</Badge>
      );
    default:
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-500">{status}</Badge>
      );
  }
}

interface PlatformCardProps {
  name: string;
  description: string;
  colorClass: string;
  borderColor: string;
  connected: boolean;
}

function PlatformCard({ name, description, colorClass, borderColor, connected }: PlatformCardProps) {
  return (
    <div className={`glass-card glow-hover rounded-xl p-6 ${connected ? borderColor : ""}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
        <div
          className={`rounded-lg p-2.5 ${
            connected ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-600"
          }`}
        >
          <Plug className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {connected ? (
          <>
            <span className="pulse-dot bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-400">Connected</span>
          </>
        ) : (
          <Badge className="border-zinc-700 bg-zinc-800 text-zinc-500">Coming Soon</Badge>
        )}
      </div>
    </div>
  );
}

// Mock data
const campaigns: Campaign[] = [
  { id: "c1", name: "Spring Lead Gen", platform: "meta", status: "active", objective: "Lead Generation", spend: 820, clicks: 3412, conversions: 58, roas: 4.2, external_id: "meta_123" },
  { id: "c2", name: "Brand Awareness Q1", platform: "google", status: "active", objective: "Brand Awareness", spend: 540, clicks: 8920, conversions: 34, roas: 3.1, external_id: "goog_456" },
  { id: "c3", name: "Retargeting - Website Visitors", platform: "meta", status: "paused", objective: "Conversions", spend: 310, clicks: 1205, conversions: 22, roas: 5.8 },
  { id: "c4", name: "Holiday Promo 2025", platform: "google", status: "completed", objective: "Sales", spend: 1200, clicks: 5600, conversions: 89, roas: 3.9, external_id: "goog_789" },
];

const summary = {
  activeCampaigns: campaigns.filter((c) => c.status === "active").length,
  totalSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
  totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
  avgRoas: campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length,
};

const isMetaConnected = true;
const isGoogleConnected = true;
const isTikTokConnected = false;

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <AnimateIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Campaigns</h1>
          <p className="mt-1 text-zinc-500">
            Manage your advertising campaigns and connected platforms.
          </p>
        </div>
      </AnimateIn>

      {/* Connect Platforms */}
      <AnimateIn delay={100}>
        <div>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
            Connect Platforms
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <PlatformCard
              name="Meta Ads"
              description="Facebook & Instagram advertising"
              colorClass="text-blue-400"
              borderColor="border-blue-500/20"
              connected={isMetaConnected}
            />
            <PlatformCard
              name="Google Ads"
              description="Search, Display & YouTube ads"
              colorClass="text-red-400"
              borderColor="border-red-500/20"
              connected={isGoogleConnected}
            />
            <PlatformCard
              name="TikTok Ads"
              description="TikTok advertising platform"
              colorClass="text-pink-400"
              borderColor="border-pink-500/20"
              connected={isTikTokConnected}
            />
          </div>
        </div>
      </AnimateIn>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimateIn delay={200}>
          <KPICard
            label="Active Campaigns"
            value={summary.activeCampaigns}
            subtext={`${campaigns.length} total campaigns`}
            icon={<Megaphone className="h-5 w-5" />}
          />
        </AnimateIn>
        <AnimateIn delay={250}>
          <KPICard
            label="Total Spend (MTD)"
            value={formatCurrency(summary.totalSpend)}
            subtext="Across all campaigns"
            icon={<DollarSign className="h-5 w-5" />}
          />
        </AnimateIn>
        <AnimateIn delay={300}>
          <KPICard
            label="Total Conversions"
            value={formatNumber(summary.totalConversions)}
            subtext="Leads generated"
            icon={<Users className="h-5 w-5" />}
          />
        </AnimateIn>
        <AnimateIn delay={350}>
          <KPICard
            label="Avg. ROAS"
            value={`${summary.avgRoas.toFixed(1)}x`}
            subtext="Return on ad spend"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </AnimateIn>
      </div>

      {/* Campaigns Table */}
      <AnimateIn delay={400}>
        <div className="glass-card rounded-xl">
          <div className="border-b border-white/[0.06] p-6">
            <h2 className="font-semibold text-white">All Campaigns</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Campaign performance across all connected platforms
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] text-left text-sm text-zinc-500">
                  <th className="px-6 py-3 font-medium">Campaign</th>
                  <th className="px-6 py-3 font-medium">Platform</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Spend</th>
                  <th className="px-6 py-3 font-medium text-right">Clicks</th>
                  <th className="px-6 py-3 font-medium text-right">Conv.</th>
                  <th className="px-6 py-3 font-medium text-right">ROAS</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="table-row-glow border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{campaign.name}</p>
                        {campaign.objective && (
                          <p className="text-xs text-zinc-600">
                            {campaign.objective}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getPlatformBadge(campaign.platform)}</td>
                    <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {formatCurrency(campaign.spend)}
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {formatNumber(campaign.clicks)}
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {formatNumber(campaign.conversions)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-emerald-400">
                      {campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : "--"}
                    </td>
                    <td className="px-6 py-4">
                      {campaign.external_id ? (
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                        >
                          View
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-sm text-zinc-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimateIn>

      {/* Info Section */}
      <AnimateIn delay={450}>
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-semibold text-white">About Campaign Data</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Campaign data syncs automatically when your ad accounts are connected.
            Manual campaigns are added by your account manager and updated regularly.
            Contact your account manager if you have questions about specific
            campaigns or metrics.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
