import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from '@/lib/i18n/constants';

/**
 * Determines the best locale based on user preferences
 */
function getLocale(request: NextRequest) {
  // Check if there is a preferred locale in cookies
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check for Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => LOCALES.some(locale => lang.startsWith(locale)));
    
    if (preferredLocale) {
      const foundLocale = LOCALES.find(locale => preferredLocale.startsWith(locale));
      if (foundLocale) {
        return foundLocale;
      }
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Internationalization middleware
 * Ensures all routes have a locale prefix and redirects to appropriate locale when missing
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Redirect if no locale is specified
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Copy all search params
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value);
  });
  
  return NextResponse.redirect(newUrl);
}

/**
 * Middleware matcher configuration
 * Applies the middleware only to specified routes
 */
export const config = {
  matcher: [
    // Match all paths that do not start with these exclusions
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico|.*\\.txt|.*\\.xml|.*\\.json|.*\\.mp4|.*\\.gif).*)',
  ],
};
