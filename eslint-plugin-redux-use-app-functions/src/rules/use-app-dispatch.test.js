'use strict';

const { RuleTester } = require('eslint');
const useAppDispatchRule = require('./use-app-dispatch.js');

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'use-app-dispatch', // rule name
  useAppDispatchRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: 'useAppDispatch();',
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
        code: 'useDispatch();',
        output: 'useAppDispatch();',
        errors: 1,
      },
    ],
  }
);
