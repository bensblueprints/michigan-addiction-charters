"use client";

import { motion } from "framer-motion";
import { Gauge, Users, Utensils, Bed } from "lucide-react";

const specs = [
  { icon: Gauge, label: "Length", value: "38 ft" },
  { icon: Users, label: "Capacity", value: "6 guests" },
  { icon: Gauge, label: "Power", value: "2× 350 HP" },
  { icon: Bed, label: "Rest Room", value: "Below Deck" },
];

export default function Boat() {
  return (
    <section className="relative py-24 md:py-32 bg-abyss overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="/images/lakeMichigan.png"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
              The Boat
            </span>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream mb-6">
              A <span className="shimmer-text italic">38′ Chris Craft</span> built for
              long days on the water.
            </h2>
            <p className="text-cream/70 leading-relaxed mb-8 md:text-lg">
              Twin 350 HP Crusader engines push us to the thermocline fast. Once we&apos;re
              working a pattern, there&apos;s room to spread out, a private head, a full
              kitchen, and a cabin below if the morning starts to drag. Modern electronics —
              radar, sonar, and GPS — track fish the eye can&apos;t see.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                  className="glass rounded-xl p-5 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-full glass-gold grid place-items-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-gold" strokeWidth={1.4} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-cream/50">
                      {s.label}
                    </div>
                    <div className="font-display text-xl text-cream">{s.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lake-deep">
              <img
                src="/images/boat-hero.jpg"
                alt="The 38-foot Chris Craft charter boat on Lake Michigan"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[1500ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                      Private Charter
                    </div>
                    <div className="font-display text-2xl text-cream">Flybridge & Outriggers</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl shimmer-text">20</div>
                    <div className="text-[9px] uppercase tracking-widest text-cream/50">Knots Max</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary stern-rods image as overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="hidden md:block absolute -bottom-10 -left-10 w-48 h-36 rounded-xl overflow-hidden border-2 border-gold/60 shadow-gold-glow"
            >
              <img
                src="/images/rearRods-scaled.jpg"
                alt="Rods rigged off the stern"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
