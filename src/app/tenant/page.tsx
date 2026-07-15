"use client";

import { useEffect, useState } from "react";
import { CreditCard, Wrench, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type Payment = {
  id: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string | null;
  dueDate: string;
  lease: { unit: { name: string; property: { title: string } } };
};

type MaintenanceRequest = {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
  property: { title: string };
};

type Lease = {
  id: string;
  startDate: string;
  endDate: string;
  rent: number;
  deposit: number;
  status: string;
  unit: { name: string; property: { title: string; location: string } };
};

function fmt(n: number) {
  return `KES ${n.toLocaleString()}`;
}

function MaintenanceModal({
  leasePropertyId,
  onClose,
  onSuccess,
}: {
  leasePropertyId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState("MEDIUM");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/tenant/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        description: form.get("description"),
        propertyId: leasePropertyId,
        priority,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Failed to submit request");
      return;
    }

    toast.success("Request submitted");
    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
      <div className="w-full sm:max-w-md bg-white rounded-t-xl sm:rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-navy-800">New Maintenance Request</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy-800">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-navy-800 mb-1 block">Issue</label>
            <Input name="title" required minLength={5} className="text-sm h-9" />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-800 mb-1 block">Description</label>
            <Textarea name="description" rows={3} required minLength={10} className="text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-navy-800 mb-1 block">Priority</label>
            <Select value={priority} onValueChange={(v) => setPriority(v ?? "MEDIUM")}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="EMERGENCY">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="gold" className="w-full h-9 text-sm" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function PayModal({ lease, onClose }: { lease: Lease; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    if (!phone) { toast.error("Enter your M-Pesa phone number"); return; }
    setLoading(true);

    const res = await fetch("/api/mpesa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount: lease.rent, leaseId: lease.id }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Payment failed");
      return;
    }

    toast.success("STK push sent", { description: "Check your phone." });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
      <div className="w-full sm:max-w-sm bg-white rounded-t-xl sm:rounded-xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-navy-800">Pay Rent via M-Pesa</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy-800">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="bg-cream-50 rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground">Amount due</p>
          <p className="text-xl font-bold text-navy-800">{fmt(lease.rent)}</p>
          <p className="text-xs text-muted-foreground">{lease.unit.property.title}</p>
        </div>
        <div className="mb-3">
          <label className="text-xs font-medium text-navy-800 mb-1 block">M-Pesa Number</label>
          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="text-sm h-9" />
        </div>
        <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-amber-50 p-2.5 rounded-lg mb-4">
          <AlertCircle className="h-3 w-3 text-amber-600 shrink-0 mt-0.5" />
          You&apos;ll receive an M-Pesa prompt. Enter your PIN to complete.
        </div>
        <Button variant="gold" className="w-full h-9 text-sm" onClick={handlePay} disabled={loading}>
          {loading ? "Sending..." : "Send M-Pesa Prompt"}
        </Button>
      </div>
    </div>
  );
}

export default function TenantPortal() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>([]);
  const [lease, setLease] = useState<Lease | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showPay, setShowPay] = useState(false);

  async function loadData() {
    try {
      const [payRes, mainRes] = await Promise.all([
        fetch("/api/tenant/payments"),
        fetch("/api/tenant/maintenance"),
      ]);
      const payData = await payRes.json();
      const mainData = await mainRes.json();

      if (payData.payments) {
        setPayments(payData.payments);
        if (payData.payments[0]?.lease) {
          const l = payData.payments[0].lease;
          setLease({ ...l, id: payData.payments[0].leaseId });
        }
      }
      if (mainData.requests) setMaintenance(mainData.requests);
    } catch {
      toast.error("Failed to load portal data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const openRequests = maintenance.filter((m) => m.status !== "COMPLETED").length;
  const pendingPayment = payments.find((p) => p.status === "PENDING");

  return (
    <div className="min-h-screen bg-cream-50">
      {showMaintenance && lease && (
        <MaintenanceModal
          leasePropertyId={lease.unit.property.title}
          onClose={() => setShowMaintenance(false)}
          onSuccess={loadData}
        />
      )}
      {showPay && lease && (
        <PayModal lease={lease} onClose={() => setShowPay(false)} />
      )}

      {/* Header */}
      <div className="bg-cream-50 border-b border-border px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-lg sm:text-xl font-bold text-navy-800">Tenant Portal</h1>
          <p className="text-muted-foreground text-xs">Welcome back, {session?.user?.name?.split(" ")[0] ?? "Tenant"}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-5">
          {[
            { label: "Rent", value: lease ? fmt(lease.rent) : "—", sub: "due 1st of month" },
            { label: "Lease", value: lease?.status ?? "—", sub: lease ? `ends ${new Date(lease.endDate).toLocaleDateString()}` : "" },
            { label: "Requests", value: String(openRequests), sub: "open" },
            { label: "Pending", value: pendingPayment ? fmt(pendingPayment.amount) : "None", sub: pendingPayment ? "due" : "all clear" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
              <p className="text-sm sm:text-base font-bold text-navy-800 mt-0.5 truncate">{loading ? "…" : kpi.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        {lease && (
          <div className="flex gap-2 mb-5">
            <Button variant="gold" size="sm" className="text-xs h-8" onClick={() => setShowPay(true)}>
              <CreditCard className="mr-1.5 h-3 w-3" /> Pay Rent
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8" onClick={() => setShowMaintenance(true)}>
              <Wrench className="mr-1.5 h-3 w-3" /> Report Issue
            </Button>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="payments">
          <TabsList className="w-full sm:w-auto mb-4">
            <TabsTrigger value="payments" className="flex-1 sm:flex-none text-xs">Payments</TabsTrigger>
            <TabsTrigger value="maintenance" className="flex-1 sm:flex-none text-xs">Maintenance</TabsTrigger>
            <TabsTrigger value="lease" className="flex-1 sm:flex-none text-xs">Lease</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <p className="text-xs text-muted-foreground p-4">Loading…</p>
              ) : payments.length === 0 ? (
                <p className="text-xs text-muted-foreground p-4">No payment history yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-4 py-2.5">
                      <div>
                        <p className="text-sm font-medium text-navy-800">
                          {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : new Date(p.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{p.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-navy-800">{fmt(p.amount)}</p>
                        <span className={`text-[10px] font-medium ${p.status === "COMPLETED" ? "text-emerald-600" : "text-amber-600"}`}>
                          {p.status}
                        </span>
                      </div>
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
                <p className="text-xs text-muted-foreground p-4">No maintenance requests yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {maintenance.map((r) => (
                    <div key={r.id} className="flex items-center justify-between px-4 py-2.5 gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-navy-800 truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()} · {r.priority}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${r.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700" : r.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                        {r.status.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="lease">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <p className="text-xs text-muted-foreground p-4">Loading…</p>
              ) : !lease ? (
                <p className="text-xs text-muted-foreground p-4">No active lease found.</p>
              ) : (
                <div className="grid grid-cols-2 gap-px bg-border">
                  {[
                    ["Property", lease.unit.property.title],
                    ["Unit", lease.unit.name],
                    ["Location", lease.unit.property.location],
                    ["Start", new Date(lease.startDate).toLocaleDateString()],
                    ["End", new Date(lease.endDate).toLocaleDateString()],
                    ["Rent", fmt(lease.rent)],
                    ["Deposit", fmt(lease.deposit)],
                    ["Status", lease.status],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-white p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-medium text-navy-800 mt-0.5">{value}</p>
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
