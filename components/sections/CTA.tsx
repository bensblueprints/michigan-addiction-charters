"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-abyss">
      <div className="absolute inset-0">
        <img
          src="/images/lakeMichiganBeach.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-5xl md:text-7xl leading-[1] text-cream mb-8">
            Some addictions <br />
            are <span className="shimmer-text italic">worth keeping.</span>
          </h2>
          <p className="text-cream/70 md:text-xl mb-10 max-w-xl">
            Dates fill fast during peak season. Lock yours in now — Captain Shawn answers the
            phone himself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="btn-gold rounded-full px-8 py-4 inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest cursor-pointer"
            >
              Reserve Your Date
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:9207843038"
              className="btn-ghost rounded-full px-8 py-4 inline-flex items-center justify-center gap-2 text-sm uppercase tracking-widest cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              (920) 784-3038
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
