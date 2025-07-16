import AppProvider from "@/provider/app-provider";
import "./globals.css";
import { LOCALES } from "@/lib/i18n/constants";
import { Metadata } from "next";
// import { GoogleTagManager } from "@next/third-parties/google";

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export const metadata: Metadata = {
  title: "Laurabiagiotti",
  description: "Laurabiagiotti",
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      {/* <GoogleTagManager gtmId="GTM-KG68PP37" /> */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body>
        <AppProvider locale={locale}>{children}</AppProvider>
      </body>
    </html>
  );
}

//  Generate static params for supported locales
export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
