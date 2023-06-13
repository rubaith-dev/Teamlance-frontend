/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#f0f9ff",
        "primary-100": "#e0f2fe",
        "primary-200": "#bae6fd",
        "primary-300": "#7dd3fc",
        "primary-400": "#38bdf8",
        "primary-500": "#0ea5e9",
        "primary-600": "#0284c7",
        "primary-700": "#0369a1",
        "primary-800": "#075985",
        "primary-900": "#0c4a6e",
      },
    },
  },
  plugins: [],
};
