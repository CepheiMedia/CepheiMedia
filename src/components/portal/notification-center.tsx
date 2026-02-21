"use client";

import { useState, useEffect, useRef } from "react";
import {
  Receipt,
  FileCheck,
  TrendingUp,
  Users,
  X,
  Check,
  CheckCheck,
} from "lucide-react";

interface Notification {
  id: string;
  type: "payment" | "deliverable" | "milestone" | "leads";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "payment",
    title: "Invoice Paid",
    message: "Invoice #1042 for $2,200 has been processed",
    time: "2h ago",
    read: false,
  },
  {
    id: "n2",
    type: "leads",
    title: "New Leads",
    message: "12 new leads from Meta Ads campaign this week",
    time: "4h ago",
    read: false,
  },
  {
    id: "n3",
    type: "deliverable",
    title: "Deliverable Ready",
    message: "Q1 Brand Guide has been uploaded for review",
    time: "6h ago",
    read: false,
  },
  {
    id: "n4",
    type: "milestone",
    title: "Campaign Milestone",
    message: "Financial Planning campaign reached 5,000 impressions",
    time: "1d ago",
    read: true,
  },
  {
    id: "n5",
    type: "payment",
    title: "Invoice Generated",
    message: "February invoice for $2,200 is ready for review",
    time: "2d ago",
    read: true,
  },
  {
    id: "n6",
    type: "leads",
    title: "Lead Quality Report",
    message: "Weekly lead quality score improved to 8.4/10",
    time: "3d ago",
    read: true,
  },
];

const typeStyles: Record<
  Notification["type"],
  { bg: string; text: string; icon: typeof Receipt }
> = {
  payment: { bg: "bg-emerald-500/10", text: "text-emerald-400", icon: Receipt },
  deliverable: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    icon: FileCheck,
  },
  milestone: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    icon: TrendingUp,
  },
  leads: { bg: "bg-amber-500/10", text: "text-amber-400", icon: Users },
};

interface NotificationCenterProps {
  onClose: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay to avoid closing on the same click that opened it
    const timer = setTimeout(
      () => document.addEventListener("mousedown", handleClick),
      100
    );
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const todayNotifications = notifications.filter(
    (n) => !n.time.includes("d ago")
  );
  const earlierNotifications = notifications.filter((n) =>
    n.time.includes("d ago")
  );

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-96 overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-900 shadow-2xl shadow-black/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-medium text-blue-400">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-[11px] text-zinc-500 transition-colors hover:text-blue-400"
          >
            <CheckCheck className="h-3 w-3" />
            Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="max-h-[400px] overflow-y-auto">
        {todayNotifications.length > 0 && (
          <div>
            <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Today
            </p>
            {todayNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={markAsRead}
                onDismiss={dismiss}
              />
            ))}
          </div>
        )}

        {earlierNotifications.length > 0 && (
          <div>
            <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              Earlier
            </p>
            {earlierNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={markAsRead}
                onDismiss={dismiss}
              />
            ))}
          </div>
        )}

        {notifications.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-zinc-500">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({
  notification,
  onMarkRead,
  onDismiss,
}: {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const style = typeStyles[notification.type];
  const Icon = style.icon;

  return (
    <div
      className={`group relative flex gap-3 px-4 py-3 transition-colors hover:bg-white/[0.03] ${
        !notification.read ? "bg-blue-500/[0.03]" : ""
      }`}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-500" />
      )}

      <div className={`mt-0.5 rounded-lg ${style.bg} p-2`}>
        <Icon className={`h-4 w-4 ${style.text}`} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-200">
          {notification.title}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">{notification.message}</p>
        <p className="mt-1 text-[10px] text-zinc-600">{notification.time}</p>
      </div>

      {/* Actions (visible on hover) */}
      <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="rounded p-1 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-blue-400"
            title="Mark as read"
          >
            <Check className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={() => onDismiss(notification.id)}
          className="rounded p-1 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
          title="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
