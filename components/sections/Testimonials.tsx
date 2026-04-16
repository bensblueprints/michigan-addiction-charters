"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    text: "Great morning fishing with Captain Shawn! I would recommend this charter to anyone that wants a helpful, friendly crew. Captain Shawn knows the lake well and put us on some good fish!",
    author: "Returning Angler",
    trip: "Morning Charter",
    featured: true,
  },
  {
    text: "We had a great time and caught some fish! Crew was knowledgeable and the boat was more comfortable than I expected for a full-day run.",
    author: "Family Group",
    trip: "8-Hour Charter",
  },
  {
    text: "Shawn reads Lake Michigan like a book. We switched baits three times before the bite turned on — and when it did, it was nonstop.",
    author: "Corporate Outing",
    trip: "Deluxe 12-Hour",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-abyss overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] rounded-full bg-aqua/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.4em] text-aqua mb-5 block">
            Voices From The Dock
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            Booked once. <br />
            <span className="shimmer-text italic">Hooked forever.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.9 }}
              className={`group relative rounded-2xl p-8 card-hover ${
                r.featured
                  ? "glass-gold border border-gold/40 shadow-gold-glow md:scale-[1.04]"
                  : "glass"
              }`}
            >
              <Quote
                className="absolute top-6 right-6 w-10 h-10 text-gold/20 group-hover:text-gold/40 transition-colors"
                strokeWidth={1}
              />

              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-cream/85 leading-relaxed mb-6 relative">
                &ldquo;{r.text}&rdquo;
              </p>

              <footer className="pt-5 border-t border-white/10">
                <div className="font-display text-lg text-cream">{r.author}</div>
                <div className="text-[11px] uppercase tracking-widest text-aqua/80 mt-0.5">
                  {r.trip}
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
