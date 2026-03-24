"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminFormField from "../_components/AdminFormField";
import ImageUpload from "../_components/ImageUpload";
import type { DbEvent } from "@/lib/supabase/types";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function EventForm({ event }: { event?: DbEvent }) {
  const router = useRouter();
  const isNew = !event;

  const [form, setForm] = useState({
    title: event?.title || "",
    slug: event?.slug || "",
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : "",
    location: event?.location || "",
    lineup: event?.lineup?.join(", ") || "",
    description: event?.description || "",
    image_url: event?.image_url || "",
    eventbrite_link: event?.eventbrite_link || "",
    ticket_status: event?.ticket_status || "available",
    published: event?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "title" && isNew) {
      setForm((prev) => ({ ...prev, slug: slugify(value as string) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      title: form.title,
      slug: form.slug,
      date: form.date ? new Date(form.date).toISOString() : null,
      location: form.location,
      lineup: form.lineup ? form.lineup.split(",").map((s) => s.trim()).filter(Boolean) : [],
      description: form.description,
      image_url: form.image_url || null,
      eventbrite_link: form.eventbrite_link || null,
      ticket_status: form.ticket_status,
      published: form.published,
    };

    let result;
    if (isNew) {
      result = await supabase.from("events").insert(payload);
    } else {
      result = await supabase.from("events").update(payload).eq("id", event.id);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-2xl font-bold uppercase tracking-wider text-white">
        {isNew ? "Add Event" : "Edit Event"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Title" name="title" value={form.title} onChange={(v) => update("title", v)} required placeholder="Techno Night Berlin" />
          <AdminFormField label="Slug" name="slug" value={form.slug} onChange={(v) => update("slug", v)} required placeholder="techno-night-berlin" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Date & Time" name="date" type="datetime-local" value={form.date} onChange={(v) => update("date", v)} required />
          <AdminFormField label="Location" name="location" value={form.location} onChange={(v) => update("location", v)} required placeholder="Warehouse 23, Berlin" />
        </div>

        <AdminFormField label="Lineup (comma-separated)" name="lineup" value={form.lineup} onChange={(v) => update("lineup", v)} placeholder="DJ Name 1, DJ Name 2, DJ Name 3" />
        <AdminFormField label="Description" name="description" value={form.description} onChange={(v) => update("description", v)} textarea placeholder="Event description..." />
        <ImageUpload label="Event Image" value={form.image_url} onChange={(v) => update("image_url", v)} folder="events" />
        <AdminFormField label="Eventbrite Link" name="eventbrite_link" value={form.eventbrite_link} onChange={(v) => update("eventbrite_link", v)} placeholder="https://eventbrite.com/..." />

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">Ticket Status</label>
            <select
              value={form.ticket_status}
              onChange={(e) => update("ticket_status", e.target.value)}
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-purple-500/50"
            >
              <option value="available" className="bg-zinc-900 text-white">Available</option>
              <option value="limited" className="bg-zinc-900 text-white">Limited</option>
              <option value="final-release" className="bg-zinc-900 text-white">Final Release</option>
              <option value="sold-out" className="bg-zinc-900 text-white">Sold Out</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => update("published", e.target.checked)}
                className="h-5 w-5 rounded border-white/20 bg-white/[0.06] text-purple-500 accent-purple-500"
              />
              <span className="text-sm font-medium text-white/70">Published (visible to users)</span>
            </label>
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-[12px] text-red-400">{error}</p>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-purple-600 px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-purple-500 disabled:opacity-50"
          >
            {saving ? "Saving..." : isNew ? "Create Event" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/events")}
            className="rounded-lg border border-white/[0.08] px-8 py-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 transition-colors hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
