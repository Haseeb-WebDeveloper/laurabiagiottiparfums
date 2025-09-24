"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  // The original theme before any forced theme changes
  originalTheme: string;
  // Whether we're currently forcing a specific theme
  isForcedTheme: boolean;
  // The forced theme value
  forcedTheme: string | null;
  // The page that is forcing the theme
  forcedThemePage: string | null;
  
  // Actions
  setOriginalTheme: (theme: string) => void;
  forceTheme: (theme: string, page: string) => void;
  restoreOriginalTheme: () => void;
  clearForcedTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      originalTheme: 'light',
      isForcedTheme: false,
      forcedTheme: null,
      forcedThemePage: null,

      setOriginalTheme: (theme: string) => {
        set({ originalTheme: theme });
      },

      forceTheme: (theme: string, page: string) => {
        const state = get();
        // Only set original theme if we're not already forcing a theme
        if (!state.isForcedTheme) {
          set({
            isForcedTheme: true,
            forcedTheme: theme,
            forcedThemePage: page,
          });
        } else {
          // If already forcing, just update the forced theme and page
          set({
            forcedTheme: theme,
            forcedThemePage: page,
          });
        }
      },

      restoreOriginalTheme: () => {
        set({
          isForcedTheme: false,
          forcedTheme: null,
          forcedThemePage: null,
        });
      },

      clearForcedTheme: () => {
        set({
          isForcedTheme: false,
          forcedTheme: null,
          forcedThemePage: null,
        });
      },
    }),
    {
      name: 'theme-storage', // unique name for localStorage
      // Only persist the original theme, not the forced theme state
      partialize: (state) => ({ originalTheme: state.originalTheme }),
    }
  )
);
