"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Failed" }));
        throw new Error(error || "Failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-hero-grad p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/images/logo.png"
            alt="Michigan Addiction Charters"
            className="h-8 w-auto mx-auto mb-4 drop-shadow-[0_2px_12px_rgba(212,164,55,0.35)]"
          />
          <div className="text-[11px] uppercase tracking-[0.4em] text-aqua/80">
            Admin Dashboard
          </div>
        </div>

        <div className="rounded-2xl p-1 bg-gradient-to-br from-gold/40 via-aqua/30 to-gold/40">
          <form onSubmit={onSubmit} className="bg-abyss rounded-[15px] p-8 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full glass-gold grid place-items-center">
                <Lock className="w-4 h-4 text-gold" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-2xl text-cream">Sign In</h1>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3.5 text-cream focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all"
              />
            </div>

            {error && <p className="text-sm text-red-300">{error}</p>}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-gold w-full rounded-full px-8 py-3.5 text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
