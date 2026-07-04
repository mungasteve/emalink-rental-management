"use client";

import { useEffect, useState } from "react";
import { DollarSign, FileText, Wrench, Bell, CreditCard, X, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

    toast.success("Request submitted", { description: "We'll assign a contractor shortly." });
    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md elevation-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">New Maintenance Request</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy-800 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-navy-800 mb-1.5 block">Issue Title</label>
              <Input name="title" placeholder="e.g. Leaking kitchen faucet" required minLength={5} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-800 mb-1.5 block">Description</label>
              <Textarea name="description" placeholder="Describe the issue in detail..." rows={3} required minLength={10} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-800 mb-1.5 block">Priority</label>
              <Select value={priority} onValueChange={(v) => setPriority(v ?? "MEDIUM")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="EMERGENCY">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function PayModal({
  lease,
  onClose,
}: {
  lease: Lease;
  onClose: () => void;
}) {
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

    toast.success("STK push sent", { description: "Check your phone for the M-Pesa prompt." });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-sm elevation-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Pay Rent via M-Pesa</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-navy-800 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-cream-50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground">Amount due</p>
            <p className="text-2xl font-bold text-navy-800">{fmt(lease.rent)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{lease.unit.property.title}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-navy-800 mb-1.5 block">M-Pesa Phone Number</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="254 7XX XXX XXX"
            />
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-amber-50 p-3 rounded-lg">
            <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
            You will receive an M-Pesa prompt on your phone. Enter your PIN to complete payment.
          </div>
          <Button variant="gold" className="w-full" onClick={handlePay} disabled={loading}>
            {loading ? "Sending prompt..." : "Send M-Pesa Prompt"}
          </Button>
        </CardContent>
      </Card>
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

  const activePayment = payments.find((p) => p.status === "PENDING");
  const openRequests = maintenance.filter((m) => m.status !== "COMPLETED").length;

  const kpis = [
    { icon: DollarSign, label: "Current Rent", value: lease ? fmt(lease.rent) : "—", sub: lease ? `Due 1st of month` : "No active lease" },
    { icon: FileText, label: "Lease Status", value: lease?.status ?? "—", sub: lease ? `Expires ${new Date(lease.endDate).toLocaleDateString()}` : "" },
    { icon: Wrench, label: "Open Requests", value: String(openRequests), sub: openRequests === 1 ? "1 in progress" : `${openRequests} active` },
    { icon: Bell, label: "Pending Payments", value: activePayment ? "1" : "0", sub: activePayment ? fmt(activePayment.amount) : "All clear" },
  ];

  return (
    <div>
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

      <div className="bg-navy-800 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white">Tenant Portal</h1>
          <p className="text-white/55 text-sm">Welcome back, {session?.user?.name?.split(" ")[0] ?? "Tenant"}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((w) => (
            <Card key={w.label} className="elevation-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                    <w.icon className="h-4 w-4 text-navy-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{w.label}</p>
                    <p className="text-lg font-bold text-navy-800 truncate">{loading ? "…" : w.value}</p>
                    <p className="text-xs text-muted-foreground">{w.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="payments">
          <TabsList>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="lease">Lease</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="mt-6">
            <Card className="elevation-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Payment History</CardTitle>
                {lease && (
                  <Button variant="gold" onClick={() => setShowPay(true)}>
                    <CreditCard className="mr-2 h-4 w-4" /> Pay Rent
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : payments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No payment history yet.</p>
                ) : (
                  <div className="space-y-3">
                    {payments.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-navy-800">
                            {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : new Date(p.dueDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">{p.method}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-navy-800">{fmt(p.amount)}</p>
                          <span className={p.status === "COMPLETED" ? "badge-available text-[10px]" : "badge-occupied text-[10px]"}>
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="mt-6">
            <Card className="elevation-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Maintenance Requests</CardTitle>
                {lease && (
                  <Button variant="gold" onClick={() => setShowMaintenance(true)}>
                    <Wrench className="mr-2 h-4 w-4" /> New Request
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : maintenance.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No maintenance requests yet.</p>
                ) : (
                  <div className="space-y-3">
                    {maintenance.map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-navy-800">{r.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()} · {r.priority}</p>
                        </div>
                        <span className={r.status === "COMPLETED" ? "badge-available" : "badge-occupied"}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lease" className="mt-6">
            <Card className="elevation-card">
              <CardHeader><CardTitle className="text-base">Lease Details</CardTitle></CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : !lease ? (
                  <p className="text-sm text-muted-foreground">No active lease found.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {[
                      ["Property", lease.unit.property.title],
                      ["Unit", lease.unit.name],
                      ["Location", lease.unit.property.location],
                      ["Lease Start", new Date(lease.startDate).toLocaleDateString()],
                      ["Lease End", new Date(lease.endDate).toLocaleDateString()],
                      ["Monthly Rent", fmt(lease.rent)],
                      ["Deposit Paid", fmt(lease.deposit)],
                      ["Status", lease.status],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                        <p className="font-medium text-navy-800">{value}</p>
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
