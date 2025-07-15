import { SanityImage } from "./perfume";

export interface NoteItem {
  title: string;
  slug: string;
  category: string;
}

export interface Note {
  title?: string;
  name?: string;
  image: {
    asset: SanityImage;
  };
  notes?: { name: string }[];
  perfumeNotes?: NoteItem[];
}
