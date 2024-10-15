import requireExampleDecorator from './require-example-decorator';
import { RuleTester } from '@typescript-eslint/rule-tester';

const ruleTester = new RuleTester();

/**
 * A string template tag that removes padding from the left side of multi-line strings
 * @param strings array of code strings (only one expected)
 */
function normalizeIndent(strings: TemplateStringsArray) {
  const codeLines = strings[0].split('\n');
  const leftPadding = codeLines[1].match(/\s+/)![0];
  return codeLines.map((line) => line.slice(leftPadding.length)).join('\n');
}

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'require-example-decorator', // rule name
  requireExampleDecorator, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: "when the method doesn't have http method decorator and returns `Promise` array",
        code: normalizeIndent`
          class Users {
            async getAllUsers(): Promise<User[]> {
            }
          }
        `,
      },
      {
        name: "when the method doesn't have http method decorator and returns array",
        code: normalizeIndent`
          class Users {
            async getAllUsers(): User[] {
            }
          }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: 'when the method has http method decorator and returns `Promise` array',
        code: normalizeIndent`
          class Users {
            @Get()
            async getAllUsers(): Promise<User[]> {}
          }
        `,
        errors: [
          {
            messageId: 'missingRequiredDecorators',
          },
        ],
      },
      {
        name: 'when the method has http method decorator and returns array',
        code: normalizeIndent`
          class Users {
            @Get()
            async getAllUsers(): User[] {}
          }
        `,
        errors: [
          {
            messageId: 'missingRequiredDecorators',
          },
        ],
      },
    ],
  }
);
