import registry from './locales.json';
export const locales=registry;
export type Locale=keyof typeof locales;
export const defaultLocale:Locale='en';
export const localeCodes=Object.keys(locales) as [Locale,...Locale[]];
export const isLocale=(value:string):value is Locale=>Object.hasOwn(locales,value);
export const localizedPath=(path:string,locale:Locale)=>`${locales[locale].prefix}${path}`;
