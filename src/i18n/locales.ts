// Add a locale here, then provide reviewed UI/content dictionaries for it.
export const locales = {
  en: { label: 'English', short: 'EN', prefix: '' },
  ru: { label: 'Русский', short: 'RU', prefix: '/ru' },
} as const;
export type Locale = keyof typeof locales;
export const defaultLocale: Locale = 'en';
export const localeCodes = Object.keys(locales) as [Locale, ...Locale[]];
export const isLocale = (value: string): value is Locale => Object.hasOwn(locales, value);
export function localizedPath(path: string, locale: Locale): string {
  return `${locales[locale].prefix}${path}`;
}
