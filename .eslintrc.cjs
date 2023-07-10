/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:lit/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'sort-destructure-keys', 'sonarjs'],
  root: true,
  rules: {
    semi: 0,
    'prettier/prettier': 'error',
    '@typescript-eslint/member-delimiter-style': 'off',
    'sort-destructure-keys/sort-destructure-keys': 2,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    camelcase: 0,
  },
  overrides: [
    {
      files: ['**/types/**/*.ts'],
      rules: {
        'no-use-before-define': 'off',
      },
    },
  ],
}
