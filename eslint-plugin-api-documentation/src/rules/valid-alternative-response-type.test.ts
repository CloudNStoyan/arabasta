import validAlternativeResponseType from './valid-alternative-response-type';
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
  'valid-alternative-response-type', // rule name
  validAlternativeResponseType, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: "when the alternative response function has method's return type as first type argument",
        code: normalizeIndent`
        class Users {
          getAllUsers(): Promise<User[]> {
            this.errorResult<User[]>()
          }
        }
         `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the alternative response function doesn't have any type arguments",
        code: normalizeIndent`
        class Users {
          getAllUsers(): Promise<User[]> {
            this.errorResult()
          }
        }`,
        output: normalizeIndent`
        class Users {
          getAllUsers(): Promise<User[]> {
            this.errorResult<User[]>()
          }
        }`,
        errors: [
          {
            messageId: 'wrongFirstTypeArg',
          },
        ],
      },
      {
        name: "when the alternative response function first type argument is not the same as the method's return type",
        code: normalizeIndent`
        class Users {
          getAllUsers(): Promise<User[]> {
            this.errorResult<NotUser[]>()
          }
        }`,
        errors: [
          {
            messageId: 'wrongFirstTypeArg',
          },
        ],
      },
    ],
  }
);
