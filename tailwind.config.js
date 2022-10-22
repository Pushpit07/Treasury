module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layout/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#00FFF9",
					200: "#4DF0F5",
					300: "#0D4AB2",
					400: "#093177",
				},
			},
			fontFamily: {
				primary: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
