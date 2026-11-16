import { defineCollection, z } from 'astro:content';
import {localeCodes} from './i18n/locales';
import { glob } from 'astro/loaders';
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: process.env.EDITORIAL_CONTENT_DIR || './src/content/articles' }),
  schema: z.object({
    title: z.string(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string(), date: z.coerce.date(), updated: z.coerce.date().optional(),
    author: z.enum(['nikolai-khrustalev','olesia-khrustaleva']).optional(),
    category: z.enum(['our-products','professional-practice','studio-notes','learning']),
    lang: z.enum(localeCodes).default('en'), translationGroup: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), draft: z.boolean().default(true),
    products: z.array(z.enum(['2000nl','audiofilms','pontix'])).default([]),
    crossposts: z.array(z.object({ platform: z.string(), url: z.string().url() })).default([]),
  }).superRefine((article, context) => {
    if (!article.author && !(article.draft && process.env.EDITORIAL_CONTENT_DIR)) {
      context.addIssue({code:'custom', message:'A published article requires an author.'});
    }
    if (article.draft && !process.env.EDITORIAL_CONTENT_DIR) {
      context.addIssue({code: 'custom', message: 'Unpublished articles belong in the private editorial repository, not the public website source.'});
    }
  }),
});
export const collections = { articles };
