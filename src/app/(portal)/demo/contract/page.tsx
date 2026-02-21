import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/portal/kpi-card";
import {
  Package,
  DollarSign,
  Calendar,
  CalendarCheck,
  Check,
  Shield,
} from "lucide-react";

const contract = {
  status: "active",
  start_date: "2025-11-01",
  end_date: null,
  monthly_investment: 2200,
  package: {
    name: "Growth",
    portal_access_level: "standard",
    included_services: [
      "Dedicated Account Manager",
      "Meta Ads Campaign Management",
      "Lead Generation Campaigns",
      "Monthly Strategy Calls",
      "Performance Dashboard Access",
      "Creative Development",
      "A/B Testing & Optimization",
      "Audience Research & Targeting",
      "Monthly Performance Reports",
      "Conversion Tracking Setup",
    ],
  },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getAccessLevelBadge(level: string) {
  switch (level) {
    case "basic":
      return <Badge variant="outline">Basic Access</Badge>;
    case "standard":
      return <Badge variant="secondary">Standard Access</Badge>;
    case "premium":
      return <Badge variant="default">Premium Access</Badge>;
    default:
      return <Badge variant="outline">{level}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="default">Active</Badge>;
    case "paused":
      return <Badge variant="secondary">Paused</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    case "expired":
      return <Badge variant="outline">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function DemoContractPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contract</h1>
          <p className="mt-1 text-muted-foreground">
            Your service agreement details
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(contract.status)}
          {getAccessLevelBadge(contract.package.portal_access_level)}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          label="Package"
          value={contract.package.name}
          subtext="Current plan"
          icon={<Package className="h-5 w-5" />}
        />
        <KPICard
          label="Monthly Investment"
          value={formatCurrency(contract.monthly_investment)}
          subtext="Billed monthly"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KPICard
          label="Start Date"
          value={formatDate(contract.start_date)}
          subtext={contract.end_date ? `Ends ${formatDate(contract.end_date)}` : "Ongoing"}
          icon={<Calendar className="h-5 w-5" />}
        />
      </div>

      {/* Included Services */}
      <div className="rounded-xl border border-border/60 bg-card/50">
        <div className="border-b border-border/60 p-6">
          <h2 className="font-semibold">Included Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What&apos;s included in your {contract.package.name} package
          </p>
        </div>

        <div className="p-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {contract.package.included_services.map((service, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Portal Access */}
      <div className="rounded-xl border border-border/60 bg-card/50 p-6">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold">Portal Access Level</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your {contract.package.portal_access_level} access includes{" "}
              {contract.package.portal_access_level === "premium"
                ? "real-time dashboards, advanced analytics, and priority support."
                : contract.package.portal_access_level === "standard"
                  ? "weekly reports, campaign management, and dedicated account support."
                  : "monthly reports and email support."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
