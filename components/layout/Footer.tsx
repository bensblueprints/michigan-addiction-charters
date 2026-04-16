"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUp, Fish, Anchor } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-midnight border-t border-white/5 pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-aqua/10 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gold-sheen grid place-items-center shadow-gold-glow">
                <span className="font-display text-abyss text-2xl font-bold">M</span>
              </div>
              <div className="leading-tight">
                <div className="font-display text-2xl text-cream">
                  Michigan <span className="shimmer-text">Addiction</span>
                </div>
                <div className="text-[11px] uppercase tracking-[0.35em] text-aqua/80">
                  Sport Fishing Charters
                </div>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-md">
              Thirty-five years on the water. Private Lake Michigan charters for Salmon,
              Steelhead, and Lake Trout out of the port of Algoma, Wisconsin. Every trip is a
              crafted pursuit — no substitutes.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xl text-gold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#story" className="hover:text-aqua cursor-pointer">Our Story</a></li>
              <li><a href="#species" className="hover:text-aqua cursor-pointer">Target Species</a></li>
              <li><a href="#trips" className="hover:text-aqua cursor-pointer">Single Charters</a></li>
              <li><a href="#deluxe" className="hover:text-aqua cursor-pointer">Deluxe Packages</a></li>
              <li><a href="#testimonials" className="hover:text-aqua cursor-pointer">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl text-gold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-aqua" />
                <a href="tel:9207843038" className="hover:text-cream cursor-pointer">
                  (920) 784-3038
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-aqua" />
                <span>Port of Algoma, Wisconsin</span>
              </li>
              <li className="flex items-start gap-2">
                <Anchor className="w-4 h-4 mt-0.5 text-aqua" />
                <span>38′ Chris Craft · Up to 6 Guests</span>
              </li>
              <li className="flex items-start gap-2">
                <Fish className="w-4 h-4 mt-0.5 text-aqua" />
                <span>Season: April – October</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>
            © {new Date().getFullYear()} Michigan Addiction Charters. All rights reserved.
            Algoma, WI.
          </p>
          <motion.a
            whileHover={{ y: -4 }}
            href="#home"
            className="inline-flex items-center gap-2 text-cream/60 hover:text-gold cursor-pointer"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
