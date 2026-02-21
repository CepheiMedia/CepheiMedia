"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, LayoutDashboard, Check } from "lucide-react";
import { NotificationCenter } from "./notification-center";

interface PortalHeaderProps {
  onOpenCommandPalette: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export function PortalHeader({
  onOpenCommandPalette,
  isEditMode,
  onToggleEditMode,
}: PortalHeaderProps) {
  const [time, setTime] = useState<string>("");
  const [greeting, setGreeting] = useState("");
  const [dateString, setDateString] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      const hour = now.getHours();
      if (hour < 12) setGreeting("Good morning");
      else if (hour < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");

      setDateString(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-white/[0.06] bg-zinc-950/80 px-6 py-3 backdrop-blur-xl">
      {/* Left: greeting + date */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-zinc-400">{greeting}</span>
        <span className="text-xs text-zinc-600">|</span>
        <span className="text-xs text-zinc-500">{dateString}</span>
      </div>

      {/* Center: search bar */}
      <button
        onClick={onOpenCommandPalette}
        className="mx-auto flex w-full max-w-md items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-zinc-500 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search or jump to...</span>
        <kbd className="hidden rounded border border-white/[0.1] bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:inline-block">
          Ctrl K
        </kbd>
      </button>

      {/* Right: clock + customize + notifications + avatar */}
      <div className="flex items-center gap-3">
        {/* Live clock */}
        <div className="hidden items-center gap-1.5 sm:flex">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
          <span className="font-mono text-xs tabular-nums text-zinc-400">
            {time}
          </span>
        </div>

        {/* Customize toggle */}
        <button
          onClick={onToggleEditMode}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            isEditMode
              ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
          }`}
        >
          {isEditMode ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Done
            </>
          ) : (
            <>
              <LayoutDashboard className="h-3.5 w-3.5" />
              Customize
            </>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
          >
            <Bell className="h-4 w-4" />
            <NotificationBadge />
          </button>
          {notificationsOpen && (
            <NotificationCenter
              onClose={() => setNotificationsOpen(false)}
            />
          )}
        </div>

        {/* User avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-xs font-medium text-zinc-300">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}

function NotificationBadge() {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white shadow-[0_0_8px_rgba(59,130,246,0.5)]">
      3
    </span>
  );
}
