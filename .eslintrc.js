module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'eslint:recommended'],
  overrides: [],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error', // Обязательно!! Подсвечивает ошибки из Prettier.
  },
};
