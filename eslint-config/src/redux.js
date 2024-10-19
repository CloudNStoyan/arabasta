const tseslint = require('typescript-eslint');

const reduxUseAppFunctions = require('@arabasta/eslint-plugin-redux-use-app-functions');

module.exports = tseslint.config(reduxUseAppFunctions.configs.recommended);
