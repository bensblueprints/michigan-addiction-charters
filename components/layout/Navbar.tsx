"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#species", label: "Target Species" },
  { href: "#trips", label: "Charters" },
  { href: "#deluxe", label: "Deluxe Packages" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-midnight/75 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-3" aria-label="Michigan Addiction Charters home">
            <div className="flex flex-col leading-tight">
              <img
                src="/images/logo.png"
                alt="Michigan Addiction Charters"
                className={`transition-all duration-500 ${
                  scrolled ? "h-6 md:h-7" : "h-7 md:h-9"
                } w-auto drop-shadow-[0_2px_12px_rgba(212,164,55,0.35)] group-hover:drop-shadow-[0_2px_18px_rgba(212,164,55,0.6)]`}
              />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-aqua/80 mt-1.5 pl-0.5">
                Algoma · Lake Michigan
              </span>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-7 text-sm">
            {links.slice(1, -1).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="hash-link text-cream/80 hover:text-cream uppercase tracking-wider text-xs font-medium cursor-pointer"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="tel:9207843038"
              className="hidden md:inline-flex items-center gap-2 text-cream/85 text-sm hover:text-gold transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              (920) 784-3038
            </a>
            <a
              href="#contact"
              className="hidden md:inline-flex btn-gold rounded-full px-5 py-2.5 text-sm cursor-pointer"
            >
              Book a Charter
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 rounded-full border border-white/10 text-cream cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-midnight/98 backdrop-blur-2xl"
          >
            <div className="flex justify-end p-5">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-3 rounded-full border border-white/10 text-cream cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="flex flex-col items-center gap-6 mt-14"
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl text-cream hover:shimmer-text cursor-pointer"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-6"
              >
                <a
                  href="tel:9207843038"
                  className="inline-flex items-center gap-2 text-gold text-lg cursor-pointer"
                >
                  <Phone className="w-5 h-5" />
                  (920) 784-3038
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
