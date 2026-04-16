"use client";

import { motion } from "framer-motion";
import { Compass, Award, Users, Shield } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    title: "Local Knowledge",
    copy: "Three and a half decades reading Lake Michigan — currents, thermoclines, and where the fish stage each week of the season.",
  },
  {
    icon: Award,
    title: "Licensed & Insured",
    copy: "USCG-licensed captain, full trip insurance, proper trout stamps, and care for every legal and practical detail.",
  },
  {
    icon: Users,
    title: "Any Skill Level",
    copy: "First-timers, kids, or tournament vets. The crew rigs your gear, baits your lines, and walks you through every fight.",
  },
  {
    icon: Shield,
    title: "Everything Aboard",
    copy: "Rods, reels, downriggers, tackle, nets — all included. You bring snacks, drinks, and your license.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative py-24 md:py-36 bg-abyss overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[40rem] h-[40rem] rounded-full bg-aqua/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image stack */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lake-deep">
              <img
                src="/images/rodInWater.jpg"
                alt="Fishing rod bent over the side during a Lake Michigan charter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="hidden sm:block absolute -bottom-10 -right-6 w-48 h-64 rounded-2xl overflow-hidden border-2 border-gold/60 shadow-gold-glow"
            >
              <img
                src="/images/fishingReel.jpg"
                alt="Charter fishing reel"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
              className="absolute -top-6 -left-6 glass-gold rounded-full w-32 h-32 grid place-items-center text-center p-4"
            >
              <div>
                <div className="font-display text-4xl text-gold">35</div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-cream/80">
                  Years on the Lake
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
              Our Story · The Captain
            </span>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream mb-6">
              Algoma is the <span className="shimmer-text italic">top sport fishing</span>{" "}
              destination on Lake Michigan.
            </h2>
            <p className="text-cream/70 leading-relaxed mb-5 md:text-lg">
              Michigan Addiction Charters runs private sportfishing adventures for corporate
              outings, family events, and the angler who wants the day done right. You&apos;ll
              fish a <span className="text-cream">38′ Chris Craft flybridge</span> powered by twin
              350 HP Crusader engines — fast when you need it, spacious when you want to rest.
            </p>
            <p className="text-cream/70 leading-relaxed mb-8 md:text-lg">
              Modern electronics. Private head. Full kitchen. A room below to catch your breath
              between runs. Anglers of every skill level are welcome — from kids holding a rod
              for the first time to tournament crews chasing trophy Chinook.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="group glass rounded-xl p-5 card-hover"
                >
                  <p.icon className="w-6 h-6 text-gold mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.4} />
                  <h3 className="font-display text-xl text-cream mb-2">{p.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{p.copy}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
