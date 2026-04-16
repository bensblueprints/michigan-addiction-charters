import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#05101F",
        abyss: "#0A1929",
        lake: "#0D2847",
        deep: "#143456",
        aqua: {
          DEFAULT: "#00B4D8",
          light: "#48CAE4",
          glow: "#90E0EF",
        },
        gold: {
          DEFAULT: "#D4A437",
          light: "#E8C063",
          deep: "#B8861E",
        },
        cream: "#F5F1E8",
        mist: "#CBD5E1",
      },
      fontFamily: {
        display: ['"Cormorant"', "serif"],
        body: ['"Montserrat"', "sans-serif"],
        mark: ['"Permanent Marker"', "cursive"],
      },
      boxShadow: {
        "gold-glow": "0 0 40px -8px rgba(212, 164, 55, 0.5)",
        "aqua-glow": "0 0 50px -10px rgba(0, 180, 216, 0.55)",
        "lake-deep": "0 30px 80px -20px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "hero-grad":
          "radial-gradient(ellipse at top, rgba(0,180,216,0.15), transparent 60%), linear-gradient(180deg, #05101F 0%, #0A1929 55%, #0D2847 100%)",
        "gold-sheen":
          "linear-gradient(135deg, #E8C063 0%, #D4A437 45%, #B8861E 100%)",
        "aqua-sheen":
          "linear-gradient(135deg, #90E0EF 0%, #00B4D8 55%, #0077B6 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(0,180,216,0.45)" },
          "50%": { boxShadow: "0 0 0 18px rgba(0,180,216,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s ease-out both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
