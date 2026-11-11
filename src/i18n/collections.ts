import type { Locale } from './locales';
// Public catalogue metadata only: vocabulary membership stays in the owning app.
export interface LearningCollection {
  id: string;
  product: '2000nl' | 'audiofilms' | 'pontix';
  appCollectionId: string;
  learningLanguage: string; // BCP47; independent of description/interface locale.
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  kind: 'topic' | 'exam' | 'film' | 'series';
  tags: string[];
  appUrl: string;
  source?: { title: string; url?: string };
}
export interface CollectionTranslation {
  collectionId: LearningCollection['id'];
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  body: string;
  sourceRevision: string;
  status: 'draft' | 'review' | 'published';
}
// No empty catalogue pages or made-up collections are published by this schema.
