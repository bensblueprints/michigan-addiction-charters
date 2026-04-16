"use client";

import { motion } from "framer-motion";
import { Fish } from "lucide-react";

const species = [
  {
    name: "Chinook Salmon",
    scientific: "Oncorhynchus tshawytscha",
    weight: "15–30 lb avg · 40 lb+ trophy",
    season: "Peak: July – September",
    copy:
      "The King. Staging in cold, deep thermoclines off Algoma. Long, screaming runs and a fight that defines a season.",
    accent: "from-gold/30 to-gold/0",
    image: "/images/Screen-Shot-2022-05-09-at-2.24.16-PM.png",
  },
  {
    name: "Steelhead",
    scientific: "Oncorhynchus mykiss",
    weight: "8–14 lb avg",
    season: "Peak: May – July",
    copy:
      "Acrobatic rainbow trout that tear line off downriggers and go airborne the moment they feel steel. Fast, silver, unforgettable.",
    accent: "from-aqua/30 to-aqua/0",
    image: "/images/Screen-Shot-2022-05-09-at-2.24.01-PM.png",
  },
  {
    name: "Lake Trout",
    scientific: "Salvelinus namaycush",
    weight: "10–20 lb avg · 30 lb+ trophy",
    season: "All Season",
    copy:
      "Deep-water brawlers native to the Great Lakes. Consistent producers on wire-line and downrigger setups — a dependable fight all year.",
    accent: "from-aqua/25 to-gold/0",
    image: "/images/Screen-Shot-2022-05-09-at-2.23.49-PM.png",
  },
];

export default function Species() {
  return (
    <section id="species" className="relative py-24 md:py-36 bg-midnight overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,180,216,0.12),transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
            Target Species
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            Three fish. <span className="shimmer-text italic">One obsession.</span>
          </h2>
          <p className="text-cream/60 mt-5 md:text-lg">
            Every trolling spread is built around what&apos;s biting that week. Captain Shawn
            reads the lake and sets the pattern — you bring the line tight.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {species.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden glass p-8 card-hover"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative">
                {/* Fish illustration panel */}
                <div className="relative -mx-8 -mt-8 mb-6 h-52 overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#1a3657] via-[#0d2847] to-[#05101f]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(144,224,239,0.25),transparent_60%)]" />
                  <motion.img
                    src={s.image}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-[0_10px_30px_rgba(0,180,216,0.35)]"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <motion.img
                    src={s.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-contain p-6 opacity-90 group-hover:scale-105 transition-transform duration-[1200ms]"
                    style={{ mixBlendMode: "screen" }}
                  />
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full glass-gold grid place-items-center">
                    <Fish className="w-4 h-4 text-gold" strokeWidth={1.4} />
                  </div>
                  <span className="absolute bottom-2 left-4 font-display text-6xl text-white/10 font-bold leading-none">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl text-cream mb-1">{s.name}</h3>
                <p className="text-xs italic text-aqua/80 mb-6 tracking-wide">{s.scientific}</p>

                <p className="text-cream/70 leading-relaxed mb-6 min-h-[80px]">{s.copy}</p>

                <div className="space-y-2 pt-5 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="uppercase tracking-widest text-cream/40">Weight</span>
                    <span className="text-cream/80">{s.weight}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="uppercase tracking-widest text-cream/40">Season</span>
                    <span className="text-gold">{s.season}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
