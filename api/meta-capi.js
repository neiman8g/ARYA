// Meta Conversions API relay for PageView and Lead.
// The browser fires the same event through the Pixel with the same event_id, so Meta keeps one copy.
// The access token is read from the META_CAPI_TOKEN environment variable and never reaches the browser.
const crypto = require("crypto");

const PIXEL_ID = "2896948614012737";
const GRAPH_VERSION = "v21.0";
const EVENTS = new Set(["PageView", "Lead"]);
const ALLOWED_HOSTS = [/^arya\.clothing$/, /^www\.arya\.clothing$/, /^arya-site-[a-z0-9-]+\.vercel\.app$/, /^localhost$/];

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");
const cookie = (header, name) => {
  const m = (header || "").match(new RegExp("(?:^|;\s*)" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : undefined;
};
const hostOf = (url) => { try { return new URL(url).hostname; } catch (_) { return ""; } };

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).end(); }

  // Visitors who opt out through Global Privacy Control are never sent to Meta
  if (req.headers["sec-gpc"] === "1") return res.status(204).end();

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (_) { body = null; } }
  if (!body || typeof body !== "object") return res.status(400).json({ error: "Expected a JSON body" });

  const { event_name, event_id, event_source_url, email } = body;
  if (!EVENTS.has(event_name)) return res.status(400).json({ error: "Unsupported event" });
  if (typeof event_id !== "string" || !event_id || event_id.length > 100) return res.status(400).json({ error: "Missing event_id" });
  const host = hostOf(event_source_url);
  if (!ALLOWED_HOSTS.some((re) => re.test(host))) return res.status(400).json({ error: "Unknown source" });

  const token = process.env.META_CAPI_TOKEN;
  if (!token) return res.status(202).json({ skipped: "META_CAPI_TOKEN is not set" });

  const user_data = {
    client_ip_address: (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || undefined,
    client_user_agent: req.headers["user-agent"],
    fbp: cookie(req.headers.cookie, "_fbp"),
    fbc: cookie(req.headers.cookie, "_fbc"),
  };
  if (event_name === "Lead" && typeof email === "string" && email.includes("@")) {
    user_data.em = [sha256(email.trim().toLowerCase())];
  }

  const payload = {
    data: [{
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      event_source_url,
      action_source: "website",
      user_data,
    }],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      console.error("Meta CAPI error", r.status, await r.text());
      return res.status(502).json({ error: "Meta rejected the event" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Meta CAPI request failed", err);
    return res.status(502).json({ error: "Could not reach Meta" });
  }
};
