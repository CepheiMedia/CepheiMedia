"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  date: string;
  status: string;
}

interface LeadsTableProps {
  leads: Lead[];
  onLeadsChange?: (leads: Lead[]) => void;
}

type SortField = "name" | "email" | "source" | "campaign" | "date" | "status";
type SortDirection = "asc" | "desc";

const statusStyles: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  contacted: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  qualified: "bg-green-500/10 text-green-500 border-green-500/30",
  converted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  lost: "bg-red-500/10 text-red-500 border-red-500/30",
};

const sourceStyles: Record<string, string> = {
  Meta: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  Google: "bg-red-500/10 text-red-500 border-red-500/30",
  Organic: "bg-green-500/10 text-green-500 border-green-500/30",
  Referral: "bg-amber-500/10 text-amber-500 border-amber-500/30",
};

export function LeadsTable({ leads }: LeadsTableProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.phone.includes(search) ||
          lead.campaign.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    // Apply source filter
    if (sourceFilter !== "all") {
      result = result.filter((lead) => lead.source === sourceFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "date") {
        aVal = new Date(aVal).getTime().toString();
        bVal = new Date(bVal).getTime().toString();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [leads, search, sortField, sortDirection, statusFilter, sourceFilter]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    );
  };

  const uniqueStatuses = [...new Set(leads.map((l) => l.status))];
  const uniqueSources = [...new Set(leads.map((l) => l.source))];

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-background pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Status</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="appearance-none rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Sources</option>
            {uniqueSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSortedLeads.length} of {leads.length} leads
      </p>

      {/* Table */}
      <div className="rounded-xl border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Name
                    <SortIcon field="name" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-1">
                    Email
                    <SortIcon field="email" />
                  </div>
                </th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("source")}
                >
                  <div className="flex items-center gap-1">
                    Source
                    <SortIcon field="source" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("campaign")}
                >
                  <div className="flex items-center gap-1">
                    Campaign
                    <SortIcon field="campaign" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center gap-1">
                    Date
                    <SortIcon field="date" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <SortIcon field="status" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                filteredAndSortedLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 font-medium">{lead.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {lead.phone}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={sourceStyles[lead.source] || ""}
                      >
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {lead.campaign}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(lead.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={statusStyles[lead.status] || ""}
                      >
                        {lead.status.charAt(0).toUpperCase() +
                          lead.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
