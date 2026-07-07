/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        background: '#040d06',
        primary: '#c9ff00', // yellow-green from the reference
        secondary: '#0a210f',
        accent: '#c9ff00', 
        foreground: '#ffffff',
      }
    },
  },
  plugins: [],
}
