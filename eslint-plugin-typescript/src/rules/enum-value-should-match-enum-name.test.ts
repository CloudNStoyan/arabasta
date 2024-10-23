import { RuleTester } from '@typescript-eslint/rule-tester';
import enumValueShouldMatchEnumNameRule from './enum-value-should-match-enum-name';
import { normalizeIndent } from '../test-utils';

const ruleTester = new RuleTester();

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'enum-value-should-match-enum-name', // rule name
  enumValueShouldMatchEnumNameRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: 'when enum names match their values',
        code: normalizeIndent`
        enum Animals {
          Cat = "Cat",
          Dog = "Dog"
        }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when enum names don't match their values",
        code: normalizeIndent`
        enum Animals {
          Cat = "Other not cat",
          Dog = 3
        }
        `,
        errors: [
          {
            messageId: 'enumNameAndValueMismatch',
            suggestions: [
              {
                messageId: 'setEnumValueAsTheKey',
                output: normalizeIndent`
                enum Animals {
                  Cat = "Cat",
                  Dog = 3
                }
                `,
              },
            ],
          },
          {
            messageId: 'enumNameAndValueMismatch',
            suggestions: [
              {
                messageId: 'setEnumValueAsTheKey',
                output: normalizeIndent`
                enum Animals {
                  Cat = "Other not cat",
                  Dog = "Dog"
                }
                `,
              },
            ],
          },
        ],
      },
    ],
  }
);
