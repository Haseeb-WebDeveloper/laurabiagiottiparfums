/**
 * Supported locales in the application
 */

export const LOCALES = ['it', 'en', 'de'] as const;

/**
 * Type for supported locales
 */
export type Locale = typeof LOCALES[number];

/**
 * Default locale used when user preference can't be determined
 */
export const DEFAULT_LOCALE: Locale = 'it';

/**
 * Locale names for display purposes
 */

export const LOCALE_NAMES: Record<Locale, string> = {
  it: 'Italian',
  en: 'English',
  de: 'German',
};

/**
 * Utility to check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
} 
