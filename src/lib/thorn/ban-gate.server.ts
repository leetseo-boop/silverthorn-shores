// Edge gate: visitors banned for repeated chat abuse get the door, site-wide.
import { clientIp } from "./profanity";
import { ipIdentity, isBanned } from "./runtime.server";

export async function isVisitorBanned(request: Request): Promise<boolean> {
  try {
    const { ipHash } = await ipIdentity(clientIp(request));
    return await isBanned(ipHash);
  } catch {
    return false;
  }
}

export function bannedResponse(): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" /><title>Access revoked — Silverthorn Resort</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#10241f;color:#f4efe6;font-family:system-ui,-apple-system,Segoe UI,sans-serif;padding:2rem}
main{max-width:34rem;text-align:center}h1{font-size:1.6rem;margin:0 0 .75rem}p{line-height:1.6;color:#cfd8d2}
code{background:rgba(255,255,255,.08);padding:.15rem .4rem;border-radius:.25rem}</style></head>
<body><main><h1>Access revoked</h1>
<p>Your connection was blocked after repeated abusive language in our guest chat.</p>
<p>If you believe this is a mistake, call <strong>800-332-3044</strong> or email
<code>reserve1@houseboats.com</code> and our team can review it.</p></main></body></html>`;
  return new Response(html, {
    status: 403,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
