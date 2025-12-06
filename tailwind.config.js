/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                dark: {
                    bg: 'var(--bg-primary)',
                    layer1: 'var(--bg-layer-1)',
                    layer2: 'var(--bg-layer-2)',
                    border: 'var(--border-primary)',
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    glow: 'var(--primary-glow)',
                    dark: 'var(--primary-dark)',
                    light: 'var(--primary-light)',
                },
                accent: {
                    blue: '#3b82f6',
                    pink: '#ec4899',
                    cyan: '#06b6d4',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
