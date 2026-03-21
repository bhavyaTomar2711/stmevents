import { defineField, defineType } from "sanity";

export default defineType({
  name: "dj",
  title: "DJ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Optional DJ logo or brand mark",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      description: "e.g. Dark Techno, Melodic House, Industrial",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["https"] }),
    }),
    defineField({
      name: "soundcloudUrl",
      title: "SoundCloud URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["https"] }),
    }),
    defineField({
      name: "resident",
      title: "Resident DJ",
      type: "boolean",
      initialValue: false,
      description: "Toggle on if this DJ is a resident",
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
      subtitle: "genre",
      media: "photo",
      resident: "resident",
    },
    prepare({ title, subtitle, media, resident }) {
      return {
        title: `${title}${resident ? " ★" : ""}`,
        subtitle: subtitle || "No genre set",
        media,
      };
    },
  },
});
