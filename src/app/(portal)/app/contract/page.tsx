import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/portal/kpi-card";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  Package,
  DollarSign,
  Calendar,
  CalendarCheck,
  Check,
  FileText,
  Shield,
} from "lucide-react";

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
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-400">
          Basic Access
        </Badge>
      );
    case "standard":
      return (
        <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-400">
          Standard Access
        </Badge>
      );
    case "premium":
      return (
        <Badge className="border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.15)]">
          Premium Access
        </Badge>
      );
    default:
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-400">
          {level}
        </Badge>
      );
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 bg-emerald-500" />
          Active
        </Badge>
      );
    case "paused":
      return (
        <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-400">
          Paused
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="border-red-500/30 bg-red-500/10 text-red-400">
          Cancelled
        </Badge>
      );
    case "expired":
      return (
        <Badge className="border-zinc-500/30 bg-zinc-500/10 text-zinc-500">
          Expired
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

// Mock contract data
const contract = {
  status: "active",
  start_date: "2025-11-01",
  end_date: null as string | null,
  monthly_ad_spend: 1540,
  extras: [] as { name: string; price: number }[],
  package: {
    name: "Growth",
    base_price: 1200,
    portal_access_level: "standard",
    included_services: [
      "Meta & Google Ads Management",
      "Monthly Performance Reports",
      "Conversion Tracking Setup",
      "Landing Page Optimization",
      "Dedicated Account Manager",
      "Bi-Weekly Strategy Calls",
    ],
  },
};

const monthlyTotal = contract.package.base_price + contract.monthly_ad_spend;

export default function ContractPage() {
  return (
    <div className="space-y-8">
      <AnimateIn>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Contract</h1>
            <p className="mt-1 text-zinc-500">Your service agreement details</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(contract.status)}
            {getAccessLevelBadge(contract.package.portal_access_level)}
          </div>
        </div>
      </AnimateIn>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimateIn delay={100}>
          <KPICard label="Package" value={contract.package.name} subtext={formatCurrency(contract.package.base_price) + "/mo"} icon={<Package className="h-5 w-5" />} />
        </AnimateIn>
        <AnimateIn delay={150}>
          <KPICard label="Monthly Total" value={formatCurrency(monthlyTotal)} subtext="Package + ad spend" icon={<DollarSign className="h-5 w-5" />} />
        </AnimateIn>
        <AnimateIn delay={200}>
          <KPICard label="Start Date" value={formatDate(contract.start_date)} subtext="Contract began" icon={<Calendar className="h-5 w-5" />} />
        </AnimateIn>
        <AnimateIn delay={250}>
          <KPICard label="End Date" value="Ongoing" subtext="No end date set" icon={<CalendarCheck className="h-5 w-5" />} />
        </AnimateIn>
      </div>

      {/* Monthly Breakdown */}
      <AnimateIn delay={300}>
        <div className="glass-card rounded-xl">
          <div className="border-b border-white/[0.06] p-6">
            <h2 className="font-semibold text-white">Monthly Breakdown</h2>
            <p className="mt-1 text-sm text-zinc-500">Your recurring charges each billing period</p>
          </div>
          <div className="p-6">
            <table className="w-full">
              <tbody className="divide-y divide-white/[0.04]">
                <tr className="table-row-glow">
                  <td className="py-3 text-zinc-400">Package Base Price</td>
                  <td className="py-3 text-right font-medium text-white">{formatCurrency(contract.package.base_price)}</td>
                </tr>
                <tr className="table-row-glow">
                  <td className="py-3 text-zinc-400">Ad Spend Budget</td>
                  <td className="py-3 text-right font-medium text-white">{formatCurrency(contract.monthly_ad_spend)}</td>
                </tr>
                <tr className="border-t-2 border-white/[0.1]">
                  <td className="py-3 font-semibold text-white">Total Monthly</td>
                  <td className="py-3 text-right text-lg font-bold text-emerald-400">{formatCurrency(monthlyTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnimateIn>

      {/* Included Services */}
      <AnimateIn delay={350}>
        <div className="glass-card rounded-xl">
          <div className="border-b border-white/[0.06] p-6">
            <h2 className="font-semibold text-white">Included Services</h2>
            <p className="mt-1 text-sm text-zinc-500">What&apos;s included in your {contract.package.name} package</p>
          </div>
          <div className="p-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {contract.package.included_services.map((service, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-emerald-500/10 p-0.5"><Check className="h-3.5 w-3.5 text-emerald-400" /></div>
                  <span className="text-sm text-zinc-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimateIn>

      {/* Portal Access */}
      <AnimateIn delay={400}>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2"><Shield className="h-5 w-5 text-blue-400" /></div>
            <div>
              <h2 className="font-semibold text-white">Portal Access Level</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Your {contract.package.portal_access_level} access includes weekly reports, campaign management, and dedicated account support.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
