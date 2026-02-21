"use client";

import { useState } from "react";
import { Upload, Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/portal/kpi-card";
import { LeadsTable, Lead } from "@/components/portal/leads-table";
import { ExcelImport } from "@/components/portal/excel-import";

// Mock lead data - 143 leads from 2 months
const initialLeads: Lead[] = [
  // November 2025 leads (71 total)
  { id: "1", name: "John Smith", email: "john.smith@email.com", phone: "(555) 123-4567", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-11-28", status: "converted" },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "(555) 234-5678", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-11-27", status: "qualified" },
  { id: "3", name: "Michael Chen", email: "m.chen@email.com", phone: "(555) 345-6789", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-11-26", status: "contacted" },
  { id: "4", name: "Emily Davis", email: "emily.d@email.com", phone: "(555) 456-7890", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-11-25", status: "converted" },
  { id: "5", name: "David Wilson", email: "d.wilson@email.com", phone: "(555) 567-8901", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-11-24", status: "qualified" },
  { id: "6", name: "Lisa Anderson", email: "l.anderson@email.com", phone: "(555) 678-9012", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-11-23", status: "contacted" },
  { id: "7", name: "Robert Taylor", email: "r.taylor@email.com", phone: "(555) 789-0123", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-11-22", status: "new" },
  { id: "8", name: "Jennifer Martinez", email: "j.martinez@email.com", phone: "(555) 890-1234", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-11-21", status: "qualified" },
  { id: "9", name: "William Brown", email: "w.brown@email.com", phone: "(555) 901-2345", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-11-20", status: "converted" },
  { id: "10", name: "Amanda Garcia", email: "a.garcia@email.com", phone: "(555) 012-3456", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-11-19", status: "lost" },
  { id: "11", name: "James Rodriguez", email: "j.rodriguez@email.com", phone: "(555) 111-2222", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-11-18", status: "contacted" },
  { id: "12", name: "Michelle Lee", email: "m.lee@email.com", phone: "(555) 222-3333", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-11-17", status: "qualified" },
  { id: "13", name: "Christopher Hall", email: "c.hall@email.com", phone: "(555) 333-4444", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-11-16", status: "new" },
  { id: "14", name: "Jessica White", email: "j.white@email.com", phone: "(555) 444-5555", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-11-15", status: "converted" },
  { id: "15", name: "Daniel Thompson", email: "d.thompson@email.com", phone: "(555) 555-6666", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-11-14", status: "qualified" },

  // December 2025 leads (72 total) - showing first 15
  { id: "16", name: "Ashley Moore", email: "a.moore@email.com", phone: "(555) 666-7777", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-12-28", status: "new" },
  { id: "17", name: "Matthew Jackson", email: "m.jackson@email.com", phone: "(555) 777-8888", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-12-27", status: "contacted" },
  { id: "18", name: "Brittany Harris", email: "b.harris@email.com", phone: "(555) 888-9999", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-12-26", status: "qualified" },
  { id: "19", name: "Andrew Clark", email: "a.clark@email.com", phone: "(555) 999-0000", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-12-25", status: "converted" },
  { id: "20", name: "Stephanie Lewis", email: "s.lewis@email.com", phone: "(555) 100-2000", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-12-24", status: "qualified" },
  { id: "21", name: "Kevin Robinson", email: "k.robinson@email.com", phone: "(555) 200-3000", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-12-23", status: "new" },
  { id: "22", name: "Nicole Walker", email: "n.walker@email.com", phone: "(555) 300-4000", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-12-22", status: "contacted" },
  { id: "23", name: "Brandon Young", email: "b.young@email.com", phone: "(555) 400-5000", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-12-21", status: "converted" },
  { id: "24", name: "Samantha King", email: "s.king@email.com", phone: "(555) 500-6000", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-12-20", status: "qualified" },
  { id: "25", name: "Justin Wright", email: "j.wright@email.com", phone: "(555) 600-7000", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-12-19", status: "lost" },
  { id: "26", name: "Megan Scott", email: "m.scott@email.com", phone: "(555) 700-8000", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-12-18", status: "new" },
  { id: "27", name: "Ryan Green", email: "r.green@email.com", phone: "(555) 800-9000", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-12-17", status: "contacted" },
  { id: "28", name: "Lauren Adams", email: "l.adams@email.com", phone: "(555) 900-1000", source: "Meta", campaign: "Financial Planning - Lead Gen", date: "2025-12-16", status: "qualified" },
  { id: "29", name: "Tyler Nelson", email: "t.nelson@email.com", phone: "(555) 010-1111", source: "Meta", campaign: "Wealth Advisory - Awareness", date: "2025-12-15", status: "converted" },
  { id: "30", name: "Kayla Hill", email: "k.hill@email.com", phone: "(555) 020-2222", source: "Meta", campaign: "Investment Services - Retargeting", date: "2025-12-14", status: "new" },

  // Additional leads to reach 143 (simplified)
  ...Array.from({ length: 113 }, (_, i) => ({
    id: `${31 + i}`,
    name: `Lead ${31 + i}`,
    email: `lead${31 + i}@email.com`,
    phone: `(555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).padStart(4, '0')}`,
    source: ["Meta", "Meta", "Meta"][i % 3],
    campaign: ["Financial Planning - Lead Gen", "Wealth Advisory - Awareness", "Investment Services - Retargeting"][i % 3],
    date: new Date(2025, i < 56 ? 10 : 11, Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
    status: ["new", "contacted", "qualified", "converted", "lost"][Math.floor(Math.random() * 5)],
  })),
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [showImport, setShowImport] = useState(false);

  const handleImport = (importedLeads: Lead[]) => {
    setLeads([...importedLeads, ...leads]);
  };

  // Calculate stats
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified" || l.status === "converted").length;
  const qualifiedRate = Math.round((qualifiedLeads / totalLeads) * 100);
  const newLeads = leads.filter((l) => l.status === "new").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            View and manage your campaign leads
          </p>
        </div>
        <Button onClick={() => setShowImport(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Import from Excel
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Total Leads"
          value={totalLeads.toString()}
          subtext="Past 2 months"
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          label="New This Week"
          value={newLeads.toString()}
          subtext="Awaiting contact"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <KPICard
          label="Qualified Rate"
          value={`${qualifiedRate}%`}
          subtext="Qualified or converted"
          icon={<UserCheck className="h-5 w-5" />}
        />
        <KPICard
          label="Avg. Response Time"
          value="< 24h"
          subtext="First contact"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* Leads Table */}
      <div className="rounded-xl border border-border/60 bg-card/50 p-6">
        <LeadsTable leads={leads} onLeadsChange={setLeads} />
      </div>

      {/* Excel Import Modal */}
      <ExcelImport
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />
    </div>
  );
}
