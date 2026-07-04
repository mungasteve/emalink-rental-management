"use client";

import { useEffect, useState } from "react";
import { Building2, TrendingUp, DollarSign, Wrench, Download, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function generateCSV(name: string, properties: Property[], summary: Summary) {
  let csv = `Emalink Property Management - ${name}\n\n`;
  csv += `Property,Units,Occupied,Monthly Rent\n`;
  properties.forEach((p) => {
    const occupied = p.units.filter((u) => u.status === "OCCUPIED").length;
    const rent = p.units.reduce((s, u) => s + u.rent, 0);
    csv += `"${p.title}",${p.units.length},${occupied},"${fmt(rent)}"\n`;
  });
  csv += `\nTotal Properties,${summary.totalProperties}\nOccupancy Rate,${summary.occupancyRate}%\nTotal Revenue,"${fmt(summary.totalRevenue)}"`;
  return csv;
}

function downloadCSV(name: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.replace(/\s+/g, "_")}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Downloaded", { description: `${name}.csv` });
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

        // Collect maintenance across all properties
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

  const kpis = [
    { icon: Building2, label: "Properties", value: summary ? String(summary.totalProperties) : "—", sub: `${summary?.totalUnits ?? 0} total units`, color: "text-blue-600" },
    { icon: TrendingUp, label: "Occupancy", value: summary ? `${summary.occupancyRate}%` : "—", sub: `${summary?.occupiedUnits ?? 0} of ${summary?.totalUnits ?? 0} occupied`, color: "text-emerald-600" },
    { icon: DollarSign, label: "Revenue", value: summary ? fmt(summary.totalRevenue) : "—", sub: "From completed payments", color: "text-gold-600" },
    { icon: Wrench, label: "Maintenance", value: String(maintenance.filter((m) => m.status !== "COMPLETED").length), sub: "Open tickets", color: "text-orange-600" },
  ];

  return (
    <div>
      <div className="bg-navy-800 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white">Owner Portal</h1>
            <p className="text-white/55 text-sm">Your property performance</p>
          </div>
          <LinkButton href="/owner/add-property" variant="gold" size="sm">
            <Plus className="h-4 w-4 mr-1.5" /> Add Property
          </LinkButton>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {kpis.map((m) => (
            <Card key={m.label} className="elevation-card">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                    <m.icon className={`h-5 w-5 ${m.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-navy-800">{loading ? "…" : m.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="properties">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="properties" className="flex-1 sm:flex-none">Properties</TabsTrigger>
            <TabsTrigger value="financials" className="flex-1 sm:flex-none">Financials</TabsTrigger>
            <TabsTrigger value="maintenance" className="flex-1 sm:flex-none">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="mt-6">
            <Card className="elevation-card">
              <CardHeader>
                <CardTitle className="text-base">My Properties</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {loading ? (
                  <p className="text-sm text-muted-foreground p-4">Loading…</p>
                ) : properties.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground mb-4">No properties yet.</p>
                    <LinkButton href="/owner/add-property" variant="gold" size="sm">Add your first property</LinkButton>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {properties.map((p) => {
                      const occupied = p.units.filter((u) => u.status === "OCCUPIED").length;
                      const revenue = p.units.filter((u) => u.status === "OCCUPIED").reduce((s, u) => s + u.rent, 0);
                      return (
                        <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-3 sm:py-3 gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-navy-800 truncate">{p.title}</p>
                            <p className="text-xs text-muted-foreground">{p.location} · {occupied}/{p.units.length} units occupied</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-bold text-navy-800">{fmt(revenue)}</p>
                              <p className="text-xs text-muted-foreground">/month</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                              <span className="text-xs font-semibold text-emerald-600">
                                {p.units.length > 0 ? Math.round((occupied / p.units.length) * 100) : 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="mt-6 space-y-4">
            <Card className="elevation-card">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="text-base">Payouts</CardTitle>
                {summary && (
                  <Button variant="gold" size="sm" className="w-full sm:w-auto"
                    onClick={() => downloadCSV("Owner_Statement", generateCSV("Owner Statement", properties, summary))}>
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {loading ? (
                  <p className="text-sm text-muted-foreground p-4">Loading…</p>
                ) : payouts.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4">No payouts yet.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {payouts.map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between p-4 sm:px-3 sm:py-3 gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                            <FileText className="h-4 w-4 text-navy-700" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-navy-800">{payout.period}</p>
                            <p className="text-xs text-muted-foreground">{payout.paidAt ? new Date(payout.paidAt).toLocaleDateString() : "Pending"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-navy-800">{fmt(payout.amount)}</p>
                          <span className={payout.status === "COMPLETED" ? "badge-available" : "badge-occupied"}>{payout.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {summary && (
              <Card className="elevation-card">
                <CardHeader><CardTitle className="text-base">Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Total Properties", value: String(summary.totalProperties) },
                      { label: "Total Units", value: String(summary.totalUnits) },
                      { label: "Occupied Units", value: String(summary.occupiedUnits) },
                      { label: "Occupancy Rate", value: `${summary.occupancyRate}%` },
                      { label: "Total Revenue", value: fmt(summary.totalRevenue) },
                    ].map((s) => (
                      <div key={s.label} className="bg-cream-50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className="text-base font-bold text-navy-800 mt-0.5">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <Card className="elevation-card">
              <CardHeader><CardTitle className="text-base">Maintenance Requests</CardTitle></CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {loading ? (
                  <p className="text-sm text-muted-foreground p-4">Loading…</p>
                ) : maintenance.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4">No maintenance requests.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {maintenance.map((m) => (
                      <div key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-3 sm:py-3 gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-800">{m.title}</p>
                          <p className="text-xs text-muted-foreground">{m.property.title} · {new Date(m.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {m.cost && <p className="text-sm font-semibold text-navy-800">{fmt(m.cost)}</p>}
                          <span className={m.status === "COMPLETED" ? "badge-available" : "badge-occupied"}>{m.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
