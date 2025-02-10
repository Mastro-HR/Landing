/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define which files Tailwind should scan for classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      // Color System
      // Organized color palette with semantic naming and consistent scaling
      colors: {
        // Primary colors for main interface elements
        primary: {
          50: '#FAFBFC',  // Lightest shade for backgrounds
          100: '#F0F2F4', // Light shade for subtle backgrounds
          200: '#E2E5E9', // Light shade for borders
          300: '#C5CAD1', // Medium shade for secondary text
          400: '#A7AFB9', // Medium shade for primary text
          500: '#151821', // Base dark color for main elements
          600: '#111419', // Darker shade for hover states
          700: '#0D1015', // Dark shade for active states
          800: '#090B0F', // Very dark for contrast elements
          900: '#050709', // Darkest shade for special emphasis
        },
        
        // Accent colors for highlighting and call-to-action elements
        accent: {
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFCBB3',
          300: '#FFA585',
          400: '#FF8A66',
          500: '#F33F0E',
          600: '#DB3A0D',
          700: '#BF3309',
          800: '#A32C08',
          900: '#862406',
        },
        
        // Teal variations for background depth
        teal: {
          500: '#090C11', // Base dark background
          600: '#070A0E', // Deeper background
          700: '#05080B', // Very deep background
          800: '#030508', // Ultra deep background
          900: '#020304', // Darkest background
        },
        
        // Mars-themed colors for special elements
        mars: {
          rust: '#DD4B39',  // Rust color for decorative elements
          sand: '#E86D5C',  // Sand color for surface accents
          shadow: '#B8352A', // Shadow color for depth
          dust: '#F24333',   // Dust color for highlights
          night: '#0C0E12'   // Night color for dark sections
        },
        
        // Surface colors for layering
        surface: {
          light: '#1C202A',  // Top layer surface
          default: '#151821', // Main surface color
          dark: '#0F1218',    // Deep surface color
        }
      },
      
      fontFamily: {
        'primary': ['Bebas Neue', 'sans-serif'],
        'secondary': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      
      // Background Gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(180deg, var(--tw-gradient-stops))',
        'gradient-mars': 'linear-gradient(to bottom, var(--surface-light), var(--surface-dark))',
      },
      
      // Custom Height Values
      height: {
        '128': '32rem', // 512px for large sections
        '144': '36rem', // 576px for extra large sections
        '160': '40rem', // 640px for hero sections
        '192': '48rem', // 768px for full-page sections
      },
      
      // Custom Transition Timing
      transitionTimingFunction: {
        'mars': 'cubic-bezier(0.4, 0, 0.2, 1)', // Custom easing for smooth transitions
      },
      
      // Enhanced Shadow System
      boxShadow: {
        'mars': '0 4px 6px -1px rgba(220, 61, 43, 0.1), 0 2px 4px -1px rgba(220, 61, 43, 0.06)',      // Subtle accent shadow
        'mars-lg': '0 10px 15px -3px rgba(220, 61, 43, 0.1), 0 4px 6px -2px rgba(220, 61, 43, 0.05)', // Larger accent shadow
      },
      
      // Custom Animation Keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      
      // Custom Animations
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
      },
    },
  },
  
  // Additional Tailwind Plugins
  plugins: [],
};