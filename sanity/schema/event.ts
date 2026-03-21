import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lineup",
      title: "Lineup (text)",
      description: "Simple text lineup — DJ names as strings",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lineupRefs",
      title: "Lineup (DJs)",
      description: "Link DJs from the DJ database for richer display",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dj" }] }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "eventbriteLink",
      title: "Eventbrite Link",
      description: "Full URL to the Eventbrite ticket page",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["https"] }).error(
          "Must be a valid HTTPS URL (e.g. https://www.eventbrite.com/e/...)"
        ),
    }),
    defineField({
      name: "ticketStatus",
      title: "Ticket Status",
      type: "string",
      initialValue: "available",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold Out", value: "sold-out" },
          { title: "Limited Tickets", value: "limited" },
          { title: "Final Release", value: "final-release" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Event Date, Ascending",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", media: "mainImage", ticketStatus: "ticketStatus" },
    prepare({ title, date, media, ticketStatus }) {
      const d = date ? new Date(date).toLocaleDateString() : "No date";
      const statusLabel: Record<string, string> = {
        available: "",
        "sold-out": " [SOLD OUT]",
        limited: " [LIMITED]",
        "final-release": " [FINAL RELEASE]",
      };
      return { title, subtitle: `${d}${statusLabel[ticketStatus] || ""}`, media };
    },
  },
});
