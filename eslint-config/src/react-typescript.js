/**
 * @type {import("eslint").Linter.FlatConfig}
 */
module.exports = {
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
  },
};
