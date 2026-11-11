import test from 'node:test';
import assert from 'node:assert/strict';
import {validateTranslation,fingerprint} from '../scripts/translation-validation.mjs';
const source=JSON.stringify({menu:'Products',notice:'Theme: {current}. Switch to {next}'});
const target=JSON.stringify({menu:'Продукты',notice:'Тема: {current}. Переключить: {next}'});
const review={status:'reviewed',sourceHash:fingerprint(source),translationHash:fingerprint(target)};
test('accepts matching reviewed source and translation',()=>assert.doesNotThrow(()=>validateTranslation(source,target,review,'ui.shell/ru')));
test('rejects changed English menu or form source',()=>assert.throws(()=>validateTranslation(source.replace('Products','Our products'),target,review,'ui.shell/ru'),/English source changed/));
test('rejects edited translation until explicitly reviewed',()=>assert.throws(()=>validateTranslation(source,target.replace('Продукты','Наши продукты'),review,'ui.shell/ru'),/translation changed since review/));
test('identifies missing and extra keys',()=>assert.throws(()=>validateTranslation(source,JSON.stringify({unexpected:'x'}),review,'ui.shell/ru'),/missing keys.*menu.*extra keys.*unexpected/));
test('rejects blank labels and missing placeholders',()=>{
 assert.throws(()=>validateTranslation(source,target.replace('Продукты',' '),review,'ui.shell/ru'),/blank/);
 assert.throws(()=>validateTranslation(source,target.replace('{next}','следующая'),review,'ui.shell/ru'),/placeholders differ/);
});
test('rejects unreviewed copies and changed product names',()=>{
 assert.throws(()=>validateTranslation(source,target,{...review,status:'draft'},'ui.shell/ru'),/needs review/);
 const s=JSON.stringify({product:'AudioFilms'}),t=JSON.stringify({product:'Аудиофильмы'});
 assert.throws(()=>validateTranslation(s,t,review,'product.audiofilms/ru'),/preserve product/);
});
