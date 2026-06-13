// ════════════════════════════════════════════════════════════════
// @fatax/design-system · tailwind.config.js
// GENERATED FROM DESIGN.md v0.6 — 2026-06-13
// DO NOT EDIT MANUALLY. Run `cd codegen && npm run generate`.
// ════════════════════════════════════════════════════════════════

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Edit this to match your app's source files
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './app/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
            background: "#0A0A0A",
            surface: {
                  DEFAULT: "#141414",
                  raised: "#1C1C1C",
                  sunken: "#050506",
                  overlay: "rgba(0,0,0,0.85)"
            },
            border: {
                  DEFAULT: "#262626",
                  soft: "#1A1A1A",
                  strong: "#363636",
                  cream: "rgba(245,235,222,0.12)"
            },
            text: {
                  primary: "#F5EBDE",
                  secondary: "#9C9489",
                  muted: "#6B655D",
                  disabled: "#3A3631",
                  inverse: "#0A0A0A"
            },
            brand: {
                  orange: {
                        DEFAULT: "#FF4800",
                        hover: "#FF6A2E",
                        pressed: "#D63D00",
                        soft: "#2E1408",
                        tint: "#3A1A0C"
                  },
                  cream: {
                        DEFAULT: "#F5EBDE",
                        dark: "#C9C0B4",
                        soft: "rgba(245,235,222,0.08)"
                  },
                  black: "#0A0A0A"
            },
            on-orange: "#FFFFFF",
            on-cream: "#0A0A0A",
            success: {
                  DEFAULT: "#3FB76E",
                  soft: "#0F2A1C"
            },
            warning: {
                  DEFAULT: "#F2B33B",
                  soft: "#2E2110"
            },
            danger: {
                  DEFAULT: "#E5484D",
                  soft: "#2E1214"
            },
            info: {
                  DEFAULT: "#5B8DEF",
                  soft: "#101A2E"
            }
      },
      spacing: {
            2xs: "2px",
            xs: "4px",
            sm: "8px",
            md: "12px",
            lg: "16px",
            xl: "24px",
            2xl: "32px",
            3xl: "48px",
            4xl: "64px",
            5xl: "96px",
            6xl: "128px"
      },
      borderRadius: {
            xs: "4px",
            sm: "8px",
            md: "12px",
            lg: "16px",
            xl: "24px",
            full: "9999px"
      },
      fontFamily: {
            sans: [
                  "Inter",
                  "system-ui",
                  "sans-serif"
            ],
            display: [
                  "Syne",
                  "Inter",
                  "system-ui",
                  "sans-serif"
            ],
            mono: [
                  "JetBrains Mono",
                  "ui-monospace",
                  "monospace"
            ]
      },
      fontSize: {
            display: [
                  "80px",
                  {
                        lineHeight: "1.2",
                        letterSpacing: "-0.035em",
                        fontWeight: "700"
                  }
            ],
            h1: [
                  "42px",
                  {
                        lineHeight: "1.2",
                        letterSpacing: "-0.028em",
                        fontWeight: "700"
                  }
            ],
            h2: [
                  "32px",
                  {
                        lineHeight: "1.2",
                        letterSpacing: "-0.024em",
                        fontWeight: "700"
                  }
            ],
            h3: [
                  "22px",
                  {
                        lineHeight: "1.2",
                        letterSpacing: "-0.018em",
                        fontWeight: "600"
                  }
            ],
            h4: [
                  "18px",
                  {
                        lineHeight: "1.2",
                        letterSpacing: "-0.014em",
                        fontWeight: "600"
                  }
            ],
            h5: [
                  "14px",
                  {
                        lineHeight: "1.2",
                        letterSpacing: "0",
                        fontWeight: "400"
                  }
            ],
            lede: [
                  "17px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0",
                        fontWeight: "400"
                  }
            ],
            body: [
                  "15px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0",
                        fontWeight: "400"
                  }
            ],
            body-sm: [
                  "13px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0",
                        fontWeight: "500"
                  }
            ],
            caption: [
                  "12px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0",
                        fontWeight: "500"
                  }
            ],
            label-caps: [
                  "12px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0.14em",
                        fontWeight: "700"
                  }
            ],
            eyebrow: [
                  "11px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0.16em",
                        fontWeight: "700"
                  }
            ],
            mono: [
                  "12px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "0",
                        fontWeight: "500"
                  }
            ],
            mono-big: [
                  "40px",
                  {
                        lineHeight: "1.5",
                        letterSpacing: "-0.02em",
                        fontWeight: "700"
                  }
            ]
      },
      transitionDuration: {
            fast: "120ms",
            base: "200ms",
            slow: "320ms",
            deliberate: "560ms"
      },
      transitionTimingFunction: {
            out: "cubic-bezier(0.16, 1, 0.3, 1)",
            std: "cubic-bezier(0.4, 0, 0.2, 1)",
            in: "cubic-bezier(0.7, 0, 0.84, 0)"
      }
},
  },
  corePlugins: {
    // Fatax usa contraste de surface, nunca box-shadow
    boxShadow: false,
  },
};
