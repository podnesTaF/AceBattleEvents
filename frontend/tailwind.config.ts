import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
      fontSize: {
        "4xl": ["2.25rem"],
        "3xl": ["1.85rem"],
        "2xl": ["1.5rem"],
        lg: ["1rem"],
      },
    },
  },
  plugins: [],
} satisfies Config;
