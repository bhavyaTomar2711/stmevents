import { defineField, defineType } from "sanity";

export default defineType({
  name: "equipment",
  title: "Equipment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(150),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "Add multiple images — first image is the cover",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "price",
      title: "Price",
      description: 'e.g. "€120" or "€350"',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricePer",
      title: "Price Period",
      description: 'e.g. "/ day", "/ weekend"',
      type: "string",
      initialValue: "/ day",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "Shown on cards (1-2 sentences)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      description: "Shown on detail page",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "DJ Gear", value: "dj-gear" },
          { title: "Sound System", value: "sound" },
          { title: "Lighting", value: "lighting" },
          { title: "Stage & Rigging", value: "stage" },
          { title: "Effects", value: "effects" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
      description: "Uncheck if currently unavailable",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show on homepage equipment section",
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      description: "Key specs displayed on the detail page",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name, A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
      price: "price",
      available: "available",
    },
    prepare({ title, subtitle, media, price, available }) {
      const categoryLabels: Record<string, string> = {
        "dj-gear": "DJ Gear",
        sound: "Sound",
        lighting: "Lighting",
        stage: "Stage & Rigging",
        effects: "Effects",
      };
      return {
        title: `${available === false ? "⏸ " : ""}${title}`,
        subtitle: `${categoryLabels[subtitle] || subtitle} — ${price || "No price"}`,
        media,
      };
    },
  },
});
