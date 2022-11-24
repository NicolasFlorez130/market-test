/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            'main': '#2C2E82',
            'lightMain': '#D4D6E5',
            'offWhite': '#F0F2F5'
         }
      },
   },
   plugins: [],
}