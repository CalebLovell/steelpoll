/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require(`tailwindcss/defaultTheme`);

module.exports = {
	// mode: `jit`,
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
					mediumGrey: `rgb(79, 86, 87)`,
					darkWhite: `rgb(243, 244, 246)`,
					lightWhite: `rgb(255, 255, 255)`,
					pink: `rgb(244, 47, 220)`,
					purple: `rgb(173, 83, 218)`,
					blue: `#5152E5`,
					lightBlue: `#6ED5F0`,
					steelDark: `rgb(102, 102, 102)`,
					steelLight: `rgb(226, 227, 228)`,
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
