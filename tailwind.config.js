/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          900: '#030712',
          800: '#0b0f19',
          700: '#111827',
          600: '#1f293d',
        },
        neon: {
          cyan: '#00f0ff',
          purple: '#8a2be2',
          magenta: '#ff007f',
          emerald: '#00ff9d',
          amber: '#ffb700',
          rose: '#ff2a6d'
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'cyan-purple': 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.4)',
        'glow-purple': '0 0 25px rgba(112, 0, 255, 0.4)',
        'glow-emerald': '0 0 25px rgba(0, 255, 157, 0.4)',
        'glow-rose': '0 0 25px rgba(255, 42, 109, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
