import test from 'node:test';
import assert from 'node:assert/strict';
import {handleWaitlist} from '../server/waitlist.mjs';
import {onRequest} from '../functions/api/waitlist.js';
const request=(body,origin='https://dilum.io')=>new Request('https://dilum.io/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)});
const valid={email:' Person@Example.com ',language:'Dutch',interests:['Flashcards','Flashcards','unknown'],earlyTester:true};
function database(){const calls=[];return {calls,prepare(sql){return {bind(...values){return {async run(){calls.push({sql,values});}};}};}};}
test('normalises a signup and preserves existing deduplication/update contract',async()=>{
 const db=database();const r=await handleWaitlist(request(valid),db);
 assert.equal(r.status,200);assert.equal(db.calls.length,1);
 assert.deepEqual(db.calls[0].values,['person@example.com','Dutch','["Flashcards"]',1]);
 assert.match(db.calls[0].sql,/ON CONFLICT\(email\) DO UPDATE/);
 assert.match(db.calls[0].sql,/updated_at = CURRENT_TIMESTAMP/);
 assert.equal(r.headers.get('cache-control'),'no-store');
});
test('rejects cross-origin, invalid and oversized submissions without a write',async()=>{
 const db=database();
 for(const [req,status] of [[request(valid,'https://elsewhere.test'),403],[request({...valid,email:'invalid'}),400],[request({...valid,language:''}),400],[request({...valid,language:'x'.repeat(5000)}),413],[request(null),400]]) assert.equal((await handleWaitlist(req,db)).status,status);
 assert.equal(db.calls.length,0);
});
test('honeypot returns quietly and stores nothing',async()=>{
 const db=database();assert.equal((await handleWaitlist(request({...valid,website:'spam'}),db)).status,200);assert.equal(db.calls.length,0);
});
test('returns useful errors for malformed input, absent binding and storage failure',async()=>{
 assert.equal((await handleWaitlist(new Request('https://dilum.io/api/waitlist',{method:'POST',body:'{'}),database())).status,400);
 assert.equal((await handleWaitlist(request(valid),undefined)).status,503);
 assert.equal((await handleWaitlist(request(valid),{prepare(){throw new Error('private failure');}})).status,500);
 assert.equal((await handleWaitlist(new Request('https://dilum.io/api/waitlist'),database())).status,405);
});
test('Pages adapter never writes from local or public preview origins even if a binding is present',async()=>{
 const db=database();for(const origin of ['http://localhost:4326','https://journal-preview.dilum-landing.pages.dev']) {
 const r=await onRequest({request:new Request(origin+'/api/waitlist',{method:'POST',body:JSON.stringify(valid)}),env:{WAITLIST_DB:db}});assert.equal(r.status,403);
 }assert.equal(db.calls.length,0);
});
test('production adapter uses the existing binding',async()=>{
 const db=database();assert.equal((await onRequest({request:request(valid),env:{WAITLIST_DB:db}})).status,200);assert.equal(db.calls.length,1);
});
