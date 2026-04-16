"use client";

import { motion } from "framer-motion";
import { Bed, Fish, Coffee, ShieldCheck, Calendar, Check } from "lucide-react";

const packages = [
  {
    title: "Deluxe 8-Hour",
    hours: "8",
    sub: "One 8-hour charter + overnight",
    deposit: "$200",
    tiers: [
      { group: "6 anglers", price: "$279" },
      { group: "5 anglers", price: "$329" },
      { group: "4 anglers", price: "$379" },
    ],
    includes: [
      "One 8-hour charter",
      "1 night motel lodging (condo upgrade +$15/person)",
      "All licenses & trout stamps",
      "Continental breakfast aboard",
      "Full care of your catch",
    ],
  },
  {
    title: "Deluxe 10-Hour",
    hours: "10",
    sub: "Two 5-hour charters (AM + PM) + overnight",
    deposit: "$300",
    tiers: [
      { group: "6 anglers", price: "$339" },
      { group: "5 anglers", price: "$389" },
      { group: "4 anglers", price: "$459" },
    ],
    includes: [
      "Two 5-hour charters (morning + afternoon)",
      "1 night motel lodging (condo upgrade available)",
      "All licenses & trout stamps",
      "Continental breakfast aboard",
      "Full care of your catch",
    ],
  },
  {
    title: "Deluxe 12-Hour",
    hours: "12",
    sub: "Two 6-hour charters + overnight",
    deposit: "$300",
    featured: true,
    tiers: [
      { group: "6 anglers", price: "$359" },
      { group: "5 anglers", price: "$409" },
      { group: "4 anglers", price: "$479" },
    ],
    includes: [
      "Two 6-hour charters (day 1 + day 2)",
      "1 night motel lodging (condo upgrade +$30/person)",
      "All licenses & trout stamps",
      "Continental breakfast aboard",
      "Full care of your catch",
    ],
  },
  {
    title: "Deluxe 16-Hour",
    hours: "16",
    sub: "Two 8-hour charters + overnight",
    deposit: "$400",
    tiers: [
      { group: "6 anglers", price: "$509" },
      { group: "5 anglers", price: "$599" },
      { group: "4 anglers", price: "$679" },
    ],
    includes: [
      "Two 8-hour charters (dawn-to-dusk × 2)",
      "1 night motel lodging (condo upgrade +$30/person)",
      "All licenses & trout stamps",
      "Continental breakfast aboard",
      "Full care of your catch",
    ],
  },
];

const perks = [
  { icon: Bed, label: "Lodging Included" },
  { icon: Coffee, label: "Breakfast Aboard" },
  { icon: Fish, label: "Catch Care" },
  { icon: ShieldCheck, label: "Licenses Covered" },
];

export default function Deluxe() {
  return (
    <section id="deluxe" className="relative py-24 md:py-36 bg-midnight overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-gold/5 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-5 block">
            Deluxe Packages
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            Make it a <span className="shimmer-text italic">weekend</span>.
          </h2>
          <p className="text-cream/60 mt-5 md:text-lg">
            Multi-trip packages with lodging, breakfast, and every license covered. Land in
            Algoma. We handle the rest.
          </p>
        </motion.div>

        {/* Perk bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {perks.map((p) => (
            <div
              key={p.label}
              className="glass rounded-full px-5 py-2 flex items-center gap-2 text-sm text-cream/80"
            >
              <p.icon className="w-4 h-4 text-gold" strokeWidth={1.4} />
              {p.label}
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {packages.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl p-8 md:p-10 card-hover ${
                p.featured
                  ? "glass-gold border border-gold/40 shadow-gold-glow"
                  : "glass"
              }`}
            >
              {p.featured && (
                <div className="absolute top-6 right-6 btn-gold rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                  Best Value
                </div>
              )}

              <div className="flex items-start gap-6 mb-6">
                <div className="font-display text-7xl text-gold/80 leading-none">
                  {p.hours}
                  <span className="text-cream/30 text-3xl ml-1">hr</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-3xl text-cream">{p.title}</h3>
                  <p className="text-cream/60 text-sm mt-1">{p.sub}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {p.tiers.map((t) => (
                  <div
                    key={t.group}
                    className="text-center py-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div className="font-display text-2xl text-gold">{t.price}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/50 mt-1">
                      {t.group}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-cream/40 text-center mb-7">
                Per person · Deposit {p.deposit} required
              </div>

              <ul className="space-y-2.5 text-sm text-cream/75 pt-6 border-t border-white/10">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-aqua mt-0.5 flex-shrink-0" strokeWidth={2} />
                    {inc}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 w-full rounded-full px-5 py-3.5 text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer ${
                  p.featured ? "btn-gold" : "btn-ghost"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Reserve This Package
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
