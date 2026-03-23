import { groq } from "next-sanity";

// All events ordered by date (upcoming first)
export const allEventsQuery = groq`
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    lineup,
    "lineupDJs": lineupRefs[]->{
      _id,
      name,
      "slug": slug.current,
      photo,
      genre
    },
    description,
    mainImage,
    eventbriteLink,
    ticketStatus
  }
`;

// Featured events for homepage (next N upcoming)
export const featuredEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc)[0...$count] {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    mainImage,
    eventbriteLink,
    ticketStatus
  }
`;

// Single event by slug
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    lineup,
    "lineupDJs": lineupRefs[]->{
      _id,
      name,
      "slug": slug.current,
      photo,
      genre,
      instagramUrl,
      soundcloudUrl
    },
    description,
    mainImage,
    gallery,
    eventbriteLink,
    ticketStatus
  }
`;

// Next upcoming event (for hero)
export const nextEventQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc)[0] {
    _id,
    title,
    "slug": slug.current,
    date,
    location,
    mainImage,
    eventbriteLink,
    ticketStatus
  }
`;

// All event slugs (for generateStaticParams)
export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)]{
    "slug": slug.current
  }
`;

// ─── Gallery Queries ───────────────────────────────────────────────

// All gallery items (newest first)
export const allGalleryQuery = groq`
  *[_type == "galleryItem"] | order(order asc, date desc) {
    _id,
    title,
    mediaType,
    image,
    videoUrl,
    thumbnail,
    category,
    description,
    featured,
    date,
    "relatedEvent": relatedEvent->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

// Gallery items by category
export const galleryByCategoryQuery = groq`
  *[_type == "galleryItem" && category == $category] | order(order asc, date desc) {
    _id,
    title,
    mediaType,
    image,
    videoUrl,
    thumbnail,
    category,
    description,
    featured,
    date,
    "relatedEvent": relatedEvent->{
      _id,
      title,
      "slug": slug.current
    }
  }
`;

// Gallery items by related event
export const galleryByEventQuery = groq`
  *[_type == "galleryItem" && relatedEvent._ref == $eventId] | order(order asc, date desc) {
    _id,
    title,
    mediaType,
    image,
    videoUrl,
    thumbnail,
    category,
    description,
    date
  }
`;

// ─── DJ Queries ──────────────────────────────────────────────────

// All DJs sorted by display order
export const allDJsQuery = groq`
  *[_type == "dj"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    photo,
    logo,
    genre,
    bio,
    instagramUrl,
    soundcloudUrl,
    resident,
    order
  }
`;

// Resident DJs only
export const residentDJsQuery = groq`
  *[_type == "dj" && resident == true] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    photo,
    logo,
    genre,
    bio,
    instagramUrl,
    soundcloudUrl,
    resident,
    order
  }
`;

// Single DJ by slug
export const djBySlugQuery = groq`
  *[_type == "dj" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    logo,
    genre,
    bio,
    instagramUrl,
    soundcloudUrl,
    resident,
    order
  }
`;

// ─── Equipment Queries ────────────────────────────────────────────

// All equipment sorted by order
export const allEquipmentQuery = groq`
  *[_type == "equipment"] | order(order asc, name asc) {
    _id,
    name,
    "slug": slug.current,
    images,
    price,
    pricePer,
    shortDescription,
    fullDescription,
    category,
    available,
    featured,
    specs,
    order
  }
`;

// Featured equipment (for homepage)
export const featuredEquipmentQuery = groq`
  *[_type == "equipment" && featured == true] | order(order asc)[0...$count] {
    _id,
    name,
    "slug": slug.current,
    images,
    price,
    pricePer,
    shortDescription,
    category,
    available
  }
`;

// Single equipment by slug
export const equipmentBySlugQuery = groq`
  *[_type == "equipment" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    images,
    price,
    pricePer,
    shortDescription,
    fullDescription,
    category,
    available,
    featured,
    specs,
    order
  }
`;

// All equipment slugs (for generateStaticParams)
export const equipmentSlugsQuery = groq`
  *[_type == "equipment" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Featured gallery items (for homepage)
export const featuredGalleryQuery = groq`
  *[_type == "galleryItem" && featured == true] | order(order asc, date desc)[0...$count] {
    _id,
    title,
    mediaType,
    image,
    videoUrl,
    thumbnail,
    category,
    description,
    "relatedEvent": relatedEvent->{
      title,
      "slug": slug.current
    }
  }
`;
