'use strict';

const enumNameAndValueShouldMatch = require('./enum-name-and-value-should-match.js');
const { RuleTester } = require('eslint');
const tsParser = require('@typescript-eslint/parser');

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
  },
});

/**
 * A string template tag that removes padding from the left side of multi-line strings
 * @param {Array} strings array of code strings (only one expected)
 */
function normalizeIndent(strings) {
  const codeLines = strings[0].split('\n');
  const leftPadding = codeLines[1].match(/\s+/)[0];
  return codeLines.map((line) => line.slice(leftPadding.length)).join('\n');
}

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'enum-name-and-value-should-match', // rule name
  enumNameAndValueShouldMatch, // rule code
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
