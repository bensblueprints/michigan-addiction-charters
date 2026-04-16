import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Persistent data dir. In Coolify we mount a volume at /app/data.
// Falls back to ./data in dev.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "michigan-addiction.db");

// Reuse connection across hot reloads
const globalForDb = globalThis as unknown as { __db?: Database.Database };

function getDb() {
  if (!globalForDb.__db) {
    const db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    migrate(db);
    globalForDb.__db = db;
  }
  return globalForDb.__db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      group_size TEXT,
      trip_type TEXT,
      preferred_date TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT,
      ip TEXT,
      user_agent TEXT,
      source TEXT DEFAULT 'web',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
    CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);

    CREATE TABLE IF NOT EXISTS calls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id TEXT UNIQUE,
      agent_id TEXT,
      caller_number TEXT,
      caller_name TEXT,
      duration_seconds INTEGER,
      status TEXT,
      summary TEXT,
      transcript_json TEXT,
      transcript_text TEXT,
      recording_url TEXT,
      metadata_json TEXT,
      started_at TEXT,
      ended_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_calls_conv ON calls(conversation_id);
    CREATE INDEX IF NOT EXISTS idx_calls_created ON calls(created_at DESC);
  `);
}

export const db = {
  get instance() {
    return getDb();
  },
  insertBooking(b: {
    name: string;
    email: string;
    phone: string;
    group_size?: string | null;
    trip_type?: string | null;
    preferred_date?: string | null;
    message?: string | null;
    ip?: string | null;
    user_agent?: string | null;
    source?: string | null;
  }) {
    const stmt = getDb().prepare(`
      INSERT INTO bookings (name, email, phone, group_size, trip_type, preferred_date, message, ip, user_agent, source)
      VALUES (@name, @email, @phone, @group_size, @trip_type, @preferred_date, @message, @ip, @user_agent, @source)
    `);
    const res = stmt.run({
      name: b.name,
      email: b.email,
      phone: b.phone,
      group_size: b.group_size ?? null,
      trip_type: b.trip_type ?? null,
      preferred_date: b.preferred_date ?? null,
      message: b.message ?? null,
      ip: b.ip ?? null,
      user_agent: b.user_agent ?? null,
      source: b.source ?? "web",
    });
    return Number(res.lastInsertRowid);
  },
  listBookings(filter?: { status?: string }) {
    let sql = "SELECT * FROM bookings";
    const params: Record<string, unknown> = {};
    if (filter?.status && filter.status !== "all") {
      sql += " WHERE status = @status";
      params.status = filter.status;
    }
    sql += " ORDER BY created_at DESC LIMIT 500";
    return getDb().prepare(sql).all(params);
  },
  getBooking(id: number) {
    return getDb().prepare("SELECT * FROM bookings WHERE id = ?").get(id);
  },
  updateBooking(id: number, updates: { status?: string; notes?: string }) {
    const fields: string[] = [];
    const params: Record<string, unknown> = { id };
    if (updates.status !== undefined) {
      fields.push("status = @status");
      params.status = updates.status;
    }
    if (updates.notes !== undefined) {
      fields.push("notes = @notes");
      params.notes = updates.notes;
    }
    if (!fields.length) return;
    fields.push("updated_at = datetime('now')");
    getDb()
      .prepare(`UPDATE bookings SET ${fields.join(", ")} WHERE id = @id`)
      .run(params);
  },
  upsertCall(c: {
    conversation_id?: string | null;
    agent_id?: string | null;
    caller_number?: string | null;
    caller_name?: string | null;
    duration_seconds?: number | null;
    status?: string | null;
    summary?: string | null;
    transcript_json?: string | null;
    transcript_text?: string | null;
    recording_url?: string | null;
    metadata_json?: string | null;
    started_at?: string | null;
    ended_at?: string | null;
  }) {
    const data = {
      conversation_id: c.conversation_id ?? null,
      agent_id: c.agent_id ?? null,
      caller_number: c.caller_number ?? null,
      caller_name: c.caller_name ?? null,
      duration_seconds: c.duration_seconds ?? null,
      status: c.status ?? null,
      summary: c.summary ?? null,
      transcript_json: c.transcript_json ?? null,
      transcript_text: c.transcript_text ?? null,
      recording_url: c.recording_url ?? null,
      metadata_json: c.metadata_json ?? null,
      started_at: c.started_at ?? null,
      ended_at: c.ended_at ?? null,
    };
    const stmt = getDb().prepare(`
      INSERT INTO calls (conversation_id, agent_id, caller_number, caller_name, duration_seconds, status, summary, transcript_json, transcript_text, recording_url, metadata_json, started_at, ended_at)
      VALUES (@conversation_id, @agent_id, @caller_number, @caller_name, @duration_seconds, @status, @summary, @transcript_json, @transcript_text, @recording_url, @metadata_json, @started_at, @ended_at)
      ON CONFLICT(conversation_id) DO UPDATE SET
        agent_id = excluded.agent_id,
        caller_number = COALESCE(excluded.caller_number, calls.caller_number),
        caller_name = COALESCE(excluded.caller_name, calls.caller_name),
        duration_seconds = COALESCE(excluded.duration_seconds, calls.duration_seconds),
        status = excluded.status,
        summary = excluded.summary,
        transcript_json = excluded.transcript_json,
        transcript_text = excluded.transcript_text,
        recording_url = COALESCE(excluded.recording_url, calls.recording_url),
        metadata_json = excluded.metadata_json,
        started_at = COALESCE(excluded.started_at, calls.started_at),
        ended_at = COALESCE(excluded.ended_at, calls.ended_at)
    `);
    stmt.run(data);
  },
  listCalls() {
    return getDb()
      .prepare("SELECT * FROM calls ORDER BY created_at DESC LIMIT 500")
      .all();
  },
  getCall(id: number) {
    return getDb().prepare("SELECT * FROM calls WHERE id = ?").get(id);
  },
  stats() {
    const inst = getDb();
    const b = inst
      .prepare(
        `SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN status='new' THEN 1 ELSE 0 END) AS new_count,
          SUM(CASE WHEN status='booked' THEN 1 ELSE 0 END) AS booked_count,
          SUM(CASE WHEN status='contacted' THEN 1 ELSE 0 END) AS contacted_count,
          SUM(CASE WHEN date(created_at) >= date('now','-7 day') THEN 1 ELSE 0 END) AS last_7d
         FROM bookings`
      )
      .get() as Record<string, number>;
    const c = inst
      .prepare(
        `SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN date(created_at) >= date('now','-7 day') THEN 1 ELSE 0 END) AS last_7d,
          COALESCE(SUM(duration_seconds),0) AS total_seconds
         FROM calls`
      )
      .get() as Record<string, number>;
    return { bookings: b, calls: c };
  },
};

export type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  group_size: string | null;
  trip_type: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  ip: string | null;
  user_agent: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
};

export type Call = {
  id: number;
  conversation_id: string | null;
  agent_id: string | null;
  caller_number: string | null;
  caller_name: string | null;
  duration_seconds: number | null;
  status: string | null;
  summary: string | null;
  transcript_json: string | null;
  transcript_text: string | null;
  recording_url: string | null;
  metadata_json: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
};
