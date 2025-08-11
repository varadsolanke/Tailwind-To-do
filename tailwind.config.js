/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 250ms ease-out both',
      },
      boxShadow: {
        card: '0 6px 20px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}


