import type { TranslationKey } from "@/lib/i18n/translations";

export type FieldType = "text" | "textarea" | "image" | "url";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  translationKey: TranslationKey;
}

export interface SectionConfig {
  sectionId: string;
  label: string;
  anchorId: string;
  fields: FieldConfig[];
}

export const sections: SectionConfig[] = [
  {
    sectionId: "hero",
    label: "Hero / Banner",
    anchorId: "top",
    fields: [
      { key: "heading_line1", label: "Heading Line 1", type: "text", translationKey: "hero.experience" },
      { key: "heading_line2", label: "Heading Line 2", type: "text", translationKey: "hero.theUnderground" },
      { key: "button_text", label: "Button Text", type: "text", translationKey: "hero.getTickets" },
      { key: "stay_tuned", label: "Stay Tuned Text", type: "text", translationKey: "hero.stayTuned" },
    ],
  },
  {
    sectionId: "stats",
    label: "Stats Bar",
    anchorId: "top",
    fields: [
      { key: "events_produced_value", label: "Events Produced — Number", type: "text", translationKey: "stats.eventsProducedValue" },
      { key: "events_produced", label: "Events Produced — Label", type: "text", translationKey: "stats.eventsProduced" },
      { key: "people_moved_value", label: "People Moved — Number", type: "text", translationKey: "stats.peopleMovedValue" },
      { key: "people_moved", label: "People Moved — Label", type: "text", translationKey: "stats.peopleMoved" },
      { key: "artists_featured_value", label: "Artists Featured — Number", type: "text", translationKey: "stats.artistsFeaturedValue" },
      { key: "artists_featured", label: "Artists Featured — Label", type: "text", translationKey: "stats.artistsFeatured" },
      { key: "venues_value", label: "Venues — Number", type: "text", translationKey: "stats.venuesValue" },
      { key: "venues", label: "Venues — Label", type: "text", translationKey: "stats.venues" },
    ],
  },
  {
    sectionId: "events",
    label: "Upcoming Events",
    anchorId: "events",
    fields: [
      { key: "label", label: "Section Label", type: "text", translationKey: "events.label" },
      { key: "heading1", label: "Heading Line 1", type: "text", translationKey: "events.heading1" },
      { key: "heading2", label: "Heading Line 2", type: "text", translationKey: "events.heading2" },
      { key: "description", label: "Description", type: "textarea", translationKey: "events.description" },
    ],
  },
  {
    sectionId: "gallery",
    label: "Gallery",
    anchorId: "gallery",
    fields: [
      { key: "label", label: "Section Label", type: "text", translationKey: "gallery.label" },
      { key: "heading1", label: "Heading Line 1", type: "text", translationKey: "gallery.heading1" },
      { key: "heading2", label: "Heading Line 2", type: "text", translationKey: "gallery.heading2" },
      { key: "description", label: "Description", type: "textarea", translationKey: "gallery.description" },
    ],
  },
  {
    sectionId: "djs",
    label: "Resident DJs",
    anchorId: "djs",
    fields: [
      { key: "label", label: "Section Label", type: "text", translationKey: "djs.label" },
      { key: "heading1", label: "Heading Line 1", type: "text", translationKey: "djs.heading1" },
      { key: "heading2", label: "Heading Line 2", type: "text", translationKey: "djs.heading2" },
      { key: "description", label: "Description", type: "textarea", translationKey: "djs.description" },
    ],
  },
  {
    sectionId: "services",
    label: "Services",
    anchorId: "services",
    fields: [
      { key: "label", label: "Section Label", type: "text", translationKey: "services.label" },
      { key: "heading1", label: "Heading Line 1", type: "text", translationKey: "services.heading1" },
      { key: "heading2", label: "Heading Line 2", type: "text", translationKey: "services.heading2" },
      { key: "description", label: "Description", type: "textarea", translationKey: "services.description" },
    ],
  },
  {
    sectionId: "equipment",
    label: "Equipment Rental",
    anchorId: "equipment",
    fields: [
      { key: "label", label: "Section Label", type: "text", translationKey: "equipment.label" },
      { key: "heading1", label: "Heading Line 1", type: "text", translationKey: "equipment.heading1" },
      { key: "heading2", label: "Heading Line 2", type: "text", translationKey: "equipment.heading2" },
      { key: "description", label: "Description", type: "textarea", translationKey: "equipment.description" },
    ],
  },
  {
    sectionId: "about",
    label: "About Us",
    anchorId: "about",
    fields: [
      { key: "about_image", label: "Section Image", type: "image", translationKey: "about.image" },
      { key: "label", label: "Section Label", type: "text", translationKey: "about.label" },
      { key: "heading", label: "Heading", type: "text", translationKey: "about.heading" },
      { key: "heading_highlight", label: "Highlight Word", type: "text", translationKey: "about.headingHighlight" },
      { key: "p1", label: "Paragraph 1", type: "textarea", translationKey: "about.p1" },
      { key: "p2", label: "Paragraph 2", type: "textarea", translationKey: "about.p2" },
    ],
  },
  {
    sectionId: "contact",
    label: "Contact",
    anchorId: "contact",
    fields: [
      { key: "label", label: "Section Label", type: "text", translationKey: "contact.label" },
      { key: "heading1", label: "Heading Line 1", type: "text", translationKey: "contact.heading1" },
      { key: "heading2", label: "Heading Line 2", type: "text", translationKey: "contact.heading2" },
      { key: "description", label: "Description", type: "textarea", translationKey: "contact.description" },
      { key: "email_value", label: "Email Address", type: "text", translationKey: "contact.emailValue" },
      { key: "phone_value", label: "Phone Number", type: "text", translationKey: "contact.phoneValue" },
      { key: "location_value", label: "Location", type: "text", translationKey: "contact.locationValue" },
      { key: "quote", label: "Tagline / Quote", type: "textarea", translationKey: "contact.quote" },
      { key: "quote_author", label: "Quote Author", type: "text", translationKey: "contact.quoteAuthor" },
      { key: "instagram_url", label: "Instagram URL", type: "url", translationKey: "contact.instagramUrl" },
      { key: "tiktok_url", label: "TikTok URL", type: "url", translationKey: "contact.tiktokUrl" },
      { key: "facebook_url", label: "Facebook URL", type: "url", translationKey: "contact.facebookUrl" },
      { key: "soundcloud_url", label: "SoundCloud URL", type: "url", translationKey: "contact.soundcloudUrl" },
    ],
  },
  {
    sectionId: "footer",
    label: "Footer",
    anchorId: "contact",
    fields: [
      { key: "instagram_url", label: "Instagram URL", type: "url", translationKey: "footer.instagramUrl" },
      { key: "tiktok_url", label: "TikTok URL", type: "url", translationKey: "footer.tiktokUrl" },
      { key: "facebook_url", label: "Facebook URL", type: "url", translationKey: "footer.facebookUrl" },
      { key: "soundcloud_url", label: "SoundCloud URL", type: "url", translationKey: "footer.soundcloudUrl" },
    ],
  },
];
