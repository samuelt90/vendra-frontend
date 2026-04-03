import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dls-section": "#1c2736",
        "dls-primary": "#eebf35",
        "dls-dark": "#27364c",
      },
      backgroundImage: {
        "dls-section": "linear-gradient(to right, #3eb5f1, #8f58dd, #e466c8)",
        "dls-header": "linear-gradient(to right, #a0e7f9, #fcd1ff)",
      },
    },
  },
  plugins: [],
};

export default config;
