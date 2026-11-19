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
        surface: "var(--surface)",
        "surface-subtle": "var(--surface-subtle)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        live: "var(--live)",
        building: "var(--building)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        bengali: ["var(--font-bengali)", "sans-serif"],
      },
      maxWidth: {
        reading: "680px",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px -1px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};

export default config;
