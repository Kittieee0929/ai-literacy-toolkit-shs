const base = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const siteOrigin = Deno.env.get("CLASSROOM_ORIGIN");
const studentDomain = "students.toolkit.example";

Deno.serve(async (request) => {
  const cors = {
    "Access-Control-Allow-Origin": siteOrigin || "",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };
  const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: cors });
  if (!siteOrigin || request.headers.get("origin") !== siteOrigin) return reply({ error: "Origin not allowed." }, 403);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return reply({ error: "Method not allowed." }, 405);

  const bearer = request.headers.get("authorization");
  if (!bearer?.startsWith("Bearer ")) return reply({ error: "Sign in first." }, 401);
  const serverHeaders = { apikey: serviceKey, authorization: `Bearer ${serviceKey}`, "content-type": "application/json" };

  try {
    // Verify the visitor with Auth, then look up the server-controlled classroom role.
    const caller = await fetch(`${base}/auth/v1/user`, { headers: { apikey: serviceKey, authorization: bearer } });
    if (!caller.ok) return reply({ error: "Sign in again." }, 401);
    const { id } = await caller.json();
    const role = await fetch(`${base}/rest/v1/classroom_profiles?select=role&id=eq.${encodeURIComponent(id)}`, { headers: serverHeaders });
    if (!role.ok) return reply({ error: "Could not verify classroom access." }, 503);
    if ((await role.json())[0]?.role !== "teacher") return reply({ error: "Teacher access required." }, 403);

    const input = await request.json().catch(() => null);
    const displayName = typeof input?.displayName === "string" ? input.displayName.trim() : "";
    if (!displayName || displayName.length > 60 || /[\u0000-\u001f\u007f]/u.test(displayName)) {
      return reply({ error: "Enter a classroom display name up to 60 characters." }, 400);
    }
    const login = "student-" + crypto.randomUUID().replaceAll("-", "").slice(0, 16);
    const password = Array.from(crypto.getRandomValues(new Uint8Array(18)), byte => byte.toString(16).padStart(2, "0")).join("") + "aA!";
    const auth = await fetch(`${base}/auth/v1/admin/users`, {
      method: "POST",
      headers: serverHeaders,
      body: JSON.stringify({ email: `${login}@${studentDomain}`, email_confirm: true, password }),
    });
    if (!auth.ok) return reply({ error: "Could not create the login." }, 502);
    const student = await auth.json();
    const studentId = student.user?.id ?? student.id;
    const profile = await fetch(`${base}/rest/v1/classroom_profiles`, {
      method: "POST",
      headers: serverHeaders,
      body: JSON.stringify({ id: studentId, role: "student", teacher_id: id, display_name: displayName }),
    }).catch(() => null);
    if (!profile?.ok) {
      // A failed enrolment must not leave behind a usable unowned login.
      await fetch(`${base}/auth/v1/admin/users/${encodeURIComponent(studentId)}`, { method: "DELETE", headers: serverHeaders }).catch(() => {});
      return reply({ error: "Could not enrol the student. Try again." }, 502);
    }
    return reply({ login, password }, 201);
  } catch {
    return reply({ error: "The classroom service is temporarily unavailable." }, 503);
  }
});
