/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--g-color-base-background)',
          generic: 'var(--g-color-base-generic)',
          float: 'var(--g-color-base-bg-float)',
        },

        'default-white': {
          DEFAULT: 'var(--g-color-private-white-100-solid)',
          20: 'var(--g-color-private-white-20)',
          50: 'var(--g-color-private-white-50)',
          70: 'var(--g-color-private-white-70)',
          100: 'var(--g-color-private-white-100)',
          150: 'var(--g-color-private-white-150)',
          200: 'var(--g-color-private-white-200)',
          250: 'var(--g-color-private-white-250)',
          300: 'var(--g-color-private-white-300)',
          350: 'var(--g-color-private-white-350)',
          400: 'var(--g-color-private-white-400)',
          450: 'var(--g-color-private-white-450)',
          500: 'var(--g-color-private-white-500)',
          550: 'var(--g-color-private-white-550)',
          600: 'var(--g-color-private-white-600)',
          650: 'var(--g-color-private-white-650)',
          700: 'var(--g-color-private-white-700)',
          750: 'var(--g-color-private-white-750)',
          800: 'var(--g-color-private-white-800)',
          850: 'var(--g-color-private-white-850)',
          900: 'var(--g-color-private-white-900)',
          950: 'var(--g-color-private-white-950)',
          1000: 'var(--g-color-private-white-1000)',
          'opaque-150': 'var(--g-color-private-white-opaque-150)',
        },

        'default-black': {
          DEFAULT: 'var(--g-color-private-black-100-solid)',
          20: 'var(--g-color-private-black-20)',
          50: 'var(--g-color-private-black-50)',
          70: 'var(--g-color-private-black-70)',
          100: 'var(--g-color-private-black-100)',
          150: 'var(--g-color-private-black-150)',
          200: 'var(--g-color-private-black-200)',
          250: 'var(--g-color-private-black-250)',
          300: 'var(--g-color-private-black-300)',
          350: 'var(--g-color-private-black-350)',
          400: 'var(--g-color-private-black-400)',
          450: 'var(--g-color-private-black-450)',
          500: 'var(--g-color-private-black-500)',
          550: 'var(--g-color-private-black-550)',
          600: 'var(--g-color-private-black-600)',
          650: 'var(--g-color-private-black-650)',
          700: 'var(--g-color-private-black-700)',
          750: 'var(--g-color-private-black-750)',
          800: 'var(--g-color-private-black-800)',
          850: 'var(--g-color-private-black-850)',
          900: 'var(--g-color-private-black-900)',
          950: 'var(--g-color-private-black-950)',
          1000: 'var(--g-color-private-black-1000)',
          'opaque-150': 'var(--g-color-private-black-opaque-150)',
        },

        purple: {
          DEFAULT: 'var(--g-color-base-utility-heavy)',
          100: 'var(--g-color-private-purple-100-solid)',
          150: 'var(--g-color-private-purple-150-solid)',
          200: 'var(--g-color-private-purple-200-solid)',
          250: 'var(--g-color-private-purple-250-solid)',
          300: 'var(--g-color-private-purple-300-solid)',
          350: 'var(--g-color-private-purple-350-solid)',
          400: 'var(--g-color-private-purple-400-solid)',
          450: 'var(--g-color-private-purple-450-solid)',
          500: 'var(--g-color-private-purple-500-solid)',
          550: 'var(--g-color-private-purple-550-solid)',
          600: 'var(--g-color-private-purple-600-solid)',
          650: 'var(--g-color-private-purple-650-solid)',
          700: 'var(--g-color-private-purple-700-solid)',
          750: 'var(--g-color-private-purple-750-solid)',
          800: 'var(--g-color-private-purple-800-solid)',
          850: 'var(--g-color-private-purple-850-solid)',
          900: 'var(--g-color-private-purple-900-solid)',
          950: 'var(--g-color-private-purple-950-solid)',
          1000: 'var(--g-color-private-purple-1000-solid)',
        },

        secondary: {
          text: 'var(--g-color-text-secondary)',
        },

        border: 'var(--g-color-line-generic)',

        foreground: {
          DEFAULT: 'var(--g-color-foreground-text)',
        },
        hover: 'var(--g-color-base-simple-hover)',
        accent: 'rgb(70, 196, 249)',
        primary: {
          DEFAULT: 'var(--g-color-base-brand)',
        },
        danger: 'var(--g-color-text-danger)',
      },
    },
    spacing: {
      ...defaultTheme.spacing,
      4.5: '18px',
      form: '460px',
      't-filter': '32ch',
      'big-panel': '644px',
    },
    opacity: {
      ...defaultTheme.opacity,
      disabled: '0.4',
    },
    animation: {
      ...defaultTheme.animation,
      'scale-in': 'animate-scale-in 0.25s ease-out',
      'scale-out': 'animate-scale-out 0.25s ease-out',
      in: 'animate-in 0.25s ease-out',
      'in-r': 'animate-in-r 0.25s ease-out',
      'out-r': 'animate-out-r 0.25s ease-out',
      out: 'animate-out 0.25s ease-out',
      'slide-up': 'animate-slide-up 0.25s ease-out',
      'slide-left-in': 'animate-slide-left-in 0.25s ease-out',
      'slide-left-out': 'animate-slide-left-out 0.25s ease-out',
      toast: 'toast 5s linear',
    },
    keyframes: {
      ...defaultTheme.keyframes,
      toast: {
        from: { width: '0' },
        to: { width: '100%' },
      },
      'animate-scale-in': {
        from: {
          opacity: '0',
          transform: 'scale(90%)',
        },
        to: {
          opacity: '1',
          transform: 'scale(100%)',
        },
      },
      'animate-scale-out': {
        from: {
          opacity: '1',
          transform: 'scale(100%)',
        },
        to: {
          opacity: '0',
          transform: 'scale(125%)',
        },
      },
      'animate-in': {
        from: {
          opacity: '0',
          transform: 'translateY(0.5rem)',
        },
        to: {
          opacity: '1',
          transform: 'translateY(0%)',
        },
      },
      'animate-out': {
        from: {
          opacity: '1',
          transform: 'translateY(0%)',
        },
        to: {
          opacity: '0',
          transform: 'translateY(0.5rem)',
        },
      },
      'animate-in-r': {
        from: {
          opacity: '0',
          transform: 'translateX(0.5rem)',
        },
        to: {
          opacity: '1',
          transform: 'translateX(0%)',
        },
      },
      'animate-out-r': {
        from: {
          opacity: '1',
          transform: 'translateX(0%)',
        },
        to: {
          opacity: '0',
          transform: 'translateX(0.5rem)',
        },
      },
      'animate-slide-up': {
        from: {
          transform: 'translateY(-100%)',
        },
        to: {
          transform: 'translateY(0%)',
        },
      },
      'animate-slide-left-in': {
        from: {
          transform: 'translateX(100%)',
        },
        to: {
          transform: 'translateX(0%)',
        },
      },
      'animate-slide-left-out': {
        from: {
          transform: 'translateX(0%)',
        },
        to: {
          transform: 'translateX(100%)',
        },
      },
    },
  },

  darkMode: 'media',
  plugins: [
    function ({ addUtilities, theme, addVariant }) {
      const spacing = theme('width');

      const clampUtility = Object.entries(spacing).reduce(
        (acc, [key, value]) => {
          acc[`.clamp-${key.replace(/[./]/g, '\\$&')}`] = {
            width: value,
            height: value,
            'min-width': value,
            'min-height': value,
            'max-width': value,
            'max-height': value,
          };

          return acc;
        },
        {},
      );

      addVariant('children', '& > *');
      addVariant('children-after', '& > *:after');
      addVariant('span', '& > span');
      addVariant('svg', '& > svg');
      addVariant('button', '& > button');
      addVariant('p', '& > p');

      addUtilities({
        ...clampUtility,
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex-between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '.pos-abs': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.pos-abs-x': {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.pos-abs-y': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      });
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
