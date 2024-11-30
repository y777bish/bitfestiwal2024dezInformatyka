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
          DEFAULT: "#004225", // czarny/ciemny zielony
        },
        sunset: {
          DEFAULT: "#FFB000", // pomarańczowy
        },
        cream: {
          DEFAULT: "#F5F5DC", // biały/beżowy tło
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
