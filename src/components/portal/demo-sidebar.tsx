"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  FileCheck,
  Receipt,
  FileText,
  LogOut,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/demo", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo/leads", label: "Leads", icon: Users },
  { href: "/demo/roi", label: "ROI & Projections", icon: TrendingUp },
  { href: "/demo/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/demo/deliverables", label: "Deliverables", icon: FileCheck },
  { href: "/demo/billing", label: "Billing", icon: Receipt },
  { href: "/demo/contract", label: "Contract", icon: FileText },
];

export function DemoSidebar() {
  const pathname = usePathname();
  const [companyName, setCompanyName] = useState("Demo Company");

  useEffect(() => {
    const stored = sessionStorage.getItem("demo-company-name");
    if (stored) setCompanyName(stored);
  }, []);

  const initials = companyName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border/40 bg-card/30">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border/40 px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/cephei-logo.png"
            alt="Cephei Media"
            width={120}
            height={34}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Client Info */}
      <div className="border-b border-border/40 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium">{companyName}</p>
            <p className="text-xs text-muted-foreground">Growth Plan</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/demo" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-foreground/5 text-foreground"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Demo Mode Notice */}
      <div className="border-t border-border/40 px-4 py-4">
        <div className="rounded-lg bg-amber-500/10 px-3 py-2">
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            Demo Mode
          </p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
            Viewing as {companyName}
          </p>
        </div>
      </div>

      {/* Exit Demo */}
      <div className="border-t border-border/40 px-3 py-4">
        <Link
          href="/"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Exit Demo
        </Link>
      </div>
    </aside>
  );
}
