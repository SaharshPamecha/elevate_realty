module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Institutional trust and premium positioning
        primary: {
          DEFAULT: "#1a237e", // indigo-900
          50: "#e8eaf6", // indigo-50
          100: "#c5cae9", // indigo-100
          200: "#9fa8da", // indigo-200
          300: "#7986cb", // indigo-300
          400: "#5c6bc0", // indigo-400
          500: "#3f51b5", // indigo-500
          600: "#3949ab", // indigo-600
          700: "#303f9f", // indigo-700
          800: "#283593", // indigo-800
          900: "#1a237e", // indigo-900
        },
        // Secondary Colors - Sophisticated neutrality
        secondary: {
          DEFAULT: "#37474f", // blue-gray-600
          50: "#eceff1", // blue-gray-50
          100: "#cfd8dc", // blue-gray-100
          200: "#b0bec5", // blue-gray-200
          300: "#90a4ae", // blue-gray-300
          400: "#78909c", // blue-gray-400
          500: "#607d8b", // blue-gray-500
          600: "#546e7a", // blue-gray-600
          700: "#455a64", // blue-gray-700
          800: "#37474f", // blue-gray-800
          900: "#263238", // blue-gray-900
        },
        // Accent Colors - Luxury moments and achievement
        accent: {
          DEFAULT: "#ffd700", // yellow-400
          50: "#fffde7", // yellow-50
          100: "#fff9c4", // yellow-100
          200: "#fff59d", // yellow-200
          300: "#fff176", // yellow-300
          400: "#ffee58", // yellow-400
          500: "#ffeb3b", // yellow-500
          600: "#fdd835", // yellow-600
          700: "#fbc02d", // yellow-700
          800: "#f9a825", // yellow-800
          900: "#f57f17", // yellow-900
        },
        // Background and Surface
        background: "#fafafa", // gray-50
        surface: "#ffffff", // white
        // Text Colors
        "text-primary": "#212121", // gray-800
        "text-secondary": "#757575", // gray-500
        // Status Colors
        success: {
          DEFAULT: "#2e7d32", // green-700
          50: "#e8f5e8", // green-50
          100: "#c8e6c9", // green-100
          500: "#4caf50", // green-500
        },
        warning: {
          DEFAULT: "#f57c00", // orange-600
          50: "#fff3e0", // orange-50
          100: "#ffe0b2", // orange-100
          500: "#ff9800", // orange-500
        },
        error: {
          DEFAULT: "#c62828", // red-700
          50: "#ffebee", // red-50
          100: "#ffcdd2", // red-100
          500: "#f44336", // red-500
        },
        // Border Colors
        border: "#e0e0e0", // gray-300
        "border-light": "#f5f5f5", // gray-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        'elevation': '0 4px 20px rgba(26, 35, 126, 0.08)',
        'subtle': '0 2px 8px rgba(26, 35, 126, 0.04)',
        'medium': '0 8px 32px rgba(26, 35, 126, 0.12)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}