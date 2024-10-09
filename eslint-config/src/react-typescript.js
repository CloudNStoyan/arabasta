const tseslint = require('typescript-eslint');

module.exports = tseslint.config({
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
  },
});
