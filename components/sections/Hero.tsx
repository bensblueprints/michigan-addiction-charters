"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone, Anchor, Fish, Waves } from "lucide-react";

const headline = ["Chase", "The", "Lake", "Michigan", "Legend."];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen pt-24 md:pt-28 flex items-center overflow-hidden bg-hero-grad"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/rearRods-scaled.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-midnight/10 to-midnight/80" />
      </motion.div>

      {/* Decorative glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-aqua/20 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[28rem] h-[28rem] rounded-full bg-gold/15 blur-[110px]" />
      </div>

      {/* Floating decorative icons */}
      <motion.div
        style={{ y: fgY }}
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[8%] text-aqua/20"
        >
          <Fish className="w-24 h-24" strokeWidth={0.8} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[22%] left-[6%] text-gold/25"
        >
          <Anchor className="w-20 h-20" strokeWidth={0.8} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-16 md:py-24"
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse-glow" />
            <span className="text-xs uppercase tracking-[0.3em] text-cream/80">
              Algoma · Port of Lake Michigan
            </span>
          </motion.div>

          {/* Animated headline word by word */}
          <h1 className="font-display font-medium text-[clamp(3rem,10vw,7.5rem)] leading-[0.95] tracking-tight text-cream mb-2">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block mr-4 ${
                  word === "Legend." ? "shimmer-text italic" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-2xl text-lg md:text-xl text-cream/70 leading-relaxed mt-6"
          >
            Thirty-five years chasing <span className="aqua-text font-medium">Chinook Salmon</span>,{" "}
            <span className="aqua-text font-medium">Steelhead</span>, and{" "}
            <span className="aqua-text font-medium">Lake Trout</span> off the shores of Algoma, WI.
            Private sportfishing aboard a 38′ Chris Craft — trolled with precision, told with stories.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="#contact"
              className="btn-gold rounded-full px-8 py-4 inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest cursor-pointer"
            >
              Book Your Charter
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:9207843038"
              className="btn-ghost rounded-full px-8 py-4 inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              (920) 784-3038
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="grid grid-cols-3 gap-6 mt-16 max-w-2xl"
          >
            {[
              { n: "35", l: "Years on the Lake", s: "+" },
              { n: "38", l: "Chris Craft Flybridge", s: "′" },
              { n: "6", l: "Guests per Charter", s: "" },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.7 }}
                className="border-l border-gold/40 pl-4"
              >
                <div className="font-display text-4xl md:text-5xl text-gold">
                  {stat.n}<span className="text-cream/40">{stat.s}</span>
                </div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-cream/55 mt-1">
                  {stat.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/50"
      >
        <Waves className="w-5 h-5 text-aqua" />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.4em]"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}
