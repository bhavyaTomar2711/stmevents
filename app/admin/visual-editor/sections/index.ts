import type { TranslationKey } from "@/lib/i18n/translations";

export type FieldType = "text" | "textarea";

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
    ],
  },
];
