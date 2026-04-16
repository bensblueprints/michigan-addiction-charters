import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot — silently drop spam
    if (body.website) return NextResponse.json({ ok: true });

    for (const f of ["name", "email", "phone"]) {
      if (!body[f] || typeof body[f] !== "string" || !body[f].trim()) {
        return NextResponse.json({ error: `Missing: ${f}` }, { status: 400 });
      }
    }

    const id = db.insertBooking({
      name: String(body.name).slice(0, 120),
      email: String(body.email).slice(0, 200),
      phone: String(body.phone).slice(0, 40),
      group_size: body.groupSize ? String(body.groupSize).slice(0, 20) : null,
      trip_type: body.tripType ? String(body.tripType).slice(0, 120) : null,
      preferred_date: body.date ? String(body.date).slice(0, 40) : null,
      message: body.message ? String(body.message).slice(0, 2000) : null,
      ip: req.headers.get("x-forwarded-for") ?? null,
      user_agent: req.headers.get("user-agent")?.slice(0, 400) ?? null,
      source: body.source ? String(body.source).slice(0, 40) : "web",
    });

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error("booking error", e);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
