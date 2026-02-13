/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'pink-light': '#fad5dc',
        'pink': '#FBA8C2',
        'coral': '#FF8C69',
        'coral-500': '#FF8C69',
        'peach-500': '#FBA8C2',
        'teal': '#58C2B3',
        'indigo': '#4C51BF',
        'background': '#FFF9FA',
        'text-dark': '#2D3748',
        'light-gray': '#E0E0E0',
        'medium-gray': '#666',
        'dark-gray': '#888',
        'near-black': '#33303D',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 