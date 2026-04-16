import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot — silently drop spam
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const required = ["name", "email", "phone"];
    for (const f of required) {
      if (!body[f] || typeof body[f] !== "string") {
        return NextResponse.json(
          { error: `Missing field: ${f}` },
          { status: 400 }
        );
      }
    }

    // TODO: wire to email/Slack/DB. For now, log and return ok.
    console.log("[BOOKING REQUEST]", {
      ...body,
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
