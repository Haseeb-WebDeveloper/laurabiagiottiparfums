"use client";

import React from "react";
import { useLocale } from "@/lib/i18n/context";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/lib/i18n/constants";
import { setCookie } from "cookies-next";

const LanguageSwitcher: React.FC = () => {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();


  // Switch language and navigate to the equivalent path in the new language
  const handleLanguageChange = (newLocale: string) => {
    // Extract the path without the language prefix
      const pathWithoutLocale = pathname.replace(/^\/(en|it|de)/, "") || "/";

    // Set new locale in the locale storage
    setCookie("NEXT_LOCALE", newLocale, {
      maxAge: 60 * 60 * 24 * 30,
      domain: "laurabiagiottiparfums.com",
      path: "/",
      sameSite: "lax",
      secure: true,
    });

    // Navigate to the same path but with new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-[0.35rem]">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageChange(loc)}
          className={`cursor-pointer p-[0.555rem] aspect-square leading-0 rounded-[0.45rem] text-[.75rem] font-[400] border hover:border-foreground border-transparent text-pretty capitalize transition-colors duration-300 ${
            locale === loc
              ? "bg-foreground text-background hover:bg-background hover:text-foreground"
              : "text-foreground"
          }`}
        >
          {loc === "en"
            ? "EN"
            : loc === "it"
              ? "IT"
              : loc === "de"
                ? "DE"
                : loc}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
