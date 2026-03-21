import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryItem",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string };
          if (parent?.mediaType === "image" && !value) return "Image is required";
          return true;
        }),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, Vimeo, or direct MP4 link",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string };
          if (parent?.mediaType === "video" && !value) return "Video URL is required";
          return true;
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Video Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Custom thumbnail for the video (optional)",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description shown when user clicks on the image",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Event Photos", value: "event" },
          { title: "Aftermovie", value: "aftermovie" },
          { title: "DJ Set", value: "djset" },
          { title: "Behind the Scenes", value: "bts" },
          { title: "Promo / Trailer", value: "promo" },
        ],
      },
    }),
    defineField({
      name: "relatedEvent",
      title: "Related Event",
      type: "reference",
      to: [{ type: "event" }],
      description: "Link this to an event (optional)",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "When was this captured",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage gallery section",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower number = shown first",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      mediaType: "mediaType",
      category: "category",
      image: "image",
      thumbnail: "thumbnail",
    },
    prepare({ title, mediaType, category, image, thumbnail }) {
      const icon = mediaType === "video" ? "\uD83C\uDFAC" : "\uD83D\uDCF7";
      const cat = category ? ` \u2014 ${category}` : "";
      return {
        title: `${icon} ${title}`,
        subtitle: `${mediaType}${cat}`,
        media: image || thumbnail,
      };
    },
  },
});
