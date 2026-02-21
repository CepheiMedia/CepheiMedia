"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  FileCheck,
  Receipt,
  FileText,
  Palette,
  Calendar,
  DollarSign,
  Download,
  MessageCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Pages" | "Actions" | "Help";
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const items: CommandItem[] = [
    // Pages
    { id: "dashboard", label: "Dashboard", description: "Overview & KPIs", icon: LayoutDashboard, group: "Pages", action: () => router.push("/app") },
    { id: "roi", label: "ROI & Projections", description: "Revenue forecasting", icon: TrendingUp, group: "Pages", action: () => router.push("/app/roi") },
    { id: "campaigns", label: "Campaigns", description: "Ad performance", icon: Megaphone, group: "Pages", action: () => router.push("/app/campaigns") },
    { id: "deliverables", label: "Deliverables", description: "Assets & files", icon: FileCheck, group: "Pages", action: () => router.push("/app/deliverables") },
    { id: "billing", label: "Billing", description: "Invoices & payments", icon: Receipt, group: "Pages", action: () => router.push("/app/billing") },
    { id: "contract", label: "Contract", description: "Terms & details", icon: FileText, group: "Pages", action: () => router.push("/app/contract") },
    // Actions
    { id: "creative", label: "Request Creative", description: "New ad creatives", icon: Palette, group: "Actions", action: () => {} },
    { id: "call", label: "Schedule Call", description: "Book a strategy call", icon: Calendar, group: "Actions", action: () => {} },
    { id: "budget", label: "Adjust Budget", description: "Change monthly spend", icon: DollarSign, group: "Actions", action: () => {} },
    { id: "download", label: "Download Report", description: "Export performance PDF", icon: Download, group: "Actions", action: () => {} },
    { id: "support", label: "Contact Support", description: "Get help", icon: MessageCircle, group: "Actions", action: () => {} },
    // Help
    { id: "help-roas", label: "What is ROAS?", icon: HelpCircle, group: "Help", action: () => {} },
    { id: "help-cpl", label: "What is CPL?", icon: HelpCircle, group: "Help", action: () => {} },
    { id: "help-connect", label: "How to connect ads?", icon: HelpCircle, group: "Help", action: () => {} },
  ];

  const filtered = query.trim()
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const groups = ["Pages", "Actions", "Help"] as const;
  const groupedItems = groups
    .map((group) => ({
      group,
      items: filtered.filter((item) => item.group === group),
    }))
    .filter((g) => g.items.length > 0);

  const flatFiltered = groupedItems.flatMap((g) => g.items);

  const executeItem = useCallback(
    (item: CommandItem) => {
      onClose();
      setQuery("");
      setSelectedIndex(0);
      item.action();
    },
    [onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setQuery("");
        setSelectedIndex(0);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatFiltered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
        e.preventDefault();
        executeItem(flatFiltered[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, flatFiltered, selectedIndex, executeItem]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector("[data-selected='true']");
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          onClose();
          setQuery("");
          setSelectedIndex(0);
        }}
      />

      {/* Palette */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-900 shadow-2xl shadow-black/50">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <Search className="h-5 w-5 text-zinc-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="rounded border border-white/[0.1] bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2">
          {groupedItems.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-zinc-500">
              No results found
            </div>
          ) : (
            groupedItems.map((group) => (
              <div key={group.group}>
                <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  {group.group}
                </p>
                {group.items.map((item) => {
                  flatIndex++;
                  const isSelected = flatIndex === selectedIndex;
                  const currentIndex = flatIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      data-selected={isSelected}
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-blue-500/10 text-white"
                          : "text-zinc-400 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isSelected ? "text-blue-400" : "text-zinc-500"
                        }`}
                      />
                      <div className="flex-1">
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <span className="ml-2 text-xs text-zinc-500">
                            {item.description}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <ArrowRight className="h-3.5 w-3.5 text-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2 text-[10px] text-zinc-600">
          <span>
            <kbd className="mr-1 rounded border border-white/[0.1] bg-white/[0.05] px-1 py-0.5 font-mono">
              &uarr;&darr;
            </kbd>
            navigate
          </span>
          <span>
            <kbd className="mr-1 rounded border border-white/[0.1] bg-white/[0.05] px-1 py-0.5 font-mono">
              &crarr;
            </kbd>
            select
          </span>
          <span>
            <kbd className="mr-1 rounded border border-white/[0.1] bg-white/[0.05] px-1 py-0.5 font-mono">
              esc
            </kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
