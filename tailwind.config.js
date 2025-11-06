module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ml-dark': '#0a0e27',
        'ml-blue': '#1e3a8a',
        'ml-cyan': '#06b6d4',
        'ml-glow': '#00ffff',
        'ml-gray': '#374151'
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(6, 182, 212), 0 0 10px rgb(6, 182, 212)' },
          '100%': { boxShadow: '0 0 20px rgb(6, 182, 212), 0 0 30px rgb(6, 182, 212)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}