import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const preview=process.env.SITE_PREVIEW==='true';
const files=[];function walk(dir){for(const f of readdirSync(dir,{withFileTypes:true})){const p=join(dir,f.name);f.isDirectory()?walk(p):files.push(p);}}walk('dist');
const html=files.filter(f=>f.endsWith('.html'));
for(const file of html){const text=readFileSync(file,'utf8');assert.match(text,/<html[^>]+lang=/,file);assert.match(text,/<title>/,file);
 assert.ok(!/<select\b/i.test(text),`${file}: no theme dropdown`);
 for(const choice of ['system','light','dark']) assert.equal((text.match(new RegExp(`data-theme-choice="${choice}"`,'g'))||[]).length,1,`${file}: one ${choice} button`);
 assert.ok(text.includes('id="contact"'),`${file}: common contact footer`);
 assert.ok(!text.includes('fonts.googleapis.com'),`${file}: fonts are hosted locally`);
 if(preview) assert.match(text,/name="robots" content="noindex,nofollow"/,file);
 for(const m of text.matchAll(/href="(\/[^"]*)"/g)){const path=m[1].split(/[?#]/)[0];const target=join('dist',path);assert.ok(existsSync(target)||existsSync(join(target,'index.html')),`${file}: broken ${path}`);}
 for(const m of text.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
}
const draft='dist/journal/summer-of-flashcards/index.html';assert.equal(existsSync(draft),preview,'draft route follows build mode');
for(const f of ['dist/rss.xml','dist/sitemap.xml'])assert.ok(!readFileSync(f,'utf8').includes('summer-of-flashcards'),'draft must not be syndicated/indexed');
assert.ok(!files.some(f=>f.endsWith('.md')||f.endsWith('.yml')||f.includes('source.txt')),'source/private documents must not be deployed');
assert.equal(readFileSync('dist/robots.txt','utf8').includes('Disallow: /'),preview);
console.log(`PASS: ${html.length} pages, internal links, structured JSON, draft isolation, public asset boundary (${preview?'preview':'production'})`);
