"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Phone,
  LogOut,
  RefreshCw,
  Mail,
  Users,
  Clock,
  Activity,
  Download,
} from "lucide-react";
import BookingsTable from "./BookingsTable";
import CallsTable from "./CallsTable";

type Stats = {
  bookings: {
    total: number;
    new_count: number;
    booked_count: number;
    contacted_count: number;
    last_7d: number;
  };
  calls: {
    total: number;
    last_7d: number;
    total_seconds: number;
  };
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"bookings" | "calls">("bookings");
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const refresh = useCallback(async () => {
    setLoading(true);
    const [statsRes, bookingsRes, callsRes] = await Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch(
        `/api/admin/bookings${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`
      ).then((r) => r.json()),
      fetch("/api/admin/calls").then((r) => r.json()),
    ]);
    setStats(statsRes);
    setBookings(bookingsRes.bookings || []);
    setCalls(callsRes.calls || []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    refresh();
    const iv = setInterval(refresh, 60_000);
    return () => clearInterval(iv);
  }, [refresh]);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  function exportCsv() {
    const rows =
      tab === "bookings"
        ? [
            [
              "id",
              "created_at",
              "status",
              "name",
              "email",
              "phone",
              "trip_type",
              "preferred_date",
              "group_size",
              "message",
              "notes",
            ],
            ...bookings.map((b) => [
              b.id,
              b.created_at,
              b.status,
              b.name,
              b.email,
              b.phone,
              b.trip_type ?? "",
              b.preferred_date ?? "",
              b.group_size ?? "",
              (b.message ?? "").replace(/\n/g, " "),
              (b.notes ?? "").replace(/\n/g, " "),
            ]),
          ]
        : [
            [
              "id",
              "created_at",
              "conversation_id",
              "caller_number",
              "caller_name",
              "duration_seconds",
              "status",
              "summary",
              "transcript_text",
            ],
            ...calls.map((c) => [
              c.id,
              c.created_at,
              c.conversation_id ?? "",
              c.caller_number ?? "",
              c.caller_name ?? "",
              c.duration_seconds ?? "",
              c.status ?? "",
              (c.summary ?? "").replace(/\n/g, " "),
              (c.transcript_text ?? "").replace(/\n/g, " "),
            ]),
          ];
    const csv = rows
      .map((r) =>
        r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tab}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-midnight text-cream pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-midnight/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Michigan Addiction Charters"
              className="h-6 md:h-7 w-auto drop-shadow-[0_2px_10px_rgba(212,164,55,0.35)]"
            />
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.35em] text-aqua/80 border-l border-white/10 pl-3">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              disabled={loading}
              className="glass rounded-full px-4 py-2 text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:border-aqua/50 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={exportCsv}
              className="glass rounded-full px-4 py-2 text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:border-gold/50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              onClick={logout}
              className="glass rounded-full px-4 py-2 text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:border-red-400/50 hover:text-red-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={Mail}
            label="Total Bookings"
            value={stats?.bookings.total ?? 0}
            sub={`${stats?.bookings.last_7d ?? 0} in last 7 days`}
            accent="gold"
          />
          <StatCard
            icon={Activity}
            label="New / Pending"
            value={stats?.bookings.new_count ?? 0}
            sub="Needs reply"
            accent="aqua"
          />
          <StatCard
            icon={Users}
            label="Confirmed"
            value={stats?.bookings.booked_count ?? 0}
            sub="On the water"
            accent="gold"
          />
          <StatCard
            icon={Phone}
            label="Calls Logged"
            value={stats?.calls.total ?? 0}
            sub={`${formatDuration(stats?.calls.total_seconds ?? 0)} total`}
            accent="aqua"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10">
          <TabButton
            active={tab === "bookings"}
            onClick={() => setTab("bookings")}
            icon={<Calendar className="w-4 h-4" />}
            label={`Bookings (${bookings.length})`}
          />
          <TabButton
            active={tab === "calls"}
            onClick={() => setTab("calls")}
            icon={<Phone className="w-4 h-4" />}
            label={`Calls (${calls.length})`}
          />

          {tab === "bookings" && (
            <div className="ml-auto flex items-center gap-2 pb-2">
              <span className="text-[10px] uppercase tracking-widest text-cream/50">
                Filter
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-abyss border border-white/10 rounded-full text-xs px-3 py-1.5 cursor-pointer hover:border-gold/40"
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="booked">Booked</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab content */}
        {tab === "bookings" ? (
          <BookingsTable bookings={bookings} onChange={refresh} loading={loading} />
        ) : (
          <CallsTable calls={calls} loading={loading} />
        )}
      </div>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: any;
  label: string;
  value: number;
  sub: string;
  accent: "gold" | "aqua";
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-full grid place-items-center ${
            accent === "gold" ? "glass-gold" : "bg-aqua/15 border border-aqua/30"
          }`}
        >
          <Icon
            className={`w-4 h-4 ${accent === "gold" ? "text-gold" : "text-aqua"}`}
            strokeWidth={1.5}
          />
        </div>
        <Clock className="w-3 h-3 text-cream/30" />
      </div>
      <div className="font-display text-4xl text-cream">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-cream/50 mt-1">
        {label}
      </div>
      <div className="text-[11px] text-cream/40 mt-2">{sub}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-3 text-sm inline-flex items-center gap-2 transition-colors cursor-pointer ${
        active ? "text-gold" : "text-cream/60 hover:text-cream"
      }`}
    >
      {icon}
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-sheen" />
      )}
    </button>
  );
}

function formatDuration(s: number) {
  if (!s) return "0s";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${r}s`;
  return `${r}s`;
}
