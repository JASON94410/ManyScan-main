import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

const config: Config = {
    content: [
        '.src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                element: {
                    primary: '#5C1720',
                    secondary: '#AA2C36',
                },
                background: {
                    primary: '#F4F2EE',
                    secondary: '#FFFFFF',
                },
                'dark-element': {
                    primary: '#F4F2EE',
                    secondary: '#FFFFFF',
                },
                'dark-background': {
                    primary: '#040711',
                    secondary: '#283042',
                },
            },
            boxShadow: {
                light: '5px 5px 0 0 rgb(170, 44, 54)',
                dark: '5px 5px 0 0 #F4F2EE',
                'img-light': '0px 0px 10px 0px #5C1720',
                'img-dark': '0px 0px 10px 0px rgba(244, 242, 238, 0.20)',
            },
            borderWidth: {
                '3': '3px',
            },
            borderRadius: {
                lg: '0.65rem',
            },
        },
        fontFamily: {
            sans: ['var(--font-arial-black)'],
        },

    },
    plugins: [
        plugin(({ addUtilities }: { addUtilities: any }) => {
            const newUtilities = {
                '.scrollbar-thin': {
                    'scrollbar-width': 'thin',
                    'scrollbar-color': '#888 #000',
                },
                '.scrollbar-thin::-webkit-scrollbar': {
                    height: '3px',
                    width: '3px',
                },
                '.scrollbar-thin::-webkit-scrollbar-track': {
                    background: '#000',
                },
                '.scrollbar-thin::-webkit-scrollbar-thumb': {
                    background: '#888',
                    '&:hover': {
                        background: '#555',
                    },
                },
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        }),
    ],
    darkMode: 'class',
};
export default config;
