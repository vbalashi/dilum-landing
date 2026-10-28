import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: process.env.EDITORIAL_CONTENT_DIR || './src/content/articles' }),
  schema: z.object({
    title: z.string(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string(), date: z.coerce.date(), updated: z.coerce.date().optional(),
    author: z.enum(['nikolai-khrustalev','olesia-khrustaleva']),
    category: z.enum(['our-products','professional-practice','studio-notes','learning']),
    lang: z.enum(['en','ru']).default('en'), draft: z.boolean().default(true),
    products: z.array(z.enum(['2000nl','audiofilms','pontix'])).default([]),
    crossposts: z.array(z.object({ platform: z.string(), url: z.string().url() })).default([]),
  }),
});
export const collections = { articles };
