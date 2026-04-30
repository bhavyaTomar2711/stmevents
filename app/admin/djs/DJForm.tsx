"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminFormField from "../_components/AdminFormField";
import ImageUpload from "../_components/ImageUpload";
import RichTextEditor from "../_components/RichTextEditor";
import TranslateButton from "../_components/TranslateButton";
import ToggleSwitch from "../_components/ToggleSwitch";
import type { DbDJ } from "@/lib/supabase/types";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function DJForm({ dj }: { dj?: DbDJ }) {
  const router = useRouter();
  const isNew = !dj;

  const [form, setForm] = useState({
    name: dj?.name || "",
    slug: dj?.slug || "",
    photo_url: dj?.photo_url || "",
    genre: dj?.genre || "",
    bio: dj?.bio || "",
    bio_de: dj?.bio_de || "",
    instagram_url: dj?.instagram_url || "",
    tiktok_url: dj?.tiktok_url || "",
    resident: dj?.resident ?? false,
    display_order: dj?.display_order?.toString() || "1",
    published: dj?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "name" && isNew) setForm((prev) => ({ ...prev, slug: slugify(value as string) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      name: form.name,
      slug: form.slug,
      photo_url: form.photo_url || null,
      genre: form.genre,
      bio: form.bio || null,
      bio_de: form.bio_de || null,
      instagram_url: form.instagram_url || null,
      tiktok_url: form.tiktok_url || null,
      resident: form.resident,
      display_order: Math.max(1, parseInt(form.display_order) || 1),
      published: form.published,
    };

    const result = isNew
      ? await supabase.from("djs").insert(payload)
      : await supabase.from("djs").update(payload).eq("id", dj.id);

    if (result.error) { setError(result.error.message); setSaving(false); return; }
    router.push("/admin/djs");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-2xl font-bold uppercase tracking-wider text-white">{isNew ? "Add DJ" : "Edit DJ"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Name" name="name" value={form.name} onChange={(v) => update("name", v)} required placeholder="DJ Name" />
          <AdminFormField label="Slug" name="slug" value={form.slug} onChange={(v) => update("slug", v)} required placeholder="dj-name" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Genre" name="genre" value={form.genre} onChange={(v) => update("genre", v)} required placeholder="Dark Techno" />
          {/* Bug 3: Display order - positive only, no stepper */}
          <AdminFormField label="Display Order" name="display_order" type="number" value={form.display_order} onChange={(v) => update("display_order", v)} min="1" hideSpinner />
        </div>
        <ImageUpload label="DJ Photo" value={form.photo_url} onChange={(v) => update("photo_url", v)} folder="djs" />
        {/* Bug 1: Bio with translate button */}
        <div className="grid gap-6 sm:grid-cols-2">
          <RichTextEditor label="Bio (English)" value={form.bio} onChange={(v) => update("bio", v)} placeholder="Write DJ bio in English..." />
          <div>
            <RichTextEditor label="Bio (German)" value={form.bio_de} onChange={(v) => update("bio_de", v)} placeholder="DJ-Biografie auf Deutsch..." />
            <div className="mt-2">
              <TranslateButton sourceText={form.bio_de} onTranslated={(v) => update("bio", v)} from="de" to="en" />
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Instagram URL" name="instagram_url" value={form.instagram_url} onChange={(v) => update("instagram_url", v)} placeholder="https://instagram.com/..." />
          <AdminFormField label="TikTok URL" name="tiktok_url" value={form.tiktok_url} onChange={(v) => update("tiktok_url", v)} placeholder="https://tiktok.com/..." />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <ToggleSwitch checked={form.resident} onChange={(v) => update("resident", v)} label="Resident DJ" description="Mark as resident artist" color="emerald" />
          <ToggleSwitch checked={form.published} onChange={(v) => update("published", v)} label="Published" description="Visible to users" color="purple" />
        </div>
        {error && <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">{error}</p>}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-lg bg-purple-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-purple-500 disabled:opacity-50">{saving ? "Saving..." : isNew ? "Create DJ" : "Save Changes"}</button>
          <button type="button" onClick={() => router.push("/admin/djs")} className="rounded-lg border border-white/[0.08] px-8 py-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-colors hover:text-white">Cancel</button>
        </div>
      </form>
    </div>
  );
}
