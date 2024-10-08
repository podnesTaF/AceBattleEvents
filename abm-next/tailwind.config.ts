import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "auth-bg": "url('/auth-intro.jpg')",
        "auth-card": "url('/auth-card.jpg')",
      },
      boxShadow: {
        sm: "0 0 4px rgba(0, 0, 0, 0.1)",
        md: "0 0 8px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        xs: "375px",
        "3xl": "2048px",
      },
      animation: {
        fadeInOut: "fadeInOut 2s ease-in-out infinite", // Define the duration and iteration
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

