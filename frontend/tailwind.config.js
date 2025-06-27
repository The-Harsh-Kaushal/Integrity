/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        accent: "#22d3ee",
        bgdark: "#0f172a",
        surface: "#1e293b",
        textlight: "#f1f5f9",
        success: "#10b981",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
};
