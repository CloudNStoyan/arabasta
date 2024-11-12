import requirePropertyExampleDecorator from './require-property-example-decorator';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { normalizeIndent } from '../test-utils';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'require-property-example-decorator', // rule name
  requirePropertyExampleDecorator, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when the property has an `@Example` decorator',
        code: normalizeIndent`
          class Pet {
            @Example<string>("Max")
            name: string;
          }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the property doesn't have an `@Example` decorator",
        code: normalizeIndent`
          class Pet {
            name: string;
          }
        `,
        errors: [
          {
            messageId: 'missingExampleDecorator',
          },
        ],
      },
    ],
  }
);
