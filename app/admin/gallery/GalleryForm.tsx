"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminFormField from "../_components/AdminFormField";
import ImageUpload from "../_components/ImageUpload";
import RichTextEditor from "../_components/RichTextEditor";
import TranslateButton from "../_components/TranslateButton";
import ToggleSwitch from "../_components/ToggleSwitch";
import DatePicker from "../_components/DatePicker";
import CustomSelect from "../_components/CustomSelect";
import type { DbGalleryItem } from "@/lib/supabase/types";

export default function GalleryForm({ item }: { item?: DbGalleryItem }) {
  const router = useRouter();
  const isNew = !item;

  const [form, setForm] = useState({
    title: item?.title || "",
    title_de: item?.title_de || "",
    media_type: item?.media_type || "image",
    image_url: item?.image_url || "",
    video_url: item?.video_url || "",
    thumbnail_url: item?.thumbnail_url || "",
    category: item?.category || "event",
    description: item?.description || "",
    description_de: item?.description_de || "",
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

    // Bug 6: Validate at least one image or video is uploaded
    if (!form.image_url && !form.video_url) {
      setError("Please upload at least one image or video to proceed.");
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const payload = {
      title: form.title,
      title_de: form.title_de || null,
      media_type: form.media_type,
      image_url: form.image_url || null,
      video_url: form.video_url || null,
      thumbnail_url: form.thumbnail_url || null,
      category: form.category,
      description: form.description || null,
      description_de: form.description_de || null,
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
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-2xl font-bold uppercase tracking-wider text-white">{isNew ? "New Gallery Item" : "Edit Gallery Item"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
        {/* Bug 1: Title fields with translate button */}
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Title (English) *" name="title" value={form.title} onChange={(v) => update("title", v)} required placeholder="Photo/Video title" />
          <div>
            <AdminFormField label="Title (German)" name="title_de" value={form.title_de} onChange={(v) => update("title_de", v)} placeholder="Foto/Video Titel" />
            <div className="mt-2">
              <TranslateButton sourceText={form.title_de} onTranslated={(v) => update("title", v)} from="de" to="en" />
            </div>
          </div>
        </div>

        {/* Bug 1: Description fields with translate button */}
        <div className="grid gap-6 sm:grid-cols-2">
          <RichTextEditor label="Description (English)" value={form.description} onChange={(v) => update("description", v)} placeholder="Enter description in English..." />
          <div>
            <RichTextEditor label="Description (German)" value={form.description_de} onChange={(v) => update("description_de", v)} placeholder="Enter description in German..." />
            <div className="mt-2">
              <TranslateButton sourceText={form.description_de} onTranslated={(v) => update("description", v)} from="de" to="en" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomSelect
            label="Media Type"
            value={form.media_type}
            onChange={(v) => update("media_type", v)}
            required
            options={[
              { value: "image", label: "Image" },
              { value: "video", label: "Video" },
            ]}
          />
          <CustomSelect
            label="Category"
            value={form.category}
            onChange={(v) => update("category", v)}
            options={[
              { value: "event", label: "Event Photos" },
              { value: "aftermovie", label: "Aftermovies" },
              { value: "djset", label: "DJ Sets" },
              { value: "bts", label: "Behind the Scenes" },
              { value: "promo", label: "Promo" },
            ]}
          />
        </div>

        {/* Bug 6: Image/video upload with validation message */}
        <ImageUpload label="Gallery Image *" value={form.image_url} onChange={(v) => update("image_url", v)} folder="gallery" />
        {form.media_type === "video" && (
          <>
            <ImageUpload label="Video" value={form.video_url} onChange={(v) => update("video_url", v)} folder="gallery" accept="video/*" />
            <ImageUpload label="Video Thumbnail" value={form.thumbnail_url} onChange={(v) => update("thumbnail_url", v)} folder="gallery" />
          </>
        )}
        {!form.image_url && !form.video_url && (
          <p className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-[12px] text-amber-400">
            Please upload at least one image or video to proceed.
          </p>
        )}

        <DatePicker label="Date" value={form.date} onChange={(v) => update("date", v)} disablePast />
        <div className="grid gap-3 sm:grid-cols-2">
          <ToggleSwitch checked={form.featured} onChange={(v) => update("featured", v)} label="Show on Homepage" description="Display in homepage gallery" color="amber" />
          <ToggleSwitch checked={form.published} onChange={(v) => update("published", v)} label="Published" description="Visible to users" color="purple" />
        </div>
        {error && <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">{error}</p>}
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="rounded-lg bg-purple-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-purple-500 disabled:opacity-50">{saving ? "Saving..." : isNew ? "Add to Gallery" : "Save Changes"}</button>
          <button type="button" onClick={() => router.push("/admin/gallery")} className="rounded-lg border border-white/[0.08] px-8 py-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 hover:text-white">Cancel</button>
        </div>
      </form>
    </div>
  );
}
