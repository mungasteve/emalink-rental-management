"use client";

import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LinkButton } from "@/components/ui/link-button";

type Property = {
  id: string;
  title: string;
  location: string;
  units: { id: string; name: string; rent: number; status: string }[];
  _count: { maintenance: number };
};

type Summary = {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  occupancyRate: number;
  totalRevenue: number;
};

type Payout = {
  id: string;
  amount: number;
  period: string;
  status: string;
  paidAt: string | null;
};

type MaintenanceItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  cost: number | null;
  createdAt: string;
  property: { title: string; location: string };
};

function fmt(n: number) {
  return `KES ${n.toLocaleString()}`;
}

function generateCSV(properties: Property[], summary: Summary) {
  let csv = `Emalink Owner Statement\n\nProperty,Units,Occupied,Monthly Rent\n`;
  properties.forEach((p) => {
    const occupied = p.units.filter((u) => u.status === "OCCUPIED").length;
    const rent = p.units.reduce((s, u) => s + u.rent, 0);
    csv += `"${p.title}",${p.units.length},${occupied},"${fmt(rent)}"\n`;
  });
  csv += `\nTotal Properties,${summary.totalProperties}\nOccupancy Rate,${summary.occupancyRate}%\nTotal Revenue,"${fmt(summary.totalRevenue)}"`;
  return csv;
}

function downloadCSV(content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emalink_statement.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Statement downloaded");
}

export default function OwnerPortal() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [propRes, finRes] = await Promise.all([
          fetch("/api/owner/properties"),
          fetch("/api/owner/financials"),
        ]);
        const propData = await propRes.json();
        const finData = await finRes.json();

        if (propData.properties) setProperties(propData.properties);
        if (finData.summary) setSummary(finData.summary);
        if (finData.payouts) setPayouts(finData.payouts);

        const allMaintenance: MaintenanceItem[] = [];
        if (propData.properties) {
          for (const p of propData.properties) {
            if (p._count.maintenance > 0) {
              const mRes = await fetch(`/api/owner/maintenance?propertyId=${p.id}`);
              const mData = await mRes.json();
              if (mData.requests) allMaintenance.push(...mData.requests);
            }
          }
        }
        setMaintenance(allMaintenance);
      } catch {
        toast.error("Failed to load portal data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const openTickets = maintenance.filter((m) => m.status !== "COMPLETED").length;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-navy-800 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Owner Portal</h1>
            <p className="text-white/50 text-xs">Property performance overview</p>
          </div>
          <LinkButton href="/owner/add-property" variant="gold" size="sm" className="text-xs px-3 py-1.5 h-auto">
            <Plus className="h-3 w-3 mr-1" /> Add Property
          </LinkButton>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* KPIs — compact row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-5">
          {[
            { label: "Properties", value: summary ? String(summary.totalProperties) : "—", sub: `${summary?.totalUnits ?? 0} units` },
            { label: "Occupancy", value: summary ? `${summary.occupancyRate}%` : "—", sub: `${summary?.occupiedUnits ?? 0} occupied` },
            { label: "Revenue", value: summary ? fmt(summary.totalRevenue) : "—", sub: "collected" },
            { label: "Maintenance", value: String(openTickets), sub: "open tickets" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
              <p className="text-base sm:text-lg font-bold text-navy-800 mt-0.5">{loading ? "…" : kpi.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="properties">
          <TabsList className="w-full sm:w-auto mb-4">
            <TabsTrigger value="properties" className="flex-1 sm:flex-none text-xs">Properties</TabsTrigger>
            <TabsTrigger value="financials" className="flex-1 sm:flex-none text-xs">Financials</TabsTrigger>
            <TabsTrigger value="maintenance" className="flex-1 sm:flex-none text-xs">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <p className="text-xs text-muted-foreground p-4">Loading…</p>
              ) : properties.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <p className="text-sm text-muted-foreground mb-3">No properties yet.</p>
                  <LinkButton href="/owner/add-property" variant="gold" size="sm" className="text-xs">Add your first property</LinkButton>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {properties.map((p) => {
                    const occupied = p.units.filter((u) => u.status === "OCCUPIED").length;
                    const revenue = p.units.filter((u) => u.status === "OCCUPIED").reduce((s, u) => s + u.rent, 0);
                    const rate = p.units.length > 0 ? Math.round((occupied / p.units.length) * 100) : 0;
                    return (
                      <div key={p.id} className="flex items-center justify-between px-4 py-3 gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">{p.title}</p>
                          <p className="text-xs text-muted-foreground">{p.location} · {occupied}/{p.units.length} units</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-navy-800">{fmt(revenue)}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                          <p className="text-xs text-muted-foreground">{rate}% occupied</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="financials">
            <div className="space-y-4">
              {/* Export */}
              {summary && (
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="text-xs h-7"
                    onClick={() => downloadCSV(generateCSV(properties, summary))}>
                    <Download className="mr-1.5 h-3 w-3" /> Export CSV
                  </Button>
                </div>
              )}

              {/* Payouts */}
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border">
                  <p className="text-xs font-semibold text-navy-800">Payouts</p>
                </div>
                {loading ? (
                  <p className="text-xs text-muted-foreground p-4">Loading…</p>
                ) : payouts.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-4">No payouts yet.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {payouts.map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between px-4 py-2.5">
                        <div>
                          <p className="text-sm font-medium text-navy-800">{payout.period}</p>
                          <p className="text-xs text-muted-foreground">{payout.paidAt ? new Date(payout.paidAt).toLocaleDateString() : "Pending"}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-navy-800">{fmt(payout.amount)}</p>
                          <span className={`text-[10px] font-medium ${payout.status === "COMPLETED" ? "text-emerald-600" : "text-amber-600"}`}>
                            {payout.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary grid */}
              {summary && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
                  {[
                    { label: "Total Properties", value: String(summary.totalProperties) },
                    { label: "Total Units", value: String(summary.totalUnits) },
                    { label: "Occupied", value: String(summary.occupiedUnits) },
                    { label: "Occupancy", value: `${summary.occupancyRate}%` },
                    { label: "Revenue", value: fmt(summary.totalRevenue) },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
                      <p className="text-sm font-bold text-navy-800 mt-0.5">{s.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="maintenance">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <p className="text-xs text-muted-foreground p-4">Loading…</p>
              ) : maintenance.length === 0 ? (
                <p className="text-xs text-muted-foreground p-4">No maintenance requests.</p>
              ) : (
                <div className="divide-y divide-border">
                  {maintenance.map((m) => (
                    <div key={m.id} className="flex items-center justify-between px-4 py-2.5 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-800 truncate">{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.property.title} · {new Date(m.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {m.cost && <span className="text-xs font-medium text-navy-800">{fmt(m.cost)}</span>}
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${m.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700" : m.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                          {m.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
