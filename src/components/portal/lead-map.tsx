"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface LeadPing {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  count: number;
  platform: "Meta" | "Google" | "Direct";
  timestamp: string;
}

const leadPings: LeadPing[] = [
  { id: "1", city: "Miami", state: "FL", lat: 25.76, lng: -80.19, count: 12, platform: "Meta", timestamp: "2m ago" },
  { id: "2", city: "Fort Lauderdale", state: "FL", lat: 26.12, lng: -80.14, count: 8, platform: "Google", timestamp: "5m ago" },
  { id: "3", city: "Orlando", state: "FL", lat: 28.54, lng: -81.38, count: 5, platform: "Meta", timestamp: "12m ago" },
  { id: "4", city: "Tampa", state: "FL", lat: 27.95, lng: -82.46, count: 4, platform: "Google", timestamp: "18m ago" },
  { id: "5", city: "New York", state: "NY", lat: 40.71, lng: -74.01, count: 7, platform: "Meta", timestamp: "25m ago" },
  { id: "6", city: "Los Angeles", state: "CA", lat: 34.05, lng: -118.24, count: 6, platform: "Google", timestamp: "31m ago" },
  { id: "7", city: "Chicago", state: "IL", lat: 41.88, lng: -87.63, count: 3, platform: "Direct", timestamp: "45m ago" },
  { id: "8", city: "Dallas", state: "TX", lat: 32.78, lng: -96.8, count: 4, platform: "Meta", timestamp: "1h ago" },
  { id: "9", city: "Atlanta", state: "GA", lat: 33.75, lng: -84.39, count: 5, platform: "Google", timestamp: "1h ago" },
  { id: "10", city: "Denver", state: "CO", lat: 39.74, lng: -104.99, count: 2, platform: "Direct", timestamp: "2h ago" },
  { id: "11", city: "Seattle", state: "WA", lat: 47.61, lng: -122.33, count: 3, platform: "Meta", timestamp: "2h ago" },
  { id: "12", city: "Boston", state: "MA", lat: 42.36, lng: -71.06, count: 2, platform: "Google", timestamp: "3h ago" },
];

const platformColors: Record<string, string> = {
  Meta: "#3b82f6",
  Google: "#ef4444",
  Direct: "#a855f7",
};

// Convert lat/lng to map coordinates (simplified Mercator for US)
function toMapCoords(lat: number, lng: number): { x: number; y: number } {
  // Map bounds: roughly US continental
  const minLng = -130;
  const maxLng = -65;
  const minLat = 24;
  const maxLat = 50;

  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
  return { x, y };
}

export function LeadMap() {
  const [activePing, setActivePing] = useState<string | null>(null);
  const [pulsingId, setPulsingId] = useState<string>("1");

  // Cycle through pings to simulate "live" activity
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % leadPings.length;
      setPulsingId(leadPings[i].id);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalLeads = leadPings.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="glass-card glow-hover rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Lead Origins</h2>
            <p className="text-xs text-zinc-500">Where your leads are coming from</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="pulse-dot bg-cyan-400" />
          <span className="text-xs font-medium text-cyan-400">Live</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[280px] bg-zinc-950/50 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Simplified US outline via SVG */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Simplified US continental outline */}
          <path
            d="M8,18 L12,15 L18,14 L22,16 L28,15 L32,13 L36,14 L38,18 L35,22 L32,25 L30,30 L28,35 L25,40 L22,45 L20,50 L18,55 L15,58 L14,62 L12,65 L10,60 L8,55 L7,48 L6,42 L5,35 L6,28 L7,22 Z
            M38,18 L42,16 L48,15 L52,14 L56,13 L60,14 L64,16 L68,18 L72,17 L76,18 L80,20 L84,22 L86,25 L88,28 L90,32 L91,36 L92,40 L90,44 L88,48 L85,52 L82,55 L78,58 L74,60 L70,62 L66,63 L62,65 L58,66 L54,68 L50,70 L46,68 L42,65 L38,60 L34,55 L30,50 L26,48 L24,52 L22,56 L20,60 L18,62 L16,65 L14,62 L15,58 L18,55 L20,50 L22,45 L25,40 L28,35 L30,30 L32,25 L35,22 L38,18 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.3"
          />
        </svg>

        {/* Lead ping dots */}
        {leadPings.map((ping) => {
          const { x, y } = toMapCoords(ping.lat, ping.lng);
          const color = platformColors[ping.platform];
          const isActive = activePing === ping.id;
          const isPulsing = pulsingId === ping.id;

          return (
            <div
              key={ping.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setActivePing(ping.id)}
              onMouseLeave={() => setActivePing(null)}
            >
              {/* Pulse ring */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: isPulsing ? 32 : 16,
                  height: isPulsing ? 32 : 16,
                  backgroundColor: color,
                  opacity: isPulsing ? 0.15 : 0.08,
                  transition: "all 0.5s ease",
                  animation: isPulsing ? "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" : "none",
                }}
              />

              {/* Dot */}
              <div
                className="relative z-10 cursor-pointer rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  backgroundColor: color,
                  boxShadow: `0 0 ${isActive ? 12 : 6}px ${color}`,
                }}
              />

              {/* Tooltip */}
              {isActive && (
                <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/[0.1] bg-zinc-900/95 px-3 py-2 shadow-xl backdrop-blur-sm">
                  <p className="text-xs font-semibold text-white">
                    {ping.city}, {ping.state}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] text-zinc-400">
                      {ping.count} leads via {ping.platform}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-zinc-600">{ping.timestamp}</p>
                  {/* Arrow */}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900/95" />
                </div>
              )}
            </div>
          );
        })}

        {/* Total badge */}
        <div className="absolute bottom-3 left-3 rounded-lg border border-white/[0.08] bg-zinc-900/80 px-3 py-1.5 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">Total leads</p>
          <p className="text-lg font-bold tabular-nums text-white">{totalLeads}</p>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 rounded-lg border border-white/[0.08] bg-zinc-900/80 px-3 py-1.5 backdrop-blur-sm">
          {Object.entries(platformColors).map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-zinc-400">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent pings feed */}
      <div className="border-t border-white/[0.06] px-6 py-3">
        <div className="flex items-center gap-4 overflow-x-auto">
          {leadPings.slice(0, 5).map((ping) => (
            <div
              key={ping.id}
              className="flex shrink-0 items-center gap-2 text-xs"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: platformColors[ping.platform] }}
              />
              <span className="text-zinc-400">
                {ping.city} — {ping.count} leads
              </span>
              <span className="text-zinc-600">{ping.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
