/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', 
        './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                soria: ['soria', 'sans-serif'],
            },
            fontSize: {
                'soria-xl': '10rem',
                'soria-xs': '1.5rem',   // 24px
        'soria-sm': '2.25rem',  // 36px
        'soria-md': '4rem',     // 64px
        'soria-lg': '6rem',     // 96px
        'soria-xl': '10rem', 
            },
        },
    },
    plugins: [],
    };