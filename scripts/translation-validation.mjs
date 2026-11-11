import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
export const fingerprint=text=>createHash('sha256').update(text).digest('hex');
export function validateTranslation(sourceText,targetText,review,label){
 const source=JSON.parse(sourceText),target=JSON.parse(targetText);
 const missing=Object.keys(source).filter(key=>!Object.hasOwn(target,key));
 const extra=Object.keys(target).filter(key=>!Object.hasOwn(source,key));
 assert.ok(!missing.length&&!extra.length,`${label}: missing keys [${missing}], extra keys [${extra}]`);
 for(const [key,value]of Object.entries(source)){
  assert.equal(typeof value,'string',`${label}/${key}: source must be text`);
  assert.ok(typeof target[key]==='string'&&target[key].trim(),`${label}/${key}: blank or invalid translation`);
  const placeholders=text=>[...text.matchAll(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/g)].map(m=>m[1]).sort();
  assert.deepEqual(placeholders(target[key]),placeholders(value),`${label}/${key}: placeholders differ`);
  for(const name of ['2000nl','2000 NL','AudioFilms','Pontix','Dilum Nederlands','YouTube','Chrome','Cloudflare']){
   if(value.includes(name))assert.ok(target[key].toLowerCase().includes(name.toLowerCase()),`${label}/${key}: preserve product/service name ${name}`);
  }
  if(value.length>60)assert.notEqual(target[key].trim(),value.trim(),`${label}/${key}: untranslated English text`);
 }
 assert.equal(review.status,'reviewed',`${label}: translation needs review`);
 assert.equal(review.sourceHash,fingerprint(sourceText),`${label}: English source changed; review translation`);
 assert.equal(review.translationHash,fingerprint(targetText),`${label}: translation changed since review`);
}
export function checkTranslationRegistry(root='src/i18n'){
 const locales=JSON.parse(readFileSync(join(root,'locales.json'),'utf8'));
 const registry=JSON.parse(readFileSync(join(root,'translation-review.json'),'utf8'));
 const required=['page.products','product.2000nl','product.audiofilms','product.pontix','ui.shell','ui.waitlist'];
 for(const id of required)assert.ok(registry[id],`Missing translation review group: ${id}`);
 let count=0;
 for(const [id,entry]of Object.entries(registry)){
  assert.equal(entry.sourceLocale,'en',`${id}: expected English source`);
  const source=readFileSync(join(root,entry.sourceFile),'utf8');
  const sourceKeys=Object.keys(JSON.parse(source));assert.ok(sourceKeys.length,`${id}: empty source catalog`);
  const targets=Object.keys(locales).filter(locale=>locale!=='en');
  assert.deepEqual(Object.keys(entry.translations).sort(),targets.sort(),`${id}: review every active target locale`);
  for(const [locale,review]of Object.entries(entry.translations)){
   assert.ok(existsSync(join(root,review.file)),`${id}/${locale}: missing translation file`);
   validateTranslation(source,readFileSync(join(root,review.file),'utf8'),review,`${id}/${locale}`);count++;
  }
 }
 return count;
}
