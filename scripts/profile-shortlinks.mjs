import { readFileSync } from 'node:fs';

// Cloudflare Pages handles these in production. Mirror the same source in dev.
export function profileShortlinks() {
  return {
    name: 'profile-shortlinks',
    enforce: 'post',
    configureServer(server) {
      const rules = new Map(readFileSync(new URL('../public/_redirects', import.meta.url), 'utf8')
        .split('\n')
        .map(line => line.trim().split(/\s+/))
        .filter(([from]) => /^\/(nikolai|olesia)\/?$/.test(from))
        .map(([from, to]) => [from, to]));
      // Register after Astro's middleware setup so aliases also work without a slash.
      return () => server.middlewares.stack.unshift({ route: '', handle: (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const target = rules.get(url.pathname);
        if (!target) return next();
        res.writeHead(301, { Location: target + url.search });
        res.end();
      }});
    },
  };
}
