import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-video-aspect': {'raw': '(max-aspect-ratio: 16/9)'},
        'min-video-aspect': {'raw': '(min-aspect-ratio: 16/9)'},
      },
    },
  },
  plugins: [],
};
export default config;
