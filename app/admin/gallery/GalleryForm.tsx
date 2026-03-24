"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminFormField from "../_components/AdminFormField";
import ImageUpload from "../_components/ImageUpload";
import type { DbGalleryItem } from "@/lib/supabase/types";

export default function GalleryForm({ item }: { item?: DbGalleryItem }) {
  const router = useRouter();
  const isNew = !item;

  const [form, setForm] = useState({
    title: item?.title || "",
    media_type: item?.media_type || "image",
    image_url: item?.image_url || "",
    video_url: item?.video_url || "",
    thumbnail_url: item?.thumbnail_url || "",
    category: item?.category || "event",
    description: item?.description || "",
    featured: item?.featured ?? false,
    date: item?.date || "",
    published: item?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string | boolean) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      title: form.title,
      media_type: form.media_type,
      image_url: form.image_url || null,
      video_url: form.video_url || null,
      thumbnail_url: form.thumbnail_url || null,
      category: form.category,
      description: form.description || null,
      featured: form.featured,
      date: form.date || null,
      published: form.published,
    };

    const result = isNew
      ? await supabase.from("gallery").insert(payload)
      : await supabase.from("gallery").update(payload).eq("id", item.id);

    if (result.error) { setError(result.error.message); setSaving(false); return; }
    router.push("/admin/gallery");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-2xl font-bold uppercase tracking-wider text-white">{isNew ? "Add Gallery Item" : "Edit Gallery Item"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
        <AdminFormField label="Title" name="title" value={form.title} onChange={(v) => update("title", v)} required placeholder="Photo/Video title" />
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">Media Type</label>
            <select value={form.media_type} onChange={(e) => update("media_type", e.target.value)} className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50">
              <option value="image" className="bg-zinc-900 text-white">Image</option>
              <option value="video" className="bg-zinc-900 text-white">Video</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">Category</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50">
              <option value="event" className="bg-zinc-900 text-white">Event Photos</option>
              <option value="aftermovie" className="bg-zinc-900 text-white">Aftermovies</option>
              <option value="djset" className="bg-zinc-900 text-white">DJ Sets</option>
              <option value="bts" className="bg-zinc-900 text-white">Behind the Scenes</option>
              <option value="promo" className="bg-zinc-900 text-white">Promo</option>
            </select>
          </div>
        </div>
        <ImageUpload label="Image" value={form.image_url} onChange={(v) => update("image_url", v)} folder="gallery" />
        {form.media_type === "video" && (
          <>
            <ImageUpload label="Video" value={form.video_url} onChange={(v) => update("video_url", v)} folder="gallery" accept="video/*" />
            <ImageUpload label="Video Thumbnail" value={form.thumbnail_url} onChange={(v) => update("thumbnail_url", v)} folder="gallery" />
          </>
        )}
        <AdminFormField label="Description" name="description" value={form.description} onChange={(v) => update("description", v)} textarea />
        <AdminFormField label="Date" name="date" type="date" value={form.date} onChange={(v) => update("date", v)} />
        <div className="flex gap-6">
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="h-5 w-5 accent-purple-500" />
            <span className="text-sm text-white/70">Featured</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="h-5 w-5 accent-purple-500" />
            <span className="text-sm text-white/70">Published</span>
          </label>
        </div>
        {error && <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">{error}</p>}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-lg bg-purple-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-purple-500 disabled:opacity-50">{saving ? "Saving..." : isNew ? "Create" : "Save Changes"}</button>
          <button type="button" onClick={() => router.push("/admin/gallery")} className="rounded-lg border border-white/[0.08] px-8 py-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 hover:text-white">Cancel</button>
        </div>
      </form>
    </div>
  );
}
