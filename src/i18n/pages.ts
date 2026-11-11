import { type Locale, defaultLocale } from './locales';

export type PageId = `product.${string}` | `collection.${string}`;
export type PageVariants = Partial<Record<Locale, string>>;
// Only register existing, reviewed routes. Missing translations have no fake URL.
export const translatedPages: Record<PageId, PageVariants> = {
  'product.2000nl': { en: '/2000nl/', ru: '/ru/2000nl/' },
};
export function pageAlternates(id?: PageId) {
  return id ? Object.entries(translatedPages[id] ?? {}) as [Locale, string][] : [];
}
export function defaultPagePath(id: PageId) {
  return translatedPages[id]?.[defaultLocale];
}
export const localizedPagePaths = () => [...new Set(Object.values(translatedPages).flatMap(variants => Object.values(variants)))];
