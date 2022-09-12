/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/features/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#18181b',
				brand: {
					100: '#a3e635',
					200: '#52525b'
				},
				gray: {
					200: '#e4e4e7',
					300: '#d4d4d8'
				}
			}
		}
	},
	plugins: []
};
