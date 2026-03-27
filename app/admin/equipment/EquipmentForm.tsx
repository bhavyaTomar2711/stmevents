"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminFormField from "../_components/AdminFormField";
import ImageUpload from "../_components/ImageUpload";
import RichTextEditor from "../_components/RichTextEditor";
import TranslateButton from "../_components/TranslateButton";
import ToggleSwitch from "../_components/ToggleSwitch";
import CustomSelect from "../_components/CustomSelect";
import type { DbEquipment } from "@/lib/supabase/types";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Normalize legacy price_per values like "/ day" to just "day"
function normalizePricePer(val: string): string {
  const cleaned = val.replace(/^\/\s*/, "").trim().toLowerCase();
  if (["hour", "day", "week", "month"].includes(cleaned)) return cleaned;
  return "day";
}

interface SpecRow {
  label: string;
  value: string;
}

export default function EquipmentForm({ item }: { item?: DbEquipment }) {
  const router = useRouter();
  const isNew = !item;

  const [form, setForm] = useState({
    name: item?.name || "",
    name_de: item?.name_de || "",
    slug: item?.slug || "",
    images: item?.images?.join(", ") || "",
    price: item?.price || "",
    price_per: item?.price_per ? normalizePricePer(item.price_per) : "day",
    short_description: item?.short_description || "",
    short_description_de: item?.short_description_de || "",
    full_description: item?.full_description || "",
    full_description_de: item?.full_description_de || "",
    category: item?.category || "dj-gear",
    category_label: item?.category_label || "DJ Gear",
    available: item?.available ?? true,
    featured: item?.featured ?? false,
    display_order: item?.display_order?.toString() || "1",
    published: item?.published ?? true,
  });

  // Bug 2: Structured specs UI
  const [specs, setSpecs] = useState<SpecRow[]>(() => {
    if (item?.specs && Array.isArray(item.specs) && item.specs.length > 0) {
      return item.specs as SpecRow[];
    }
    return [{ label: "", value: "" }];
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" && isNew) setForm((prev) => ({ ...prev, slug: slugify(value as string) }));
  };

  const categoryLabels: Record<string, string> = {
    "dj-gear": "DJ Gear", sound: "Sound System", lighting: "Lighting", stage: "Stage & Rigging", effects: "Effects",
  };

  // Spec row handlers
  const updateSpec = (index: number, field: "label" | "value", val: string) => {
    setSpecs((prev) => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };
  const addSpec = () => setSpecs((prev) => [...prev, { label: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Filter out empty spec rows
    const cleanedSpecs = specs.filter((s) => s.label.trim() || s.value.trim());

    const supabase = createClient();
    const payload = {
      name: form.name,
      name_de: form.name_de || null,
      slug: form.slug,
      images: form.images ? form.images.split(",").map((s) => s.trim()).filter(Boolean) : [],
      price: form.price,
      price_per: form.price_per,
      short_description: form.short_description,
      short_description_de: form.short_description_de || null,
      full_description: form.full_description || null,
      full_description_de: form.full_description_de || null,
      category: form.category,
      category_label: categoryLabels[form.category] || form.category,
      available: form.available,
      featured: form.featured,
      specs: cleanedSpecs,
      display_order: Math.max(1, parseInt(form.display_order) || 1),
      published: form.published,
    };

    const result = isNew
      ? await supabase.from("equipment").insert(payload)
      : await supabase.from("equipment").update(payload).eq("id", item.id);

    if (result.error) { setError(result.error.message); setSaving(false); return; }
    router.push("/admin/equipment");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-2xl font-bold uppercase tracking-wider text-white">{isNew ? "Add Equipment" : "Edit Equipment"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
        {/* Bug 1: Name fields with translate button */}
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Name (English) *" name="name" value={form.name} onChange={(v) => update("name", v)} required placeholder="Pioneer CDJ-3000" />
          <div>
            <AdminFormField label="Name (German)" name="name_de" value={form.name_de} onChange={(v) => update("name_de", v)} placeholder="Pioneer CDJ-3000" />
            <div className="mt-2">
              <TranslateButton sourceText={form.name_de} onTranslated={(v) => update("name", v)} from="de" to="en" />
            </div>
          </div>
        </div>
        <AdminFormField label="Slug" name="slug" value={form.slug} onChange={(v) => update("slug", v)} required />

        {/* Bug 4: Price Per dropdown */}
        <div className="grid gap-6 sm:grid-cols-3">
          <AdminFormField label="Price (EUR) *" name="price" value={form.price} onChange={(v) => update("price", v)} required placeholder="€120" />
          <CustomSelect
            label="Price Per"
            value={form.price_per}
            onChange={(v) => update("price_per", v)}
            options={[
              { value: "hour", label: "Per Hour" },
              { value: "day", label: "Per Day" },
              { value: "week", label: "Per Week" },
              { value: "month", label: "Per Month" },
            ]}
          />
          <CustomSelect
            label="Category"
            value={form.category}
            onChange={(v) => update("category", v)}
            required
            options={[
              { value: "dj-gear", label: "DJ Gear" },
              { value: "sound", label: "Sound System" },
              { value: "lighting", label: "Lighting" },
              { value: "stage", label: "Stage & Rigging" },
              { value: "effects", label: "Effects" },
            ]}
          />
        </div>
        <ImageUpload
          label="Equipment Image"
          value={form.images.split(",").map((s) => s.trim()).filter(Boolean)[0] || ""}
          onChange={(v) => {
            const existing = form.images.split(",").map((s) => s.trim()).filter(Boolean);
            if (v) {
              existing[0] = v;
            } else {
              existing.shift();
            }
            update("images", existing.join(", "));
          }}
          folder="equipment"
        />

        {/* Bug 1: Short description with translate */}
        <div className="grid gap-6 sm:grid-cols-2">
          <RichTextEditor label="Short Description (English)" value={form.short_description} onChange={(v) => update("short_description", v)} placeholder="Brief description in English..." />
          <div>
            <RichTextEditor label="Short Description (German)" value={form.short_description_de} onChange={(v) => update("short_description_de", v)} placeholder="Kurze Beschreibung auf Deutsch..." />
            <div className="mt-2">
              <TranslateButton sourceText={form.short_description_de} onTranslated={(v) => update("short_description", v)} from="de" to="en" />
            </div>
          </div>
        </div>

        {/* Bug 1: Full description with translate */}
        <div className="grid gap-6 sm:grid-cols-2">
          <RichTextEditor label="Full Description (English)" value={form.full_description} onChange={(v) => update("full_description", v)} placeholder="Detailed description in English..." />
          <div>
            <RichTextEditor label="Full Description (German)" value={form.full_description_de} onChange={(v) => update("full_description_de", v)} placeholder="Detaillierte Beschreibung auf Deutsch..." />
            <div className="mt-2">
              <TranslateButton sourceText={form.full_description_de} onTranslated={(v) => update("full_description", v)} from="de" to="en" />
            </div>
          </div>
        </div>

        {/* Bug 2: Structured specs UI */}
        <div>
          <label className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">Specifications</label>
          <div className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => updateSpec(index, "label", e.target.value)}
                    placeholder="Label (e.g., Weight)"
                    className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/50"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(index, "value", e.target.value)}
                    placeholder="Value (e.g., 10kg)"
                    className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  disabled={specs.length <= 1}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition-all hover:bg-red-500/20 disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSpec}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-purple-400 transition-all hover:bg-purple-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Specification
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ToggleSwitch checked={form.available} onChange={(v) => update("available", v)} label="Available" description="Can be rented" color="emerald" />
          <ToggleSwitch checked={form.featured} onChange={(v) => update("featured", v)} label="Show on Homepage" description="Display in homepage section" color="amber" />
          <ToggleSwitch checked={form.published} onChange={(v) => update("published", v)} label="Published" description="Visible to users" color="purple" />
        </div>

        {/* Bug 3: Display order - positive only, no stepper */}
        <AdminFormField label="Display Order" name="display_order" type="number" value={form.display_order} onChange={(v) => update("display_order", v)} min="1" hideSpinner />

        {error && <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">{error}</p>}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-lg bg-purple-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-purple-500 disabled:opacity-50">{saving ? "Saving..." : isNew ? "Create" : "Save Changes"}</button>
          <button type="button" onClick={() => router.push("/admin/equipment")} className="rounded-lg border border-white/[0.08] px-8 py-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 hover:text-white">Cancel</button>
        </div>
      </form>
    </div>
  );
}
