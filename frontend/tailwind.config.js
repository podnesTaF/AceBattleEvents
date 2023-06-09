/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        md: "0 0px 6px rgba(0, 0, 0, 0.3)",
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
};
