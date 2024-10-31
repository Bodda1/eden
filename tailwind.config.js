module.exports = {
  content: ['./core/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      xs: ['1wpx', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
    },
    extend: {
      backgroundImage: {
        banner: "url('/assets/images/banner.jpg')",
      },
      fontFamily: {
        roboto: ['Roboto', 'serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: '#FF6363',
          'primary-content': '#FFFFFF',
          secondary: '#808F85',
          'secondary-content': '#FFFFFF',
          accent: '#31081F',
          'accent-content': '#FFFFFF',
          neutral: '#6B0F1A',
          'neutral-content': '#FFFFFF',
          'base-100': '#FFFFFF',
          'base-200': '#DCE0D9',
          'base-300': '#595959',
          'base-content': '#484848',
          info: '',
          'info-content': '',
          success: '',
          'success-content': '',
          warning: '',
          'warning-content': '',
          error: '',
          'error-content': '',
        },
      },
    ],
  },
};
