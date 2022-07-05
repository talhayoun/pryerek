module.exports = {
	reactStrictMode: true,
	future: { webpack5: true },
	env: {
		API_URL: 'https://api.pryerek.co.il',
		// API_URL: "http://localhost:5000",
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	}
};
