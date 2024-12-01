import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: {
          light: "#F7E8C1",
          dark: "#1a1a1a",
        },
        forest: {
          light: "#002E1A",
          dark: "#4ade80",
        },
        sunset: {
          light: "#FFBF66",
          dark: "#854d0e",
        },
        cream: {
          light: "#F7E8C1",
          dark: "#262626",
        },
        inka: {
          light: "#F9EDDD",
          dark: "#1f1f1f",
        },
        text: {
          light: "#002E1A",
          dark: "#ffffff",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
