/* eslint-disable @typescript-eslint/no-var-requires */
const { colors, fontFamily } = require(`tailwindcss/defaultTheme`);

module.exports = {
	purge: [`./src/pages/**/*.{js,ts,jsx,tsx}`, `./src/components/**/*.{js,ts,jsx,tsx}`],
	corePlugins: {
		container: false,
	},
	darkMode: `class`,
	theme: {
		extend: {
			fontFamily: {
				sans: [`Inter`, ...fontFamily.sans],
			},
			colors: {
				brand: {
					darkGrey: `rgb(44, 47, 48)`,
					lightGrey: `rgb(51, 55, 56)`,
					darkWhite: `rgb(243, 244, 246)`,
					lightWhite: `rgb(255, 255, 255)`,
					pink: `rgb(244, 47, 220)`,
					purple: `rgb(173, 83, 218)`,
					blue: `rgb(102, 120, 217)`,
					lightBlue: `rgb(30, 156, 215)`,
					steelDark: `rgb(102, 102, 102)`,
					steelLight: `rgb(226, 227, 228)`,
					primary: {
						light: colors.gray[100],
						base: `rgb(39,39,44)`,
						dark: `rgb(33,33,37)`,
					},
					accent: {
						light: colors.blue[400],
						base: colors.blue[500],
						dark: colors.blue[600],
					},
				},
			},
			height: {
				content: `var(--h-content-area)`,
			},
			minHeight: {
				content: `var(--h-content-area)`,
			},
		},
	},
	variants: {
		extend: {
			borderWidth: [`hover`, `focus`],
		},
	},
	plugins: [
		require(`@tailwindcss/forms`),
		({ addComponents }) => {
			addComponents({
				'.container': {
					width: `100%`,
					marginLeft: `auto`,
					marginRight: `auto`,
					paddingLeft: `1rem`,
					paddingRight: `1rem`,
					'@screen sm': {
						paddingLeft: `1.5rem`,
						paddingRight: `1.5rem`,
					},
					'@screen md': {
						paddingLeft: `3rem`,
						paddingRight: `3rem`,
					},
					'@screen lg': {
						paddingLeft: `6rem`,
						paddingRight: `6rem`,
					},
					'@screen xl': {
						paddingLeft: `9rem`,
						paddingRight: `9rem`,
					},
				},
			});
		},
	],
};
