import { normalizeIndent } from '../test-utils';
import requireTagsDecoratorRule from './require-tags-decorator';
import { RuleTester } from '@typescript-eslint/rule-tester';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'require-tags-decorator', // rule name
  requireTagsDecoratorRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when the controller has `@Tags` decorator',
        code: normalizeIndent`
        @Tags('user')
        class Users {
          @Get()
          getAllUsers() {}
        }
        `,
      },
      {
        name: "when a class doesn't have any methods with http decorators",
        code: normalizeIndent`
        class Users {
          getAllUsers() {}
        }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the controller doesn't have `@Tags` decorator",
        code: normalizeIndent`
        class Users {
          @Get()
          getAllUsers() {}
        }
        `,
        errors: [
          {
            messageId: 'missingTagsDecorator',
          },
        ],
      },
    ],
  }
);
