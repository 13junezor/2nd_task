/* eslint-disable semi */
/* eslint-disable indent */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
semi: ['error', 'never'],
'no-console': 0,
  },
};
