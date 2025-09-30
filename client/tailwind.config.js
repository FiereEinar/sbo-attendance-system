/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'show-slow': 'show 0.5s ease-in-out',
      },
      keyframes: {
        'spin-slow': {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'show-slow': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      }
    },
  },
  plugins: [],
}

