import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const review=JSON.parse(readFileSync('src/i18n/translation-review.json','utf8'));
for(const [id,entry] of Object.entries(review)){
  const source=readFileSync(join('src/i18n',entry.sourceFile));
  const original=JSON.parse(source);
  for(const [locale,translation] of Object.entries(entry.translations)){
    const copy=JSON.parse(readFileSync(join('src/i18n',translation.file),'utf8'));
    assert.deepEqual(Object.keys(copy).sort(),Object.keys(original).sort(),`${id}/${locale}: translation keys match source`);
    assert.ok(Object.values(copy).every(value=>typeof value==='string'&&value.trim()),`${id}/${locale}: translated text is nonempty`);
    assert.equal(translation.status,'reviewed',`${id}/${locale}: review before registering a route`);
    assert.equal(translation.sourceHash,createHash('sha256').update(source).digest('hex'),`${id}/${locale}: English source changed; review translation and update its sourceHash`);
  }
}
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
const ru=readFileSync('dist/ru/2000nl/index.html','utf8');
assert.ok(ru.includes('data-locale="ru"')&&ru.includes('data-preview="true"')=== (process.env.SITE_PREVIEW==='true'), 'Russian form locale and preview isolation');
assert.ok(ru.includes('hreflang="en"')&&ru.includes('hreflang="ru"'),'Russian landing has real language links');
console.log('PASS: translation completeness/freshness, canonical, reciprocal hreflang, language routes and sitemap');
