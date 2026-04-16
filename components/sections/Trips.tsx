"use client";

import { motion } from "framer-motion";
import { Clock, Users, Anchor, ArrowRight } from "lucide-react";

const trips = [
  {
    hours: 5,
    price: "$1,199",
    title: "Half-Day Charter",
    label: "5 Hours",
    tagline: "The classic morning or afternoon run.",
    includes: [
      "1–6 anglers aboard",
      "All rods, reels & tackle",
      "Captain + mate",
      "Care of your catch",
    ],
  },
  {
    hours: 6,
    price: "$1,199",
    title: "Standard Charter",
    label: "6 Hours",
    tagline: "Extra water time to work multiple patterns.",
    includes: [
      "1–6 anglers aboard",
      "All rods, reels & tackle",
      "Captain + mate",
      "Care of your catch",
    ],
    featured: true,
  },
  {
    hours: 8,
    price: "$1,199",
    title: "Full-Day Charter",
    label: "8 Hours",
    tagline: "Dawn to dusk. Maximum chances at a trophy.",
    includes: [
      "1–6 anglers aboard",
      "All rods, reels & tackle",
      "Captain + mate",
      "Care of your catch",
    ],
  },
];

export default function Trips() {
  return (
    <section id="trips" className="relative py-24 md:py-36 bg-abyss overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <img
          src="/images/lakeMichiganBeach.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-abyss/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
              Single Charters
            </span>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream max-w-2xl">
              Pick your water time. <br />
              <span className="shimmer-text italic">We handle the rest.</span>
            </h2>
          </div>
          <p className="text-cream/60 max-w-sm md:text-right">
            Flat charter pricing. 1 to 6 anglers for one set price — split it with your crew or
            keep the boat to yourself.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {trips.map((t, i) => (
            <motion.article
              key={t.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-2xl p-8 flex flex-col card-hover ${
                t.featured
                  ? "glass-gold scale-[1.02] md:-translate-y-4 border border-gold/40 shadow-gold-glow"
                  : "glass"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gold rounded-full px-4 py-1 text-[10px] uppercase tracking-[0.3em]">
                  Most Booked
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 text-aqua text-sm mb-3">
                    <Clock className="w-4 h-4" strokeWidth={1.4} />
                    <span className="uppercase tracking-[0.2em] text-xs">{t.label}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-cream">{t.title}</h3>
                </div>
                <div className="font-display text-6xl md:text-7xl text-white/5 font-bold leading-none">
                  {t.hours}
                </div>
              </div>

              <p className="text-cream/65 mb-8 min-h-[48px]">{t.tagline}</p>

              <ul className="space-y-3 mb-8 text-sm text-cream/75">
                {t.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {inc}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
                      Flat Rate · Whole Boat
                    </div>
                    <div className="font-display text-4xl text-gold">{t.price}</div>
                  </div>
                  <div className="flex items-center gap-1 text-cream/50 text-xs">
                    <Users className="w-4 h-4" /> 1–6
                  </div>
                </div>
                <a
                  href="#contact"
                  className={`w-full rounded-full px-5 py-3 text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    t.featured ? "btn-gold" : "btn-ghost"
                  }`}
                >
                  Book This Trip
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center text-cream/50 text-sm mt-10 flex items-center justify-center gap-2"
        >
          <Anchor className="w-4 h-4 text-aqua" />
          Sailing out of the Port of Algoma, Wisconsin · Season runs April – October
        </motion.p>
      </div>
    </section>
  );
}
