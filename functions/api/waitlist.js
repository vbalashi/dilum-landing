import { handleWaitlist } from '../../server/waitlist.mjs';

export function onRequest({ request, env }) {
  // Preview/local deployments must never write to the live signup database.
  if (new URL(request.url).hostname !== 'dilum.io') {
    return new Response(JSON.stringify({error:'Preview only: no signup was saved or sent.'}), {
      status:403, headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'},
    });
  }
  return handleWaitlist(request, env.WAITLIST_DB);
}
