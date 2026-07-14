"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

    toast.success("Property added");
    router.push("/owner");
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-navy-800 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="mx-auto max-w-2xl">
          <Link href="/owner" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-3 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-white">Add Property</h1>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Details */}
          <div className="bg-white rounded-lg border border-border p-4 sm:p-5 space-y-3">
            <p className="text-xs font-semibold text-navy-800 uppercase tracking-wide mb-2">Property Details</p>
            <div>
              <label className="text-xs font-medium text-navy-800 mb-1 block">Title</label>
              <Input name="title" required className="text-sm h-9" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-navy-800 mb-1 block">Type</label>
                <Select value={type} onValueChange={(v) => setType(v ?? "RESIDENTIAL")}>
                  <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                    <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                    <SelectItem value="INDUSTRIAL">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-navy-800 mb-1 block">Location</label>
                <Input name="location" required className="text-sm h-9" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-navy-800 mb-1 block">Address</label>
              <Input name="address" required className="text-sm h-9" />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-800 mb-1 block">Description</label>
              <Textarea name="description" rows={2} className="text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-navy-800 mb-1 block">Amenities <span className="text-muted-foreground font-normal">(comma separated)</span></label>
              <Input value={amenities} onChange={(e) => setAmenities(e.target.value)} className="text-sm h-9" />
            </div>
          </div>

          {/* Units */}
          <div className="bg-white rounded-lg border border-border p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-navy-800 uppercase tracking-wide">Units</p>
              <Button type="button" variant="outline" size="sm" className="text-xs h-7" onClick={() => setUnits((p) => [...p, emptyUnit()])}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-4">
              {units.map((unit, i) => (
                <div key={i} className="border border-border rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-navy-800">Unit {i + 1}</p>
                    {units.length > 1 && (
                      <button type="button" onClick={() => setUnits((p) => p.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-medium text-navy-800 mb-0.5 block">Name</label>
                      <Input value={unit.name} onChange={(e) => updateUnit(i, "name", e.target.value)} required className="text-sm h-8" />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-navy-800 mb-0.5 block">Size (sqm)</label>
                      <Input type="number" value={unit.size} onChange={(e) => updateUnit(i, "size", e.target.value)} min="0" className="text-sm h-8" />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-navy-800 mb-0.5 block">Bedrooms</label>
                      <Input type="number" value={unit.bedrooms} onChange={(e) => updateUnit(i, "bedrooms", e.target.value)} min="0" required className="text-sm h-8" />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-navy-800 mb-0.5 block">Bathrooms</label>
                      <Input type="number" value={unit.bathrooms} onChange={(e) => updateUnit(i, "bathrooms", e.target.value)} min="1" required className="text-sm h-8" />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-navy-800 mb-0.5 block">Rent (KES)</label>
                      <Input type="number" value={unit.rent} onChange={(e) => updateUnit(i, "rent", e.target.value)} min="0" required className="text-sm h-8" />
                    </div>
                    <div>
                      <label className="text-[10px] font-medium text-navy-800 mb-0.5 block">Deposit (KES)</label>
                      <Input type="number" value={unit.deposit} onChange={(e) => updateUnit(i, "deposit", e.target.value)} min="0" required className="text-sm h-8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" variant="gold" className="w-full h-9 text-sm font-semibold" disabled={loading}>
            {loading ? "Adding..." : "Add Property"}
          </Button>
        </form>
      </div>
    </div>
  );
}
