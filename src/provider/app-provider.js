"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React, { useEffect, useState, useRef } from "react";
import LocaleWrapper from "@/components/i18n/LocaleWrapper";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScrolling from "@/components/smooth-scroll";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Script from "next/script";


const SplitHeadingsAnimation = dynamic(
  () => import("@/components/ui/split-headings-animation"),
  { ssr: false }
);

const SplitParagraphsAnimation = dynamic(
  () => import("@/components/ui/split-paragraphs-animation"),
  { ssr: false }
);

function AppProvider({ children, locale }) {
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
      flushOldScripts();
      if (!isWearPopupOpen && !isNewsletterPopupOpen && !isSearchPopupOpen) {
        window.scrollTo(0, 0);
      }
      setTimeout(() => setRouteChanged((prev) => !prev), 10);
      PageViews.trackPageView();
    };

    // router.events("routeChangeComplete", handleRouteChange);
    return () => {
      // router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [
    router.events,
    isWearPopupOpen,
    isNewsletterPopupOpen,
    isSearchPopupOpen,
  ]);


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
    const preventScroll = (e) => {
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
    const handleKeyDown = (e) => {
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
      <Script
        src="https://angelinibeauty.piwik.pro/cookie-consent-banner.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.PiwikProConsentManager) {
            window.PiwikProConsentManager.showBanner();
          }
        }}
      />
      <ThemeProvider attribute="class" defaultTheme="light">
        <LocaleWrapper locale={locale}>
          <SmoothScrolling>
            <SplitHeadingsAnimation />
            <SplitParagraphsAnimation
              key={`ap-${routeChanged}-${cmsLoaded}-${resizeTrigger}`}
            />
            <Navbar />
            {children}
            <Footer />
          </SmoothScrolling>
        </LocaleWrapper>
      </ThemeProvider>
    </>
  );
}

export default AppProvider;
