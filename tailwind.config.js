/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gram: ["Gram", "gram"],
        helvetica: ["Helvetica", "helvetica"],
        bebasneue: ["BebasNeue", "bebasneue"],
      },
    },
  },
  plugins: [],
};
