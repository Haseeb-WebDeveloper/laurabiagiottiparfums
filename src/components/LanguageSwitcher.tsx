"use client";

import React from "react";
import { useLocale } from "@/lib/i18n/context";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/constants";
import { setCookie } from "cookies-next";

const LanguageSwitcher: React.FC = () => {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Switch language and navigate to the equivalent path in the new language
  const handleLanguageChange = (newLocale: string) => {

    // Get the current path without any locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(en|it|de)/, "") || "/";

    // Set new locale in the cookie
    setCookie("NEXT_LOCALE", newLocale, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
    });

    // For Italian, use root path, for others use locale prefix
    const newPath = newLocale === DEFAULT_LOCALE 
      ? (pathWithoutLocale === "/" ? "/" : pathWithoutLocale)
      : `/${newLocale}${pathWithoutLocale}`;

    // Navigate to the new path
    router.push(newPath);
  };

  const isActive = (loc: string) => {
    if (loc === DEFAULT_LOCALE) {
      return !pathname.startsWith('/en') && !pathname.startsWith('/de');
    }
    return pathname.startsWith(`/${loc}`);
  };

  return (
    <div className="flex gap-[0.25rem]">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={`navbar-button cursor-pointer p-[0.555rem] aspect-square leading-0 rounded-[0.45rem] text-[.75rem] font-[400] border hover:border-foreground border-transparent text-pretty capitalize transition-colors duration-300 ${
            isActive(loc)
              ? "bg-foreground text-background hover:bg-background hover:text-foreground"
              : "text-foreground"
          }`}
        >
          {loc === "it"
            ? "IT"
            : loc === "en"
              ? "EN"
              : loc === "de"
                ? "DE"
                : loc}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
