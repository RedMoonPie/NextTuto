import type { Config } from 'tailwindcss';
import themeConfig from './theme'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme:{...themeConfig.theme},
  plugins: [require('@tailwindcss/forms')],
};
export default config;
