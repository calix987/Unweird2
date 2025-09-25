import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b3d6ff",
          300: "#86beff",
          400: "#58a6ff",
          500: "#2a8eff",
          600: "#0b73e8",
          700: "#085bb5",
          800: "#064382",
          900: "#032b4f"
        }
      }
    },
  },
  plugins: [],
};
export default config;
