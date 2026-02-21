"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  FileCheck,
  Receipt,
  FileText,
  LogOut,
  Users,
  Menu,
  X,
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

export function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyName, setCompanyName] = useState("Demo Company");

  useEffect(() => {
    const stored = sessionStorage.getItem("demo-company-name");
    if (stored) setCompanyName(stored);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const initials = companyName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-zinc-950 text-zinc-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-zinc-900/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border/40 px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/cephei-logo.png"
              alt="Cephei Media"
              width={120}
              height={34}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-zinc-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Client Info */}
        <div className="border-b border-border/40 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{companyName}</p>
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
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-foreground/5 text-foreground font-medium"
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
            <p className="text-xs font-medium text-amber-400">Demo Mode</p>
            <p className="text-xs text-amber-400/80">
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

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex items-center gap-3 border-b border-border/40 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Image
            src="/images/cephei-logo.png"
            alt="Cephei Media"
            width={100}
            height={28}
            className="h-6 w-auto"
          />
          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {initials}
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
