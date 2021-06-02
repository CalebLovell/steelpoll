/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require(`tailwindcss/defaultTheme`);

module.exports = {
	mode: `jit`,
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
					pink: `#f42fdc`,
					purple: `#ad53da`,
					blue: `#0EA5E9`,
					lightBlue: `#6678d9`,
					steelDark: `#475569`,
					steelLight: `#a2b4c3`,
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
				},
			});
		},
	],
};
