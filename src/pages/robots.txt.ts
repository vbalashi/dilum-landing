import {preview} from '../lib/content';
export function GET(){return new Response(preview?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: https://dilum.io/sitemap.xml\n',{headers:{'Content-Type':'text/plain'}});}
