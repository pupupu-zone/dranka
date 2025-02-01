const path = require('path');

module.exports = {
  root: true,
  customSyntax: 'postcss-styled-syntax',
  extends: [
    'stylelint-config-standard',
    // https://github.com/constverum/stylelint-config-rational-order
    path.join(__dirname, './stylelint-config-rational-order/index.cjs'),
  ],
  rules: {
    'selector-type-no-unknown': null,
    'value-keyword-case': [
      'lower', { ignoreKeywords: ['dummyValue'] }
    ],
    'alpha-value-notation': 'number',
    // https://github.com/hudochenkov/postcss-styled-syntax/issues/3
    'block-no-empty': null,

		// stylelint rules for styled-components:
		"value-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "no-empty-source": null,
  }
};
