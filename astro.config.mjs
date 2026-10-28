import { defineConfig } from 'astro/config';
import { editorialMedia } from './scripts/editorial-media.mjs';
const privateInput=process.env.EDITORIAL_CONTENT_DIR || process.env.EDITORIAL_MEDIA_DIR || process.env.INCLUDE_DRAFTS==='true';
if(privateInput && process.env.CI) throw new Error('Private editorial preview is local-only; CI/deployment cannot load it.');
export default defineConfig({ site:'https://dilum.io', output:'static', trailingSlash:'always', vite:{plugins:[editorialMedia(process.env.EDITORIAL_MEDIA_DIR)]} });
