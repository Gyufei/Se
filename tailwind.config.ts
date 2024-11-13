import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sg: ["var(--font-space-grotesk)"],
    },
    extend: {
      colors: {
        green: "var(--green)",
        red: "var(--red)",
      },
    },
  },
  plugins: [
    /* eslint-disable */
    require("tailwindcss-animate"),
  ],
} satisfies Config;
