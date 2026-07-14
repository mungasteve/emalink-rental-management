"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Clock } from "lucide-react";
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
type Role = (typeof roles)[number];

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
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, role } : x)));

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
    toast.success(`Role updated to ${role}`);
  }

  const visitors = users.filter((u) => u.role === "VISITOR").length;
  const tenants = users.filter((u) => u.role === "TENANT").length;
  const owners = users.filter((u) => u.role === "OWNER").length;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-navy-800 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="mx-auto max-w-6xl flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold-400" />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Admin</h1>
            <p className="text-white/50 text-xs">User management & activity</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-5">
          {[
            { label: "Users", value: String(users.length) },
            { label: "Tenants", value: String(tenants) },
            { label: "Owners", value: String(owners) },
            { label: "Pending", value: String(visitors) },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
              <p className="text-lg sm:text-xl font-bold text-navy-800 mt-0.5">{loading ? "…" : kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users">
          <TabsList className="w-full sm:w-auto mb-4">
            <TabsTrigger value="users" className="flex-1 sm:flex-none text-xs">Users</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1 sm:flex-none text-xs">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border">
                <p className="text-xs font-semibold text-navy-800">User Management</p>
                <p className="text-[10px] text-muted-foreground">New users register as VISITOR. Promote to grant access.</p>
              </div>
              {loading ? (
                <p className="text-xs text-muted-foreground p-4">Loading…</p>
              ) : users.length === 0 ? (
                <p className="text-xs text-muted-foreground p-4">No users yet.</p>
              ) : (
                <div className="divide-y divide-border">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between px-4 py-2.5 gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="h-7 w-7 rounded-full bg-navy-800 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-navy-800 truncate">{user.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${roleBadge[user.role as Role] ?? roleBadge.VISITOR}`}>
                          {user.role}
                        </span>
                        <select
                          className="text-[10px] border border-border rounded px-1.5 py-1 text-navy-800 bg-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                          defaultValue=""
                          onChange={(e) => { if (e.target.value) { updateRole(user.id, e.target.value as Role); e.target.value = ""; } }}
                        >
                          <option value="" disabled>→</option>
                          {roles.filter((r) => r !== user.role).map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border">
                <p className="text-xs font-semibold text-navy-800">Recent Registrations</p>
              </div>
              {loading ? (
                <p className="text-xs text-muted-foreground p-4">Loading…</p>
              ) : (
                <div className="divide-y divide-border">
                  {users.slice(0, 15).map((user) => (
                    <div key={user.id} className="flex items-center justify-between px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-6 w-6 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-navy-700">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm text-navy-800">{user.name} <span className="text-muted-foreground">registered as {user.role}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                        <Clock className="h-2.5 w-2.5" />
                        {new Date(user.createdAt).toLocaleDateString()}
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
