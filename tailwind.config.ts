import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Legacy colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Game-specific colors
        "game-bg": "hsl(var(--game-bg))",
        "game-surface": "hsl(var(--game-surface))",
        "game-surface-elevated": "hsl(var(--game-surface-elevated))",
        "game-primary": "hsl(var(--game-primary))",
        "game-primary-glow": "hsl(var(--game-primary-glow))",
        "game-secondary": "hsl(var(--game-secondary))",
        "game-accent": "hsl(var(--game-accent))",
        "game-success": "hsl(var(--game-success))",
        "game-warning": "hsl(var(--game-warning))",
        "game-danger": "hsl(var(--game-danger))",
        "game-text": "hsl(var(--game-text))",
        "game-text-muted": "hsl(var(--game-text-muted))",
        "game-text-dim": "hsl(var(--game-text-dim))",
        "game-border": "hsl(var(--game-border))",
        "game-border-bright": "hsl(var(--game-border-bright))",
        "game-shadow": "hsl(var(--game-shadow))",
      },
      fontFamily: {
        pixel: ["Press Start 2P", "monospace"],
        orbitron: ["Orbitron", "monospace"],
      },
      backgroundImage: {
        "gradient-map": "var(--gradient-map)",
        "gradient-level": "var(--gradient-level)",
        "gradient-item": "var(--gradient-item)",
        "gradient-popup": "var(--gradient-popup)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        popup: "var(--shadow-popup)",
        item: "var(--shadow-item)",
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
        bounce: "var(--transition-bounce)",
        glow: "var(--transition-glow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
