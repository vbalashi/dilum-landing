import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
import './check-translations.mjs';
const pages=[];
function walk(dir){for(const f of readdirSync(dir,{withFileTypes:true})){const path=join(dir,f.name);if(f.isDirectory())walk(path);else if(path.endsWith('.html'))pages.push(path);}}
walk('dist');
function alternates(html){return [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>[m[1],m[2]]);}
const sitemap=readFileSync('dist/sitemap.xml','utf8');
for(const path of pages){
 const html=readFileSync(path,'utf8');const variants=alternates(html);if(!variants.length)continue;
 const language=html.match(/<html[^>]*lang="([^"]+)"/)[1];
 const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)[1];
 assert.ok(variants.some(([lang,url])=>lang===language&&url===canonical),`${path}: self hreflang matches canonical and html lang`);
 assert.equal(new Set(variants.map(([lang])=>lang)).size,variants.length,`${path}: no duplicate language alternates`);
 assert.ok(variants.some(([lang])=>lang==='x-default'),`${path}: default language route`);
 for(const [lang,url] of variants){
   const target=join('dist',new URL(url).pathname,'index.html');assert.ok(existsSync(target),`${path}: real alternate route ${url}`);
   const peer=readFileSync(target,'utf8');
   assert.deepEqual(alternates(peer),variants,`${path}: reciprocal complete alternate set on ${url}`);
   if(lang!=='x-default')assert.ok(peer.includes(`<html lang="${lang}"`),`${url}: html language matches alternate`);
   if(process.env.SITE_PREVIEW!=='true')assert.ok(sitemap.includes(`<loc>${url}</loc>`),`${url}: included in sitemap`);
 }
}
const localeRegistry=JSON.parse(readFileSync('src/i18n/locales.json','utf8'));
for(const [locale,config]of Object.entries(localeRegistry)){
 const catalogPath=`dist${config.prefix}/products/index.html`;
 const catalog=readFileSync(catalogPath,'utf8');
 assert.ok(catalog.includes(`<html lang="${locale}"`),`${catalogPath}: catalog language`);
 assert.ok(catalog.includes('data-language-switch'),`${catalogPath}: catalog language selector`);
 for(const product of ['2000nl','audiofilms','pontix']){
  const path=`dist${config.prefix}/${product}/index.html`;
  const html=readFileSync(path,'utf8');
  assert.ok(html.includes(`<html lang="${locale}"`),`${path}: page language`);
  assert.ok(html.includes('data-language-switch'),`${path}: language selector`);
  const self=new URL(`https://dilum.io${config.prefix}/${product}/`).href;
  assert.ok(html.includes(`rel="canonical" href="${self}"`),`${path}: canonical`);
  if(product==='2000nl'){
   assert.ok(html.includes(`data-locale="${locale}"`),`${path}: form locale`);
   assert.equal(html.includes('data-preview="true"'),process.env.SITE_PREVIEW==='true',`${path}: form preview isolation`);
  }
  const catalogUrl=`${config.prefix}/products/`;
  assert.ok(html.includes(`href="${catalogUrl}"`),`${path}: localized catalog breadcrumb/menu`);
  assert.ok(catalog.includes(`href="${config.prefix}/${product}/"`),`${catalogPath}: localized ${product} link`);
  if(locale!=='en'){
   assert.ok(!html.includes('href="/products/"'),`${path}: no English catalog links`);
   assert.ok(!catalog.includes(`href="/${product}/"`),`${catalogPath}: no English product links`);
  }
  // Product-to-product links keep the visitor's selected locale.
  for(const peer of ['2000nl','audiofilms','pontix'].filter(p=>p!==product)){
   if(html.includes(`href="/${peer}/"`))assert.equal(locale,'en',`${path}: untranslated cross-product link`);
  }
 }
}
console.log('PASS: all product locales, self-canonical, reciprocal hreflang, menus, cross-product links, forms and sitemap');
