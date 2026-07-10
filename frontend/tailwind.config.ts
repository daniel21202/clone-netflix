import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          dark: '#0B0B0B',
          black: '#141414',
          gray: '#808080',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Arial Narrow', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
