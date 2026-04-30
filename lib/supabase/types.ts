export interface DbEvent {
  id: string;
  title: string;
  title_de: string | null;
  slug: string;
  date: string; // ISO date
  location: string;
  location_de: string | null;
  lineup: string[] | null;
  description: string | null;
  description_de: string | null;
  image_url: string | null;
  eventbrite_link: string | null;
  ticket_status: "available" | "sold-out" | "limited" | "final-release";
  created_at: string;
  published: boolean;
}

export interface DbDJ {
  id: string;
  name: string;
  slug: string;
  photo_url: string;
  logo_url: string | null;
  genre: string;
  bio: string | null;
  bio_de: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  resident: boolean;
  display_order: number;
  created_at: string;
  published: boolean;
}

export interface DbGalleryItem {
  id: string;
  title: string;
  title_de: string | null;
  media_type: "image" | "video";
  image_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  category: "event" | "aftermovie" | "djset" | "bts" | "promo";
  description: string | null;
  description_de: string | null;
  featured: boolean;
  date: string | null;
  related_event_id: string | null;
  created_at: string;
  published: boolean;
}

export interface DbEquipment {
  id: string;
  name: string;
  name_de: string | null;
  slug: string;
  images: string[];
  price: string;
  price_per: string;
  short_description: string;
  short_description_de: string | null;
  full_description: string | null;
  full_description_de: string | null;
  category: string;
  category_label: string;
  available: boolean;
  featured: boolean;
  specs: { label: string; value: string }[];
  display_order: number;
  created_at: string;
  published: boolean;
}

export interface DbInquiry {
  id: string;
  type: "booking" | "rental" | "contact";
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  event_name: string | null;
  equipment_name: string | null;
  rental_date: string | null;
  duration: string | null;
  location: string | null;
  requirements: string | null;
  status: "new" | "read" | "replied";
  created_at: string;
}
