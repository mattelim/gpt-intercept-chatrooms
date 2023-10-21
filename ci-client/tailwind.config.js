/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        'sans': ['"Roboto Mono"', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
    // themes: ["winter", "dark"],
  },
}

