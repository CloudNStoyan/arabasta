import validSecurityDecorator from './valid-security-decorator';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { normalizeIndent } from '../test-utils';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'valid-security-decorator', // rule name
  validSecurityDecorator, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when a method uses security decorator and has the correct response decorator',
        code: normalizeIndent`
        class Users {
          @Security('test_security')
          @Response(401)
          getAllUsers() {}
        }
        `,
      },
      {
        name: 'when a class uses security decorator and has the correct response decorator',
        code: normalizeIndent`
        @Security('test_security')
        @Response(401)
        class Users {}
        `,
      },
      {
        name: 'when a method uses the security decorator and is inside a class that has the correct response decorator',
        code: normalizeIndent`
        @Response(401)
        class Users {
          @Security('test_security')
          getAllUsers() {}
        }
        `,
      },
      {
        name: 'when a method uses security decorator and the correct response decorator with non default options',
        code: normalizeIndent`
        class Users {
          @Security('test_security')
          @Response(403)
          getAllUsers() {}
        }
        `,
        options: [
          {
            statusCode: 403,
          },
        ],
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: 'when a method uses the security decorator but neither the method or the class have the correct response decorator',
        code: normalizeIndent`
        class Users {
          @Security('test_security')
          getAllUsers() {}
        }
        `,
        errors: [
          {
            messageId: 'requireCorrectResponseDecoratorForMethods',
          },
        ],
      },
      {
        name: "when a class uses the security decorator but doesn't have the correct response decorator",
        code: normalizeIndent`
        @Security('test_security')
        class Users {}
        `,
        errors: [
          {
            messageId: 'requireCorrectResponseDecoratorForClasses',
          },
        ],
      },
    ],
  }
);
