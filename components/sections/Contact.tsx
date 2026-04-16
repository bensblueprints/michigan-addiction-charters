"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Calendar, Send, Anchor } from "lucide-react";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-abyss overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/3 w-[40rem] h-[40rem] rounded-full bg-aqua/10 blur-[140px]" />
        <div className="absolute -bottom-20 right-1/3 w-[40rem] h-[40rem] rounded-full bg-gold/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-2"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
              Book Your Charter
            </span>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream mb-6">
              Ready to <span className="shimmer-text italic">fish?</span>
            </h2>
            <p className="text-cream/70 md:text-lg leading-relaxed mb-10">
              Call Captain Shawn direct or send a message with your preferred dates, group size,
              and trip type. We&apos;ll confirm availability and walk you through the next step.
            </p>

            <div className="space-y-5">
              <a
                href="tel:9207843038"
                className="group flex items-center gap-4 glass rounded-xl p-5 hover:border-gold/50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full glass-gold grid place-items-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Call</div>
                  <div className="font-display text-2xl text-cream">(920) 784-3038</div>
                </div>
              </a>

              <div className="flex items-center gap-4 glass rounded-xl p-5">
                <div className="w-12 h-12 rounded-full glass-gold grid place-items-center">
                  <MapPin className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Launch</div>
                  <div className="font-display text-xl text-cream">Port of Algoma, WI</div>
                </div>
              </div>

              <div className="flex items-center gap-4 glass rounded-xl p-5">
                <div className="w-12 h-12 rounded-full glass-gold grid place-items-center">
                  <Calendar className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Season</div>
                  <div className="font-display text-xl text-cream">April – October</div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3 text-cream/50 text-sm">
              <Anchor className="w-4 h-4 text-aqua" />
              38′ Chris Craft · Twin 350 HP · Up to 6 guests
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-gold/40 via-aqua/30 to-gold/40">
              <form
                onSubmit={onSubmit}
                className="bg-abyss rounded-[15px] p-8 md:p-10 space-y-5"
              >
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="name" label="Your Name" required />
                  <Field name="email" label="Email" type="email" required />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="phone" label="Phone" type="tel" required />
                  <Field name="groupSize" label="Group Size (1–6)" type="number" />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-2">
                    Trip Type
                  </label>
                  <select
                    name="tripType"
                    defaultValue=""
                    className="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3.5 text-cream focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select a trip…</option>
                    <option>5-Hour Charter</option>
                    <option>6-Hour Charter</option>
                    <option>8-Hour Charter</option>
                    <option>Deluxe 8-Hour Package</option>
                    <option>Deluxe 10-Hour Package</option>
                    <option>Deluxe 12-Hour Package</option>
                    <option>Deluxe 16-Hour Package</option>
                    <option>Not sure — advise me</option>
                  </select>
                </div>

                <Field name="date" label="Preferred Date" type="date" />

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Anything we should know — first-timers, tournament crew, corporate group, questions about packages…"
                    className="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3.5 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-gold w-full rounded-full px-8 py-4 text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Request Availability"}
                  <Send className="w-4 h-4" />
                </button>

                {status === "sent" && (
                  <p className="text-center text-sm text-aqua">
                    ✓ Message sent — Captain Shawn will be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-red-300">
                    Something went wrong. Please call (920) 784-3038 directly.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3.5 text-cream placeholder:text-cream/30 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all"
      />
    </div>
  );
}
