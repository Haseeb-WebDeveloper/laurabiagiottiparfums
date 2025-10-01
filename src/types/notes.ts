import { SanityImage } from "./perfume";

export interface NoteItem {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  description?: string;
  featuredImage?: {
    asset: SanityImage;
  };
  // momentOfDay?: string;
  sharpness?: number;
}

export interface Note {
  _id?: string;
  title?: string;
  name?: string;
  image: {
    asset: SanityImage;
  };
  notes?: { name: string }[];
  perfumeNotes?: NoteItem[];
}
