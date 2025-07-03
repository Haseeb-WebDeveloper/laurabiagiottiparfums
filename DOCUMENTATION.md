# Next.js and Sanity Multilingual Website Documentation

This documentation explains how the internationalization (i18n) system works in this Next.js and Sanity project. We'll go through each part of the system to understand what each file does.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Internationalization (i18n) Setup](#internationalization-i18n-setup)
4. [Sanity CMS Integration](#sanity-cms-integration)
5. [Components and Pages](#components-and-pages)
6. [How It All Works Together](#how-it-all-works-together)
7. [Adding New Languages](#adding-new-languages)
8. [Adding New Pages](#adding-new-pages)

## Project Overview

This project is a multilingual website built with:

- **Next.js 15**: For the frontend and routing
- **Sanity**: As the content management system (CMS)
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling

The site allows users to switch between English and Italian, with content stored in Sanity in both languages.

## Folder Structure

The main folders in the project are:

- `src/app/[locale]`: Pages for each language
- `src/components`: Reusable UI components
- `src/lib`: Utility functions and helpers
- `src/lib/i18n`: Internationalization utilities
- `src/lib/sanity`: Sanity CMS utilities
- `studio-figmenta`: Sanity Studio configuration

## Internationalization (i18n) Setup

### How Language Selection Works

1. When a user visits the site, the middleware detects their preferred language
2. The user is redirected to the appropriate language route (e.g., `/en/about` or `/it/about`)
3. All content is then displayed in that language
4. Users can switch languages using the language switcher component

### Key Files for Internationalization

#### 1. `src/middleware.ts`

This file handles language detection and routing. When someone visits the site:

- It checks if the URL already has a language prefix (like `/en/` or `/it/` or `/es/`)
- If not, it tries to detect the preferred language from:
  - Browser cookies
  - Browser language settings
- It then redirects to the appropriate URL with the language prefix

```typescript
// Simplified example of middleware logic
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if URL already has a language prefix
  const pathnameHasLocale = LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`)
  );
  
  if (pathnameHasLocale) return;
  
  // If no prefix, redirect to the appropriate language
  const locale = getLocale(request);  // Detects preferred language
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  return NextResponse.redirect(newUrl);
}
```

#### 2. `src/lib/i18n/constants.ts`

Defines the supported languages and default language:

```typescript
export const LOCALES = ['en', 'it'] as const;
export const DEFAULT_LOCALE: Locale = 'en';
```

#### 3. `src/lib/i18n/translations.ts`

Contains all the text translations for UI elements in each language:

```typescript
export const translations = {
  en: {
    'title': 'Localization with Next.js and Sanity',
    'language': 'Language',
    // other translations...
  },
  it: {
    'title': 'Localizzazione con Next.js e Sanity',
    'language': 'Lingua',
    // other translations...
  }
};
```

#### 4. `src/lib/i18n/context.tsx`

Creates a React context for language-related functionality:

- Stores the current language
- Provides a translation function (`t`)
- Allows switching between languages

Using the context in a component:

```tsx
const { locale, t } = useLocale();
// Now you can use t('key') to get translations
```

#### 5. `src/components/i18n/LanguageSwitcher.tsx`

A button component that lets users switch between languages:

```tsx
// When clicked, this changes the URL to switch languages
// For example, from /en/about to /it/about
<button onClick={() => handleLanguageChange('it')}>
  {t('italian')}
</button>
```

## Sanity CMS Integration

Sanity stores content in multiple languages.

### Key Files for Sanity Integration

#### 1. `studio-figmenta/schemaTypes/*.ts`

Defines the content structure for Sanity. For example, the About page schema:

```typescript
// Simplified About page schema
export default defineType({
  name: "aboutPage",
  fields: [
    {
      name: 'title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'it', type: 'string', title: 'Italian' },
      ]
    },
    // other fields...
  ]
});
```

#### 2. `src/lib/sanity/queries.ts`

Contains GROQ queries to fetch content from Sanity:

```typescript
// Query to get About page content in the current language
export const getAboutPageQuery = (locale: string = 'en') => `
  *[_type == "aboutPage"] {
    "title": title.${locale},
    "description": description.${locale},
    "mission": mission.${locale},
    image
  }[0]
`;
```

#### 3. `src/lib/sanity/client.ts`

Sets up the Sanity client for data fetching:

```typescript
export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION,
    useCdn: true,
});
```

#### 4. `src/lib/i18n/getSanityContent.ts`

Functions that fetch content from Sanity based on the current language:

```typescript
export async function getAboutPageContent(locale: string) {
  const data = await fetchSanityData(
    getAboutPageQuery(locale),
    {},
    { revalidate: 60 }
  );
  
  // Process image URLs if needed
  if (data.image) {
    data.imageUrl = urlFor(data.image).width(1200).url();
  }
  
  return data;
}
```

## Components and Pages

### Key Components

#### 1. `src/components/layouts/PageLayout.tsx`

A layout wrapper with common elements for all pages:
- Navigation bar
- Language switcher
- Footer

#### 2. `src/components/navigation/MainNav.tsx`

The main navigation bar with links to different pages.

#### 3. `src/components/about/AboutSection.tsx`

Displays the About page content from Sanity:

```tsx
// Shows content based on the current language
return (
  <section>
    <h2>{content.title}</h2>
    <p>{content.description}</p>
    {/* More content... */}
  </section>
);
```

### Pages

#### 1. `src/app/[locale]/page.tsx` (Home Page)

The main landing page. The `[locale]` in the folder name is a dynamic route parameter that captures the language.

#### 2. `src/app/[locale]/about/page.tsx`

The About page that fetches and displays content from Sanity:

```tsx
export default async function AboutPage({ params: { locale } }) {
  // Fetch content for the current language
  const aboutContent = await getAboutPageContent(locale);

  return (
    <PageLayout>
      <AboutSection content={aboutContent} />
    </PageLayout>
  );
}
```

#### 3. `src/app/[locale]/layout.tsx`

The root layout that:
- Sets up the language context
- Applies fonts and themes
- Wraps all pages

## How It All Works Together

Here's the flow of how everything works:

1. A user visits your site (e.g., `yourdomain.com`)
2. The middleware detects their preferred language and redirects (e.g., to `yourdomain.com/en/`)
3. The `[locale]` page loads with the language parameter
4. The language context is set up with the detected language
5. All components now have access to:
   - Current language via `locale`
   - Translation function via `t`
6. Content is fetched from Sanity based on the language
7. The page displays content in the correct language
8. If the user switches languages, the URL changes and the process repeats

## Adding New Languages

To add a new language (e.g., French):

1. Update the constants file:
   ```typescript
   // src/lib/i18n/constants.ts
   export const LOCALES = ['en', 'it', 'fr'] as const;
   ```

2. Add translations:
   ```typescript
   // src/lib/i18n/translations.ts
   export const translations = {
     en: { /* existing translations */ },
     it: { /* existing translations */ },
     fr: {
       'title': 'Localisation avec Next.js et Sanity',
       'language': 'Langue',
       // Add all other translations...
     }
   };
   ```

3. Update Sanity schemas to include the new language field:
   ```typescript
   // studio-figmenta/schemaTypes/about-page.ts
   fields: [
     { name: 'en', type: 'string', title: 'English' },
     { name: 'it', type: 'string', title: 'Italian' },
     { name: 'fr', type: 'string', title: 'French' }
   ]
   ```

4. Add a button to the language switcher:
   ```tsx
   // src/components/i18n/LanguageSwitcher.tsx
   <button onClick={() => handleLanguageChange('fr')}>
     {t('french')}
   </button>
   ```

   5. Add the new language to the SEO configuration
   ```typescript
   // src/app/[locale]/page.tsx
   alternates: {
     languages: {
       'en': `${baseUrl}/en/`,
       'it': `${baseUrl}/it/`,
       'fr': `${baseUrl}/fr/`,
     }
   }
   ```
  6. Update the queries


## Adding New Pages

To add a new page (e.g., Services):

1. Create the page in the app directory:
   ```
   src/app/[locale]/services/page.tsx
   ```

2. Add the page content:
   ```tsx
   import { LOCALES } from "@/lib/i18n/constants";
   import PageLayout from "@/components/layouts/PageLayout";
   
   export default async function ServicesPage({ params: { locale } }) {
     // Fetch content for this page
     return (
       <PageLayout>
         {/* Page content */}
       </PageLayout>
     );
   }
   
   export async function generateStaticParams() {
     return LOCALES.map(locale => ({ locale }));
   }
   ```

3. Add the page to the navigation:
   ```tsx
   // src/components/navigation/MainNav.tsx
   const navItems = [
     // Existing items...
     { key: 'services', href: `/${locale}/services`, label: t('services') },
   ];
   ```

4. Add translations for the page:
   ```typescript
   // src/lib/i18n/translations.ts
   en: {
     // Existing translations...
     'services': 'Services',
   },
   it: {
     // Existing translations...
     'services': 'Servizi',
   }
   ```

5. Create a Sanity schema for the page if needed.

By following this pattern, you can easily add more pages and languages to your site! 