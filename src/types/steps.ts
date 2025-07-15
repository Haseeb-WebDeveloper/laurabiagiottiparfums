import { Note } from "./notes";

// Step interfaces
export interface Step1Selection {
  gender: "mens" | "womens" | null;
}

export interface Step2Selection {
  selectedNote: Note | null;
}

export interface Step3Selection {
  timeOfDay: "sunrise" | "daytime" | "sunset" | "night" | null;
}

export interface Step4Selection {
  intensity: number;
}
