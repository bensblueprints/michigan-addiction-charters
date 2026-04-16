"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What should I bring on the boat?",
    a: "A Wisconsin fishing license, snacks, drinks, sunscreen, layers for cool mornings, and a cooler if you want to take your catch home. Everything else — rods, reels, tackle, nets, downriggers, trolling motors — is aboard and rigged.",
  },
  {
    q: "Do I need experience to book?",
    a: "Not at all. The crew rigs every line, baits every hook, and walks you through setting the hook and fighting the fish. First-timers, kids, and veteran anglers are all welcome. Whether it's your first charter or your fortieth, we set you up for success.",
  },
  {
    q: "What species do you target?",
    a: "Chinook (King) Salmon, Steelhead (Rainbow Trout), and Lake Trout are our primary targets. Early-season charters often produce strong brown trout and coho action as well. Captain Shawn tailors each trip to what's biting that week.",
  },
  {
    q: "Can I keep my catch?",
    a: "Absolutely. Within Wisconsin DNR limits, your catch is yours to keep. The crew will properly care for every fish — cleaned, bagged, and iced — so it's table-ready by the time you leave the dock. Bring a cooler for the ride home.",
  },
  {
    q: "Where do we launch from?",
    a: "The Port of Algoma, Wisconsin — consistently rated the top sportfishing destination on Lake Michigan. Once you book, we'll send exact marina directions and a time to meet.",
  },
  {
    q: "What's the difference between a single charter and a deluxe package?",
    a: "A single charter is one trip — 5, 6, or 8 hours on the water for a flat rate. Deluxe packages bundle two charters with overnight lodging, continental breakfast aboard, and all licenses/trout stamps included. Priced per person for groups of 4–6.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Deposits are non-refundable but can be rescheduled for weather cancellations called by the captain. If Lake Michigan decides you shouldn't fish that day, we find a new date that works.",
  },
  {
    q: "When is the season?",
    a: "We run charters from April through October. Early season (April–June) is prime for Steelhead and lake-run Browns; mid-to-late summer is peak Chinook; fall brings big, pre-spawn Kings.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-36 bg-midnight overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
            Questions
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            Good to <span className="shimmer-text italic">know</span>.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-display text-xl md:text-2xl text-cream pr-4">
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full glass-gold grid place-items-center text-gold"
                >
                  <Plus className="w-5 h-5" strokeWidth={1.5} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 md:px-8 pb-6 text-cream/70 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
