import {mkdtempSync,writeFileSync,readFileSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const dir=mkdtempSync(join(tmpdir(),'dilum-translations-'));
const make=(slug,lang,group,draft=false)=>`---\ntitle: ${slug}\nslug: ${slug}\ndescription: Test ${slug}\ndate: 2026-11-16\nauthor: nikolai-khrustalev\ncategory: learning\nlang: ${lang}\ntranslationGroup: ${group}\ndraft: ${draft}\n---\n\nTest body.\n`;
const build=(include)=>execFileSync('npm',['run','build'],{stdio:'pipe',env:{...process.env,EDITORIAL_CONTENT_DIR:dir,INCLUDE_DRAFTS:include?'true':'false',SITE_PREVIEW:include?'true':'false',CI:''}});
const html=(slug)=>readFileSync(join('dist','blog',slug,'index.html'),'utf8');
try {
 for(const [slug,lang,group,draft] of [['pair-en','en','pair',false],['pair-ru','ru','pair',false],['partial-en','en','partial',false],['partial-ru','ru','partial',true]])writeFileSync(join(dir,slug+'.md'),make(slug,lang,group,draft));
 build(false);
 for(const slug of ['pair-en','pair-ru']){
  const page=html(slug);
  assert.match(page,/hreflang="en" href="https:\/\/dilum\.io\/blog\/pair-en\/"/);
  assert.match(page,/hreflang="ru" href="https:\/\/dilum\.io\/blog\/pair-ru\/"/);
  assert.match(page,/data-language-switch/);
 }
 assert.ok(!existsSync(join('dist','blog','partial-ru','index.html')));
 assert.ok(!html('partial-en').includes('partial-ru'));
 const archive=readFileSync('dist/blog/index.html','utf8');
 assert.ok(archive.includes('/blog/pair-en/'));
 assert.ok(!archive.includes('/blog/pair-ru/'));
 writeFileSync(join(dir,'anonymous-draft.md'),make('anonymous-draft','en','anonymous',true).replace('author: nikolai-khrustalev\n',''));
 build(true);
 assert.match(html('anonymous-draft'),/Author not assigned/);
 assert.match(html('partial-en'),/hreflang="ru" href="https:\/\/dilum\.io\/blog\/partial-ru\/"/);
 assert.match(html('partial-ru'),/hreflang="en" href="https:\/\/dilum\.io\/blog\/partial-en\/"/);
 assert.match(html('partial-ru'),/name="robots" content="noindex,nofollow"/);
 writeFileSync(join(dir,'duplicate.md'),make('duplicate','en','pair'));
 assert.throws(()=>build(true));
 console.log('PASS: reciprocal language links, one archive entry, draft isolation, private preview and duplicate locale validation');
} finally {rmSync(dir,{recursive:true,force:true});}
