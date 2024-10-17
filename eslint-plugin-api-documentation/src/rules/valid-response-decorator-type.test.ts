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
    valid: [
      {
        name: "when the response decorator has type arguments when 'allowedTypes' is set to 'any'",
        code: normalizeIndent`
        class Users {
          @Response<AnythingWorks>(404)
          getAllUsers() {}
        }
        `,
        options: [
          {
            allowedTypes: 'any',
          },
        ],
      },
      {
        name: "when the response decorator has the correct type arguments when 'allowedTypes' is set to custom types",
        code: normalizeIndent`
        class Users {
          @Response<ApiError>(404)
          getAllUsers() {}
        }
        `,
        options: [
          {
            allowedTypes: ['ApiError'],
          },
        ],
      },
      {
        name: "when the response decorator has status code that doesn't start with '4' or '5'",
        code: normalizeIndent`
        class Users {
          @Response(204)
          @Response(301)
          getAllUsers() {}
        }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the response decorator doesn't have any type arguments",
        code: normalizeIndent`
        class Users {
          @Response(404)
          getAllUsers() {}
        }
        `,
        errors: [
          {
            messageId: 'requiredTypeArguments',
          },
        ],
      },
      {
        name: "when the response decorator has type arguments that are not in the 'allowedTypes'",
        code: normalizeIndent`
        class Users {
          @Response<NotAllowedType>(404)
          getAllUsers() {}
        }
        `,
        options: [
          {
            allowedTypes: [],
          },
        ],
        errors: [
          {
            messageId: 'firstTypeArgIsNotFromTheAllowedTypes',
          },
        ],
      },
    ],
  }
);
