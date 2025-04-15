
import { Database } from "@/integrations/supabase/types";

// Re-export the Database type
export type { Database };

// Custom types based on the Database schema
export type Name = {
  id: string;
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  religion?: string | null;
  language?: string | null;
  description?: string | null;
  popularity?: number | null;
  pronunciation?: string | null;
  created_at: string;
  updated_at: string;
};

export type NameAdditionalDetails = {
  id: string;
  name_id: string;
  lucky_number?: number | null;
  lucky_stone?: string | null;
  lucky_color?: string | null;
  numerology?: number | null;
  zodiac_sign?: string | null;
  syllables?: number | null;
  created_at: string;
  updated_at: string;
};

export type NameVariation = {
  id: string;
  name_id: string;
  variation: string;
  created_at: string;
};

export type NamePersonalityTrait = {
  id: string;
  name_id: string;
  trait: string;
  created_at: string;
};

export type NameFamousPerson = {
  id: string;
  name_id: string;
  person_name: string;
  description?: string | null;
  created_at: string;
};

export type NameFaq = {
  id: string;
  name_id: string;
  question: string;
  answer: string;
  created_at: string;
};

export type NameSeo = {
  id: string;
  name_id: string;
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  type: "country" | "religion" | "language";
  description?: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: string;
  updated_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  priority?: number | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  username?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
};

export type UserRole = {
  id: string;
  user_id: string;
  role: "admin" | "editor" | "user";
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  name_id: string;
  created_at: string;
};

// Full name data with related information
export type NameWithDetails = Name & {
  additionalDetails?: NameAdditionalDetails | null;
  variations?: NameVariation[];
  personalityTraits?: NamePersonalityTrait[];
  famousPeople?: NameFamousPerson[];
  faqs?: NameFaq[];
  seo?: NameSeo | null;
};
