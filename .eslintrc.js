/** @format */

module.exports = {
  extends: ['plugin:react/recommended', 'prettier', 'airbnb'],
  plugins: ['react', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'no-alert': 'off',
  },
};
