'use strict';

const { RuleTester } = require('eslint');
const useCreateAppAsyncThunkRule = require('./use-create-app-async-thunk.js');

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'use-create-app-async-thunk', // rule name
  useCreateAppAsyncThunkRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: 'createAppAsyncThunk();',
      },
      {
        code: 'foo();',
      },
      {
        code: 'bar();',
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: 'createAsyncThunk();',
        output: 'createAppAsyncThunk();',
        errors: 1,
      },
    ],
  }
);
