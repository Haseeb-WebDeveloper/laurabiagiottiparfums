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

  // Get the locale from cookie or header
  const locale = getLocale(request);

  // If the path is /it, redirect to root
  if (pathname.startsWith('/it')) {
    const newPath = pathname.replace(/^\/it/, '') || '/';
    const newUrl = new URL(newPath, request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(newUrl);
  }

  // If it's already a valid non-Italian locale path, pass through
  if (pathnameHasLocale && !pathname.startsWith('/it')) {
    return;
  }

  // If we're at the root or a non-prefixed path
  if (!pathnameHasLocale) {
    // For non-Italian locales, redirect to add prefix
    if (locale !== DEFAULT_LOCALE) {
      const newUrl = new URL(`/${locale}${pathname}`, request.url);
      request.nextUrl.searchParams.forEach((value, key) => {
        newUrl.searchParams.set(key, value);
      });
      return NextResponse.redirect(newUrl);
    }

    // For Italian content at root path, internally rewrite to /it prefix
    const url = request.nextUrl.clone();
    url.pathname = `/it${pathname}`;
    return NextResponse.rewrite(url);
  }

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
