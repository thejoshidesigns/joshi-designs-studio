/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#0B0B0B',
          secondary: '#080808',
        },
        text: {
          primary: '#EAEAEA',
          secondary: '#8A8A8A',
        },
        accent: {
          DEFAULT: '#5BC8C0',
          dark: '#3AADA5',
          glow: 'rgba(91, 200, 192, 0.15)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          accent: 'rgba(91, 200, 192, 0.3)',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'ticker': 'ticker 40s linear infinite',
        'ticker-reverse': 'tickerReverse 38s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'shake': 'shake 0.4s ease',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'typewriter': 'typewriter 2s steps(30) forwards',
        'cursor-blink': 'cursorBlink 0.8s step-end infinite',
        'noise': 'noiseShift 0.15s steps(1) infinite',
        'particle-drift': 'particleDrift 8s ease-in-out infinite',
        'count-up': 'fadeUp 0.6s ease forwards',
        'timeline-grow': 'timelineGrow 0.8s ease forwards',
        'reveal-left': 'revealLeft 0.7s ease forwards',
        'reveal-right': 'revealRight 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        tickerReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.9)' },
          '60%': { opacity: '1', transform: 'translateY(-8px) scale(1.02)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        noiseShift: {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-1%, -1%)' },
          '20%': { transform: 'translate(1%, 0%)' },
          '30%': { transform: 'translate(0%, 1%)' },
          '40%': { transform: 'translate(-1%, 0%)' },
          '50%': { transform: 'translate(1%, -1%)' },
          '60%': { transform: 'translate(0%, 1%)' },
          '70%': { transform: 'translate(-1%, 0%)' },
          '80%': { transform: 'translate(1%, 1%)' },
          '90%': { transform: 'translate(-1%, -1%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        particleDrift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
          '25%': { transform: 'translateY(-20px) translateX(8px)', opacity: '0.7' },
          '50%': { transform: 'translateY(-8px) translateX(-6px)', opacity: '0.4' },
          '75%': { transform: 'translateY(-24px) translateX(4px)', opacity: '0.8' },
        },
        timelineGrow: {
          '0%': { height: '0' },
          '100%': { height: '100%' },
        },
        revealLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        revealRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
