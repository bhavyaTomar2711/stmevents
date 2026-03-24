export interface DbEvent {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO date
  location: string;
  lineup: string[] | null;
  description: string | null;
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
  instagram_url: string | null;
  soundcloud_url: string | null;
  resident: boolean;
  display_order: number;
  created_at: string;
  published: boolean;
}

export interface DbGalleryItem {
  id: string;
  title: string;
  media_type: "image" | "video";
  image_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  category: "event" | "aftermovie" | "djset" | "bts" | "promo";
  description: string | null;
  featured: boolean;
  date: string | null;
  related_event_id: string | null;
  created_at: string;
  published: boolean;
}

export interface DbEquipment {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: string;
  price_per: string;
  short_description: string;
  full_description: string | null;
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
