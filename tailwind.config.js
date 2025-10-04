/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        system: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "slide-in": "slideIn 0.5s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
