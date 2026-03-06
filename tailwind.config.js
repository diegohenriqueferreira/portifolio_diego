/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#040c16",
        ink: "#f4f8ff",
        accent: "#b8ff4e",
        accentSoft: "#7ea6c7",
        panel: "#0d1b2c"
      },
      boxShadow: {
        lift: "0 20px 45px rgba(1, 6, 20, 0.45)"
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      }
    }
  },
  plugins: []
};
