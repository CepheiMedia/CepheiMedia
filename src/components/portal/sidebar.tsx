"use client";

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
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/roi", label: "ROI & Projections", icon: TrendingUp },
  { href: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/app/deliverables", label: "Deliverables", icon: FileCheck },
  { href: "/app/billing", label: "Billing", icon: Receipt },
  { href: "/app/contract", label: "Contract", icon: FileText },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/[0.06] bg-zinc-900/80 backdrop-blur-xl">
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/cephei-logo.png"
            alt="Cephei Media"
            width={120}
            height={34}
            className="h-7 w-auto"
          />
        </Link>
        <div className="pulse-dot ml-auto bg-emerald-500" title="System online" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Navigation
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                  )}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  )}

                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-400"
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/[0.06] px-3 py-3">
        {/* Gradient divider accent */}
        <div className="mb-3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-all hover:bg-white/[0.04] hover:text-zinc-300"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
