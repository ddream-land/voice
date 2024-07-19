import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";
import plugin from 'tailwindcss';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        '-spin': '-spin 1s linear infinite',
      },
      keyframes: {
        '-spin': {
          'from': {
            transform: 'rotate(0deg)'
          },
          'to': {
            transform: 'rotate(-360deg)'
          }
        }
      },
      colors: {
        "blue": {
          "50": "#dbfbff",
          "100": "#b4ebfa",
          "200": "#8addf1",
          "300": "#60cfea",
          "400": "#36c1e3",
          "500": "#18a9cc",
          "600": "#0b829d",
          "700": "#005d72",
          "800": "#003946",
          "900": "#00151b"
        },
        "green": {
          "50": "#ddfff2",
          "100": "#b5f8db",
          "200": "#89f2c5",
          "300": "#5eecaf",
          "400": "#32e798",
          "500": "#18cd7f",
          "600": "#0c9f62",
          "700": "#037246",
          "800": "#004528",
          "900": "#00190a"
        },
        "zinc": {
          "50": "#fafafa",
          "100": "#f4f4f5",
          "200": "#e2e2e7",
          "300": "#cfcfd8",
          "400": "#a0a0aa",
          "500": "#70707a",
          "600": "#52525b",
          "700": "#3c3c42",
          "800": "#25252a",
          "900": "#15151a"
        },
        "cyan": {
          "50": "#defffc",
          "100": "#b5f9f5",
          "200": "#8bf4ec",
          "300": "#60efe5",
          "400": "#3ceade",
          "500": "#28d0c4",
          "600": "#1aa399",
          "700": "#0b746d",
          "800": "#004641",
          "900": "#001917"
        },
      }
    },
    // colors: {
    //   'blue': '#1fb6ff',
    //   'purple': '#7e5bef',
    //   'pink': '#ff49db',
    //   'orange': '#ff7849',
    //   'green': '#13ce66',
    //   'yellow': '#ffc82c',
    //   'gray-dark': '#273444',
    //   'gray': '#8492a6',
    //   'gray-light': '#d3dce6',
    // }
  },
  darkMode: "class",
  variants: {
    '.scrollbar-hide': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {
        
      }, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
          }, // light theme colors
        },
        dark: {
          layout: {
          }, // dark theme layout tokens
          colors: {
            background:"#13161A",
            // primary: { DEFAULT: "#6366f1"},
            primary: { DEFAULT: "#18A9CC"},
            success: {
              800: "#b5f8db",
              900: "#ddfff2"
            },
            warning: {
              50: "#312107",
              100: "#62420e",
              200: "#936316",
              300: "#c4841d"
            },
            // warning: { DEFAULT: "#6366f1"},
            // danger: { DEFAULT: "#6366f1"},
          }, // dark theme colors
        },
        // ... custom themes
      },
    })
  ],
}
export default config
