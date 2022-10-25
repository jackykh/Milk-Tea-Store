/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // auto-fit columns
        "autofit-30": "repeat(auto-fit, 30rem)",
      },
    },
  },
  plugins: [],
};
