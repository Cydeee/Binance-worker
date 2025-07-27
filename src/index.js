// src/index.js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("path");
    if (!path) {
      return new Response(
        JSON.stringify({ error: "Missing 'path' query parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const target = `https://api.binance.com${path}`;
    const res = await fetch(target, { cache: "no-store" });

    const body = await res.text();
    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");

    return new Response(body, { status: res.status, headers });
  }
};
