import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0d111d",
        sand: "#f5f2e9",
        gold: "#d4af37",
        glass: "#151a2d",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
