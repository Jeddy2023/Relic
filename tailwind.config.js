/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      screens: {
        's': '300',
        'sm': '640px',    // Small screens and up
        'md': '768px',    // Medium screens and up
        'lg': '1024px',   // Large screens and up
        'xl': '1280px',   // Extra large screens and up
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/hero-7-bg.png')",
        'footer-pattern': "url('/src/assets/images/footer-map.png')"
      },
      colors: {
        'bg-general': '#48bb78',
      },
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
        'plus-jakarta-sans': ['"Plus Jakarta Sans"', 'sans-serif'],
        'syne': ['"Syne"', 'sans-serif'],
        'lato': ['"Lato"', 'sans-serif'],
        'league-spartan': ['"League Spartan"', 'sans-serif'],
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'outfit': ['"Outfit"', 'sans-serif'],
        'playfair-display': ['"Playfair Display"', 'serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
        'rethink-sans': ['"Rethink Sans"', 'sans-serif'],
        'livvic': ['"Livvic"', 'sans-serif'],
        'saira': ['"Saira"', 'sans-serif'],
        'catamaran': ['"Catamaran"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
