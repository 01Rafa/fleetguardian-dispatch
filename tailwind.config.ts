import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        slateBlue: {
          50: "#eff4ff",
          100: "#dce7ff",
          200: "#bfd2ff",
          300: "#94b3ff",
          400: "#668dff",
          500: "#3b68f4",
          600: "#1f4ad8",
          700: "#1a3cb0",
          800: "#1a378c",
          900: "#1b336f"
        }
      },
      boxShadow: {
        panel: "0 14px 40px -20px rgba(25, 36, 72, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;