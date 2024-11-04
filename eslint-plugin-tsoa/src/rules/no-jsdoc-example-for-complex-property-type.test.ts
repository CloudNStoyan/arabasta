import noJsdocExampleForComplexPropertyType from './no-jsdoc-example-for-complex-property-type';
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
  'no-jsdoc-example-for-complex-property-type', // rule name
  noJsdocExampleForComplexPropertyType, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        name: "when the property has an '@example' JSDoc declaration and its type is not a complex type",
        code: normalizeIndent`
          interface Animal {
            /**
             * @example "Dog"
             */
            kind: string
          }
        `,
      },
      {
        name: "when the property has an '@example' JSDoc declaration and its type is an enum and `allowEnums` option is set to true",
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
        options: [{ allowEnums: true }],
      },
      {
        name: "when the property doesn't have a JSDoc block and it has a complex type",
        code: normalizeIndent`
          type AnimalKinds = 'Cat' | 'Dog'

          interface Animal {
            kind: AnimalKinds
          }
        `,
      },
      {
        name: "when the property doesn't have a '@example' JSDoc declaration and it has a complex type",
        code: normalizeIndent`
          type AnimalKinds = 'Cat' | 'Dog'

          interface Animal {
            /**
             * This should be a cat.
             */
            kind: AnimalKinds
          }
        `,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        name: "when the property type is a complex type and has an '@example' JSDoc declaration",
        code: normalizeIndent`
          type AnimalKinds = "Cat" | "Dog";

          interface Animal {
            /**
             * Animal kind
             * @example "Crocodile"
             */
            kind: AnimalKinds
          }
        `,
        errors: [{ messageId: 'complexExamplesAreForbidden' }],
      },
      {
        name: "when the property has an '@example' JSDoc declaration and its type is an enum and `allowEnums` option is set to false",
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
        options: [{ allowEnums: false }],
        errors: [
          {
            messageId: 'complexExamplesAreForbidden',
          },
        ],
      },
    ],
  }
);
