/* eslint-env node */
module.exports = {
	root: true,
	extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
	rules: {
		"indent": ["error", "tab"],
		"no-unused-vars": ["warning"],
		"vue/html-self-closing": [
			"off",
			{
				void: "never",
				normal: "never",
				component: "never",
			},
		],
		"vue/html-indent": ["error", "tab"],
		"vue/max-attributes-per-line": [
			'off'
		]
	},
};
