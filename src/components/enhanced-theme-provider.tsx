"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useThemeStore } from "@/store/theme-store";
import { useEffect } from "react";
import { useThemeRestoration } from "@/hooks/use-theme-restoration";

// Inner component that uses the theme hooks
function ThemeController({ children }: { children: React.ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme();
  const { 
    isForcedTheme, 
    forcedTheme, 
    originalTheme, 
    setOriginalTheme,
    restoreOriginalTheme 
  } = useThemeStore();
  
  // Use the theme restoration hook
  useThemeRestoration();

  useEffect(() => {
    // Set original theme if not already set
    if (resolvedTheme && !originalTheme) {
      setOriginalTheme(resolvedTheme);
    }
  }, [resolvedTheme, originalTheme, setOriginalTheme]);

  useEffect(() => {
    // If we're not forcing a theme, ensure we're using the original theme
    if (!isForcedTheme && resolvedTheme !== originalTheme && originalTheme) {
      setTheme(originalTheme);
    }
    // If we are forcing a theme, apply it
    else if (isForcedTheme && forcedTheme && resolvedTheme !== forcedTheme) {
      setTheme(forcedTheme);
    }
  }, [isForcedTheme, forcedTheme, originalTheme, resolvedTheme, setTheme]);

  // Listen for route changes to restore theme when leaving forced theme pages
  useEffect(() => {
    const handleRouteChange = () => {
      // Small delay to ensure the component unmount cleanup has run
      setTimeout(() => {
        const state = useThemeStore.getState();
        if (!state.isForcedTheme && state.originalTheme) {
          setTheme(state.originalTheme);
        }
      }, 100);
    };

    // Listen for navigation events
    window.addEventListener('beforeunload', handleRouteChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, [setTheme]);

  return <>{children}</>;
}

export function EnhancedThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeController>{children}</ThemeController>
    </NextThemesProvider>
  );
}
