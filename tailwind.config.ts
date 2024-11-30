import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: {
          DEFAULT: "#002E1A", // czarny/ciemny zielony
        },
        sunset: {
          DEFAULT: "#FFBF66", // pomarańczowy
        },
        cream: {
          DEFAULT: "#F7E8C1", // biały/beżowy tło
        },
        inka: {
          DEFAULT: "#F9EDDD",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
