import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Geist", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "monospace"],
      },
      colors: {
        lime: "#CCFF00",
        orange: "#FF8C00",
        "dark-bg": "#0f0f14",
        "dark-card": "#1a1a24",
      },
      keyframes: {
        "pulse-lime": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(204, 255, 0, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(204, 255, 0, 0)" },
        },
      },
      animation: {
        "pulse-lime": "pulse-lime 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
