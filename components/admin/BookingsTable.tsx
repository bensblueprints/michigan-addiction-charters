"use client";

import { useState } from "react";
import { X, Save, Calendar, User, Mail, Phone, Users } from "lucide-react";

const STATUSES = [
  { v: "new", label: "New", cls: "bg-aqua/15 text-aqua border-aqua/30" },
  { v: "contacted", label: "Contacted", cls: "bg-gold/15 text-gold border-gold/30" },
  { v: "booked", label: "Booked", cls: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30" },
  { v: "closed", label: "Closed", cls: "bg-white/10 text-cream/60 border-white/20" },
];

function statusChip(s: string) {
  const m = STATUSES.find((x) => x.v === s) ?? STATUSES[3];
  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${m.cls}`}
    >
      {m.label}
    </span>
  );
}

export default function BookingsTable({
  bookings,
  onChange,
  loading,
}: {
  bookings: any[];
  onChange: () => void;
  loading: boolean;
}) {
  const [open, setOpen] = useState<any | null>(null);

  if (loading && !bookings.length) {
    return <div className="text-cream/50 text-center py-16">Loading…</div>;
  }
  if (!bookings.length) {
    return (
      <div className="text-cream/50 text-center py-20 glass rounded-2xl">
        No bookings yet. Submissions from the site contact form will appear here.
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] border-b border-white/10">
            <tr className="text-left text-[10px] uppercase tracking-widest text-cream/50">
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Trip</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Group</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer transition-colors"
                onClick={() => setOpen(b)}
              >
                <td className="px-4 py-3 text-cream/60 text-xs">
                  {formatDate(b.created_at)}
                </td>
                <td className="px-4 py-3">{statusChip(b.status)}</td>
                <td className="px-4 py-3 text-cream font-medium">{b.name}</td>
                <td className="px-4 py-3 text-cream/75">{b.trip_type || "—"}</td>
                <td className="px-4 py-3 text-cream/75">{b.preferred_date || "—"}</td>
                <td className="px-4 py-3 text-cream/75">{b.group_size || "—"}</td>
                <td className="px-4 py-3 text-cream/60 text-xs">
                  {b.phone}
                  <br />
                  {b.email}
                </td>
                <td className="px-4 py-3 text-aqua text-xs">View →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {bookings.map((b) => (
          <button
            key={b.id}
            onClick={() => setOpen(b)}
            className="w-full glass rounded-xl p-4 text-left cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="font-display text-lg text-cream">{b.name}</div>
                <div className="text-[11px] text-cream/50">
                  {formatDate(b.created_at)}
                </div>
              </div>
              {statusChip(b.status)}
            </div>
            <div className="text-sm text-cream/70 mb-1">{b.trip_type || "No trip specified"}</div>
            <div className="text-xs text-cream/50 flex items-center gap-3">
              <span>{b.phone}</span>
              {b.preferred_date && <span>· {b.preferred_date}</span>}
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {open && (
        <BookingModal
          booking={open}
          onClose={() => setOpen(null)}
          onSaved={() => {
            setOpen(null);
            onChange();
          }}
        />
      )}
    </>
  );
}

function BookingModal({
  booking,
  onClose,
  onSaved,
}: {
  booking: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [status, setStatus] = useState(booking.status);
  const [notes, setNotes] = useState(booking.notes || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/bookings/${booking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    setSaving(false);
    onSaved();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-midnight/80 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl p-1 bg-gradient-to-br from-gold/40 via-aqua/30 to-gold/40"
      >
        <div className="bg-abyss rounded-[15px] p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-aqua/80 mb-1">
                Booking #{booking.id}
              </div>
              <h2 className="font-display text-3xl text-cream">{booking.name}</h2>
              <div className="text-xs text-cream/50 mt-1">
                {formatDate(booking.created_at, true)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <InfoRow icon={Mail} label="Email" value={booking.email} href={`mailto:${booking.email}`} />
            <InfoRow icon={Phone} label="Phone" value={booking.phone} href={`tel:${booking.phone}`} />
            <InfoRow icon={Calendar} label="Preferred Date" value={booking.preferred_date || "—"} />
            <InfoRow icon={Users} label="Group Size" value={booking.group_size || "—"} />
          </div>

          <InfoRow icon={User} label="Trip Type" value={booking.trip_type || "—"} />

          {booking.message && (
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">
                Message
              </div>
              <div className="glass rounded-xl p-4 text-sm text-cream/80 whitespace-pre-wrap">
                {booking.message}
              </div>
            </div>
          )}

          <div className="mt-6">
            <label className="block text-[10px] uppercase tracking-widest text-cream/50 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s.v}
                  onClick={() => setStatus(s.v)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border cursor-pointer transition-all ${
                    status === s.v
                      ? s.cls + " scale-105"
                      : "border-white/10 text-cream/50 hover:border-white/30"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-[10px] uppercase tracking-widest text-cream/50 mb-2">
              Internal Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Deposit received? Called back? Special requests…"
              className="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest text-cream/60 hover:text-cream cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="btn-gold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3 glass rounded-xl p-3">
      <div className="w-9 h-9 rounded-full glass-gold grid place-items-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-cream/50">{label}</div>
        <div className="text-sm text-cream truncate">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:[&>div]:border-gold/40 cursor-pointer">
      {inner}
    </a>
  ) : (
    inner
  );
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
