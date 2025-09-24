"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useThemeStore } from '@/store/theme-store';

export function useThemeRestoration() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { 
    isForcedTheme, 
    originalTheme, 
    forcedThemePage,
    restoreOriginalTheme 
  } = useThemeStore();

  useEffect(() => {
    // Check if we're navigating away from a forced theme page
    const isMainPerfumePage = pathname.includes('/main-perfume') || 
                              pathname.includes('/mens-perfume') || 
                              pathname.includes('/womens-perfume');
    
    // If we're not on a main perfume page and theme is forced, restore original
    if (!isMainPerfumePage && isForcedTheme && originalTheme) {
      restoreOriginalTheme();
      setTheme(originalTheme);
    }
    
    // If we are on a main perfume page but no forced theme is active, 
    // it means we need to force dark theme
    if (isMainPerfumePage && !isForcedTheme) {
      // This will be handled by the individual page components
    }
  }, [pathname, isForcedTheme, originalTheme, forcedThemePage, restoreOriginalTheme, setTheme]);
}
