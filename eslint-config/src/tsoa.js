const tseslint = require('typescript-eslint');
const arabastaTsoa = require('@arabasta/eslint-plugin-tsoa');
const jsdoc = require('eslint-plugin-jsdoc');

module.exports = tseslint.config(
  arabastaTsoa.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Some eslint rules like `@arabasta/tsoa/require-jsdoc-returns` and
      // `@arabasta/tsoa/require-example-decorator` require explicit return types
      '@typescript-eslint/explicit-function-return-type': 'error',
      // We don't want union types in the generated OpenAPI schema
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSUnionType',
          message: 'Unions are not allowed.',
        },
      ],
    },
  },
  {
    extends: [jsdoc.configs['flat/recommended-typescript-error']],
    rules: {
      'jsdoc/check-tag-names': [
        'error',
        {
          // Add custom TSOA and OpenAPI JSDoc's declarations
          definedTags: [
            'format',
            'isDateTime',
            'isDate',
            'minDate',
            'maxDate',
            'isInt',
            'isFloat',
            'isLong',
            'isDouble',
            'minimum',
            'maximum',
            'isString',
            'minLength',
            'maxLength',
            'pattern',
            'isArray',
            'minItems',
            'maxItems',
            'uniqueItems',
            'isBoolean',
          ],
        },
      ],
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-line-alignment': [
        'error',
        'always',
        {
          tags: [
            'param',
            'arg',
            'argument',
            'property',
            'prop',
            'returns',
            'return',
            'summary',
            'isInt',
            'pattern',
            'format',
          ],
        },
      ],
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/no-blank-blocks': ['error', { enableFixer: true }],
      'jsdoc/require-asterisk-prefix': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-description-complete-sentence': 'error',
      'jsdoc/require-example': [
        'error',
        {
          // Do not require `@example` for complex types and array
          contexts: [
            'TSInterfaceDeclaration TSPropertySignature:not([typeAnnotation.typeAnnotation.type="TSArrayType"], [typeAnnotation.typeAnnotation.type="TSTypeReference"])',
          ],
        },
      ],
      // Require JSDoc on Methods, Types, Interfaces and Interface's properties
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            MethodDefinition: true,
          },
          contexts: [
            'TSTypeAliasDeclaration',
            'TSInterfaceDeclaration',
            'TSInterfaceDeclaration TSPropertySignature',
          ],
          checkConstructors: false,
        },
      ],
      'jsdoc/no-restricted-syntax': [
        'error',
        {
          contexts: [
            // Require methods to have a `@summary` JSDoc declaration
            {
              comment: 'JsdocBlock:not(*:has(JsdocTag[tag=summary]))',
              context: 'MethodDefinition',
              message: 'Missing JSDoc @summary declaration.',
            },
            // We don't want `@example` on properties that
            // are arrays because they can't be type-checked
            {
              comment: 'JsdocBlock:has(JsdocTag[tag=example])',
              context:
                'TSPropertySignature[typeAnnotation.typeAnnotation.type="TSArrayType"]',
              message: 'Using JSDoc @example on arrays is forbidden.',
            },
            // Require properties that are `number` to have an explicit JSDoc number format declaration
            {
              comment:
                'JsdocBlock:not(*:has(JsdocTag[tag=isInt], JsdocTag[tag=isFloat], JsdocTag[tag=isLong], JsdocTag[tag=isDouble]))',
              context:
                'TSPropertySignature[typeAnnotation.typeAnnotation.type="TSNumberKeyword"],TSTypeAliasDeclaration[typeAnnotation.type="TSNumberKeyword"]',
              message:
                'Missing JSDoc number type declaration (@isInt, @isFloat, @isLong, @isDouble).',
            },
          ],
        },
      ],
      // We are using `@arabasta/tsoa/require-jsdoc-returns` instead
      'jsdoc/require-returns': 'off',
    },
  }
);
