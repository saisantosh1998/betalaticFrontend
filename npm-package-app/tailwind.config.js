/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true, 
    files: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};