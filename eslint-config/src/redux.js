const tseslint = require('typescript-eslint');

const arabastaJavascript = require('@arabasta/eslint-plugin-javascript');

module.exports = tseslint.config(arabastaJavascript.configs.recommended, {
  settings: {
    '@arabasta/alternative-functions': {
      'arabasta/redux': [
        {
          from: 'useDispatch',
          to: 'useAppDispatch',
        },
        {
          from: 'useSelector',
          to: 'useAppSelector',
        },
        {
          from: 'createAsyncThunk',
          to: 'createAppAsyncThunk',
        },
      ],
    },
  },
  rules: {
    '@arabasta/javascript/use-alternative-functions': 'error',
  },
});
