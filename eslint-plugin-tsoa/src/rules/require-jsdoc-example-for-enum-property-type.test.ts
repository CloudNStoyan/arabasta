import requireJsdocExampleForEnumPropertyType from './require-jsdoc-example-for-enum-property-type';
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
  'require-jsdoc-example-for-enum-property-type', // rule name
  requireJsdocExampleForEnumPropertyType, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: "when the property has an enum value and '@example' JSDoc declaration",
        code: normalizeIndent`
          enum AnimalKinds {
            Cat = 'Cat',
            Dog = 'Dog'
          };

          interface Animal {
            /**
             * @example "Dog"
             */
            kind: AnimalKinds
          }
        `,
      },
      {
        name: "when the property doesn't have an enum value",
        code: normalizeIndent`
          type AnimalKind = "Cat" | "Dog"

          interface Animal {
            /**
             * Animal kind
             */
            kind: AnimalKinds
          }
        `,
      },
      {
        name: "when the property has an enum value but doesn't have a JSDoc block",
        code: normalizeIndent`
          enum AnimalKinds {
            Cat = 'Cat',
            Dog = 'Dog'
          };

          interface Animal {
            kind: AnimalKinds
          }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the property has an enum value but doesn't have an '@example' JSDoc declaration",
        code: normalizeIndent`
          enum AnimalKinds {
            Cat = 'Cat',
            Dog = 'Dog'
          };

          interface Animal {
            /**
             * Animal kind
             */
            kind: AnimalKinds
          }
        `,
        errors: [
          {
            messageId: 'exampleIsMissing',
          },
        ],
      },
      {
        name: "when the property has an enum value but the '@example' JSDoc declaration doesn't have a description",
        code: normalizeIndent`
          enum AnimalKinds {
            Cat = 'Cat',
            Dog = 'Dog'
          };

          interface Animal {
            /**
             * @example
             */
            kind: AnimalKinds
          }
        `,
        errors: [
          {
            messageId: 'exampleDescriptionIsMissing',
          },
        ],
      },
      {
        name: "when the property has an enum value and '@example' JSDoc declaration but the value is not valid",
        code: normalizeIndent`
          enum AnimalKinds {
            Cat = 'Cat',
            Dog = 'Dog'
          };

          interface Animal {
            /**
             * Animal kind
             * @example "Crocodile"
             */
            kind: AnimalKinds
          }
        `,
        errors: [{ messageId: 'exampleValueIsNotValid' }],
      },
    ],
  }
);
