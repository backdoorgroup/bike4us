/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.tsx"],
  important: "#__react",
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {}
  },
  plugins: []
}
