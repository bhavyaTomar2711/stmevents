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
import type { DbEvent } from "@/lib/supabase/types";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function EventForm({ event }: { event?: DbEvent }) {
  const router = useRouter();
  const isNew = !event;

  const [form, setForm] = useState({
    title: event?.title || "",
    title_de: event?.title_de || "",
    slug: event?.slug || "",
    date: event?.date ? new Date(event.date).toISOString().slice(0, 16) : "",
    location: event?.location || "",
    location_de: event?.location_de || "",
    lineup: event?.lineup?.join(", ") || "",
    description: event?.description || "",
    description_de: event?.description_de || "",
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
      title_de: form.title_de || null,
      slug: form.slug,
      date: form.date ? new Date(form.date).toISOString() : null,
      location: form.location,
      location_de: form.location_de || null,
      lineup: form.lineup ? form.lineup.split(",").map((s) => s.trim()).filter(Boolean) : [],
      description: form.description,
      description_de: form.description_de || null,
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
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-2xl font-bold uppercase tracking-wider text-white">
        {isNew ? "Add Event" : "Edit Event"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
        {/* Bug 1: Title fields with translate button */}
        <div className="grid gap-6 sm:grid-cols-2">
          <AdminFormField label="Title (English) *" name="title" value={form.title} onChange={(v) => update("title", v)} required placeholder="Techno Night Berlin" />
          <div>
            <AdminFormField label="Title (German)" name="title_de" value={form.title_de} onChange={(v) => update("title_de", v)} placeholder="Techno Nacht Berlin" />
            <div className="mt-2">
              <TranslateButton sourceText={form.title_de} onTranslated={(v) => update("title", v)} from="de" to="en" />
            </div>
          </div>
        </div>

        <AdminFormField label="Slug" name="slug" value={form.slug} onChange={(v) => update("slug", v)} required placeholder="techno-night-berlin" />

        <div className="grid gap-6 sm:grid-cols-2">
          <DatePicker label="Date & Time" value={form.date} onChange={(v) => update("date", v)} required includeTime disablePast />
          <div className="grid gap-6 sm:grid-cols-2">
            <AdminFormField label="Location (English) *" name="location" value={form.location} onChange={(v) => update("location", v)} required placeholder="Warehouse 23, Berlin" />
            <div>
              <AdminFormField label="Location (German)" name="location_de" value={form.location_de} onChange={(v) => update("location_de", v)} placeholder="Lager 23, Berlin" />
              <div className="mt-2">
                <TranslateButton sourceText={form.location_de} onTranslated={(v) => update("location", v)} from="de" to="en" />
              </div>
            </div>
          </div>
        </div>

        <AdminFormField label="Lineup (comma-separated)" name="lineup" value={form.lineup} onChange={(v) => update("lineup", v)} placeholder="DJ Name 1, DJ Name 2, DJ Name 3" />

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

        <ImageUpload label="Event Image" value={form.image_url} onChange={(v) => update("image_url", v)} folder="events" />
        <AdminFormField label="Eventbrite Link" name="eventbrite_link" value={form.eventbrite_link} onChange={(v) => update("eventbrite_link", v)} placeholder="https://eventbrite.com/..." />

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomSelect
            label="Ticket Status"
            value={form.ticket_status}
            onChange={(v) => update("ticket_status", v)}
            options={[
              { value: "available", label: "Available" },
              { value: "limited", label: "Limited" },
              { value: "final-release", label: "Final Release" },
              { value: "sold-out", label: "Sold Out" },
            ]}
          />

          <div className="flex items-end">
            <ToggleSwitch checked={form.published} onChange={(v) => update("published", v)} label="Published" description="Visible to users" color="purple" />
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
