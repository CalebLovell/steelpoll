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
				sans: [`Inter var`, ...fontFamily.sans],
			},
			colors: {
				brand: {
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
		// require(`@tailwindcss/forms`),
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
