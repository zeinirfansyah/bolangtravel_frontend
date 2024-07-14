/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00D4FF",
        secondary: "#00C0E6",
        dark: "#152C5B",
        light: "#F5F6F8",
      },
    },
  },
  plugins: [],
};
