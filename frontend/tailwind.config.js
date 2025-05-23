/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkestblue': "#020912",
        'darkblue': "#051428",
        "lighterblue": "#0e2743",
        "glassblue": "#141f2c"
      }
    },
  },
  plugins: [],
}

