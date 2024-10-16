import validExampleDecoratorType from './valid-example-decorator-type';
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
  'valid-example-decorator-type', // rule name
  validExampleDecoratorType, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: "when the example decorator's first type argument is the same as the return type of the method",
        code: normalizeIndent`
        class Users {
          @Example<User[]>()
          getAllUsers(): Promise<User[]> {}
        }
        `,
      },
      {
        name: "when the example decorator's first type argument is the same as the property type",
        code: normalizeIndent`
        class User {
          @Example<UUID>()
          id: UUID;
        }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the example decorator is used on a method and it doesn't have any type arguments",
        code: normalizeIndent`
        class Users {
          @Example()
          getAllUsers(): Promise<User[]> {}
        }
        `,
        errors: [{ messageId: 'wrongFirstTypeArgForMethodExample' }],
      },
      {
        name: "when the example decorator is used on a property and it doesn't have any type arguments",
        code: normalizeIndent`
        class User {
          @Example()
          id: UUID;
        }
        `,
        errors: [{ messageId: 'wrongFirstTypeArgForPropertyExample' }],
      },
      {
        name: "when the example decorator doesn't have the method's return type as first type argument",
        code: normalizeIndent`
        class Users {
          @Example<string>()
          getAllUsers(): Promise<User[]> {}
        }
        `,
        errors: [{ messageId: 'wrongFirstTypeArgForMethodExample' }],
      },
      {
        name: "when the example decorator doesn't have the property type as first type argument",
        code: normalizeIndent`
        class User {
          @Example<string>()
          id: UUID;
        }
        `,
        errors: [{ messageId: 'wrongFirstTypeArgForPropertyExample' }],
      },
    ],
  }
);
