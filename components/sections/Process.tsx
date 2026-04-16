"use client";

import { motion } from "framer-motion";
import { Phone, CalendarCheck, Anchor, Fish } from "lucide-react";

const steps = [
  {
    icon: Phone,
    num: "01",
    title: "Call or Message",
    copy: "Reach out at (920) 784-3038 or drop a message below. We&apos;ll walk through dates, group size, and what&apos;s biting.",
  },
  {
    icon: CalendarCheck,
    num: "02",
    title: "Lock the Date",
    copy: "A deposit secures your charter or deluxe package. We confirm lodging, licenses, and arrival details.",
  },
  {
    icon: Anchor,
    num: "03",
    title: "Arrive at Algoma",
    copy: "Meet at the port of Algoma, WI. Continental breakfast aboard for deluxe trips. Captain Shawn briefs the crew.",
  },
  {
    icon: Fish,
    num: "04",
    title: "Chase the Bite",
    copy: "Spread set, downriggers down, rods ready. We fish the pattern until the cooler is heavy or the sun drops.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-36 bg-midnight overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            Four steps to the <span className="shimmer-text italic">strike</span>.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-20 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.8 }}
                className="relative text-center group"
              >
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gold-sheen shadow-gold-glow group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0.5 rounded-full bg-midnight grid place-items-center">
                    <s.icon className="w-7 h-7 text-gold" strokeWidth={1.4} />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full glass grid place-items-center font-display text-sm text-aqua">
                    {s.num}
                  </div>
                </div>
                <h3 className="font-display text-2xl text-cream mb-3">{s.title}</h3>
                <p
                  className="text-cream/60 text-sm leading-relaxed max-w-xs mx-auto"
                  dangerouslySetInnerHTML={{ __html: s.copy }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
