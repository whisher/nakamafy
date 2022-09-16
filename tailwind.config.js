/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#171717',
				brand: {
					100: '#a3e635',
					200: '#3f3f46'
				},
				gray: {
					100: '#adc5ec', // shadow top loader
					200: '#e4e4e7',
					300: '#d4d4d8',
					400: '#d4d4d8',
					500: '#586477', // shadow bottom
					600: '#121212'
				}
			},
			fontFamily: {
				sans: ['Manrope', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
