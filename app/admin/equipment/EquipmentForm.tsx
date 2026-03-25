"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminFormField from "../_components/AdminFormField";
import ImageUpload from "../_components/ImageUpload";
import RichTextEditor from "../_components/RichTextEditor";
import type { DbEquipment } from "@/lib/supabase/types";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
    price_per: item?.price_per || "/ day",
    short_description: item?.short_description || "",
    short_description_de: item?.short_description_de || "",
    full_description: item?.full_description || "",
    full_description_de: item?.full_description_de || "",
    category: item?.category || "dj-gear",
    category_label: item?.category_label || "DJ Gear",
    available: item?.available ?? true,
    featured: item?.featured ?? false,
    specs: item?.specs ? JSON.stringify(item.specs, null, 2) : '[{"label": "", "value": ""}]',
    display_order: item?.display_order?.toString() || "0",
    published: item?.published ?? true,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let specs;
    try { specs = JSON.parse(form.specs); } catch { setError("Invalid JSON in specs"); setSaving(false); return; }

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
      specs,
      display_order: parseInt(form.display_order) || 0,
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
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Name (English) *" name="name" value={form.name} onChange={(v) => update("name", v)} required placeholder="Pioneer CDJ-3000" />
          <AdminFormField label="Name (German)" name="name_de" value={form.name_de} onChange={(v) => update("name_de", v)} placeholder="Pioneer CDJ-3000" />
        </div>
        <AdminFormField label="Slug" name="slug" value={form.slug} onChange={(v) => update("slug", v)} required />
        <div className="grid gap-6 sm:grid-cols-3">
          <AdminFormField label="Price (EUR) *" name="price" value={form.price} onChange={(v) => update("price", v)} required placeholder="€120" />
          <AdminFormField label="Price Per" name="price_per" value={form.price_per} onChange={(v) => update("price_per", v)} placeholder="/ day" />
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">Category *</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50">
              <option value="dj-gear" className="bg-zinc-900 text-white">DJ Gear</option>
              <option value="sound" className="bg-zinc-900 text-white">Sound System</option>
              <option value="lighting" className="bg-zinc-900 text-white">Lighting</option>
              <option value="stage" className="bg-zinc-900 text-white">Stage & Rigging</option>
              <option value="effects" className="bg-zinc-900 text-white">Effects</option>
            </select>
          </div>
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

        <div className="grid gap-6 sm:grid-cols-2">
          <RichTextEditor label="Short Description (English)" value={form.short_description} onChange={(v) => update("short_description", v)} placeholder="Brief description in English..." />
          <RichTextEditor label="Short Description (German)" value={form.short_description_de} onChange={(v) => update("short_description_de", v)} placeholder="Kurze Beschreibung auf Deutsch..." />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <RichTextEditor label="Full Description (English)" value={form.full_description} onChange={(v) => update("full_description", v)} placeholder="Detailed description in English..." />
          <RichTextEditor label="Full Description (German)" value={form.full_description_de} onChange={(v) => update("full_description_de", v)} placeholder="Detaillierte Beschreibung auf Deutsch..." />
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">Specs (JSON)</label>
          <textarea value={form.specs} onChange={(e) => update("specs", e.target.value)} rows={6} className="w-full resize-none rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 font-mono text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/50" />
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={form.available} onChange={(e) => update("available", e.target.checked)} className="h-5 w-5 accent-purple-500" /><span className="text-sm text-white/70">Available</span></label>
          <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="h-5 w-5 accent-purple-500" /><span className="text-sm text-white/70">Featured</span></label>
          <label className="flex cursor-pointer items-center gap-3"><input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="h-5 w-5 accent-purple-500" /><span className="text-sm text-white/70">Published</span></label>
        </div>
        <AdminFormField label="Display Order" name="display_order" type="number" value={form.display_order} onChange={(v) => update("display_order", v)} />
        {error && <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">{error}</p>}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-lg bg-purple-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-purple-500 disabled:opacity-50">{saving ? "Saving..." : isNew ? "Create" : "Save Changes"}</button>
          <button type="button" onClick={() => router.push("/admin/equipment")} className="rounded-lg border border-white/[0.08] px-8 py-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 hover:text-white">Cancel</button>
        </div>
      </form>
    </div>
  );
}
