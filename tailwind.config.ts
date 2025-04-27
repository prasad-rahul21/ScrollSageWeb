
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme"; // Import defaultTheme

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { // Add container configuration
      center: true,
      padding: "1rem", // Default padding, can be overridden
      screens: {
        "2xl": "1400px",
      },
    },
  	extend: {
       fontFamily: { // Add font family using CSS variable
         sans: ["var(--font-sans)", ...fontFamily.sans],
         orbitron: ["var(--font-orbitron)", ...fontFamily.sans], // Add Orbitron font family
       },
  		colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
        'accent-pink': { // Added pink accent color
           DEFAULT: 'hsl(var(--accent-pink))',
            // You might want a foreground color for pink too if needed
           // foreground: 'hsl(var(--accent-pink-foreground))'
         },
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Direct color definitions for convenience if needed
        pink: {
           '500': '#ec4899', // Added pink-500 directly
           '600': '#db2777' // Added pink-600 for dark mode if needed
         },
        teal: { // Add teal for gradients
           '400': '#2dd4bf',
           '500': '#14b8a6',
         },
        cyan: { // Add cyan for gradients
           '500': '#06b6d4',
         },
        amber: { // Add amber for gradients
          '400': '#fbbf24',
         },
        orange: { // Add orange for gradients
          '500': '#f97316',
         },
        rose: { // Add rose for gradients
           '500': '#f43f5e',
         },
        sky: { // Add sky for gradients
           '400': '#38bdf8',
         },
        blue: { // Add blue for gradients
          '500': '#3b82f6',
         },
        purple: { // Add purple for gradients
           '600': '#9333ea',
         },
        indigo: { // Add indigo for gradients
          '500': '#6366f1',
         },
         // Neon Colors (can be direct or HSL)
         'neon-indigo': '#6366f1', // Example direct hex
         'neon-pink': '#ec4899',
         'neon-cyan': '#22d3ee',


  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'sparkle': { // Add sparkle keyframes
           '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
           '50%': { opacity: '1', transform: 'scale(1) rotate(15deg)' },
         },
         'glow': { // Add glow keyframes
           '0%, 100%': { boxShadow: '0 0 5px hsl(var(--primary) / 0.5)' },
           '50%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.8)' },
         },
         'pulse-border': { // Pulsating border keyframes
            '0%': { borderColor: 'hsl(var(--neon-indigo))', boxShadow: '0 0 5px hsl(var(--neon-indigo)), 0 0 10px hsl(var(--neon-indigo)), inset 0 0 5px hsl(var(--neon-indigo))' },
            '33%': { borderColor: 'hsl(var(--neon-pink))', boxShadow: '0 0 5px hsl(var(--neon-pink)), 0 0 10px hsl(var(--neon-pink)), inset 0 0 5px hsl(var(--neon-pink))' },
            '66%': { borderColor: 'hsl(var(--neon-cyan))', boxShadow: '0 0 5px hsl(var(--neon-cyan)), 0 0 10px hsl(var(--neon-cyan)), inset 0 0 5px hsl(var(--neon-cyan))' },
            '100%': { borderColor: 'hsl(var(--neon-indigo))', boxShadow: '0 0 5px hsl(var(--neon-indigo)), 0 0 10px hsl(var(--neon-indigo)), inset 0 0 5px hsl(var(--neon-indigo))' }
         },
        'sparkle-anim': { // Sparkle animation keyframes
            '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0.5' },
            '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
            '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
        },
        'burst-anim': { // Particle burst keyframes
            '0%': { transform: 'scale(0.5) translate(0, 0)', opacity: '1' },
            '100%': { transform: 'scale(1) translate(var(--tx), var(--ty))', opacity: '0' }
        },
        'breathing': { // Breathing effect keyframes
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.03)' }
        },
        'ripple-shine-anim': { // Ripple shine keyframes
            '0%': { transform: 'scale(10) translate(-50%, -50%)', opacity: '0.5' },
            '100%': { transform: 'scale(60) translate(-50%, -50%)', opacity: '0' }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'sparkle': 'sparkle 1s ease-in-out infinite', // Add sparkle animation
         'glow': 'glow 2s ease-in-out infinite alternate', // Add glow animation
         'pulse-border': 'pulse-border 4s linear infinite', // Pulsating border animation
         'sparkle-anim': 'sparkle-anim 0.8s ease-out forwards', // Sparkle animation instance
         'burst-anim': 'burst-anim 0.6s ease-out forwards', // Burst animation instance
         'breathing': 'breathing 1.5s ease-in-out infinite', // Breathing animation instance
         'ripple-shine-anim': 'ripple-shine-anim .8s ease-out' // Ripple shine animation instance
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'), // Ensure typography plugin is present
    ],
} satisfies Config;

