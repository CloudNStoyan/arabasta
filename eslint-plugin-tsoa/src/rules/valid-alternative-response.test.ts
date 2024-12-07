import validAlternativeResponse from './valid-alternative-response';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { normalizeIndent } from '../test-utils';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'valid-alternative-response', // rule name
  validAlternativeResponse, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when this.errorResult is used in a method that has the correct response decorator',
        code: normalizeIndent`
        class User {
          @Response(422)
          getAllUsers() {
            return this.errorResult(422);
          }

          @Response(401)
          getUser() {
            return this.errorResult(401)
          }
        }
        `,
      },
      {
        name: 'when this.errorResult is used in a method that is inside a class that has the correct response decorator',
        code: normalizeIndent`
        @Response(401)
        @Response(422)
        class User {
          getAllUsers() {
            return this.errorResult(422);
          }

          getUser() {
            return this.errorResult(401)
          }
        }
        `,
      },
      {
        name: 'when this.noContentResult is used in a method that has the correct response decorator',
        code: normalizeIndent`
        class User {
          @Response(204)
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
      },
      {
        name: 'when this.noContentResult is used in a method that has the `@SuccessResponse` decorator',
        code: normalizeIndent`
        class User {
          @SuccessResponse(204)
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
      },
      {
        name: 'when this.noContentResult is used in a method that is inside a class that has the correct response decorator',
        code: normalizeIndent`
        @Response(204)
        class User {
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
      },
      {
        name: 'when custom function name is used in a method that has the correct response decorator',
        code: normalizeIndent`
        class User {
          @Response(422)
          getAllUsers() {
            return this.customTestResult(422);
          }

          @Response(401)
          getUser() {
            return this.customTestResult(401)
          }
        }
        `,
        options: [
          {
            functionNames: ['this.customTestResult'],
          },
        ],
      },
      {
        name: 'when custom function name is used in a method that is inside a class that has the correct response decorator',
        code: normalizeIndent`
        @Response(401)
        @Response(422)
        class User {
          getAllUsers() {
            return this.customTestResult(422);
          }

          getUser() {
            return this.customTestResult(401)
          }
        }
        `,
        options: [
          {
            functionNames: ['this.customTestResult'],
          },
        ],
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when this.errorResult is used in a method that doesn't have a response decorator",
        code: normalizeIndent`
        class User {
          getAllUsers() {
            return this.errorResult(422);
          }

          getUser() {
            return this.errorResult(401)
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.errorResult is used in a method that is inside a class that doesn't have a response decorator",
        code: normalizeIndent`
        class User {
          getAllUsers() {
            return this.errorResult(422);
          }

          getUser() {
            return this.errorResult(401)
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.errorResult is used in a method that doesn't have the correct response decorator",
        code: normalizeIndent`
        class User {
          @Response(300)
          getAllUsers() {
            return this.errorResult(422);
          }

          @Response(300)
          getUser() {
            return this.errorResult(401)
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.errorResult is used in a method that is inside a class that doesn't have the correct response decorator",
        code: normalizeIndent`
        @Response(300)
        @Response(301)
        class User {
          getAllUsers() {
            return this.errorResult(422);
          }

          getUser() {
            return this.errorResult(401)
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.noContentResult is used in a method that doesn't have a response decorator",
        code: normalizeIndent`
        class User {
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.noContentResult is used in a method that is inside a class that doesn't have a response decorator",
        code: normalizeIndent`
        class User {
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.noContentResult is used in a method that doesn't have the correct response decorator",
        code: normalizeIndent`
        class User {
          @Response(300)
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when this.noContentResult is used in a method that is inside a class that doesn't have the correct response decorator",
        code: normalizeIndent`
        @Response(300)
        class User {
          getAllUsers() {
            return this.noContentResult();
          }
        }
        `,
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when custom function name is used in a method that doesn't have a response decorator",
        code: normalizeIndent`
        class User {
          getAllUsers() {
            return this.customTestResult(422);
          }

          getUser() {
            return this.customTestResult(401)
          }
        }
        `,
        options: [
          {
            functionNames: ['this.customTestResult'],
          },
        ],
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when custom function name is used in a method that is inside a class that doesn't have a response decorator",
        code: normalizeIndent`
        class User {
          getAllUsers() {
            return this.customTestResult(422);
          }

          getUser() {
            return this.customTestResult(401)
          }
        }
        `,
        options: [
          {
            functionNames: ['this.customTestResult'],
          },
        ],
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when custom function name is used in a method that doesn't have the correct response decorator",
        code: normalizeIndent`
        class User {
          @Response(300)
          getAllUsers() {
            return this.customTestResult(422);
          }

          @Response(301)
          getUser() {
            return this.customTestResult(401)
          }
        }
        `,
        options: [
          {
            functionNames: ['this.customTestResult'],
          },
        ],
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
      {
        name: "when custom function name is used in a method that is inside a class that doesn't have the correct response decorator",
        code: normalizeIndent`
        @Response(301)
        @Response(300)
        class User {
          getAllUsers() {
            return this.customTestResult(422);
          }

          getUser() {
            return this.customTestResult(401)
          }
        }
        `,
        options: [
          {
            functionNames: ['this.customTestResult'],
          },
        ],
        errors: [
          {
            messageId: 'noCorrectResponseDecorator',
          },
          {
            messageId: 'noCorrectResponseDecorator',
          },
        ],
      },
    ],
  }
);
