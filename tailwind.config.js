/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-josefin-sans)", "sans-serif"],
        mono: ["var(--font-nova-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
