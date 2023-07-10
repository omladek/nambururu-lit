/* eslint-env node */
const properties = require('known-css-properties').all

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  customSyntax: 'postcss-lit',
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    // see: https://github.com/hudochenkov/stylelint-order/issues/63
    'order/properties-order': [...properties],
  },
}
