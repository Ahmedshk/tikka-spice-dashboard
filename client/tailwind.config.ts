import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Onest', 'sans-serif'],
      },
      colors: {
        'text-primary': '#5B6B79',
        'text-secondary': '#000000',
        'text-tertiary': '#3B3B3B',
        'text-quaternary': '#FBC52A',
        'button-primary': '#5B6B79',
        'button-secondary': '#F3F5F7',
        'card-background': '#FFFFFF',
        'dashboard-background': '#F5F5F5',
      },
    },
  },
  plugins: [],
};

export default config;
