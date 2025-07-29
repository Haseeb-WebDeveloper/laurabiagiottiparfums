"use client";

import { ThemeProvider } from "@/components/theme-provider";
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

const SplitHeadingsAnimation = dynamic(
  () => import("@/components/ui/split-headings-animation"),
  { ssr: false }
);

const SplitParagraphsAnimation = dynamic(
  () => import("@/components/ui/split-paragraphs-animation"),
  { ssr: false }
);

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
        <ThemeProvider attribute="class" defaultTheme="system">
          <LocaleWrapper locale={locale}>
            <SmoothScrolling>
              <SplitHeadingsAnimation />
              <SplitParagraphsAnimation />
              <Navbar />
              <div className="fixed bottom-4 right-4 z-[100]">
              </div>
              {children}
              <Footer />
            </SmoothScrolling>
          </LocaleWrapper>
        </ThemeProvider>
      </PiwikProProvider>
    </>
  );
}

export default AppProvider;
