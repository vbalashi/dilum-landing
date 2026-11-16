import {checkTranslationRegistry} from './translation-validation.mjs';
const count=checkTranslationRegistry();
console.log(`PASS: ${count} translation reviews across product copy, menus/buttons and waitlist; keys, placeholders, brands and source/target freshness`);
