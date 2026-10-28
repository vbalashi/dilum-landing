// Adapted from 2000nl-landing 08ceb02; same existing signup table and fields.
const allowedInterests = new Set([
  "Video practice",
  "Reading & translation",
  "Flashcards",
]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });

export async function handleWaitlist(request, db) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: "Request origin is not allowed." }, 403);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > 4096) return json({ error: "Request is too large." }, 413);

  let payload;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 4096) {
      return json({ error: "Request is too large." }, 413);
    }
    payload = JSON.parse(body);
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ error: "Please check the form and try again." }, 400);
  }

  // Quietly discard automated form fills without storing their details.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ message: "You're on the waitlist. Thanks for your interest." });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const language = typeof payload.language === "string" ? payload.language.trim() : "";
  const interests = Array.isArray(payload.interests)
    ? [...new Set(payload.interests.filter((item) => allowedInterests.has(item)))]
    : [];
  const earlyTester = payload.earlyTester === true;

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid email address." }, 400);
  }
  if (!language || language.length > 80) {
    return json({ error: "Tell us which language you want to learn." }, 400);
  }
  if (!db) return json({ error: "Signups are not open just yet. Please try again later." }, 503);

  try {
    await db
      .prepare(
        `INSERT INTO waitlist_signups (email, language, interests, early_tester)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(email) DO UPDATE SET
           language = excluded.language,
           interests = excluded.interests,
           early_tester = excluded.early_tester,
           updated_at = CURRENT_TIMESTAMP`,
      )
      .bind(email, language, JSON.stringify(interests), earlyTester ? 1 : 0)
      .run();
    return json({ message: "You're on the waitlist. Thanks for helping shape 2000nl." });
  } catch {
    return json({ error: "We couldn't save your signup. Please try again later." }, 500);
  }
}
