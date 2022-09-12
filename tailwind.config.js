/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/features/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#18181b',
				brand: {
					100: '#a3e635',
					200: '#3f3f46'
				},
				gray: {
					200: '#e4e4e7',
					300: '#d4d4d8'
				}
			},
			fontFamily: {
				sans: ['Manrope', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
