import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ElevenLabs Conversational AI — post-call webhook receiver.
 *
 * Configure the agent's post-call webhook to POST here with shared secret
 * either as `?secret=` query or `X-Webhook-Secret` header.
 *
 * ElevenLabs sends a JSON payload with conversation_id, transcript, analysis,
 * metadata, etc. We normalize and persist it to the `calls` table.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (secret) {
    const provided =
      req.headers.get("x-webhook-secret") ||
      req.nextUrl.searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  // ElevenLabs wraps the actual event under `data` for post_call_transcription
  const data = body.data ?? body;

  const conversation_id: string | null =
    data.conversation_id ||
    data.conversation?.id ||
    body.conversation_id ||
    null;

  const agent_id: string | null =
    data.agent_id || data.agent?.id || body.agent_id || null;

  const metadata = data.metadata || data.conversation?.metadata || {};
  const started_at =
    metadata.start_time_unix_secs
      ? new Date(metadata.start_time_unix_secs * 1000).toISOString()
      : metadata.started_at || null;
  const duration_seconds =
    metadata.call_duration_secs ??
    metadata.duration_seconds ??
    data.duration_seconds ??
    null;
  const ended_at =
    metadata.end_time_unix_secs
      ? new Date(metadata.end_time_unix_secs * 1000).toISOString()
      : metadata.ended_at ||
        (started_at && duration_seconds
          ? new Date(new Date(started_at).getTime() + duration_seconds * 1000).toISOString()
          : null);

  const caller_number: string | null =
    metadata.phone_call?.external_number ||
    metadata.phone_number ||
    data.caller_number ||
    null;
  const caller_name: string | null =
    metadata.phone_call?.caller_name || data.caller_name || null;

  const transcript = data.transcript || data.conversation?.transcript || null;
  const transcript_text = Array.isArray(transcript)
    ? transcript
        .map(
          (t: any) =>
            `${t.role || t.speaker || "?"}: ${(t.message ?? t.text ?? "").trim()}`
        )
        .filter((l: string) => l.length > 3)
        .join("\n")
    : typeof transcript === "string"
      ? transcript
      : null;

  const analysis = data.analysis || {};
  const summary: string | null =
    analysis.transcript_summary ||
    analysis.summary ||
    data.summary ||
    null;

  const status =
    data.status ||
    analysis.call_successful ||
    metadata.termination_reason ||
    "completed";

  db.upsertCall({
    conversation_id,
    agent_id,
    caller_number,
    caller_name,
    duration_seconds: typeof duration_seconds === "number" ? duration_seconds : null,
    status: typeof status === "string" ? status : String(status),
    summary,
    transcript_json: transcript ? JSON.stringify(transcript) : null,
    transcript_text,
    recording_url: data.recording_url || metadata.recording_url || null,
    metadata_json: JSON.stringify({ metadata, analysis }),
    started_at,
    ended_at,
  });

  return NextResponse.json({ ok: true });
}

// Allow GET for health-check convenience (ElevenLabs sometimes verifies URL)
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "elevenlabs-post-call-webhook",
  });
}
