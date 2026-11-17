import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        live: "var(--live)",
        building: "var(--building)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        bengali: ["var(--font-bengali)", "sans-serif"],
      },
      maxWidth: {
        reading: "680px",
      },
    },
  },
  plugins: [],
};

export default config;
