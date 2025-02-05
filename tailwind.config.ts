import { colors } from './src/styles/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // background: "var(--background)",
        // foreground: "var(--foreground)",
      },
      // container: {
      //   center: true,
      //   padding: "1rem"
      // }
      backgroundImage: {
        'gradiant-header':
          'linear-gradient(to right, #312e81, #1e40af, #2563eb)',
        'gradiant-theme':
          'linear-gradient(to right, #d946ef, #7c3aed, #3b82f6)',
        'gradiant-theme-light':
          'linear-gradient(to right, #c770dd, #655395, #3a5fba)',
        'gradiant-theme-light-extreme':
          'linear-gradient(to right, #b684c3, #7762b1, #4c68ac)',
        'gradiant-theme-btn':
          'linear-gradient(to right, #FF5F6D, #A16AE8, #5A67D8)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;
