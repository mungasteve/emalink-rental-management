"use client";

import { useEffect, useState } from "react";
import { Users, Building2, Wrench, DollarSign, ShieldCheck, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
};

const roles = ["VISITOR", "TENANT", "OWNER", "MANAGER", "ADMIN"] as const;
type Role = typeof roles[number];

const roleBadge: Record<Role, string> = {
  VISITOR: "bg-gray-100 text-gray-600",
  TENANT: "bg-blue-50 text-blue-700",
  OWNER: "bg-emerald-50 text-emerald-700",
  MANAGER: "bg-purple-50 text-purple-700",
  ADMIN: "bg-amber-50 text-amber-700",
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => { if (d.users) setUsers(d.users); })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  async function updateRole(id: string, role: Role) {
    const prev = users;
    setUsers((u) => u.map((x) => x.id === id ? { ...x, role } : x));

    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role }),
    });

    if (!res.ok) {
      setUsers(prev);
      toast.error("Failed to update role");
      return;
    }
    toast.success("Role updated", { description: `User set to ${role}` });
  }

  const visitors = users.filter((u) => u.role === "VISITOR").length;
  const tenants = users.filter((u) => u.role === "TENANT").length;
  const owners = users.filter((u) => u.role === "OWNER").length;

  return (
    <div>
      <div className="bg-navy-800 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-gold-400" />
            <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest">Admin</p>
          </div>
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { icon: Users, label: "Total Users", value: String(users.length), sub: `${visitors} pending activation`, color: "text-blue-600" },
            { icon: ShieldCheck, label: "Tenants", value: String(tenants), sub: "Active tenants", color: "text-emerald-600" },
            { icon: Building2, label: "Owners", value: String(owners), sub: "Property owners", color: "text-navy-700" },
            { icon: DollarSign, label: "Visitors", value: String(visitors), sub: "Awaiting role", color: "text-amber-600" },
          ].map((m) => (
            <Card key={m.label} className="elevation-card">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-cream-100 flex items-center justify-center shrink-0">
                    <m.icon className={`h-4 w-4 ${m.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="text-xl font-bold text-navy-800">{loading ? "…" : m.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="users">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="users" className="flex-1 sm:flex-none">Users</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1 sm:flex-none">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <Card className="elevation-card">
              <CardHeader>
                <CardTitle className="text-base">User Management</CardTitle>
                <p className="text-xs text-muted-foreground">New users register as VISITOR. Promote them to grant portal access.</p>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {loading ? (
                  <p className="text-sm text-muted-foreground p-4">Loading…</p>
                ) : users.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-4">No users yet.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {users.map((user) => (
                      <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-3 sm:py-4 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-9 w-9 rounded-full bg-navy-800 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-navy-800">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}{user.phone ? ` · ${user.phone}` : ""}</p>
                            <p className="text-xs text-muted-foreground">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${roleBadge[user.role as Role] ?? roleBadge.VISITOR}`}>
                            {user.role}
                          </span>
                          <select
                            className="text-xs border border-border rounded-lg px-2 py-1.5 text-navy-800 bg-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                            defaultValue=""
                            onChange={(e) => { if (e.target.value) { updateRole(user.id, e.target.value as Role); e.target.value = ""; } }}
                          >
                            <option value="" disabled>Change role</option>
                            {roles.filter((r) => r !== user.role).map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="elevation-card">
              <CardHeader><CardTitle className="text-base">Recent Registrations</CardTitle></CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : (
                  <div className="space-y-4">
                    {users.slice(0, 10).map((user) => (
                      <div key={user.id} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                          <Users className="h-3.5 w-3.5 text-navy-700" />
                        </div>
                        <div>
                          <p className="text-sm text-navy-800">{user.name} registered as {user.role}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleString()}</p>
                          </div>
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
