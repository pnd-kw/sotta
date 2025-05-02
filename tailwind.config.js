/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      serif: ["Georgia", "serif"],
      mono: ["Courier New", "Courier", "monospace"],
    },
  },
};
export const plugins = [];
