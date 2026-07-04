"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

type Unit = { name: string; bedrooms: number; bathrooms: number; rent: string; deposit: string; size: string };

const emptyUnit = (): Unit => ({ name: "", bedrooms: 0, bathrooms: 1, rent: "", deposit: "", size: "" });

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState<Unit[]>([emptyUnit()]);
  const [type, setType] = useState("RESIDENTIAL");
  const [amenities, setAmenities] = useState("");

  function updateUnit(i: number, field: keyof Unit, value: string | number) {
    setUnits((prev) => prev.map((u, idx) => idx === i ? { ...u, [field]: value } : u));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      type,
      location: form.get("location"),
      address: form.get("address"),
      amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
      units: units.map((u) => ({
        name: u.name,
        bedrooms: Number(u.bedrooms),
        bathrooms: Number(u.bathrooms),
        rent: Number(u.rent),
        deposit: Number(u.deposit),
        size: u.size ? Number(u.size) : undefined,
      })),
    };

    const res = await fetch("/api/owner/add-property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Failed to add property");
      return;
    }

    toast.success("Property added", { description: `${data.property.title} is now live.` });
    router.push("/owner");
  }

  return (
    <div>
      <div className="bg-navy-800 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/owner" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Portal
          </Link>
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-white">Add Property</h1>
          <p className="text-white/55 text-sm">List a new property on the platform</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Details */}
          <Card className="elevation-card">
            <CardHeader><CardTitle className="text-base">Property Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-navy-800 mb-1.5 block">Title</label>
                <Input name="title" placeholder="e.g. Modern 2BR Apartment, Westlands" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-navy-800 mb-1.5 block">Type</label>
                  <Select value={type} onValueChange={(v) => setType(v ?? "RESIDENTIAL")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                      <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                      <SelectItem value="INDUSTRIAL">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy-800 mb-1.5 block">Location</label>
                  <Input name="location" placeholder="e.g. Westlands, Nairobi" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-navy-800 mb-1.5 block">Full Address</label>
                <Input name="address" placeholder="e.g. Rose Avenue, Westlands" required />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-800 mb-1.5 block">Description</label>
                <Textarea name="description" placeholder="Describe the property..." rows={3} />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-800 mb-1.5 block">
                  Amenities <span className="text-muted-foreground font-normal">(comma separated)</span>
                </label>
                <Input
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  placeholder="Parking, Security, Backup Generator, Balcony"
                />
              </div>
            </CardContent>
          </Card>

          {/* Units */}
          <Card className="elevation-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Units</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => setUnits((p) => [...p, emptyUnit()])}>
                <Plus className="h-4 w-4 mr-1" /> Add Unit
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {units.map((unit, i) => (
                <div key={i} className="border border-border rounded-xl p-4 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-800">Unit {i + 1}</p>
                    {units.length > 1 && (
                      <button type="button" onClick={() => setUnits((p) => p.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-navy-800 mb-1 block">Unit Name</label>
                      <Input value={unit.name} onChange={(e) => updateUnit(i, "name", e.target.value)}
                        placeholder="e.g. Unit A, Ground Floor" required />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-navy-800 mb-1 block">Size (sqm)</label>
                      <Input type="number" value={unit.size} onChange={(e) => updateUnit(i, "size", e.target.value)}
                        placeholder="85" min="0" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-navy-800 mb-1 block">Bedrooms</label>
                      <Input type="number" value={unit.bedrooms} onChange={(e) => updateUnit(i, "bedrooms", e.target.value)}
                        min="0" required />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-navy-800 mb-1 block">Bathrooms</label>
                      <Input type="number" value={unit.bathrooms} onChange={(e) => updateUnit(i, "bathrooms", e.target.value)}
                        min="1" required />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-navy-800 mb-1 block">Monthly Rent (KES)</label>
                      <Input type="number" value={unit.rent} onChange={(e) => updateUnit(i, "rent", e.target.value)}
                        placeholder="45000" min="0" required />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-navy-800 mb-1 block">Deposit (KES)</label>
                      <Input type="number" value={unit.deposit} onChange={(e) => updateUnit(i, "deposit", e.target.value)}
                        placeholder="90000" min="0" required />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" variant="gold" className="w-full h-11 text-sm font-semibold" disabled={loading}>
            {loading ? "Adding property..." : "Add Property"}
          </Button>
        </form>
      </div>
    </div>
  );
}
