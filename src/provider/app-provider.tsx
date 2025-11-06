"use client";

import { EnhancedThemeProvider } from "@/components/enhanced-theme-provider";
import React, { useEffect, useState, useRef } from "react";
import LocaleWrapper from "@/components/i18n/LocaleWrapper";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScrolling from "@/components/smooth-scroll";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PageViews } from "@piwikpro/react-piwik-pro";
import PiwikProProvider from "@/components/PiwikProProvider.tsx";
import { ModeToggle } from "@/components/theme-toggle";
import { NavbarAppearanceProvider } from "@/components/layout/navbar-appearance-context";


interface AppProviderProps {
  children: React.ReactNode;
  locale: string;
}

function AppProvider({ children, locale }: AppProviderProps) {
  const [cmsLoaded, setCmsLoaded] = useState(false);
  const [routeChanged, setRouteChanged] = useState(false);
  const [resizeTrigger, setResizeTrigger] = useState(false);
  const [isWearPopupOpen, setIsWearPopupOpen] = useState(false);
  const [isNewsletterPopupOpen, setIsNewsletterPopupOpen] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // On hard reloads, force scroll to top to avoid landing mid-page with hidden animations
  useEffect(() => {
    try {
      const navEntries = (performance.getEntriesByType("navigation") || []) as PerformanceNavigationTiming[];
      const navType = navEntries[0]?.type as string | undefined;
      // Fallback for older browsers
      const legacyNavType = (performance as any).navigation?.type;
      const isReload = navType === "reload" || legacyNavType === 1;
      if (isReload) {
        // Defer to next frame to ensure layout is ready, then scroll to top
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (!isWearPopupOpen && !isNewsletterPopupOpen && !isSearchPopupOpen) {
        window.scrollTo(0, 0);
      }
      setTimeout(() => setRouteChanged((prev) => !prev), 10);
      PageViews.trackPageView();
    };

    return () => {};
  }, [isWearPopupOpen, isNewsletterPopupOpen, isSearchPopupOpen]);

  const prevWidthRef = useRef(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== prevWidthRef.current) {
        prevWidthRef.current = newWidth;
        setResizeTrigger((prev) => !prev);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      if (isWearPopupOpen || isSearchPopupOpen) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isWearPopupOpen, isSearchPopupOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "7") {
        e.preventDefault();
        setIsSearchPopupOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <PiwikProProvider>
        <EnhancedThemeProvider attribute="class" defaultTheme="light">
          <LocaleWrapper locale={locale}>
            <SmoothScrolling>
              {/* <SplitHeadingsAnimation /> */}
              {/* <SplitParagraphsAnimation /> */}
              <NavbarAppearanceProvider>
                {/* <Navbar /> */}
                {/* <div className="fixed bottom-4 right-4 z-[100]">
                <ModeToggle />
              </div> */}
                {children}
              </NavbarAppearanceProvider>
              <Footer />
            </SmoothScrolling>
          </LocaleWrapper>
        </EnhancedThemeProvider>
      </PiwikProProvider>
    </>
  );
}

export default AppProvider;
