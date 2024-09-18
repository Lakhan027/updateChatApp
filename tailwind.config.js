/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRedOrange: '#E76F51',
        customTeal: '#2A9D8F',
        customDarkTeal: '#264653',
        customGreen: '#4D4D4D',
        customdark:'#20776C',
         customBlue: '#8db3dd',
      },
    },
  },
  variants: {},
  plugins: [],
}

