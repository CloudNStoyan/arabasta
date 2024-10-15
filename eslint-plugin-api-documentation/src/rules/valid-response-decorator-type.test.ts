import validResponseDecoratorType from './valid-response-decorator-type';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { normalizeIndent } from '../test-utils';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: ['tsconfig.json'],
    },
  },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'valid-response-decorator-type', // rule name
  validResponseDecoratorType, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [],
    // 'invalid' checks cases that should not pass
    invalid: [],
  }
);
