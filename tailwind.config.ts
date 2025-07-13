import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Typography
			fontFamily: {
				'aeonik': ['Aeonik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
				'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'Courier New', 'monospace'],
			},
			fontSize: {
				'xs': ['var(--text-xs)', { lineHeight: 'var(--leading-normal)' }],
				'sm': ['var(--text-sm)', { lineHeight: 'var(--leading-normal)' }],
				'base': ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
				'lg': ['var(--text-lg)', { lineHeight: 'var(--leading-normal)' }],
				'xl': ['var(--text-xl)', { lineHeight: 'var(--leading-tight)' }],
				'2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-tight)' }],
				'3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-tight)' }],
				'4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-tight)' }],
				'5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-tight)' }],
				'6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-tight)' }],
				'7xl': ['var(--text-7xl)', { lineHeight: 'var(--leading-tight)' }],
			},
			letterSpacing: {
				'tight': 'var(--tracking-tight)',
				'normal': 'var(--tracking-normal)',
				'wider': 'var(--tracking-wider)',
			},
			lineHeight: {
				'tight': 'var(--leading-tight)',
				'normal': 'var(--leading-normal)',
				'relaxed': 'var(--leading-relaxed)',
			},
			
			// Oklch Color System
			colors: {
				// Sky palette
				sky: {
					50: 'var(--color-sky-50)',
					100: 'var(--color-sky-100)',
					200: 'var(--color-sky-200)',
					300: 'var(--color-sky-300)',
					400: 'var(--color-sky-400)',
					500: 'var(--color-sky-500)',
					600: 'var(--color-sky-600)',
				},
				// Blue palette
				blue: {
					100: 'var(--color-blue-100)',
					200: 'var(--color-blue-200)',
					300: 'var(--color-blue-300)',
					400: 'var(--color-blue-400)',
					500: 'var(--color-blue-500)',
					600: 'var(--color-blue-600)',
					700: 'var(--color-blue-700)',
					800: 'var(--color-blue-800)',
					900: 'var(--color-blue-900)',
				},
				// Gray/Zinc system
				gray: {
					50: 'var(--color-gray-50)',
					100: 'var(--color-gray-100)',
					200: 'var(--color-gray-200)',
					300: 'var(--color-gray-300)',
					400: 'var(--color-gray-400)',
					500: 'var(--color-gray-500)',
					600: 'var(--color-gray-600)',
					700: 'var(--color-gray-700)',
					800: 'var(--color-gray-800)',
					900: 'var(--color-gray-900)',
				},
				zinc: {
					50: 'var(--color-zinc-50)',
					100: 'var(--color-zinc-100)',
					200: 'var(--color-zinc-200)',
					300: 'var(--color-zinc-300)',
					400: 'var(--color-zinc-400)',
					500: 'var(--color-zinc-500)',
					600: 'var(--color-zinc-600)',
					700: 'var(--color-zinc-700)',
					800: 'var(--color-zinc-800)',
					900: 'var(--color-zinc-900)',
					950: 'var(--color-zinc-950)',
				},
				// Accent colors
				green: {
					300: 'var(--color-green-300)',
					400: 'var(--color-green-400)',
					500: 'var(--color-green-500)',
				},
				amber: {
					300: 'var(--color-amber-300)',
					400: 'var(--color-amber-400)',
					500: 'var(--color-amber-500)',
				},
				
				// Existing shadcn colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
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
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			
			// Spacing System
			spacing: {
				'base': 'var(--spacing)',
			},
			
			// Container System
			maxWidth: {
				'container-xs': 'var(--container-xs)',
				'container-sm': 'var(--container-sm)',
				'container-md': 'var(--container-md)',
				'container-lg': 'var(--container-lg)',
				'container-xl': 'var(--container-xl)',
				'container-2xl': 'var(--container-2xl)',
				'container-3xl': 'var(--container-3xl)',
				'container-4xl': 'var(--container-4xl)',
				'container-5xl': 'var(--container-5xl)',
				'container-6xl': 'var(--container-6xl)',
				'container-7xl': 'var(--container-7xl)',
			},
			
			// Border Radius
			borderRadius: {
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'3xl': 'var(--radius-3xl)',
			},
			
			// Blur Effects
			blur: {
				'sm': 'var(--blur-sm)',
				'md': 'var(--blur-md)',
				'lg': 'var(--blur-lg)',
				'xl': 'var(--blur-xl)',
				'2xl': 'var(--blur-2xl)',
				'3xl': 'var(--blur-3xl)',
			},
			
			// Transitions
			transitionTimingFunction: {
				'ease-in': 'var(--ease-in)',
				'ease-out': 'var(--ease-out)',
				'ease-in-out': 'var(--ease-in-out)',
				'default': 'var(--default-transition-timing-function)',
			},
			
			// Enhanced Keyframe Animations
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
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'ambient-float': {
					'0%, 100%': { 
						transform: 'translateY(0px) scale(1) rotate(0deg)',
						opacity: '0.6'
					},
					'25%': { 
						transform: 'translateY(-30px) scale(1.1) rotate(90deg)',
						opacity: '0.8'
					},
					'50%': { 
						transform: 'translateY(-20px) scale(0.9) rotate(180deg)',
						opacity: '0.7'
					},
					'75%': { 
						transform: 'translateY(15px) scale(1.05) rotate(270deg)',
						opacity: '0.75'
					}
				},
				'fade-in-up': {
					from: {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px var(--color-sky-400)'
					},
					'50%': { 
						boxShadow: '0 0 40px var(--color-sky-300), 0 0 60px var(--color-blue-400)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'gradient-shift': 'gradient-shift 12s ease-in-out infinite',
				'ambient-float': 'ambient-float 15s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
