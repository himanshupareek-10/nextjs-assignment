import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'result-gradient': 'linear-gradient(104.04deg, #DBEEFF 0%, #FFDEEB 100%)',
      },
      fontFamily: {
        circular: ['CircularStd', 'sans-serif'],
        circularBlack: ['CircularStdBlack', 'sans-serif'],
        circularBold: ['CircularStdBold', 'sans-serif'],
        circularBook: ['CircularStdBook', 'sans-serif'],
      },
      colors: {
        atag: 'rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1))',
        bgblue: '#0E8EFF',
        'common': '#1F314A',
      },
      lineHeight: {
        'base': '30.36px',
      },
      fontWeight: {
        'para': '450'
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in both',
      },
      keyframes:{
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -20%, 0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
          },
        },
      }
    },
  },
  plugins: [],
};
export default config;
