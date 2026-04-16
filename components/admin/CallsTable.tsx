"use client";

import { useState } from "react";
import { X, Phone, Clock, User } from "lucide-react";

export default function CallsTable({
  calls,
  loading,
}: {
  calls: any[];
  loading: boolean;
}) {
  const [open, setOpen] = useState<any | null>(null);

  if (loading && !calls.length) {
    return <div className="text-cream/50 text-center py-16">Loading…</div>;
  }
  if (!calls.length) {
    return (
      <div className="text-cream/50 text-center py-20 glass rounded-2xl">
        <Phone className="w-6 h-6 mx-auto mb-3 text-aqua/50" />
        No calls logged yet.
        <div className="text-[11px] text-cream/40 mt-2">
          Point your ElevenLabs agent post-call webhook at{" "}
          <code className="text-gold">/api/calls/webhook</code>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] border-b border-white/10">
            <tr className="text-left text-[10px] uppercase tracking-widest text-cream/50">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Caller</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Summary</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {calls.map((c) => (
              <tr
                key={c.id}
                onClick={() => setOpen(c)}
                className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-cream/60 text-xs">
                  {formatDate(c.created_at)}
                </td>
                <td className="px-4 py-3 text-cream">
                  {c.caller_name || c.caller_number || "Unknown"}
                  {c.caller_name && c.caller_number && (
                    <div className="text-[11px] text-cream/50">{c.caller_number}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-cream/75 text-xs">
                  {formatDuration(c.duration_seconds)}
                </td>
                <td className="px-4 py-3 text-cream/70 max-w-md truncate">
                  {c.summary || <span className="text-cream/30">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-aqua/30 text-aqua bg-aqua/10">
                    {c.status || "completed"}
                  </span>
                </td>
                <td className="px-4 py-3 text-aqua text-xs">View →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {calls.map((c) => (
          <button
            key={c.id}
            onClick={() => setOpen(c)}
            className="w-full glass rounded-xl p-4 text-left cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="font-display text-lg text-cream">
                {c.caller_name || c.caller_number || "Unknown"}
              </div>
              <div className="text-[11px] text-cream/50">
                {formatDuration(c.duration_seconds)}
              </div>
            </div>
            <div className="text-[11px] text-cream/50 mb-2">
              {formatDate(c.created_at)}
            </div>
            <div className="text-sm text-cream/70 line-clamp-2">
              {c.summary || "—"}
            </div>
          </button>
        ))}
      </div>

      {open && <CallModal call={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function CallModal({ call, onClose }: { call: any; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-midnight/80 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-auto rounded-2xl p-1 bg-gradient-to-br from-gold/40 via-aqua/30 to-gold/40"
      >
        <div className="bg-abyss rounded-[15px] p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-aqua/80 mb-1">
                Call #{call.id}
              </div>
              <h2 className="font-display text-3xl text-cream">
                {call.caller_name || call.caller_number || "Unknown caller"}
              </h2>
              <div className="flex items-center gap-4 text-xs text-cream/50 mt-2">
                <span>{formatDate(call.created_at, true)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(call.duration_seconds)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {call.caller_number && (
            <a
              href={`tel:${call.caller_number}`}
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light mb-6 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              Call back {call.caller_number}
            </a>
          )}

          {call.summary && (
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">
                AI Summary
              </div>
              <div className="glass-gold rounded-xl p-4 text-sm text-cream/90 whitespace-pre-wrap">
                {call.summary}
              </div>
            </div>
          )}

          {call.transcript_text && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">
                Transcript
              </div>
              <div className="glass rounded-xl p-4 text-sm text-cream/80 max-h-96 overflow-auto">
                {renderTranscript(call.transcript_text)}
              </div>
            </div>
          )}

          {call.recording_url && (
            <div className="mt-6">
              <audio controls src={call.recording_url} className="w-full" />
            </div>
          )}

          {call.conversation_id && (
            <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-cream/40 font-mono break-all">
              conversation_id: {call.conversation_id}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function renderTranscript(text: string) {
  return text.split("\n").map((line, i) => {
    const match = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!match) return <div key={i}>{line}</div>;
    const [, role, msg] = match;
    const isAgent = /agent|assistant|ai/i.test(role);
    return (
      <div key={i} className="mb-2">
        <span
          className={`text-[10px] uppercase tracking-widest mr-2 ${
            isAgent ? "text-gold" : "text-aqua"
          }`}
        >
          {role}
        </span>
        <span className="text-cream/85">{msg}</span>
      </div>
    );
  });
}

function formatDate(s: string, full = false) {
  const d = new Date(s.includes("T") ? s : s.replace(" ", "T") + "Z");
  return full
    ? d.toLocaleString()
    : d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function formatDuration(s: number | null) {
  if (!s) return "—";
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}
