import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "retro",
      "forest", "aqua", "synthwave", "cyberpunk",
      "dracula", "halloween", "valentine", "pastel",
      "fantasy", "luxury", "autumn", "business",
      "acid", "lemonade", "night", "coffee",
      "winter", "spring", "space", "neon",
      "aurora", "sunset", "glacier", "zen",
      "cotton", "vintage", "cosmic", "serenity",
      "mystic", "peach", "oasis", "gemstone"
    ]
    
  }
}