/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "inverse-on-surface": "#f8efe6",
        "on-surface": "#1e1b16",
        "surface-tint": "#5f5e5e",
        "primary-fixed": "#e5e2e1",
        "on-secondary-fixed-variant": "#474744",
        "error": "#ba1a1a",
        "outline": "#747878",
        "inverse-primary": "#c8c6c5",
        "surface-container-lowest": "#ffffff",
        "on-error-container": "#93000a",
        "on-secondary-fixed": "#1b1c19",
        "on-tertiary-fixed": "#1e1b13",
        "surface-container-highest": "#e9e1d8",
        "primary": "#000000",
        "tertiary-fixed-dim": "#ccc6b9",
        "surface-container-high": "#efe7dd",
        "surface-variant": "#e9e1d8",
        "on-background": "#1e1b16",
        "on-error": "#ffffff",
        "secondary-fixed-dim": "#c8c6c2",
        "surface": "#fff8f2",
        "tertiary-container": "#1e1b13",
        "on-primary": "#ffffff",
        "on-primary-container": "#858383",
        "background": "#fff8f2",
        "on-tertiary-fixed-variant": "#4a463d",
        "error-container": "#ffdad6",
        "surface-container-low": "#fbf2e9",
        "on-primary-fixed": "#1c1b1b",
        "primary-container": "#1c1b1b",
        "on-surface-variant": "#444748",
        "surface-bright": "#fff8f2",
        "tertiary": "#000000",
        "tertiary-fixed": "#e9e2d4",
        "on-secondary-container": "#63635f",
        "inverse-surface": "#34302a",
        "surface-dim": "#e1d9d0",
        "on-tertiary-container": "#898378",
        "on-tertiary": "#ffffff",
        "primary-fixed-dim": "#c8c6c5",
        "secondary-container": "#e1dfdb",
        "secondary": "#5e5e5b",
        "surface-container": "#f5ede3",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#e4e2dd",
        "on-primary-fixed-variant": "#474746",
        "outline-variant": "#c4c7c7"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "container-max": "1440px",
        "unit": "8px",
        "section-gap": "120px",
        "gutter": "24px",
        "margin-desktop": "64px",
        "margin-mobile": "20px"
      },
      fontFamily: {
        "body-lg": ["DM Sans", "sans-serif"],
        "label-caps": ["DM Sans", "sans-serif"],
        "display-lg-mobile": ["Playfair Display", "serif"],
        "headline-sm": ["Playfair Display", "serif"],
        "display-lg": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "body-md": ["DM Sans", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "1.0", letterSpacing: "0.15em", fontWeight: "500" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "500" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "400" }],
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }]
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
      }
    }
  },
  plugins: [],
};
