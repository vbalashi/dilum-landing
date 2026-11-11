import {type Locale,defaultLocale,localeCodes,localizedPath} from './locales';
export const productIds=['2000nl','audiofilms','pontix'] as const;
export type ProductId=typeof productIds[number];
export type PageId='page.products'|`product.${string}`|`collection.${string}`;
export type PageVariants=Partial<Record<Locale,string>>;
// All registered products have complete translated copy in each active locale.
export const translatedPages:Record<PageId,PageVariants>={
 'page.products':Object.fromEntries(localeCodes.map(locale=>[locale,localizedPath('/products/',locale)])),
 ...Object.fromEntries(productIds.map(product=>[
 `product.${product}`,Object.fromEntries(localeCodes.map(locale=>[locale,localizedPath(`/${product}/`,locale)])),
]))};
export function pageAlternates(id?:PageId){return id?Object.entries(translatedPages[id]??{}) as [Locale,string][]:[];}
export const defaultPagePath=(id:PageId)=>translatedPages[id]?.[defaultLocale];
export const productPath=(product:ProductId,locale:Locale)=>translatedPages[`product.${product}`][locale]!;
export const localizedPagePaths=()=>[...new Set(Object.values(translatedPages).flatMap(variants=>Object.values(variants)))];

export const productsPath=(locale:Locale)=>translatedPages['page.products'][locale]!;
