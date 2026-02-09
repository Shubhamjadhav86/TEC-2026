/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'f1-red': '#FF1801',
                'deep-black': '#050505',
            },
            fontFamily: {
                'racing': ['"Russo One"', 'sans-serif'],
                'orbitron': ['Orbitron', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
            },
            boxShadow: {
                'red-glow': '0 0 20px rgba(255, 24, 1, 0.5)',
                'red-glow-strong': '0 0 40px rgba(255, 24, 1, 0.8)',
            },
            backdropBlur: {
                'xs': '2px',
            },
        },
    },
    plugins: [],
}
