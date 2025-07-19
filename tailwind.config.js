/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E34C3C',
        secondary: '#F5F5F5',
        success: '#4CAF50',
        warning: '#FFA726',
        dark: '#2C3E50',
        light: '#FFFFFF'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}