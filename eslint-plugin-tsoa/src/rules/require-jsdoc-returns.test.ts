import requireJsdocReturns from './require-jsdoc-returns';
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
  'require-jsdoc-returns', // rule name
  requireJsdocReturns, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: "when the method doesn't have a JSDoc block",
        code: normalizeIndent`
        class UsersController {
          getAllUsers(): Promise<User[]> {}
        }
        `,
      },
      {
        name: "when the method has a JSDoc's @returns declaration",
        code: normalizeIndent`
        class UsersController {
          /**
           * @returns Get all users
           */
          getAllUsers(): Promise<User[]> {}
        }
        `,
      },
      {
        name: "when methods returns 'void' or 'undefined' and don't have a JSDoc's @returns declaration",
        code: normalizeIndent`
        class UsersController {
          /**
           * Get all users
           */
          getAllUsers(): Promise<void> {}

          /**
           * Get all admins
           */
          getAllAdmins(): Promise<undefined> {}
        }
        `,
      },
      {
        name: "when the 'disallowOnVoidOrUndefined' option is set to 'false' and methods that return 'void' or 'undefined' have a JSDoc's @returns declaration",
        code: normalizeIndent`
        class UsersController {
          /**
           * @returns Get all users
           */
          getAllUsers(): Promise<void> {}

          /**
           * @returns Get all admins
           */
          getAllAdmins(): Promise<undefined> {}
        }
        `,
        options: [
          {
            disallowOnVoidOrUndefined: false,
          },
        ],
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the method doesn't have a JSDoc's @returns declaration",
        code: normalizeIndent`
        class UsersController {
          /**
           *
           */
          getAllUsers(): Promise<User[]> {}
        }
        `,
        errors: [
          {
            messageId: 'returnsIsMissing',
          },
        ],
      },
      {
        name: "when the method has JSDoc's @returns declaration but without description",
        code: normalizeIndent`
        class UsersController {
          /**
           * @returns
           */
          getAllUsers(): Promise<User[]> {}
        }
        `,
        errors: [
          {
            messageId: 'returnsDescriptionIsMissing',
          },
        ],
      },
      {
        name: "when the 'disallowOnVoidOrUndefined' option is set to 'true' and methods that return 'void' or 'undefined' have a JSDoc's @returns declaration",
        code: normalizeIndent`
        class UsersController {
          /**
           * @returns Get all users
           */
          getAllUsers(): Promise<void> {}

          /**
           * @returns Get all admins
           */
          getAllAdmins(): Promise<undefined> {}
        }
        `,
        options: [
          {
            disallowOnVoidOrUndefined: true,
          },
        ],
        errors: [
          {
            messageId: 'returnsIsNotAllowed',
          },
          {
            messageId: 'returnsIsNotAllowed',
          },
        ],
      },
    ],
  }
);
