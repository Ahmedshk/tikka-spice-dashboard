import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Onest", "sans-serif"],
      },
      colors: {
        primary: "#5B6B79",
        secondary: "#000000",
        tertiary: "#3B3B3B",
        quaternary: "#FBC52A",
        "button-primary": "#5B6B79",
        "button-secondary": "#F3F5F7",
        "card-background": "#FFFFFF",
        "dashboard-background": "#F5F5F5",
        /** Positive trend / favorable (e.g. positive %) */
        positive: "#5DC54F",
        /** Negative trend / unfavorable (e.g. negative %) */
        negative: "#F04B5B",
      },
    },
  },
  plugins: [],
};

export default config;
